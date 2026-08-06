# DatePicker コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
   - [継承プロパティ](#継承プロパティ)
5. [Compound Components](#compound-components)
   - [DatePicker.ErrorMessage](#datepickererrormessage)
6. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [トリガーボタンの状態](#トリガーボタンの状態)
   - [カレンダー内の日付の状態](#カレンダー内の日付の状態)
7. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [サイズ指定](#サイズ指定)
   - [エラー状態](#エラー状態)
   - [無効状態](#無効状態)
   - [日付範囲制限](#日付範囲制限)
   - [タイムゾーン指定](#タイムゾーン指定)
8. [アクセシビリティ](#アクセシビリティ)
   - [キーボードナビゲーション](#キーボードナビゲーション)
9. [技術的な詳細](#技術的な詳細)
   - [実装について](#実装について)
   - [タイムゾーン処理](#タイムゾーン処理)
   - [日付キー形式](#日付キー形式)
10. [注意事項](#注意事項)
11. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
12. [更新履歴](#更新履歴)

---

## 概要

DatePickerコンポーネントは、ユーザーが日付を選択するためのUIコンポーネントである。カレンダーを含むPopoverを表示し、日付の選択・クリア機能を提供する。タイムゾーンを考慮した日付処理をサポートし、日本語ロケールでの表示に対応している。

## インポート

```typescript
import { DatePicker } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';
import { DatePicker } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={(newDate) => setDate(newDate)}
      placeholder="日付を選択"
    />
  );
};
```

## Props

### 必須プロパティ

| プロパティ | 型                              | 説明                                           |
| ---------- | ------------------------------- | ---------------------------------------------- |
| `value`    | `Date \| null`                  | 選択された日付。未選択の場合は`null`           |
| `onChange` | `(value: Date \| null) => void` | 日付が変更されたときに呼び出されるコールバック |

### オプションプロパティ

| プロパティ    | 型                                            | デフォルト値   | 説明                                                                                                                |
| ------------- | --------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------- |
| `size`        | `'small' \| 'medium' \| 'large' \| 'x-large'` | `'medium'`     | トリガーボタンのサイズ。`'x-large'`はカレンダーも拡大される（モバイル向け。利用条件は「サイズバリエーション」参照） |
| `placeholder` | `string`                                      | `'日付を選択'` | 未選択時に表示されるテキスト                                                                                        |
| `isDisabled`  | `boolean`                                     | `false`        | 無効状態かどうか                                                                                                    |
| `isError`     | `boolean`                                     | `false`        | エラー状態かどうか                                                                                                  |
| `minDate`     | `Date`                                        | `undefined`    | 選択可能な最小日付                                                                                                  |
| `maxDate`     | `Date`                                        | `undefined`    | 選択可能な最大日付                                                                                                  |
| `timeZone`    | `'UTC' \| 'Asia/Tokyo'`                       | `'Asia/Tokyo'` | 日付変換に使用するタイムゾーン                                                                                      |
| `children`    | `ReactNode`                                   | `undefined`    | Compound Component（ErrorMessage等）                                                                                |

### 継承プロパティ

`ButtonHTMLAttributes<HTMLButtonElement>` のプロパティが使用可能である（`children`、`className`、`disabled`、`onChange`、`style`、`value` を除く）。

## Compound Components

### DatePicker.ErrorMessage

エラーメッセージを表示するためのサブコンポーネントである。`isError={true}` の場合にのみレンダリングされる。

#### Props

| プロパティ  | 型       | デフォルト値  | 説明                           |
| ----------- | -------- | ------------- | ------------------------------ |
| `aria-live` | `string` | `'assertive'` | スクリーンリーダーへの通知設定 |
| `id`        | `string` | 自動生成      | 要素のID（aria-describedby用） |

その他の `HTMLAttributes<HTMLDivElement>` プロパティが使用可能である（`className` を除く）。

#### 使用例

```typescript
<DatePicker value={date} onChange={setDate} isError>
  <DatePicker.ErrorMessage>日付を選択してください</DatePicker.ErrorMessage>
</DatePicker>
```

## 状態とスタイル

### サイズバリエーション

#### Small

- トリガーボタン: Buttonコンポーネントの`small`サイズ
- アイコン: `small` (16px)
- ErrorMessageタイポグラフィ: `typography-label11regular`

#### Medium（デフォルト）

- トリガーボタン: Buttonコンポーネントの`medium`サイズ
- アイコン: `small` (16px)
- ErrorMessageタイポグラフィ: `typography-label11regular`

#### Large

- トリガーボタン: Buttonコンポーネントの`large`サイズ
- アイコン: `medium` (24px)
- ErrorMessageタイポグラフィ: `typography-label12regular`

#### X-Large

**モバイル向けのサイズ。トリガーボタンだけでなくカレンダーも拡大される**（342×445px）。他の3サイズはカレンダーが共通（224×295px）なのに対し、X-Largeのみカレンダーが専用の寸法になる。

- トリガーボタン: Buttonコンポーネントの`x-large`サイズ
- アイコン: `medium` (24px)
- ErrorMessageタイポグラフィ: `typography-label12regular`
- カレンダー: 下記「カレンダーのスタイル仕様」のX-Large列を参照

> [!IMPORTANT]
> **X-Largeの利用条件**
>
> X-Largeのカレンダーは342×445pxで固定であり、スクロールしない。以下を満たすレイアウトでのみ使用すること。満たせない場合はX-Largeを使わず`large`以下を選ぶ。
>
> - ビューポート幅358px以上（カレンダー342px + 左右マージン8px×2）
> - カレンダー展開時、トリガーの**上または下のいずれか**に453px以上の余白（445px + offset 8px）が確保できること
>
> 条件を満たさない場合、カレンダー下部のフッター（「今日に戻る」「クリア」）が画面外に出て操作できなくなる。ビューポート高660pxでトリガーが画面中央にある場合が典型例。
>
> なお、メディアクエリによる自動的なサイズ切り替えは行わない。利用側が明示的に`size="x-large"`を指定する。

### トリガーボタンの状態

#### 通常状態

- バリアント: `outline`
- 左側にカレンダーアイコン表示

#### エラー状態（isError: true）

- バリアント: `outlineDanger`
- `aria-invalid="true"` が設定される
- ErrorMessageが表示される場合、`aria-describedby` でリンクされる

#### 無効状態（isDisabled: true）

- Buttonコンポーネントの無効スタイルが適用される
- クリックしてもPopoverは開かない

### カレンダー内の日付の状態

#### 通常の日

- ボーダー: 透明
- テキスト色: `text-interactive02`
- ホバー時背景: `bg-hoverUi`
- フォーカス時: `focusVisible.normalImportant`（`outline-2 outline-focus-focus outline-offset-1`）

#### 今日（選択されていない場合）

- ボーダー: `border-selectedUiBorder`
- 背景色: `bg-interactive01`
- テキスト色: `text-textOnColor`

#### 選択された日

- ボーダー: `border-selectedUiBorder`
- 背景色: `bg-uiBackgroundBlue`

#### 範囲外の日（前後月の日付）

- テキスト色: `text-interactive04`
- カーソル: `cursor-default`
- クリック不可

#### minDate/maxDate制限日

- テキスト色: `text-disabled01`
- カーソル: `cursor-not-allowed`
- クリック不可
- 範囲外の日よりも優先される

### カレンダーのスタイル仕様

`small` / `medium` / `large` はカレンダーの寸法が共通で、`x-large`のみ拡大される。

#### カレンダーコンテナ

- 背景: `bg-uiBackground01`
- 角丸: `rounded`
- 影: `shadow-floatingShadow`

#### サイズ別の寸法

| 項目                     | Small / Medium / Large                         | X-Large                                            |
| ------------------------ | ---------------------------------------------- | -------------------------------------------------- |
| カレンダー全体           | 224px × 295px                                  | **342px × 445px**                                  |
| 基本フォント             | `700 12px/1 Arial, 'Noto Sans JP', sans-serif` | **`700 16px/1 Arial, 'Noto Sans JP', sans-serif`** |
| 月ラベルのタイポグラフィ | `typography-label12bold`                       | **`typography-label16bold`**                       |
| 前後月ナビゲーション     | IconButton `small`（24px）                     | **IconButton `large`（40px）**                     |
| 曜日ヘッダー（行の高さ） | 28px × 28px                                    | **48px × 48px**（見た目は40px + 上下4pxの間隔）    |
| 日付セル                 | 30px × 30px                                    | **48px × 48px**                                    |
| 日付ボタン               | 28px × 28px                                    | **40px × 40px**                                    |
| 「今日に戻る」ボタン     | IconButton `medium`（32px）                    | **IconButton `large`（40px）**                     |
| 「クリア」ボタン         | Button `text` `small`                          | **Button `text` `large`**                          |

- 月ヘッダー・曜日ヘッダーのテキスト色: `text-text02`
- 前後月ナビゲーション: IconButtonコンポーネント（`angle-left`/`angle-right`）
- 日付ボタンの形状: `rounded-full`
- フッターの「今日に戻る」ボタン: IconButton（`calendar-today`アイコン、`supportInfo`色）
- フッターの区切り線: `border-uiBorder01`

> react-day-pickerは`<table>`（`border-collapse: collapse`）で描画するためCSSの`gap`が使えない。Figmaの「40pxの行 + 8pxの間隔」は、**間隔を各行の高さに含める**ことで表現している（X-Largeの場合、48pxのセルに40pxのボタンを中央配置して上下左右に4pxずつの余白を作る）。曜日ヘッダーの行も同じ理由で48pxとし、その結果として月ヘッダーの下と月グリッドの下端にはそれぞれ4pxだけが残る。
>
> この構造により、カレンダー上端から各行の中心までの距離は月ヘッダー28px / 曜日80px / 日付行128・176・224・272・320・368pxとなる。
>
> なお、月ヘッダーと曜日行の間隔だけはFigmaの8pxに対して**12px**にしている（デザイン判断による意図的な差異）。この4px分だけカレンダー全体がFigmaより高い。

## 使用例

### 基本的な使用例

```typescript
const [date, setDate] = useState<Date | null>(null);

<DatePicker
  value={date}
  onChange={(newDate) => setDate(newDate)}
  placeholder="日付を選択"
/>
```

### サイズ指定

```typescript
<div className="flex flex-col gap-4">
  <DatePicker value={date} onChange={setDate} size="small" />
  <DatePicker value={date} onChange={setDate} size="medium" />
  <DatePicker value={date} onChange={setDate} size="large" />
  {/* x-large はカレンダーも拡大される（モバイル向け。利用条件は「サイズバリエーション」参照） */}
  <DatePicker value={date} onChange={setDate} size="x-large" />
</div>
```

### エラー状態

```typescript
<DatePicker value={date} onChange={setDate} isError>
  <DatePicker.ErrorMessage>
    日付を選択してください
  </DatePicker.ErrorMessage>
</DatePicker>
```

### 無効状態

```typescript
<DatePicker
  value={date}
  onChange={setDate}
  isDisabled
  placeholder="選択不可"
/>
```

### 日付範囲制限

```typescript
const today = new Date();
const oneMonthLater = new Date(today);
oneMonthLater.setMonth(today.getMonth() + 1);

<DatePicker
  value={date}
  onChange={setDate}
  minDate={today}
  maxDate={oneMonthLater}
/>
```

### タイムゾーン指定

```typescript
// 日本標準時（デフォルト）
<DatePicker
  value={date}
  onChange={setDate}
  timeZone="Asia/Tokyo"
/>

// UTC タイムゾーン
<DatePicker
  value={date}
  onChange={setDate}
  timeZone="UTC"
/>
```

## アクセシビリティ

- トリガーボタンは標準的な`<button>`要素として実装されている
- カレンダーダイアログには`aria-label="日付選択"`が設定されている
- 選択された日付には`aria-selected="true"`が設定される
- 今日の日付には`aria-current="date"`が設定される
- エラー状態では`aria-invalid="true"`が設定される
- ErrorMessageは`aria-describedby`でトリガーボタンとリンクされる
- ErrorMessageには`aria-live="assertive"`がデフォルトで設定される
- カレンダー展開時、選択日または今日の日付に自動フォーカスされる
- `Escape`キーでカレンダーを閉じることができる
- 日付ボタンは`focus-visible`でフォーカスリングが表示される

### キーボードナビゲーション

カレンダー内の日付間を矢印キーで移動できる:

| キー         | 動作                     |
| ------------ | ------------------------ |
| `ArrowLeft`  | 前日に移動               |
| `ArrowRight` | 翌日に移動               |
| `ArrowUp`    | 1週間前に移動            |
| `ArrowDown`  | 1週間後に移動            |
| `Enter`      | フォーカス中の日付を選択 |
| `Escape`     | カレンダーを閉じる       |

## 技術的な詳細

### 実装について

- `react-day-picker`ライブラリを使用したカレンダー実装
- `Popover`コンポーネントでカレンダーを表示
- Compound Componentパターンで`ErrorMessage`を提供
- `useMemo`/`useCallback`による最適化
- カスタムコンポーネント（`MonthCaption`、`DayButton`、`Weekday`）でスタイルを上書き
- `DayButton`は`react-day-picker`の`DayButton`コンポーネントを継承し、キーボードナビゲーション機能を維持
- フォーカスリングは`@zenkigen-inc/component-theme`の`focusVisible.normalImportant`を使用（react-day-pickerの`outline: none`を上書き）

### タイムゾーン処理

DatePickerは`timeZone`プロパティに基づいて日付を変換する。

#### 変換フロー

1. **表示時**: `value`（Date）→ `formatDateKey`（タイムゾーン考慮）→ 日付キー（"YYYY-MM-DD"）→ `createLocalDateFromKey` → ローカル日付（カレンダー表示用）
2. **選択時**: ローカル日付 → `formatLocalDateKey` → 日付キー（"YYYY-MM-DD"）→ `createDateFromKey`（タイムゾーン考慮）→ `onChange`に渡すDate

#### サポートするタイムゾーン

| タイムゾーン | ISO 8601 オフセット |
| ------------ | ------------------- |
| `UTC`        | `Z`                 |
| `Asia/Tokyo` | `+09:00`            |

### 日付キー形式

内部的に日付キー（"YYYY-MM-DD"形式の文字列）を中間表現として使用する。これにより、タイムゾーンを跨いだ日付の比較や変換が一貫して行える。

```typescript
// 例: UTC 2026-01-15 00:00:00 → 日付キー '2026-01-15'
formatDateKey(new Date('2026-01-15T00:00:00Z'), 'UTC'); // → '2026-01-15'

// 例: Asia/Tokyo 2026-01-15 09:00:00 JST → 日付キー '2026-01-15'
formatDateKey(new Date('2026-01-15T00:00:00Z'), 'Asia/Tokyo'); // → '2026-01-15'
```

## 注意事項

1. **タイムゾーンの一貫性**: `value`、`minDate`、`maxDate`、`onChange`で返されるDateは、すべて同じ`timeZone`設定で解釈される
2. **日付の時刻部分**: 選択された日付は、指定タイムゾーンの00:00:00として返される
3. **minDate/maxDateの境界**: `minDate`と`maxDate`は、それぞれの日付を含む（inclusive）
4. **カレンダーの週開始日**: 日曜日始まり（`weekStartsOn={0}`）
5. **固定週表示**: カレンダーは常に6週分を表示する（`fixedWeeks`）
6. **前後月の日付表示**: 前後月の日付も表示されるが、クリック不可（`showOutsideDays`）
7. **ErrorMessageの条件付きレンダリング**: `isError={true}`の場合にのみErrorMessageが表示される
8. **Popoverの配置**: カレンダーはトリガーボタンの下（`bottom-start`）に表示される

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config`で定義されたデザイントークンに依存している。カスタマイズする場合は、これらの設定を参照すること。

size別の見た目の値は`date-picker-styles.ts`の`DATE_PICKER_SIZE_TOKENS`に集約されている。`Record<DatePickerSize, DatePickerSizeTokens>`として定義しているため、sizeを追加した際に未記入のキーがコンパイルエラーになる。

react-day-pickerのスタイルはCSS変数とフォント指定で上書きしている（以下は`medium`の値。`x-large`の値は「カレンダーのスタイル仕様」を参照）：

```typescript
const dayPickerStyle = {
  '--rdp-nav-height': '30px',
  '--rdp-day-width': '30px',
  '--rdp-day-height': '30px',
  '--rdp-day_button-width': '28px',
  '--rdp-day_button-height': '28px',
  '--rdp-day_button-border': '1px solid transparent',
  '--rdp-weekday-padding': '0px',
  fontFamily: "Arial, 'Noto Sans JP', sans-serif",
  fontSize: '12px',
  fontWeight: 700,
};
```

日付ボタンには上記に加えてinlineで`fontSize`を指定している。react-day-pickerの`.rdp-selected { font-size: large }`が日付セルの`<td>`に適用され、`.rdp-day_button`が`font: inherit`であるため、指定しないと選択日だけ文字が拡大されてしまう。**この指定は打ち消しのために必須であり、削除してはいけない。**

## 更新履歴

| 日付                 | 内容                                                                                       | 担当者 |
| -------------------- | ------------------------------------------------------------------------------------------ | ------ |
| 2026-08-06 15:09 JST | size に `x-large` を追加（カレンダーも拡大）。スタイルのカスタマイズ節を実装に合わせて修正 | -      |
| 2026-01-16 11:09 JST | 新規作成                                                                                   | -      |
