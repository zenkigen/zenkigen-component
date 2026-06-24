# RadioCard コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [構成（Compound Component）](#構成compound-component)
5. [Props](#props)
   - [RadioCard（フィールド）](#radiocardフィールド)
   - [RadioCard.Group](#radiocardgroup)
   - [RadioCard.Item](#radiocarditem)
   - [RadioCard.ErrorMessage](#radiocarderrormessage)
6. [状態とスタイル](#状態とスタイル)
7. [使用例](#使用例)
8. [アクセシビリティ](#アクセシビリティ)
9. [技術的な詳細](#技術的な詳細)
10. [注意事項](#注意事項)
11. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
12. [更新履歴](#更新履歴)

---

## 概要

RadioCard は、複数の選択肢から1つだけをカード型で選択するためのフォーム UI を提供する。各カードに補足説明（`description`）を添えられ、`Radio` よりも情報量の多い選択肢を提示する場面に適する。ネイティブ `<input type="radio">` を共通 `name` で束ねており、単一選択・矢印キー操作はブラウザのネイティブ挙動に従う。

## インポート

```typescript
import { RadioCard } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';
import { RadioCard } from '@zenkigen-inc/component-ui';

const Example = () => {
  const [value, setValue] = useState('basic');

  return (
    <RadioCard value={value} onChange={setValue} aria-label="プラン選択">
      <RadioCard.Group>
        <RadioCard.Item value="basic" label="ベーシック" description="個人向けのプランです" />
        <RadioCard.Item value="pro" label="プロ" description="チーム向けのプランです" />
      </RadioCard.Group>
      <RadioCard.ErrorMessage>いずれかのプランを選択してください</RadioCard.ErrorMessage>
    </RadioCard>
  );
};
```

## 構成（Compound Component）

フォーム系ライブラリの主流である「Field + Group 分離」に倣い、`RadioCard`（フィールド）を親に、以下のサブコンポーネントを組み合わせる。

| コンポーネント           | 役割                                                                              |
| ------------------------ | --------------------------------------------------------------------------------- |
| `RadioCard`              | フィールド。`value` / `onChange` / `isError` を持つ controlled な状態管理を担う。 |
| `RadioCard.Group`        | `role="radiogroup"`。カードのまとまりと並びレイアウトを担う。                     |
| `RadioCard.Item`         | 個々のカード。`value` / `label` は必須、`description` は任意。                    |
| `RadioCard.ErrorMessage` | グループ全体に対するエラーメッセージ。`isError` のときに表示される。              |

エラーは個々のカードではなく**グループ全体に帰属**する（ラジオの選択は「1つを選ぶ」1操作であるため）。これは react-spectrum / MUI / Chakra / ant-design / Base UI などの主要ライブラリと一致する設計である。

## Props

### RadioCard（フィールド）

| プロパティ        | 型                        | デフォルト値 | 必須 | 説明                                                     |
| ----------------- | ------------------------- | ------------ | ---- | -------------------------------------------------------- |
| `value`           | `string`                  | -            | ✓    | 選択されている値（controlled）。                         |
| `onChange`        | `(value: string) => void` | -            | ✓    | 選択変更時のハンドラー。選択された値を引数に受け取る。   |
| `children`        | `ReactNode`               | -            | ✓    | `RadioCard.Group` と任意で `RadioCard.ErrorMessage`。    |
| `name`            | `string`                  | 自動生成     |      | input をグループ化する name。未指定なら `useId` で生成。 |
| `isDisabled`      | `boolean`                 | `false`      |      | グループ全体を無効化する。                               |
| `isError`         | `boolean`                 | `false`      |      | グループ全体をエラー状態にする（全カードをエラー枠化）。 |
| `aria-label`      | `string`                  | `undefined`  |      | radiogroup の aria-label（推奨）。                       |
| `aria-labelledby` | `string`                  | `undefined`  |      | radiogroup の aria-labelledby。                          |

### RadioCard.Group

並び方向は `orientation` で指定する。prop 名と `'horizontal'` / `'vertical'` の2値は `Steps` の `orientation` と共有する。

| プロパティ    | 型                                       | デフォルト値 | 説明                                                                                 |
| ------------- | ---------------------------------------- | ------------ | ------------------------------------------------------------------------------------ |
| `children`    | `ReactNode`                              | -            | `RadioCard.Item` 群。                                                                |
| `orientation` | `'vertical' \| 'horizontal' \| 'custom'` | `'vertical'` | 並び方向。`'custom'` のときのみ `className` を受け取り、そのまま適用する。           |
| `className`   | `string`                                 | -            | `orientation='custom'` のときのみ**必須**。grid 折り返しや等幅などを自由に指定する。 |

`orientation` と `className` は判別可能ユニオンで型付けされており、`orientation='custom'` 以外で `className` を渡す、または `'custom'` で `className` を省略すると型エラーになる。

### RadioCard.Item

| プロパティ    | 型        | デフォルト値 | 必須 | 説明                                                      |
| ------------- | --------- | ------------ | ---- | --------------------------------------------------------- |
| `value`       | `string`  | -            | ✓    | このカードの値。`RadioCard` の `value` と一致で選択状態。 |
| `label`       | `string`  | -            | ✓    | 主ラベル。                                                |
| `description` | `string`  | `undefined`  |      | 補足説明（ラベルの下に表示）。                            |
| `isDisabled`  | `boolean` | `false`      |      | このカード個別の無効化（グループの `isDisabled` と OR）。 |
| `id`          | `string`  | 自動生成     |      | input の id。未指定なら `useId` で生成。                  |

### RadioCard.ErrorMessage

| プロパティ | 型          | 必須 | 説明                     |
| ---------- | ----------- | ---- | ------------------------ |
| `children` | `ReactNode` | ✓    | エラーメッセージの内容。 |

`RadioCard` の `isError` が `true` のときのみ表示される。配置はグループ末尾（`RadioCard.Group` の外、`RadioCard` 直下）。

## 状態とスタイル

各カードの状態は Figma の状態マトリクスに対応する。`hover` は CSS の `hover:` で表現する。

| 状態               | スタイル                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| 通常（未選択）     | `bg-uiBackground01` / `border-uiBorder02`                                                              |
| 選択済み           | `bg-selectedUi` / `border-selectedUiBorder`                                                            |
| ホバー             | `hover:bg-hoverUi02`                                                                                   |
| 無効               | `bg-uiBackground01` / `border-uiBorder02`、テキスト・丸は `disabled01` で淡色化、`pointer-events` 無効 |
| エラー（グループ） | 全カードが `border-supportError`、各 input に `aria-invalid="true"`                                    |

- カード形状は角丸（`rounded`）、パディングは `px-4 py-3`。
- 丸（ラジオ表示）は `Radio` の描画を踏襲し、選択時は `bg-activeSelectedUi` のドットを表示する。
- 間隔は Item 間・グループとエラー間ともに `gap-2`（8px）。

## 使用例

### 横並び

```typescript
<RadioCard value={value} onChange={setValue} aria-label="配送方法">
  <RadioCard.Group orientation="horizontal">
    <RadioCard.Item value="normal" label="通常配送" description="3〜5日でお届け" />
    <RadioCard.Item value="express" label="速達配送" description="翌日お届け" />
  </RadioCard.Group>
</RadioCard>
```

### grid（折り返し・等幅）

```typescript
<RadioCard value={value} onChange={setValue} aria-label="数量選択">
  <RadioCard.Group orientation="custom" className="grid grid-cols-2 gap-2">
    <RadioCard.Item value="1" label="1個" />
    <RadioCard.Item value="2" label="2個" />
    <RadioCard.Item value="3" label="3個" />
    <RadioCard.Item value="4" label="4個" />
  </RadioCard.Group>
</RadioCard>
```

### エラー表示

```typescript
<RadioCard value={value} onChange={setValue} aria-label="プラン選択" isError>
  <RadioCard.Group>
    <RadioCard.Item value="basic" label="ベーシック" />
    <RadioCard.Item value="pro" label="プロ" />
  </RadioCard.Group>
  <RadioCard.ErrorMessage>いずれかのプランを選択してください</RadioCard.ErrorMessage>
</RadioCard>
```

## アクセシビリティ

- `RadioCard.Group` に `role="radiogroup"` と `aria-label` / `aria-labelledby` を付与する。
- 各カードはネイティブ `<input type="radio">` を共通 `name` で束ねる。これにより単一選択・矢印キー移動・Space 選択がブラウザネイティブに成立する。
- カード全面に透明な input をオーバーレイし、カードのどこをクリック/フォーカスしてもラジオが操作される。`<label>` でカード全体をラップしないことで、主ラベルのみを accessible name とし、`description` は `aria-describedby` として分離する（二重読みを防ぐ）。
- フォーカスリングは、オーバーレイ input の直後の兄弟である「カード見た目」要素に `focusVisible.normalPeer` を当てて表示する。
- エラー時は各 input に `aria-invalid` を付与し、`RadioCard.ErrorMessage` が実在するときのみ radiogroup の `aria-describedby` でその id を参照する（宙吊り参照を防ぐ）。

## 技術的な詳細

- 状態は controlled のみ（`value` / `onChange` 必須）。uncontrolled（`defaultValue`）は持たない。
- 親 `RadioCard` が Context で `value` / `onChange` / `name` / `isDisabled` / `isError` / `errorId` / aria 情報を配布する。`RadioCard.Group` / `RadioCard.Item` / `RadioCard.ErrorMessage` はこれを読む。
- `RadioCard.ErrorMessage` は `useEffect` で自身の存在を Context に登録し、`RadioCard.Group` はそれが存在するときだけ `aria-describedby` を張る。
- 明示的な `RadioCard.Group` を境界に持つことで、子要素の型走査を行わない。`options.map(...)` で `RadioCard.Item` を生成しても壊れない。
- `description` は prop として受け取り、説明文を直接描画する（サブコンポーネント化しない）。

## 注意事項

1. `RadioCard.Group` / `RadioCard.Item` / `RadioCard.ErrorMessage` は `RadioCard` の内部でのみ使用できる（外部で使うと例外を投げる）。単一の選択肢を扱う場合は `Radio` を使用する。
2. エラーは個々のカードではなくグループ全体に帰属する。カードごとに異なるエラーを出す設計は採用していない。
3. `orientation='custom'` で `className` を渡す場合、デフォルトの `flex flex-col gap-2` は適用されず、渡した `className` がそのまま適用される（`display` / `gap` を含めて指定する）。
4. カード内にリンクやボタンなどの操作可能な要素を配置しない（カード全面がクリック領域のため）。

## スタイルのカスタマイズ

Tailwind ユーティリティと `@zenkigen-inc/component-config` のデザイントークン（例: `selectedUi`、`selectedUiBorder`、`supportError`、`uiBorder02`、`disabled01`）に依存する。並びレイアウトは `RadioCard.Group` の `orientation='custom'` + `className` で調整する。配色やフォーカスリングを変更する場合はテーマ設定（`@zenkigen-inc/component-theme`）を調整する。

## 更新履歴

| 日付           | 内容     | 担当者 |
| -------------- | -------- | ------ |
| 2026-06-24 JST | 新規作成 | -      |
