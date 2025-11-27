# Pagination コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
   - [排他的プロパティグループ](#排他的プロパティグループ)
   - [特殊機能の詳細](#特殊機能の詳細)
   - [継承プロパティ](#継承プロパティ)
5. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [状態に応じたスタイル](#状態に応じたスタイル)
   - [その他のスタイル仕様](#その他のスタイル仕様)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [バリエーション例1](#バリエーション例1)
   - [バリエーション例2](#バリエーション例2)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
   - [実装について](#実装について)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

Paginationコンポーネントは、複数ページに分割したリストのページ間移動を行うためのUIコンポーネントである。先頭/末尾ページ、前後ナビゲーション、現在ページ周辺のページ番号表示、ページ間の省略記号表示を提供する。

## インポート

```typescript
import { Pagination } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';
import { Pagination } from '@zenkigen-inc/component-ui';

const totalPage = 20;

export const Example = () => {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      currentPage={page}
      totalPage={totalPage}
      onClick={(nextPage) => setPage(nextPage)}
    />
  );
};
```

## Props

### 必須プロパティ

| プロパティ    | 型                        | 説明                                                                     |
| ------------- | ------------------------- | ------------------------------------------------------------------------ |
| `currentPage` | `number`                  | 現在のページ番号。1起算。コンポーネント内で`1`〜`totalPage`にクランプされる。 |
| `totalPage`   | `number`                  | 総ページ数。1以上の整数を想定し、先頭/末尾ページ番号として使用する。`1未満`の場合は何も描画しない。 |
| `onClick`     | `(value: number) => void` | クリックされたページ番号を受け取るハンドラ。呼び出し側で状態を更新する。 |

### オプションプロパティ

| プロパティ           | 型       | デフォルト値 | 説明                                                                                                           |
| -------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| `sideNumPagesToShow` | `number` | `3`          | 現在ページを中心に左右それぞれ何件のページ番号を並べるかを指定する。コンポーネント内で`0`以上`totalPage - 2`以下にクランプされる。端付近では不足分を反対側に回して表示する。 |

### 排他的プロパティグループ

なし。

### 特殊機能の詳細

#### ページリストと省略記号の生成

- 先頭ページ(`1`)と末尾ページ(`totalPage`)は常に表示する。
- `sideNumPagesToShow`を基準に現在ページ周辺のページ番号リストを生成する。先頭/末尾に位置する場合は左右合計`sideNumPagesToShow * 2`件までを反対側に寄せて表示し、中間では左右均等に`sideNumPagesToShow`件ずつ（計`sideNumPagesToShow * 2 + 1`件）を表示する。
- 先頭・末尾と連続しない場合は、省略記号として`Icon name="more"`を表示する（リストの最小値が`2`より大きい／最大値が`totalPage - 1`より小さい場合）。
- 前後ナビゲーションは`angle-left`/`angle-right`のアイコンボタンで提供する。
- `totalPage`が`1`の場合は「1」のみを表示し、前後ナビゲーションは非活性となる。

### 継承プロパティ

追加のHTML属性は公開していない（`ul`や各`button`への任意の属性付与は不可）。

## 状態とスタイル

### サイズバリエーション

単一サイズである。

- 高さ: `h-8` (32px)
- 最小幅: `min-w-8` (32px)
- パディング: `px-1`
- タイポグラフィ: `typography-label14regular`

### 状態に応じたスタイル

#### 通常状態

- テキスト色: `text-interactive02`
- ボーダー: `border-transparent`

#### ホバー状態

- 背景: `hover:bg-hover02`

#### 選択状態（現在ページ）

- ボーダー: `border border-uiBorder02` を適用して視覚的に強調する。

#### 無効状態（前後ナビゲーション）

- `IconButton`の`isDisabled`により`disabled`属性と`pointer-events-none`が付与され、押下不可となる。

### その他のスタイル仕様

- ページ番号の横並びは`ul`に`flex gap-1`を適用している。
- 省略記号アイコンは`fill-icon01`で着色された`more`アイコンを使用し、サイズは`h-8 w-8`で中央寄せする。
- 前後ナビゲーションは`IconButton`の`variant="text"`・`size="small"`を用いる。

## 使用例

### 基本的な使用例

```typescript
const [page, setPage] = useState(3);

<Pagination
  currentPage={page}
  totalPage={50}
  onClick={(nextPage) => setPage(nextPage)}
/>;
```

### バリエーション例1

```typescript
// 左右1件のみを表示し、結果ページ数が少ない場合でも端が詰まるようにする例
<Pagination
  currentPage={5}
  totalPage={12}
  sideNumPagesToShow={1}
  onClick={(nextPage) => setPage(nextPage)}
/>;
```

### バリエーション例2

```typescript
// 総ページが小さいケース（大きめのsideNumPagesToShowでも内部でクランプされる）
<Pagination currentPage={1} totalPage={3} sideNumPagesToShow={5} onClick={setPage} />;
```

### バリエーション例3

```typescript
// 総ページが1の場合もページ「1」が表示され、前後ナビゲーションは非活性
<Pagination currentPage={1} totalPage={1} onClick={setPage} />;
```

## アクセシビリティ

- 数字ボタン・前後ナビゲーションはいずれも`button`要素であり、キーボードのEnter/Spaceで押下できる。
- 前後ナビゲーションは`isDisabled`により`disabled`属性が付き、Tab移動対象外となる。
- 現在ページはボーダーで視覚的に示すのみで、`aria-current`などの属性は付与しない。
- 省略記号は装飾アイコンであり、読み上げは`Icon`コンポーネントの実装に依存する。

## 技術的な詳細

### 実装について

- `PaginationContext`で`currentPage`のみを共有し、`PaginationButton`側でアクティブ判定を行う。
- `currentPage`は`1`〜`totalPage`にクランプする。`sideNumPagesToShow`は`0`〜`totalPage - 2`にクランプする。
- `sideNumPagesToShow`を用いて中心位置を算出し、開始/終了付近では不足分を反対側にオフセットしてページ番号を補完する。先頭/末尾では左右合計が`sideNumPagesToShow * 2`件になる。
- 先頭/末尾と連続しない場合のみ`more`アイコンによる省略記号を描画する。
- クリック時は`onClick`にページ番号を渡すだけで状態管理は行わない。

## 注意事項

1. `totalPage`が`1未満`の場合は何も描画されない。`1`の場合はページ「1」を表示し、前後ナビゲーションは非活性となる。
2. `currentPage`および`sideNumPagesToShow`は内部でクランプされる。負数や`NaN`を渡した場合はクランプ結果に依存するため、呼び出し側でも適切な型/値を渡すことが望ましい。
3. 現在ページの番号ボタンも押下可能であり、`onClick`が再度呼ばれるため必要に応じて呼び出し側で無視または処理を分岐すること。

## スタイルのカスタマイズ

本コンポーネントはTailwindクラスと`@zenkigen-inc/component-config`で提供されるデザイントークンに依存している。`typography-label14regular`、`text-interactive02`、`hover:bg-hover02`、`border-uiBorder02`、`fill-icon01`などのトークンをテーマ側で調整することで見た目を変更できる。

## 更新履歴

| 日付                 | 内容     | 担当者 |
| -------------------- | -------- | ------ |
| 2025-11-27 09:51 JST | totalPage=1時の表示、各値のクランプ挙動を仕様に反映 | -      |
| 2025-11-27 08:18 JST | 新規作成 | -      |
