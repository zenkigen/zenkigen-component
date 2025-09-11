# Icon コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
5. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [カラーバリエーション](#カラーバリエーション)
   - [状態に応じたスタイル](#状態に応じたスタイル)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [サイズ指定](#サイズ指定)
   - [色指定](#色指定)
   - [無効状態](#無効状態)
   - [アクセントクラス指定](#アクセントクラス指定)
   - [カスタムクラス](#カスタムクラス)
7. [利用可能なアイコン](#利用可能なアイコン)
8. [アクセシビリティ](#アクセシビリティ)
9. [技術的な詳細](#技術的な詳細)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

## 概要

Iconコンポーネントは、統一されたアイコンセットから選択したアイコンを表示するUIコンポーネントである。`@zenkigen-inc/component-icons`パッケージのアイコンを使用し、サイズ・色・無効状態などの統一されたスタイルを提供する。

## インポート

```typescript
import { Icon } from '@zenkigen-inc/component-ui';
import type { IconName } from '@zenkigen-inc/component-icons';
```

## 基本的な使用方法

```typescript
<Icon name="add" size="medium" color="icon01" />

// アクセントクラス付きアイコンの場合
<Icon name="mic" size="medium" color="icon01" accentClassName="fill-interactive01" />
```

## Props

### 必須プロパティ

| プロパティ | 型         | 説明                                                        |
| ---------- | ---------- | ----------------------------------------------------------- |
| `name`     | `IconName` | 表示するアイコン名（`@zenkigen-inc/component-icons`で定義） |

### オプションプロパティ

| プロパティ        | 型                                                         | デフォルト値 | 説明                                                    |
| ----------------- | ---------------------------------------------------------- | ------------ | ------------------------------------------------------- |
| `size`            | `'x-small' \| 'small' \| 'medium' \| 'large' \| 'x-large'` | `'medium'`   | アイコンのサイズ                                        |
| `color`           | `'icon01' \| 'icon02' \| 'icon03' \| 'iconOnColor'`        | -            | アイコンの色（テーマカラーから選択）                    |
| `accentClassName` | `string`                                                   | -            | アクセント要素用のCSSクラス（.accentColorクラス要素用） |
| `isDisabled`      | `boolean`                                                  | `false`      | 無効状態の制御                                          |
| `className`       | `string`                                                   | -            | 追加のCSSクラス名                                       |

## 状態とスタイル

### サイズバリエーション

#### x-small

- サイズ: `w-3 h-3` (12px)
- 用途: 小さなボタンやインライン表示

#### small

- サイズ: `w-4 h-4` (16px)
- 用途: コンパクトなUI要素

#### medium（デフォルト）

- サイズ: `w-6 h-6` (24px)
- 用途: 標準的なUI要素

#### large

- サイズ: `w-8 h-8` (32px)
- 用途: 目立たせたいUI要素

#### x-large

- サイズ: `w-10 h-10` (40px)
- 用途: ヒーロー要素やアイキャッチ

### カラーバリエーション

#### icon01

- 用途: 基本的なアイコン表示
- 色: `iconColors.icon01`（テーマに依存）

#### icon02

- 用途: セカンダリなアイコン表示
- 色: `iconColors.icon02`（テーマに依存）

#### icon03

- 用途: 補助的なアイコン表示
- 色: `iconColors.icon03`（テーマに依存）

#### iconOnColor

- 用途: 色付き背景上でのアイコン表示
- 色: `iconColors.iconOnColor`（テーマに依存）

### 状態に応じたスタイル

#### 通常状態

- 指定された色とサイズで表示
- `inline-block`および`shrink-0`クラスが適用

#### 無効状態（`isDisabled: true`）

- 色: `fill-disabled01`
- 他の色設定（`color`および`accentClassName`）は無効化される
- `.accentColor`クラス要素も`fill-disabled01`色になる

## 使用例

### 基本的な使用例

```typescript
// デフォルトサイズ（medium）
<Icon name="add" />

// 明示的にサイズを指定
<Icon name="user" size="large" />
```

### サイズ指定

```typescript
// 各種サイズの使用例
<Icon name="home" size="x-small" />
<Icon name="search" size="small" />
<Icon name="star" size="medium" />
<Icon name="settings" size="large" />
<Icon name="warning" size="x-large" />
```

### 色指定

```typescript
// 各種色の使用例
<Icon name="information" color="icon01" />
<Icon name="warning" color="icon02" />
<Icon name="error" color="icon03" />

// 色付き背景上での使用
<div className="bg-interactive01 p-2">
  <Icon name="check" color="iconOnColor" />
</div>
```

### 無効状態

```typescript
// 無効化されたアイコン
<Icon name="edit" isDisabled />

// 色指定があっても無効時は disabled01 色になる
<Icon name="delete" color="icon01" isDisabled />
```

### アクセントクラス指定

```typescript
// アクセントクラスなし
<Icon name="mic" size="medium" color="icon01" />

// テーマカラーを使用
<Icon name="mic" size="medium" color="icon01" accentClassName="fill-interactive01" />
<Icon name="mic" size="medium" color="icon01" accentClassName="fill-supportError" />
<Icon name="mic" size="medium" color="icon01" accentClassName="fill-supportSuccess" />

// 任意のTailwind CSSクラス
<Icon name="mic" size="medium" color="icon01" accentClassName="fill-red-500" />
<Icon name="mic" size="medium" color="icon01" accentClassName="fill-blue-600 hover:fill-blue-700" />
<Icon name="mic" size="medium" color="icon01" accentClassName="fill-gradient-to-r from-purple-500 to-pink-500" />

// アクセントクラスありでも無効状態では無効化される
<Icon name="mic" size="medium" color="icon01" accentClassName="fill-red-500" isDisabled />
```

### カスタムクラス

```typescript
// 追加のスタイリング
<Icon name="arrow-right" className="rotate-45" />

// Tailwind CSSによる直接的な色指定
<Icon name="heart" className="fill-red-500" />

// ホバー効果の追加
<Icon name="like" className="hover:fill-blue-500 cursor-pointer" />
```

## 利用可能なアイコン

利用可能なアイコンは`@zenkigen-inc/component-icons`パッケージで定義されている。以下のような形で確認できる：

```typescript
import { iconElements } from '@zenkigen-inc/component-icons';

// 利用可能なアイコン名の一覧
const availableIcons = Object.keys(iconElements);
console.log(availableIcons);
```

### 主要なアイコンカテゴリ

- **ナビゲーション**: `arrow-left`, `arrow-right`, `home`, `back`など
- **アクション**: `add`, `delete`, `edit`, `save`など
- **状態**: `check`, `warning`, `error`, `information`など
- **コンテンツ**: `image`, `documents`, `folder`, `file`など
- **ユーザー**: `user`, `group`, `profile`など
- **その他**: `search`, `filter`, `settings`, `more`など

詳細な一覧は、Storybookの「Components/Icon」ストーリーで確認できる。

## アクセシビリティ

- **装飾的アイコン**: アイコンが装飾的な場合は、`aria-hidden="true"`属性を追加することを推奨
- **情報を伝えるアイコン**: アイコンが重要な情報を伝える場合は、適切な`aria-label`を親要素に追加
- **インタラクティブな使用**: ボタンやリンクで使用する場合は、テキストラベルまたは`aria-label`を併用

```typescript
// 装飾的な使用例
<div>
  ユーザー設定 <Icon name="settings" aria-hidden="true" />
</div>

// 情報を伝える使用例
<button aria-label="ユーザー設定を開く">
  <Icon name="settings" />
</button>

// テキストと併用する例
<button>
  <Icon name="add" aria-hidden="true" />
  新規作成
</button>
```

## 技術的な詳細

### レンダリング方式

Iconコンポーネントは`<span>`要素でラップされたSVG要素として実装されている。

```typescript
return <span className={classes}>{iconElements[props.name]}</span>;
```

### クラス名の組み立て

`clsx`ライブラリを使用して動的にクラス名を組み立てている：

```typescript
const classes = clsx(
  'inline-block shrink-0', // ベースクラス
  {
    'fill-disabled01': isDisabled, // 無効状態
    [iconColors.icon01]: !isDisabled && props.color === 'icon01', // 各色設定
    // ...サイズ設定
    [`[&_.accentColor]:${props.accentClassName}`]: !isDisabled && props.accentClassName != null,
    '[&_.accentColor]:fill-disabled01': isDisabled && props.accentClassName != null,
  },
  props.className, // カスタムクラス
);
```

### パフォーマンス考慮事項

- アイコンはSVG形式で軽量
- 使用されるアイコンのみがバンドルに含まれる（tree-shaking対応）
- CSS-in-JSではなくTailwind CSSクラスを使用することで実行時のオーバーヘッドを削減

## スタイルのカスタマイズ

Iconコンポーネントのスタイルは`@zenkigen-inc/component-theme`のテーマトークンに基づいている。カスタマイズする場合は：

### テーマレベルでのカスタマイズ

```typescript
// テーマ設定でアイコンカラーをカスタマイズ
export const customIconColors = {
  icon01: 'fill-custom-primary',
  icon02: 'fill-custom-secondary',
  icon03: 'fill-custom-tertiary',
  iconOnColor: 'fill-white',
};
```

### コンポーネントレベルでのカスタマイズ

```typescript
// classNameプロパティを使用した個別カスタマイズ
<Icon
  name="star"
  className="fill-yellow-400 hover:fill-yellow-500 transition-colors"
/>

// accentClassNameプロパティを使用したアクセント要素のカスタマイズ
<Icon
  name="mic"
  color="icon01"
  accentClassName="fill-gradient-to-r from-purple-500 to-pink-500"
/>
```

### Tailwind CSSによる直接スタイリング

```typescript
// Tailwind CSSクラスによる直接的な色指定
<Icon name="heart" className="fill-red-500" />

// サイズのオーバーライド
<Icon name="logo" size="medium" className="w-12 h-12" />

// アクセント要素の高度なスタイリング
<Icon name="mic" accentClassName="fill-blue-500 hover:fill-blue-700 transition-colors duration-200" />
```

## 更新履歴

| 日付       | 内容     | 担当者 |
| ---------- | -------- | ------ |
| 2025-09-11 | 新規作成 | -      |
