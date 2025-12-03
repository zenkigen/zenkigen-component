# Heading コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
5. [コンポジション（スロット）](#コンポジションスロット)
6. [状態とスタイル](#状態とスタイル)
   - [レベルバリエーション](#レベルバリエーション)
   - [その他のスタイル仕様](#その他のスタイル仕様)
7. [使用例](#使用例)
   - [基本の見出し](#基本の見出し)
   - [アイコン付き見出し](#アイコン付き見出し)
   - [アクションボタン付き](#アクションボタン付き)
8. [アクセシビリティ](#アクセシビリティ)
9. [技術的な詳細](#技術的な詳細)
10. [注意事項](#注意事項)
11. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
12. [更新履歴](#更新履歴)

---

## 概要

Heading コンポーネントは、ページやカード内の階層構造を表現するための見出しを描画する。`level` に応じて `<h1>`〜`<h5>` をレンダーし、前後にアイコンや操作ボタンを簡単に配置できる。

## インポート

```typescript
import { Heading } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { Heading } from '@zenkigen-inc/component-ui';

const Example = () => {
  return <Heading level={2}>タイトル</Heading>;
};
```

## Props

### 必須プロパティ

| プロパティ | 型                   | 説明                               |
| ---------- | -------------------- | ---------------------------------- |
| `level`    | `1 \| 2 \| 3 \| 4 \| 5` | レンダリングする見出しの階層レベル |

### オプションプロパティ

| プロパティ  | 型         | デフォルト値 | 説明                                                                 |
| ----------- | ---------- | ------------ | -------------------------------------------------------------------- |
| `before`    | `ReactNode` | `undefined`  | テキストの左側に表示するアイコンやアバターなどの要素                |
| `after`     | `ReactNode` | `undefined`  | テキストの右側に表示する補足アクション、メタ情報、ボタンなど        |
| `children`  | `ReactNode` | `undefined`  | 表示する見出し内容。純テキストのほかに任意の要素を配置できる |

## コンポジション（スロット）

Heading は `before` → `children` → `after` の順序でノードを描画し、横並びで配置する。`before` / `after` には `Icon` や `Avatar`、`Button` など任意の React 要素を渡せる。`children` にラッパー要素を入れることで、自動的に余白を調整したり `flex: 1` で左右要素を押し広げたりできる。

## 状態とスタイル

### レベルバリエーション

| `level` | タイポグラフィ (`@zenkigen-inc/component-theme`)              | ギャップ | 用途例           |
| ------- | ------------------------------------------------------------ | -------- | ---------------- |
| `1`     | `typography.heading.h1` (`text-7`, `font-bold`)               | `gap-2`  | ページトップのタイトル |
| `2`     | `typography.heading.h2` (`text-6`, `font-bold`)               | `gap-1`  | セクションタイトル |
| `3`     | `typography.heading.h3` (`text-5`, `font-bold`)               | `gap-1`  | カードタイトル     |
| `4`     | `typography.heading.h4` (`text-4`, `font-bold`)               | `gap-1`  | 小見出し           |
| `5`     | `typography.heading.h5` (`text-3`, `font-bold`)               | `gap-1`  | 補助的な見出し     |

### その他のスタイル仕様

- `display: flex` と `items-center` で前後の要素とテキストを垂直中央に揃える。
- テキストカラーは `text-text-text01`（ライトテーマの基準テキスト色）で固定される。
- 行高・字間・太さは `typography.heading` の定義に従い、`component-theme` のトークンと同期している。
- `before`/`after` が未指定の場合でも余白は維持されるため、単純にテキストだけで利用できる。

## 使用例

### 基本の見出し

```typescript
<Heading level={1}>ダッシュボード</Heading>
```

### アイコン付き見出し

```typescript
import { Icon } from '@zenkigen-inc/component-ui';

<Heading level={3} before={<Icon name="chart-bar" size="large" />} after={<Icon name="information" size="small" />}>
  売上レポート
</Heading>
```

### アクションボタン付き

```typescript
import { Button, Icon } from '@zenkigen-inc/component-ui';

<Heading
  level={2}
  before={<Icon name="user" size="large" />}
  after={
    <Button variant="outline" before={<Icon name="add" size="medium" />}>
      新規追加
    </Button>
  }
>
  <div className="mr-auto">担当者一覧</div>
</Heading>
```

## アクセシビリティ

- `level` に応じて `h1`〜`h5` 要素を生成する。文書全体の見出し階層が崩れないように利用順序を管理すること。
- `before` / `after` にインタラクティブ要素を置く場合は、それぞれが単体で適切なロールとフォーカス管理を提供する必要がある。
- コンポーネント自体は `tabindex` を持たず、スクリーンリーダーには通常の見出しとして認識される。
- `children` に `aria` 属性を持つ要素を含めることで、必要に応じて補足情報を付与できる。

## 技術的な詳細

- `clsx` で `flex` 配列とギャップの条件クラスを組み立てている。
- タイポグラフィは `@zenkigen-inc/component-theme` の `typography.heading` を参照し、コード側で `h${level}` キーを決定する。
- `before` / `after` は `ReactNode` をそのまま描画するだけで追加ラッパは存在しないため、親側で `key` や `aria-*` を制御できる。
- `level` 以外にスタイルやセマンティクスを変えるプロパティは存在せず、1つの `TagName` 変数で `<h*>` を生成している。

## 注意事項

1. `level` は必須であり、`0` や `6` などサポート外の値を渡すと TypeScript の型チェックに失敗する。
2. 同じページに複数の `h1` を描画しないようにし、見出し順序をスキップしないこと（例: `h1` の直後に `h3` を使用しない）。
3. `before` や `after` にブロック要素を配置する場合は、`flex` レイアウトに適合するように幅や余白を調整すること。
4. コンポーネント側では `className` を受け付けない。独自スタイルが必要な場合はラッパー要素で調整する。
5. `children` を空にすると視覚的なスペースだけが描画されるため、プレースホルダーテキストを必ず提供する。

## スタイルのカスタマイズ

- タイポグラフィやカラーを変更する場合は `@zenkigen-inc/component-theme` の `typography.heading` や `text` トークンを調整する。
- 行頭/行末に追加余白が必要な場合は、`children` を `<div className="flex-1">` で包み左右にスペースを確保する。
- Tailwind プリセット（`@zenkigen-inc/component-config`）に依存しているため、外部プロジェクトで使用する際はプリセットを `tailwind.config.js` に登録する。

## 更新履歴

| 日付                 | 内容                     | 担当者 |
| -------------------- | ------------------------ | ------ |
| 2025-12-03 09:03 JST | 新規作成                 | -      |
