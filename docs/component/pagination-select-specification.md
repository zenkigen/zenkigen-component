# PaginationSelect コンポーネント仕様書

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

PaginationSelectコンポーネントは、検索結果などの大量データをページング表示している場面で、現在表示しているアイテム件数の範囲と総ページ数を示しつつ、Selectによるページ直接指定と前後ボタンによるページ遷移を提供するUIである。表示領域が限られているケースでも省スペースにページ選択を集約できる。

## インポート

```typescript
import { PaginationSelect } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';
import { PaginationSelect } from '@zenkigen-inc/component-ui';

const totalSize = 320;

export const Example = () => {
  const [page, setPage] = useState(1);

  return (
    <PaginationSelect
      totalSize={totalSize}
      sizePerPage={20}
      currentPage={page}
      onChange={(value) => setPage(value)}
      onClickPrevButton={() => setPage((prev) => Math.max(1, prev - 1))}
      onClickNextButton={() => setPage((prev) => Math.min(Math.ceil(totalSize / 20), prev + 1))}
    />
  );
};
```

## Props

### 必須プロパティ

| プロパティ           | 型                        | 説明                                                                                                                                                      |
| -------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `totalSize`          | `number`                  | レコードの総件数。`sizePerPage`と組み合わせて全ページ数(`pageMax`)と表示件数の上下限を算出する。0を渡すと件数表示は0件となり、Selectは非活性化される。 |
| `sizePerPage`        | `number`                  | 1ページあたりに表示する件数。`Math.ceil(totalSize / sizePerPage)`でページ数を求めるため、1以上の値を渡す。                                               |
| `currentPage`        | `number`                  | 現在表示中のページ番号（1起算）。Selectの選択状態と、前後ボタンの活性状態を決める。                                                                        |
| `onClickPrevButton`  | `() => void`              | 前ページボタンがクリックされた際に呼ばれるハンドラ。呼び出し側で`currentPage`の状態遷移を制御する。                                                       |
| `onClickNextButton`  | `() => void`              | 次ページボタンがクリックされた際に呼ばれるハンドラ。                                                                                                      |
| `onChange`           | `(value: number) => void` | Selectで任意のページ番号が選択された際に受け取るハンドラ。Selectの選択値（文字列）を数値に変換した結果が渡される。                                         |

### オプションプロパティ

| プロパティ             | 型       | デフォルト値 | 説明                                                                                             |
| ---------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------ |
| `countLabel`           | `string` | `'件'`       | 表示件数テキストの末尾に付与する単位ラベル。例: `"〜件"`、`"results"`。                          |
| `pageLabel`            | `string` | `'ページ'`   | `/ {pageMax}`表示に付与するページ単位のラベル。                                                  |
| `optionListMaxHeight`  | `number` | `190`        | Selectのドロップダウンリストに適用する最大高さ(px)。件数が増えた場合のスクロール量を制限できる。 |

### 排他的プロパティグループ

なし。

### 特殊機能の詳細

#### ページ計算と表示レンジ

- 総ページ数は`pageMax = Math.ceil(totalSize / sizePerPage)`で算出する。端数は切り上げられ、最終ページは不足件数のみを表示する。
- `totalSize`が0の場合は`pageMax`も0となり、カウンターは`0件 / 0ページ`を表示する。同時にSelectが`disabled`となり、当該状態でのみ次ページボタンも非活性となる。
- 表示中件数は`minCount`（1ページ目であれば1）と`maxCount`（`currentPage * sizePerPage`を上限`totalSize`でクランプ）で求められ、`"min - max"`形式で描画する。1ページ目で空の場合は`0`のみが描画される。

#### Selectオプション生成

- `totalSize`に基づいて`1`〜`pageMax`の連番を`SelectOption`配列として自動生成し、`Select.Option`で描画する。
- 選択肢は常にページ番号の文字列と一致しており、`currentPage`と同じ値のオプションが選択状態になる。

#### ナビゲーションボタン

- 前後ボタンは`IconButton`を`variant="text"`、`size="small"`で利用し、`currentPage === 1`で戻るボタンが、`currentPage === pageMax`または`pageMax === 0`で進むボタンが`disabled`になる。
- アプリケーション側で`currentPage`の境界チェックを行い、ボタンハンドラ内で無効なページ番号に更新しないようにする。

### 継承プロパティ

追加のHTML属性は公開していない。`nav`要素や各子要素に任意の属性を付加することはできない。

## 状態とスタイル

### サイズバリエーション

単一サイズで提供する。

- 全体: `nav.flex.items-center.gap-x-1`でSelectブロックとナビゲーションを横並びにする。
- 件数テキスト: `typography-label14regular text-text01`。
- Select: `size="medium"`, `variant="outline"`（Selectコンポーネントの既定スタイルを継承）。
- `/ ページ`表記: `typography-label14regular text-text02`。

### 状態に応じたスタイル

