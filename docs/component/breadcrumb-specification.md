# Breadcrumb コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
   - [継承プロパティ](#継承プロパティ)
5. [コンポジション（子コンポーネント）](#コンポジション子コンポーネント)
6. [状態とスタイル](#状態とスタイル)
   - [状態に応じたスタイル](#状態に応じたスタイル)
   - [その他のスタイル仕様](#その他のスタイル仕様)
7. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [現在位置を明示する例](#現在位置を明示する例)
8. [アクセシビリティ](#アクセシビリティ)
9. [技術的な詳細](#技術的な詳細)
10. [注意事項](#注意事項)
11. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
12. [更新履歴](#更新履歴)

---

## 概要

Breadcrumbコンポーネントは、現在のページがサイト階層のどこに位置するかを示し、上位階層へ戻るための経路を提示するナビゲーションコンポーネントである。`Breadcrumb.Item` を子要素として並べ、スラッシュ区切りのリストを生成する。

## インポート

```typescript
import { Breadcrumb } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { Breadcrumb } from '@zenkigen-inc/component-ui';

const items = [
  { key: 'home', label: 'ホーム', href: '/' },
  { key: 'project', label: '案件一覧', href: '/projects' },
  { key: 'detail', label: '詳細' },
];

<Breadcrumb>
  {items.map((item) => (
    <Breadcrumb.Item key={item.key}>
      {item.href != null ? <a href={item.href}>{item.label}</a> : item.label}
    </Breadcrumb.Item>
  ))}
</Breadcrumb>;
```

## Props

### 必須プロパティ

| プロパティ | 型          | 説明                                                              |
| ---------- | ----------- | ----------------------------------------------------------------- |
| `children` | `ReactNode` | パンくずとして並べる要素。通常は複数の `Breadcrumb.Item` を渡す。 |

### オプションプロパティ

本コンポーネント固有のオプションプロパティは存在しない。

### 継承プロパティ

ネイティブ要素の属性を受け取らない（`Breadcrumb` は `nav` に固定の `aria-label="breadcrumb"` を付与する）。

## コンポジション（子コンポーネント）

`Breadcrumb.Item` はパンくずの各階層を表現する子コンポーネントである。

| コンポーネント    | 必須/オプション | プロパティ | 型          | デフォルト値 | 説明                                                                                              |
| ----------------- | --------------- | ---------- | ----------- | ------------ | ------------------------------------------------------------------------------------------------- |
| `Breadcrumb.Item` | 必須            | `children` | `ReactNode` | `undefined`  | 1階層分の内容。リンクまたはテキストを渡す。最後の階層はリンク無しで現在位置を示すのが推奨である。 |

## 状態とスタイル

### 状態に応じたスタイル

| 状態   | スタイル                                        |
| ------ | ----------------------------------------------- |
| 通常   | `text-interactive02`                            |
| hover  | `underline`（下線追加）                         |
| active | `underline` + `text-activeLink02`（下線 + 色変更） |

- 非リンクのテキストは `text-text01` のまま表示される。

### その他のスタイル仕様

- 文字スタイル: `typography-label14regular`
- レイアウト: `flex` + `flex-wrap` で横方向に並べ、`gap-2` でアイテム間の間隔を確保する。
- セパレーター: `after:content-['/']` によるスラッシュを各アイテム末尾に表示し、最後のアイテムでは `last:after:content-none` により非表示とする。
- 折り返し: `whitespace-nowrap` で各アイテム内の折り返しを抑制しつつ、リスト全体は折り返し可能である。

## 使用例

### 基本的な使用例

```typescript
<Breadcrumb>
  <Breadcrumb.Item>
    <a href="/">ホーム</a>
  </Breadcrumb.Item>
  <Breadcrumb.Item>
    <a href="/projects">案件一覧</a>
  </Breadcrumb.Item>
  <Breadcrumb.Item>詳細</Breadcrumb.Item>
</Breadcrumb>
```

### 現在位置を明示する例

```typescript
<Breadcrumb>
  <Breadcrumb.Item>
    <a href="/">ホーム</a>
  </Breadcrumb.Item>
  <Breadcrumb.Item>
    <a href="/users">ユーザー</a>
  </Breadcrumb.Item>
  <Breadcrumb.Item>
    <span aria-current="page">プロフィール</span>
  </Breadcrumb.Item>
</Breadcrumb>
```

## アクセシビリティ

- `nav` 要素に `aria-label="breadcrumb"` を付与し、ランドマークとして識別できる。
- リスト構造（`ul` / `li`）で階層を示す。
- 現在位置を示す最後の要素は、リンクではなくテキストで表示するか、`aria-current="page"` を付与することが推奨である。
- セパレーターはCSS擬似要素で描画するため、支援技術に読み上げられず、ナビゲーションの意味を妨げない。

## 技術的な詳細

- `Breadcrumb.Item` を `Breadcrumb.Item = BreadcrumbItem` として公開し、`Breadcrumb` の名前空間配下で利用できるようにしている。
- セパレーターは `after:content-['/']` と `last:after:content-none` を組み合わせて実装している。
- リンクのスタイルは Tailwind クラスにより適用される:
  - 通常時: `[&_a]:text-interactive02`
  - ホバー時: `[&_a]:hover:underline`
  - アクティブ時: `[&_a]:active:underline [&_a]:active:text-activeLink02`

## 注意事項

1. 子要素は `Breadcrumb.Item` を用いて構築することを推奨する（任意の要素も受け付けるが、スタイルの統一性が損なわれる）。
2. 現在地の階層はリンクにしないか、`aria-current="page"` を付与して支援技術に伝えること。
3. セパレーターは固定で `/` のみであり、カスタマイズ用のプロパティは存在しない。
4. コンポーネント外からクラス名やスタイルを直接渡すAPIは提供していない。スタイルを変更する場合はコンポーネント自体を拡張する。

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config` で定義されたデザイントークンに依存している。カスタマイズする場合は、当該設定を参照すること。

## 更新履歴

| 日付                 | 内容                                      | 担当者 |
| -------------------- | ----------------------------------------- | ------ |
| 2026-01-26           | リンクの active 状態スタイルを追加        | -      |
| 2025-12-03 08:41 JST | 新規作成                                  | -      |
