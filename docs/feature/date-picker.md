# DatePicker コンポーネント 仕様メモ

## 目次

- [概要](#概要)
- [位置づけ](#位置づけ)
- [想定ユースケース](#想定ユースケース)
- [仕様](#仕様)
  - [UI 構成](#ui-構成)
  - [トリガーボタン](#トリガーボタン)
  - [カレンダーUI](#カレンダーui)
  - [日付制約](#日付制約)
  - [日付の扱い・タイムゾーン](#日付の扱いタイムゾーン)
  - [フォーム連携 / データの扱い](#フォーム連携--データの扱い)
- [Props](#props)
- [アクセシビリティ](#アクセシビリティ)
- [使用例](#使用例)
- [カレンダー装飾仕様（Figma準拠）](#カレンダー装飾仕様figma準拠)

## 概要

DatePicker は単一日付をボタン + カレンダーで選択するUIであり、表示/選択は `timeZone` に従い、値は `Date` を返す（送信形式は利用者側で変換する）。

## 位置づけ

- 目的:
  - 日付入力の標準UIを提供し、手入力ミスを減らす
- 非ゴール:
  - 時刻選択は対象外
  - モバイル固有の表示方針は対象外

## 想定ユースケース

- 予約・面談日程の選択
- 締切日/期限の指定
- 過去日の選択制限が必要な入力

## 仕様

### UI 構成

- 選択開始のトリガーボタンUI + カレンダー式の日付選択UI
- カレンダーUIは外部ライブラリを使用（shadcn と同様の方針）
  - [`react-day-picker`](https://daypicker.dev/) を採用
- カレンダーの開閉は `Popover` コンポーネントを使用

### トリガーボタン

- Button コンポーネントを使用する
- `variant="outline"` を標準とする
- `isError === true` の場合は `variant="outlineDanger"` を使用する
- `size` は Button と同じ `small` / `medium` / `large` をサポートする
- `before` props で `calendar` アイコンを表示する
- 手入力は不可（ボタンによる選択のみ）
- プレースホルダー既定文言は「日付を選択」
- 日が選択された場合は `yyyy年MM月dd日` フォーマットで表示する
- この表示フォーマットは利用者側で変更できない
- エラー状態の表示をサポート（TextInput と同様）
- エラートークンは TextInput と同一
- メッセージの配置はトリガーボタンの下で固定（TextInput と同様）

### カレンダーUI

- ポップオーバー表示（クリックで開閉）
- 外側クリック/Escape で閉じる
- クリアボタン/今日ボタンは常に表示（切り替え不可）
- 月移動のUIは前/次ボタンのみ
- `react-day-picker` の `timeZone` を利用し、表示/選択の基準を指定する
- 初回表示は今月、再度開いた場合は前回選択した月を表示する
- 前月/次月の移動をサポートする
- 当月から移動している場合は「今日に戻る」で今月へ戻す
- 「クリア」で日付選択状態を解除する

### 日付制約

- 祝日/休日表示は不要
- 制約により選択不可な日付は無効スタイルで表示する

### 日付の扱い・タイムゾーン

- 表示/選択は `timeZone` の指定に従う（デフォルト: `UTC`）
- JSTで表示したい場合は `timeZone="Asia/Tokyo"` を指定する

### フォーム連携 / データの扱い

- `input[type="date"]` 要素ではないため、`<form>` の入力としては扱えない
- 本コンポーネントは日付選択の `Date` を返すのみで、フォーム送信は行わない
- 送信/保存形式（例: `YYYY-MM-DDTHH:mm:ssZ`）への変換は利用者側で行う
- 開始日は `00:00:00`、終了日は `23:59:59`（JST基準）を付与する運用を想定する
- 再表示時は保存値を `Date` に戻し、`value` に渡して復元する

## Props

> `input[type="date"]` と同様のプロパティ・挙動をできるだけ踏襲する。
> `value` / `min` / `max` / `isDisabled` などは同じ意味で扱う。
> `value` は `Date` 型で扱い、送信/保存時のフォーマットは利用者側で決める。

### 必須

| prop       | 型                              | 説明                   |
| ---------- | ------------------------------- | ---------------------- |
| `value`    | `Date \| null`                  | 選択中の値             |
| `onChange` | `(value: Date \| null) => void` | 値変更時のコールバック |

### 任意

| prop          | 型                               | デフォルト   | 説明                                                     |
| ------------- | -------------------------------- | ------------ | -------------------------------------------------------- |
| `isDisabled`  | `boolean`                        | `false`      | 無効化                                                   |
| `isError`     | `boolean`                        | `false`      | エラー状態かどうか                                       |
| `min`         | `Date`                           | `undefined`  | 最小日付                                                 |
| `max`         | `Date`                           | `undefined`  | 最大日付                                                 |
| `placeholder` | `string`                         | `日付を選択` | 未選択時の表示                                           |
| `size`        | `'small' \| 'medium' \| 'large'` | `'medium'`   | トリガーボタンのサイズ（Button と同じ）                  |
| `timeZone`    | `string`                         | `UTC`        | 表示/選択の基準タイムゾーン（`react-day-picker` に渡す） |

### コンポジション（子コンポーネント）

TextInput と同様にエラーメッセージコンポーネントを子要素として受け取り、`aria-describedby` を自動で組み立てる。

| コンポーネント            | 説明                                                    |
| ------------------------- | ------------------------------------------------------- |
| `DatePicker.ErrorMessage` | `isError === true` のときのみ表示するエラーメッセージ。 |

## アクセシビリティ

### トリガーボタン

- `aria-describedby` は `ErrorMessage` と連携
- `isError` 時に `aria-invalid` を付与する

### カレンダーUI

- キーボード操作（矢印移動、Enter/Space 選択）
- `aria` 属性（role, label, live region など）
- フォーカストラップの要否
- 実装の詳細は `react-day-picker` の挙動に準拠

## 使用例

### 単一日付を保存する最小例

- サーバーには `YYYY-MM-DD` 形式（例: `2026-01-01`）で保存し、更新時も同形式で送信する例。

```tsx
import { useState } from 'react';
import { DatePicker } from '@zenkigen-inc/component-ui';

const toDateString = (value: Date | null, timeZone = 'UTC') => {
  if (!value) return '';
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(value);
};

const MyForm = () => {
  // DBにはUTCの日付文字列（YYYY-MM-DD）で保存されている想定
  const savedDateString = '2026-01-01';
  const [value, setValue] = useState<Date | null>(new Date(savedDateString));
  // 送信用に日付文字列へ変換する（例: "2026-01-01"）
  const submitValue = toDateString(value);

  return (
    <form>
      <DatePicker value={value} onChange={setValue} />
      {/* DatePicker はフォーム要素ではないため hidden で送信する */}
      <input type="hidden" name="date" value={submitValue} />
    </form>
  );
};
```

### 期間選択例（JSTで表示し、UTCのISO文字列で送信）

- サーバーには UTC の ISO 文字列で保存し、更新時も同形式で送信する例。
- 表示は JST に統一する。

```tsx
import { useState } from 'react';
import { DatePicker } from '@zenkigen-inc/component-ui';

const formatDateKey = (value: Date | null, timeZone = 'UTC') => {
  if (!value) return '';
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(value);
};

const toUtcIso = (value: Date | null, time: '00:00:00' | '23:59:59', timeZone = 'UTC') => {
  const dateKey = formatDateKey(value, timeZone);
  if (!dateKey) return '';
  // 例: "2025-12-31T15:00:00.000Z"
  return new Date(`${dateKey}T${time}+09:00`).toISOString();
};

const MyForm = () => {
  const timeZone = 'Asia/Tokyo';
  const saved = {
    startUtc: '2025-12-31T15:00:00.000Z', // JST: 2026-01-01 00:00:00
    endUtc: '2026-01-07T14:59:59.000Z', // JST: 2026-01-07 23:59:59
  };

  const [startDate, setStartDate] = useState<Date | null>(saved.startUtc ? new Date(saved.startUtc) : null);
  const [endDate, setEndDate] = useState<Date | null>(saved.endUtc ? new Date(saved.endUtc) : null);

  const submitStart = toUtcIso(startDate, '00:00:00', timeZone);
  const submitEnd = toUtcIso(endDate, '23:59:59', timeZone);

  return (
    <form>
      <DatePicker value={startDate} onChange={setStartDate} timeZone={timeZone} />
      <DatePicker value={endDate} onChange={setEndDate} timeZone={timeZone} />

      {/* 送信は利用者側でUTC形式に変換した値を使う */}
      <input type="hidden" name="date_start" value={submitStart} />
      <input type="hidden" name="date_end" value={submitEnd} />
    </form>
  );
};
```

## カレンダー装飾仕様（Figma準拠）

### コンテナ

- 背景: `background/uibackground01`
- 角丸: `radius=4px`
- シャドウ: `Shadow/FloatingShadow`（0 4 20 rgba(0,0,0,0.08)）
- 幅: 224px
- 余白: 上 8px

### ヘッダー（年月+移動）

- 高さ: 28px
- 年月テキスト: `Label12_Bold`、`text/text02`
- 前月/次月ボタン: `IconButton`（16px）、左右アイコン

### 曜日行

- 高さ: 28px
- 曜日テキスト: `Label12_Bold`、`text/text02`

### 日付グリッド

- セルサイズ: 28x28
- セル間隔: 2px
- 角丸: 14px（円形）
- 通常日付: `Label12_Bold`、`interactive/interactive02`
- 前月/翌月など無効日付: `interactive/interactive04`
- 選択日: 背景 `background/uibackgroundblue`、枠線 `selected/selecteduiborder`、文字 `text/text02`
- ホバー: 選択日と同じ表現
- 本日: 背景 `interactive/interactive01`、枠線 `selected/selecteduiborder`、文字 `text/textoncolor`

### フッター

- 高さ: 40px、上 border 1px `border/uiborder01`
- 背景: `background/uibackground01`
- 左: 「今日に戻る」アイコンボタン（`calendar-today`、24px）
- 右: テキストボタン「クリア」（`Label14_Regular`、`interactive/interactive02`）
