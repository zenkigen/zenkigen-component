/**
 * TimePicker のユーティリティ関数・型
 *
 * 時刻の候補生成（時 / 分）と、`{ hour, minute }` 構造体 ⇄ `"HH:mm"` 文字列の相互変換を行う。
 * min/max による範囲制限は「範囲外の候補を生成リストから除外（非表示）」する方針で実装している。
 */

import type { SelectOption } from '../select/type';

// ============================================================================
// 型
// ============================================================================

/** TimePicker の value 型。両方 `null` の場合は未入力を表す */
export type TimeValue = {
  hour: number | null;
  minute: number | null;
};

/** 分候補の刻み。すべて 60 の約数で等間隔に生成できる値のみを許可する */
export type MinuteStep = 1 | 5 | 10 | 15 | 30;

// ============================================================================
// 定数
// ============================================================================

const MIN_HOUR = 0;
const MAX_HOUR = 23;
const MIN_MINUTE = 0;
const MAX_MINUTE = 59;
const MINUTES_PER_HOUR = 60;

// ============================================================================
// 内部ヘルパー
// ============================================================================

/** 数値を 2 桁ゼロ埋め文字列へ変換する（例: 9 → "09"） */
const padZero = (value: number): string => String(value).padStart(2, '0');

/** 時・分を 0 時からの総分数へ変換する */
const toTotalMinutes = (hour: number, minute: number): number => hour * MINUTES_PER_HOUR + minute;

// ============================================================================
// オプション生成ヘルパー
// ============================================================================

/** 時の値から `SelectOption` を生成する */
export const createHourOption = (hour: number): SelectOption => ({
  id: `hour-${hour}`,
  value: String(hour),
  label: padZero(hour),
});

/** 分の値から `SelectOption` を生成する */
export const createMinuteOption = (minute: number): SelectOption => ({
  id: `minute-${minute}`,
  value: String(minute),
  label: padZero(minute),
});

// ============================================================================
// 変換関数
// ============================================================================

/**
 * `"HH:mm"` 文字列を `{ hour, minute }` へ変換する。
 * 形式不正・範囲外（0-23 時 / 0-59 分の範囲外）の場合は `null` を返す。
 * @example parseTime('09:30') → { hour: 9, minute: 30 }
 */
export const parseTime = (time: string): { hour: number; minute: number } | null => {
  const match = /^(\d{1,2}):(\d{1,2})$/.exec(time);

  if (match == null) {
    return null;
  }

  const hour = Number(match[1]);
  const minute = Number(match[2]);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return null;
  }

  if (hour < MIN_HOUR || hour > MAX_HOUR || minute < MIN_MINUTE || minute > MAX_MINUTE) {
    return null;
  }

  return { hour, minute };
};

/**
 * `{ hour, minute }` を `"HH:mm"` 文字列へ変換する。
 * 時・分のいずれかが `null`（＝未入力）の場合は `null` を返す。
 * @example formatTime({ hour: 9, minute: 30 }) → '09:30'
 */
export const formatTime = (value: TimeValue): string | null => {
  if (value.hour == null || value.minute == null) {
    return null;
  }

  return `${padZero(value.hour)}:${padZero(value.minute)}`;
};

// ============================================================================
// 範囲判定・候補生成
// ============================================================================

/**
 * 指定した時刻が `[minTime, maxTime]`（両端を含む inclusive）の範囲内かどうかを判定する。
 * `minTime` / `maxTime` が未指定・不正な場合はその側の制限を適用しない。
 */
export const isTimeInRange = (
  hour: number,
  minute: number,
  minTime?: string | null,
  maxTime?: string | null,
): boolean => {
  const total = toTotalMinutes(hour, minute);
  const min = minTime != null ? parseTime(minTime) : null;
  const max = maxTime != null ? parseTime(maxTime) : null;

  if (min != null && total < toTotalMinutes(min.hour, min.minute)) {
    return false;
  }

  if (max != null && total > toTotalMinutes(max.hour, max.minute)) {
    return false;
  }

  return true;
};

/**
 * 分の候補（`SelectOption[]`）を生成する。
 * `selectedHour` が指定されている場合は `minTime` / `maxTime` の範囲外の分を除外（非表示）する。
 * `selectedHour` が `null`（時が未選択）の場合は範囲によるフィルタを行わず刻みごとの分を全件返す。
 * @param minuteStep 分の刻み（60 の約数）
 */
export const generateMinuteOptions = (
  minuteStep: MinuteStep,
  selectedHour: number | null,
  minTime?: string | null,
  maxTime?: string | null,
): SelectOption[] => {
  const min = minTime != null ? parseTime(minTime) : null;
  const max = maxTime != null ? parseTime(maxTime) : null;
  const shouldFilterByRange = selectedHour != null && (min != null || max != null);
  const options: SelectOption[] = [];

  for (let minute = MIN_MINUTE; minute <= MAX_MINUTE; minute += minuteStep) {
    // shouldFilterByRange が true の時点で selectedHour は非 null だが、isTimeInRange の
    // hour 引数（number）へ渡すための TypeScript の型絞り込みとして selectedHour != null を明示する。
    if (shouldFilterByRange && selectedHour != null && !isTimeInRange(selectedHour, minute, minTime, maxTime)) {
      continue;
    }

    options.push(createMinuteOption(minute));
  }

  return options;
};

/**
 * 時の候補（`SelectOption[]`）を生成する。時の刻みは 1 固定（`00`〜`23` の全 24 時が候補の母集合）。
 * `minTime` / `maxTime` の範囲外の時に加え、その時に対して選択可能な分が 1 件も無い時も除外（非表示）する。
 * これにより、`minTime` の分が `minuteStep` で到達できない場合（例: `minTime="09:45"`, `minuteStep=30` では
 * 9 時の分候補 `00`/`30` がいずれも 09:45 未満で除外され空になる）に、選んでも分候補が空になる
 * デッドエンドの時が候補へ現れることを防ぐ。
 * @param minuteStep 分の刻み。各時に選択可能な分が存在するかの判定に使用する
 */
export const generateHourOptions = (
  minuteStep: MinuteStep,
  minTime?: string | null,
  maxTime?: string | null,
): SelectOption[] => {
  const options: SelectOption[] = [];

  for (let hour = MIN_HOUR; hour <= MAX_HOUR; hour += 1) {
    // その時に選択可能な分が 1 件も無い場合、選んでもデッドエンドになるため候補から除外する
    if (generateMinuteOptions(minuteStep, hour, minTime, maxTime).length === 0) {
      continue;
    }

    options.push(createHourOption(hour));
  }

  return options;
};
