# Select Sort コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
   - [特殊機能の詳細](#特殊機能の詳細)
   - [継承プロパティ](#継承プロパティ)
5. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [状態に応じたスタイル](#状態に応じたスタイル)
   - [その他のスタイル仕様](#その他のスタイル仕様)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [複数列を管理する例](#複数列を管理する例)
   - [テキストバリアントの例](#テキストバリアントの例)
   - [幅と選択解除を制御する例](#幅と選択解除を制御する例)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
   - [実装について](#実装について)
   - [型安全性](#型安全性)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

Select Sort コンポーネントは、テーブルやリストの列に対して昇順・降順の並び替えを選択できるトリガーを提供する UI コンポーネントである。ラベルとソート状態を表示し、ドロップダウンの選択肢から並び替え方向や選択解除を行える。

## インポート

```typescript
import { SelectSort } from '@zenkigen-inc/component-ui';
import type { SortOrder } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';
import { SelectSort, SortOrder } from '@zenkigen-inc/component-ui';

export const SortableHeader = () => {
  const [order, setOrder] = useState<SortOrder>(null);

  return (
    <SelectSort
      label="更新日"
      sortOrder={order}
      isSortKey={order !== null}
      onChange={(value) => setOrder(value)}
      onClickDeselect={() => setOrder(null)}
    />
  );
};
```

## Props

### 必須プロパティ

| プロパティ | 型             | 説明                                                                                 |
| ---------- | -------------- | ------------------------------------------------------------------------------------ |
| `label`    | `string`       | トリガーボタン内に表示する列名。長い文は自動でトランケートされるため 1 行で収まる文言を推奨する。 |
| `sortOrder` | `SortOrder`    | 現在の並び替え方向。`'ascend'` / `'descend'` / `null` のいずれかで状態を制御する。           |

### オプションプロパティ

| プロパティ        | 型                                   | デフォルト値  | 説明                                                                                 |
| ----------------- | ------------------------------------ | ------------- | ------------------------------------------------------------------------------------ |
| `size`            | `'x-small' \| 'small' \| 'medium' \| 'large'` | `'medium'`    | トリガーボタンとドロップダウンの高さ・タイポグラフィを切り替える。                  |
| `variant`         | `'outline' \| 'text'`                | `'outline'`   | `@zenkigen-inc/component-theme` の `buttonColors` を用いた見た目のバリエーション。 |
| `width`           | `CSSProperties['width']`             | `undefined`   | ラッパー要素の幅。省略時は内容幅に合わせる。                                        |
| `isDisabled`      | `boolean`                            | `false`       | `true` の場合は入力不可にし、開閉や項目クリックを無効化する。                       |
| `isSortKey`       | `boolean`                            | `false`       | 対象列が現在のソートキーであるかを示すフラグ。`true` で選択状態のスタイルと矢印アイコンを表示する。 |
| `onChange`        | `(value: SortOrder) => void`         | `undefined`   | 並び替え方向を選択したときに発火するコールバック。`value` に `'ascend'` または `'descend'` が渡る。 |
| `onClickDeselect` | `() => void`                         | `undefined`   | ドロップダウン最下段の「選択解除」ボタンを押したときに呼び出されるコールバック。     |

### 特殊機能の詳細

#### SortOrder 型

`SortOrder` は `packages/component-ui/src/select-sort/type.ts` で定義され、下表の 3 値を取る。

| 値         | 説明                                         |
| ---------- | -------------------------------------------- |
| `'ascend'` | 昇順ソートを指示する。ドロップダウンにチェックが入り、上向き矢印アイコンを表示する。 |
| `'descend'` | 降順ソートを指示する。下向き矢印アイコンを表示する。 |
| `null`     | 並び替え未選択の状態。`isSortKey` が `false` ならケアアイコンを表示する。 |

#### 選択解除ボタン

`onClickDeselect` を指定し、かつ `sortOrder` が `null` 以外のときに限り、ドロップダウン末尾に「選択解除」ボタンが挿入される。押下すると `onClickDeselect` が呼び出され、開いたポップオーバーは即座に閉じる。

### 継承プロパティ

公開 Props のみを受け付け、追加の DOM 属性は透過しない。ボタンや `div` に直接属性を渡す必要がある場合は、ラッパー要素を別途実装して対応する。

## 状態とスタイル

### サイズバリエーション

| サイズ      | ボタン高さ | 横方向パディング | ラベルタイポグラフィ               | アイコンサイズ        | ドロップダウン位置 |
| ----------- | ---------- | ---------------- | ---------------------------------- | --------------------- | ------------------ |
| `x-small`   | `h-6` (24px)| `px-2`           | `typography-label12regular`        | `small`               | `top-7`            |
| `small`     | `h-6` (24px)| `px-2`           | `typography-label14regular`        | `small`               | `top-7`            |
| `medium`    | `h-8` (32px)| `px-4`           | `typography-label14regular`        | `small`               | `top-9`            |
| `large`     | `h-10`(40px)| `px-4`           | `typography-label16regular`        | `medium`              | `top-11`           |

ラベルテキストは `truncate` を付与しており、`x-small` のみ `mr-1`、それ以外は `mr-2` の余白でアイコンとの距離を確保する。

### 状態に応じたスタイル

- **通常状態**: `buttonColors[variant].base` の色を使用し、`focusVisible.normal` でフォーカスリングを描画する。
- **ソートキー状態 (`isSortKey: true`)**: `buttonColors[variant].selected` が適用され、`sortOrder` に応じた上向き/下向きアイコンを表示する。
- **リスト開閉 (`isOptionListOpen`)**: トリガーのアイコンを `angle-small-up/down` に切り替え、下に `SelectList` を展開する。
- **無効状態 (`isDisabled: true`)**: ラッパーに `cursor-not-allowed`、ボタンに `pointer-events-none` と `buttonColors[variant].disabled` を適用し、ドロップダウンも描画しない。

### その他のスタイル仕様

- ドロップダウン本体 (`SelectList`) は `absolute` でラッパー直下に重ね、`z-dropdown` と `shadow-floatingShadow` を付与する。`variant === 'outline'` の場合はボーダーが付く。
- 選択肢 (`SelectItem`) は `li > button` 構造で `focusVisible.inset` を共有し、選択中は `bg-selectedUi` と `Icon name="check"` を表示する。
- 「選択解除」ボタンは `typography-label14regular` の行高 32px (`h-8`) で、ホバー/アクティブ時に `hover:bg-hover02` / `active:bg-active02` を適用する。

## 使用例

### 基本的な使用例

```typescript
const [order, setOrder] = useState<SortOrder>(null);

<SelectSort
  label="更新日"
  sortOrder={order}
  isSortKey={order !== null}
  onChange={(value) => setOrder(value)}
  onClickDeselect={() => setOrder(null)}
/>;
```

### 複数列を管理する例

```typescript
const [sortKey, setSortKey] = useState<'day' | 'member' | null>(null);
const [sortOrderDay, setSortOrderDay] = useState<SortOrder>(null);
const [sortOrderMember, setSortOrderMember] = useState<SortOrder>(null);

const handleSortDay = (direction: SortOrder) => {
  setSortOrderDay(direction);
  setSortOrderMember(null);
  setSortKey('day');
};

const handleSortMember = (direction: SortOrder) => {
  setSortOrderMember(direction);
  setSortOrderDay(null);
  setSortKey('member');
};

<div className="flex gap-4">
  <SelectSort
    label="日付"
    sortOrder={sortOrderDay}
    isSortKey={sortKey === 'day'}
    onChange={handleSortDay}
    onClickDeselect={() => {
      setSortOrderDay(null);
      setSortKey(null);
    }}
  />
  <SelectSort
    label="担当者"
    variant="text"
    sortOrder={sortOrderMember}
    isSortKey={sortKey === 'member'}
    onChange={handleSortMember}
    onClickDeselect={() => {
      setSortOrderMember(null);
      setSortKey(null);
    }}
  />
</div>;
```

### テキストバリアントの例

```typescript
const [order, setOrder] = useState<SortOrder>('descend');

<SelectSort
  label="工数"
  size="small"
  variant="text"
  sortOrder={order}
  isSortKey={true}
  onChange={(value) => setOrder(value)}
/>;
```

### 幅と選択解除を制御する例

```typescript
const [order, setOrder] = useState<SortOrder>(null);

<SelectSort
  label="非常に長い列名を省略表示"
  width={160}
  size="x-small"
  sortOrder={order}
  isSortKey={order !== null}
  onChange={(value) => setOrder(value)}
  onClickDeselect={() => setOrder(null)}
/>;
```

## アクセシビリティ

- トリガーはネイティブの `<button type="button">` を利用し、キーボード操作とスクリーンリーダーでのアクションが保証される。
- ドロップダウン内の選択肢も `<button>` で構成し、`focusVisible` のスタイルによりキーボードフォーカスが視覚化される。
- `useOutsideClick` により、ポップオーバー外をクリックすると確実に閉じ、フォーカスがボタンへ戻る。
- 並び替え状態は視覚的に矢印アイコンで表現されるため、表ヘッダー側で `aria-sort` などのARIA属性を適切に付与して状態を補助すること。

## 技術的な詳細

### 実装について

- `useState` で `isOptionListOpen` を保持し、トリガーボタンのクリックで開閉する。
- `useRef` と `useOutsideClick` を用いて、コンポーネント外クリックでドロップダウンを閉じる。
- `SelectList` と `SelectItem` の内部コンポーネントを使い分け、昇順・降順・選択解除の 3 行のみを描画するシンプルな構造にしている。
- `buttonColors[variant]` と `focusVisible` を `@zenkigen-inc/component-theme` から取得し、ブランド共通のトークンで配色とフォーカス表現を統一する。

### 型安全性

- `SortOrder` 型と `SelectSort` の Props は `packages/component-ui/src/select-sort/index.ts` で再エクスポートされるため、利用側で型推論が効く。
- `onChange` の引数は `SortOrder` に限定され、`null` を渡したい場合は `onClickDeselect` を使用する必要があるため、不正な状態遷移を防止できる。
- `size`・`variant`・`isSortKey` などはユニオン型で厳密に定義されており、存在しないバリエーション値はコンパイル時に検知できる。

## 注意事項

1. `isSortKey` と `sortOrder` は整合するように制御すること。`sortOrder` が `null` のまま `isSortKey` を `true` にすると、選択スタイルだけが適用され矛盾した UI になる。
2. ドロップダウンはラッパー要素の直下に `absolute` で描画されるため、親要素に `overflow: hidden` が設定されているとリストが見切れる。必要に応じて余白や `overflow: visible` を確保する。
3. 選択肢は昇順・降順・選択解除の固定 3 パターンであり、任意の項目を埋め込むことはできない。複雑な条件分岐が必要な場合は `Select` や別 UI を使用する。

## スタイルのカスタマイズ

- `@zenkigen-inc/component-theme` の `buttonColors` を上書きすると、`variant` ごとの背景・ホバー・アクティブ・選択状態のトークンをまとめて変更できる。
- `focusVisible.normal` / `focusVisible.inset` を調整することで、トリガーと選択肢のフォーカスリング表現を揃えられる。
- ドロップダウン背景やボーダーは `bg-uiBackground01`、`border-uiBorder01` などの Tailwind プレセットに依存しているため、`component-config` のトークンを更新すれば全体へ反映される。

## 更新履歴

| 日付                | 内容                                   | 担当者 |
| ------------------- | -------------------------------------- | ------ |
| 2025-12-03 09:17 JST | Select Sort コンポーネント仕様書を新規作成 | -      |
