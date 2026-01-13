# コンポーネント設計書：DatePicker

## 目次

- [0. メタ情報](#0-メタ情報)
- [1. 概要](#1-概要)
- [2. 設計方針](#2-設計方針)
- [3. UI仕様](#3-ui仕様)
- [4. Props仕様](#4-props仕様)
- [5. State設計](#5-state設計)
- [6. イベント仕様](#6-イベント仕様)
- [7. アクセシビリティ（a11y）](#7-アクセシビリティa11y)
- [8. バリデーション・エラー](#8-バリデーションエラー)
- [9. カスタマイズ・拡張](#9-カスタマイズ拡張)
- [10. 制約・注意点](#10-制約注意点)
- [11. 実装指針](#11-実装指針)
- [12. テスト方針](#12-テスト方針)
- [13. 使用例](#13-使用例)
- [14. Storybook](#14-storybook)
- [15. 参考資料](#15-参考資料)

## 0. メタ情報

- コンポーネント名：`DatePicker`
- ファイル名：`date-picker.tsx`
- 作成日：2026-01-13 13:52 JST
- 更新日：2026-01-13 13:52 JST
- 作成者：-
- ステータス：Draft

---

## 1. 概要

### 1.1 目的

このコンポーネントは、日付入力をボタンとカレンダーで統一し、手入力ミスを減らすためのUIコンポーネントである。

### 1.2 利用シーン

- 予約・面談日程の選択
- 締切日/期限の指定
- 過去日の選択制限が必要な入力

### 1.3 非対象

- 時刻選択
- モバイル固有の表示方針

---

## 2. 設計方針

- Atomic Design上の分類：Molecule
- 単一責務：単一日付の選択と表示
- Controlled / Uncontrolled：Controlled（`value` と `onChange` を必須）
- 再利用方針：汎用

---

## 3. UI仕様

UIの詳細仕様は [UI仕様](./date-picker-ui-spec.md) を参照する。

### 3.1 構造

```
<DatePicker>
  ├─ TriggerButton（Button + Calendar Icon）
  ├─ Popover
  │   └─ Calendar（react-day-picker）
  │       ├─ Header（年月 + 前後移動）
  │       ├─ Grid（日付セル）
  │       └─ Footer（今日/クリア）
  └─ ErrorMessage（任意）
</DatePicker>
```

### 3.2 表示状態

- default
- hover
- focus
- disabled
- error
- timeZoneによる表示の出し分けは行わない

### 3.3 レスポンシブ

- 対応有無：なし（モバイル固有の方針は設けない）
- ブレークポイント：なし

---

## 4. Props仕様

| 名前        | 型                             | 必須 | 初期値     | 説明                        |
| ----------- | ------------------------------ | ---- | ---------- | --------------------------- |
| value       | Date \| null                   | ◯    | –          | 選択中の値                  |
| onChange    | (value: Date \| null) => void  | ◯    | –          | 値変更時                    |
| isDisabled  | boolean                        | –    | false      | 無効化                      |
| isError     | boolean                        | –    | false      | エラー状態                  |
| min         | Date                           | –    | undefined  | 最小日付                    |
| max         | Date                           | –    | undefined  | 最大日付                    |
| placeholder | string                         | –    | 日付を選択 | 未選択時の表示              |
| size        | 'small' \| 'medium' \| 'large' | –    | 'medium'   | トリガーボタンのサイズ      |
| timeZone    | 'UTC' \| 'Asia/Tokyo'          | –    | UTC        | 表示/選択の基準タイムゾーン |

> `input[type="date"]` と同様のプロパティ・挙動をできるだけ踏襲する。
> `value` / `min` / `max` / `isDisabled` などは同じ意味で扱う。
> `value` は `Date` 型で扱い、送信/保存時のフォーマットは利用者側で決める。

### 4.1 非推奨Props

- なし

### 4.2 コンポジション（子コンポーネント）

DatePicker.ErrorMessage を子要素として受け取り、`aria-describedby` を自動で組み立てる。共通コンポーネントは使用しない。

| コンポーネント            | 説明                                                              |
| ------------------------- | ----------------------------------------------------------------- |
| `DatePicker.ErrorMessage` | `isError === true` のときのみ表示するエラーメッセージ。独自実装。 |

---

## 5. State設計

### 5.1 内部State

| State名      | 型      | 説明                   |
| ------------ | ------- | ---------------------- |
| isOpen       | boolean | Popoverの開閉状態      |
| displayMonth | Date    | カレンダーで表示中の月 |

### 5.2 State管理方針

- 親から制御可能か：`value` のみ親制御
- 初期化タイミング：`value` がある場合はその月、ない場合は当月

---

## 6. イベント仕様

| イベント | 発火条件          | 引数  | 備考                  |
| -------- | ----------------- | ----- | --------------------- |
| onChange | 日付選択/クリア時 | value | `Date \| null` を返す |

---

## 7. アクセシビリティ（a11y）

- role：カレンダーのroleは `react-day-picker` 準拠
- aria-\* 属性：`aria-describedby`、`aria-invalid` を付与
- キーボード操作：
  - Tab：トリガーボタンとポップオーバーに移動
  - Enter / Space：日付選択
- Popover：Escape もしくは領域外クリックで閉じる
- フォーカス管理：Popover開時は選択日（未選択なら今日）にフォーカスし、閉じたらトリガーボタンに戻す
- トリガーボタン：`aria-describedby` は `ErrorMessage` と連携し、`isError` 時に `aria-invalid` を付与する

---

## 8. バリデーション・エラー

### 8.1 エラー条件

- `isError === true` の場合

### 8.2 表示方法

- エラーメッセージ表示
- ボタンの `variant="outlineDanger"` に切替

### 8.3 親への通知

- なし

---

## 9. カスタマイズ・拡張

- className：不可
- style：不可
- children：可（`DatePicker.ErrorMessage` のみ）
- slots / render props：なし

---

## 10. 制約・注意点

- SSR対応：他コンポーネント同様の方針を踏襲する
- パフォーマンス注意点：Popover内のみカレンダーを描画する
- 同時使用制限：なし

### 10.1 日付制約

- 祝日/休日表示は不要
- 制約により選択不可な日付は無効スタイルで表示する
- `min` / `max` は日付単位で比較し、inclusive（`min <= value <= max`）で判定する

### 10.2 日付の扱い・タイムゾーン

- 表示/選択は `timeZone` の指定に従う（デフォルト: `UTC`）
- `timeZone` は `UTC` / `Asia/Tokyo` のみをサポートする

### 10.3 フォーム連携 / データの扱い

- `input[type="date"]` 要素ではないため、`<form>` の入力としては扱えない
- 本コンポーネントは日付選択の `Date` を返すのみで、フォーム送信は行わない
- 送信/保存形式（例: `YYYY-MM-DDTHH:mm:ssZ`）への変換は利用者側で行う
- 開始日は `00:00:00`、終了日は `23:59:59`（JST基準）を付与する運用を想定する
- 再表示時は保存値を `Date` に戻し、`value` に渡して復元する

---

## 11. 実装指針

- 使用ライブラリ：
  - React
  - react-day-picker
  - Popover
- CSS戦略：Tailwindクラス + デザイントークン
- フォルダ構成：

```
components/
 └─ date-picker/
    ├─ date-picker.tsx
    ├─ date-picker-error-message.tsx
    ├─ date-picker.test.tsx
    └─ index.ts
```

---

## 12. テスト方針

### 12.1 単体テスト

- 対象：選択/クリア、`min`/`max`、`isError`、`isDisabled`
- 使用ツール：Vitest + @testing-library/react

### 12.2 Visual Regression Test

- 対象状態：default / error / disabled
- 使用ツール：Storybook

---

## 13. 使用例

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

---

## 14. Storybook

- stories ファイル：date-picker.stories.tsx
- 表示パターン：
  - default
  - open（Popover開）
  - selected
  - disabled
  - error
  - timeZone=Asia/Tokyo
  - min/max
  - sizeVariants

---

## 15. 参考資料

- 参考実装：react-day-picker（https://daypicker.dev/）
