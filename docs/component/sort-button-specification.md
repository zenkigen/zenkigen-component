# SortButton コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
   - [継承プロパティ](#継承プロパティ)
5. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [ソート状態](#ソート状態)
   - [状態に応じたスタイル](#状態に応じたスタイル)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [サイズ指定](#サイズ指定)
   - [無効状態](#無効状態)
   - [テーブルでの使用例](#テーブルでの使用例)
7. [アクセシビリティ](#アクセシビリティ)
8. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
9. [更新履歴](#更新履歴)

## 概要

SortButtonコンポーネントは、テーブルのカラムヘッダーなどでソート機能を提供するUIコンポーネントです。ユーザーがクリックすることで昇順・降順・ソートなしの状態を切り替えることができ、現在のソート状態をアイコンで視覚的に表示します。

## インポート

```typescript
import { SortButton } from '@zenkigen-inc/component-ui';
import type { SortOrder } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';

const [sortOrder, setSortOrder] = useState<SortOrder>(null);

const handleSort = () => {
  if (sortOrder === null) {
    setSortOrder('descend');
  } else if (sortOrder === 'descend') {
    setSortOrder('ascend');
  } else {
    setSortOrder('descend');
  }
};

<SortButton
  label="項目名"
  sortOrder={sortOrder}
  onClick={handleSort}
  aria-label={`項目名 ${sortOrder === null ? 'ソートなし' : sortOrder === 'ascend' ? '昇順' : '降順'}`}
/>
```

## Props

### 必須プロパティ

| プロパティ   | 型          | 説明                                                    |
| ------------ | ----------- | ------------------------------------------------------- |
| `label`      | `string`    | 表示するラベルテキスト                                  |
| `sortOrder`  | `SortOrder` | 現在のソート順序（`'ascend'` \| `'descend'` \| `null`） |
| `aria-label` | `string`    | アクセシビリティ用のラベル（現在のソート状態を含める）  |

### オプションプロパティ

| プロパティ   | 型                                            | デフォルト値 | 説明                         |
| ------------ | --------------------------------------------- | ------------ | ---------------------------- |
| `size`       | `'x-small' \| 'small' \| 'medium' \| 'large'` | `'medium'`   | ボタンのサイズ               |
| `width`      | `CSSProperties['width']`                      | `undefined`  | ボタンの幅指定               |
| `isDisabled` | `boolean`                                     | `false`      | 無効状態の制御               |
| `onClick`    | `() => void`                                  | `undefined`  | クリック時のコールバック関数 |

### 継承プロパティ

`ButtonHTMLAttributes<HTMLButtonElement>`のプロパティを継承しますが、以下のプロパティは除外されています：

- `className`
- `type`
- `disabled`
- `onClick`
- `aria-disabled`
- `aria-label`

## 状態とスタイル

### サイズバリエーション

#### X-Small

- 高さ: `h-6` (24px)
- パディング: `px-2`
- タイポグラフィ: `typography-label12regular`
- アイコンサイズ: `small`
- 右マージン: `mr-1`

#### Small

- 高さ: `h-6` (24px)
- パディング: `px-2`
- タイポグラフィ: `typography-label14regular`
- アイコンサイズ: `small`
- 右マージン: `mr-2`

#### Medium（デフォルト）

- 高さ: `h-8` (32px)
- パディング: `px-4`
- タイポグラフィ: `typography-label14regular`
- アイコンサイズ: `small`
- 右マージン: `mr-2`

#### Large

- 高さ: `h-10` (40px)
- パディング: `px-4`
- タイポグラフィ: `typography-label16regular`
- アイコンサイズ: `medium`
- 右マージン: `mr-2`

### ソート状態

| ソート状態  | アイコン           | 説明                         |
| ----------- | ------------------ | ---------------------------- |
| `null`      | `angle-small-down` | ソートなし状態（デフォルト） |
| `'ascend'`  | `arrow-up`         | 昇順ソート                   |
| `'descend'` | `arrow-down`       | 降順ソート                   |

### 状態に応じたスタイル

#### 通常状態

- ソートなし時: `buttonColors.text.base`
- ソート状態時: `buttonColors.text.selected`
- ホバー: `buttonColors.text.hover`
- アクティブ: `buttonColors.text.active`

#### 無効状態（`isDisabled: true`）

- 背景: `buttonColors.text.disabled`
- カーソル: `cursor-not-allowed`
- ポインターイベント: `pointer-events-none`

#### フォーカス状態

- フォーカスリング: `focusVisible.normal`

## 使用例

### 基本的な使用例

```typescript
<SortButton
  label="作成日"
  sortOrder={null}
  onClick={handleSort}
  aria-label="作成日 ソートなし"
/>
```

### サイズ指定

```typescript
// 小サイズ
<SortButton
  label="名前"
  size="small"
  sortOrder="descend"
  onClick={handleSort}
  aria-label="名前 降順"
/>

// 大サイズ
<SortButton
  label="ステータス"
  size="large"
  sortOrder="ascend"
  onClick={handleSort}
  aria-label="ステータス 昇順"
/>
```

### 無効状態

```typescript
<SortButton
  label="項目"
  sortOrder={null}
  isDisabled={true}
  aria-label="項目 無効"
/>
```

### テーブルでの使用例

```typescript
const [sortKey, setSortKey] = useState<string | null>(null);
const [sortOrder, setSortOrder] = useState<SortOrder>(null);

const handleSort = (key: string) => () => {
  const currentOrder = sortKey === key ? sortOrder : null;

  let newOrder: SortOrder;
  if (currentOrder === null) {
    newOrder = 'descend';
  } else if (currentOrder === 'descend') {
    newOrder = 'ascend';
  } else {
    newOrder = 'descend';
  }

  setSortKey(key);
  setSortOrder(newOrder);
};

<Table.Cell isHeader>
  <SortButton
    label="作成日"
    size="small"
    sortOrder={sortKey === 'date' ? sortOrder : null}
    onClick={handleSort('date')}
    aria-label={`作成日 ${
      sortKey === 'date'
        ? sortOrder === 'ascend' ? '昇順' : '降順'
        : 'ソートなし'
    }`}
  />
</Table.Cell>
```

## アクセシビリティ

- 標準的な`<button>`要素のすべてのアクセシビリティ機能を継承
- `aria-label`属性は必須で、現在のソート状態を含める必要がある
- `aria-disabled`属性が無効状態で適切に設定される
- `disabled`属性が適切に設定される
- フォーカス管理が適切に実装されている
- キーボードナビゲーション（Enterキー、Spaceキー）をサポート

### 推奨されるaria-labelパターン

```typescript
// ソート状態に応じたラベル
const getAriaLabel = (columnName: string, sortOrder: SortOrder) => {
  const stateText = sortOrder === null ? 'ソートなし' : sortOrder === 'ascend' ? '昇順' : '降順';
  return `${columnName} ${stateText}`;
};
```

## スタイルのカスタマイズ

このコンポーネントのスタイルは`@zenkigen-inc/component-theme`のテーマシステムと`@zenkigen-inc/component-config`のTailwind CSS設定を使用しています。色やタイポグラフィのカスタマイズは、これらのパッケージの設定を変更することで行えます。

## 更新履歴

| 日付       | 内容     | 担当者 |
| ---------- | -------- | ------ |
| 2025-08-18 | 新規作成 | -      |