- **通常状態**: Selectは`variant="outline"`、IconButtonは`variant="text"`で、コンポーネントテーマに定義されたテキスト色(`text-text01`/`text-text02`)を用いる。
- **ホバー状態**: Select・IconButtonともに各コンポーネント固有のhoverスタイルが適用される。
- **選択状態**: Selectは選択中のオプションが強調表示される（Selectコンポーネントに準ずる）。
- **無効状態**: `pageMax === 0`時のSelect、および境界に到達したIconButtonに`isDisabled`が渡り、`disabled`属性と`pointer-events-none`が付与される。

### その他のスタイル仕様

- カウンターテキストとSelectの間隔は`gap-x-2`で、IconButtonとの間は`gap-x-1`で揃えている。
- Selectのドロップダウンは`optionListMaxHeight`でスクロール量を制御できる。未指定時は190pxで縦スクロールバーが現れる。
- ナビゲーション領域は`div.flex.items-center`で水平方向に密に配置され、左右の余白はIconButton内部の`size="small"`設定に依存する。

## 使用例

### 基本的な使用例

```typescript
import { useState } from 'react';
import { PaginationSelect } from '@zenkigen-inc/component-ui';

const PaginatedTable = ({ totalSize }: { totalSize: number }) => {
  const [page, setPage] = useState(1);
  const sizePerPage = 25;
  const pageMax = Math.ceil(totalSize / sizePerPage);

  return (
    <PaginationSelect
      totalSize={totalSize}
      sizePerPage={sizePerPage}
      currentPage={page}
      onChange={(value) => setPage(value)}
      onClickPrevButton={() => setPage((prev) => Math.max(1, prev - 1))}
      onClickNextButton={() => setPage((prev) => Math.min(pageMax, prev + 1))}
    />
  );
};
```

### バリエーション例1

```typescript
import { useState } from 'react';

const CustomLabels = () => {
  const totalSize = 980;
  const sizePerPage = 50;
  const [page, setPage] = useState(5);
  const pageMax = Math.ceil(totalSize / sizePerPage);

  return (
    <PaginationSelect
      totalSize={totalSize}
      sizePerPage={sizePerPage}
      currentPage={page}
      countLabel="件中"
      pageLabel="ページ目"
      optionListMaxHeight={240}
      onChange={(value) => setPage(value)}
      onClickPrevButton={() => setPage((prev) => Math.max(1, prev - 1))}
      onClickNextButton={() => setPage((prev) => Math.min(pageMax, prev + 1))}
    />
  );
};
```

### バリエーション例2

```typescript
// 件数がまだ確定していない検索画面の初期状態
<PaginationSelect
  totalSize={0}
  sizePerPage={25}
  currentPage={1}
  onChange={(value) => console.log('ページ選択: ', value)}
  onClickPrevButton={() => {}}
  onClickNextButton={() => {}}
/>
```

## アクセシビリティ

- ルート要素は`<nav aria-label="pagination">`として描画され、スクリーンリーダーにナビゲーション領域であることを明示する。
- Selectは既存のSelectコンポーネントのアクセシビリティ仕様（キーボード操作、ロール付与、`aria-expanded`管理など）を継承する。
- IconButtonは`button`要素として描画され、`disabled`属性が適切に付与されることでフォーカス不可となる。
- ページ範囲のテキストはライブリージョンではなく静的表示のため、ページ切り替え時にユーザーへ更新を伝える場合はアプリケーション側で補助を検討する。

## 技術的な詳細

### 実装について

- `pageMax`は`Math.ceil`で算出し、Selectのオプション数と次ボタンの活性条件に再利用している。
- Selectの`onChange`では取得した`SelectOption`の`value`（文字列）を`Number`で変換してから`onChange`コールバックへ渡す。
- 件数テキストの下限は`totalSize`が0のとき`0`とし、それ以外は`(currentPage - 1) * sizePerPage + 1`で算出している。
- `IconButton`と`Select`は既存コンポーネントへの依存であり、個別のフォーカス・キーボード処理を本コンポーネント内では保持しない。

## 注意事項

1. `sizePerPage`に0または負の値を渡すとページ数計算が破綻するため、1以上の整数を指定すること。
2. `currentPage`はコンポーネント内部でクランプされない。状態管理側で`1`〜`Math.max(pageMax, 1)`の範囲に制御する。
3. `totalSize`の更新に伴い`pageMax`が減少した場合、`currentPage`が範囲外になる可能性があるためハンドラ内で再計算する。

## スタイルのカスタマイズ

Tailwind CSSのユーティリティクラスと`@zenkigen-inc/component-config`で定義されたデザイントークンに依存する。色(`text-text01/02`)、タイポグラフィ(`typography-label14regular`)、IconButton/Selectのvariant・sizeはテーマで管理されているため、変更が必要な場合は`component-config`や`component-theme`を更新して一貫性を保つ。

## 更新履歴

| 日付                 | 内容       | 担当者 |
| -------------------- | ---------- | ------ |
| 2025-12-03 09:14 JST | 新規作成   | -      |
