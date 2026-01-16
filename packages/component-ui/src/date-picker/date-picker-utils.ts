/**
 * DatePicker のユーティリティ関数
 *
 * 日付の変換・フォーマットを行う。
 * タイムゾーンを考慮した日付文字列（"YYYY-MM-DD" 形式）を中間表現として使用し、
 * Date オブジェクトとの相互変換を行う。
 */

/**
 * DatePicker でサポートするタイムゾーン
 */
export type DatePickerTimeZone = 'UTC' | 'Asia/Tokyo';

// ============================================================================
// フォーマッター
// ============================================================================

/** ローカルタイムゾーンでの日付フォーマッター（"YYYY-MM-DD" 形式） */
const localDateFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** タイムゾーン別の日付フォーマッター */
const timeZoneFormatters: Record<DatePickerTimeZone, Intl.DateTimeFormat> = {
  UTC: new Intl.DateTimeFormat('en-CA', {
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }),
  'Asia/Tokyo': new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }),
};

/** タイムゾーンから ISO 8601 オフセット文字列を取得 */
const toIsoOffset = (timeZone: DatePickerTimeZone) => (timeZone === 'UTC' ? 'Z' : '+09:00');

// ============================================================================
// 変換関数
// ============================================================================

/**
 * Date → 日付キー（タイムゾーン考慮）
 * @example formatDateKey(new Date('2026-01-15T00:00:00Z'), 'UTC') → '2026-01-15'
 */
export const formatDateKey = (date: Date, timeZone: DatePickerTimeZone): string => {
  return timeZoneFormatters[timeZone].format(date);
};

/**
 * Date → 日付キー（ローカルタイムゾーン）
 * @example formatLocalDateKey(new Date()) → '2026-01-15'
 */
export const formatLocalDateKey = (date: Date = new Date()): string => {
  return localDateFormatter.format(date);
};

/**
 * 日付キー → Date（タイムゾーン考慮）
 * @example createDateFromKey('2026-01-15', 'UTC') → Date('2026-01-15T00:00:00Z')
 */
export const createDateFromKey = (dateKey: string, timeZone: DatePickerTimeZone): Date => {
  return new Date(`${dateKey}T00:00:00${toIsoOffset(timeZone)}`);
};

/**
 * 日付キー → Date（ローカルタイムゾーン、カレンダー表示用）
 * react-day-picker はローカル日付として扱うため、この関数で変換する
 */
export const createLocalDateFromKey = (dateKey: string): Date => {
  const [year = '0', month = '1', day = '1'] = dateKey.split('-');

  return new Date(Number(year), Number(month) - 1, Number(day));
};

/**
 * Date から月初日を取得（カレンダーの表示月計算用）
 */
export const getMonthStartDate = (date: Date, timeZone: DatePickerTimeZone): Date => {
  const [year = '0', month = '1'] = formatDateKey(date, timeZone).split('-');

  return new Date(Number(year), Number(month) - 1, 1);
};

// ============================================================================
// 表示用フォーマット
// ============================================================================

/**
 * Date → 表示用日付文字列（"YYYY年MM月DD日" 形式）
 */
export const formatDisplayDate = (date: Date, timeZone: DatePickerTimeZone): string => {
  const [year, month, day] = formatDateKey(date, timeZone).split('-');

  return `${year}年${month}月${day}日`;
};

/**
 * Date → 月ラベル（"YYYY年MM月" 形式、カレンダーヘッダー用）
 */
export const formatMonthLabel = (date: Date): string => {
  const [year, month] = formatLocalDateKey(date).split('-');

  return `${year}年${month}月`;
};
