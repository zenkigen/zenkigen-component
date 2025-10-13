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
   - [カラー指定](#カラー指定)
   - [無効状態](#無効状態)
   - [カスタムスタイル](#カスタムスタイル)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

## 概要

Iconコンポーネントは、SVGアイコンを表示するための汎用的なUIコンポーネントです。`@zenkigen-inc/component-icons`パッケージで定義された豊富なアイコンセットから選択でき、複数のサイズとカラーバリエーションを提供します。

## インポート

```typescript
import { Icon } from '@zenkigen-inc/component-ui';
import type { IconName } from '@zenkigen-inc/component-icons';
```

## 基本的な使用方法

```typescript
import { Icon } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  return (
    <Icon name="add" size="medium" color="icon01" />
  );
};
```

## Props

### 必須プロパティ

| プロパティ | 型         | 説明                                                          |
| ---------- | ---------- | ------------------------------------------------------------- |
| `name`     | `IconName` | 表示するアイコンの名前（`@zenkigen-inc/component-icons`から） |

### オプションプロパティ

| プロパティ   | 型                                                         | デフォルト値 | 説明              |
| ------------ | ---------------------------------------------------------- | ------------ | ----------------- |
| `size`       | `'x-small' \| 'small' \| 'medium' \| 'large' \| 'x-large'` | `'medium'`   | アイコンのサイズ  |
| `color`      | `'icon01' \| 'icon02' \| 'icon03' \| 'iconOnColor'`        | `undefined`  | アイコンの色      |
| `isDisabled` | `boolean`                                                  | `false`      | 無効状態かどうか  |
| `className`  | `string`                                                   | `undefined`  | 追加のCSSクラス名 |

## 状態とスタイル

### サイズバリエーション

#### x-small

- サイズ: `w-3 h-3` (12px × 12px)
- 用途: 非常に小さいUI要素内でのアイコン表示

#### small

- サイズ: `w-4 h-4` (16px × 16px)
- 用途: コンパクトなボタンやリスト項目でのアイコン表示

#### medium（デフォルト）

- サイズ: `w-6 h-6` (24px × 24px)
- 用途: 標準的なボタンやUI要素でのアイコン表示

#### large

- サイズ: `w-8 h-8` (32px × 32px)
- 用途: 強調したいアイコンや大きなボタン内での表示

#### x-large

- サイズ: `w-10 h-10` (40px × 40px)
- 用途: 特に目立たせたいアイコンやヒーロー要素での表示

### カラーバリエーション

#### icon01

- 用途: 基本的なアイコンカラー（最も濃い色）
- 適用クラス: `iconColors.icon01`

#### icon02

- 用途: セカンダリなアイコンカラー（中間の濃さ）
- 適用クラス: `iconColors.icon02`

#### icon03

- 用途: ターシャリなアイコンカラー（最も薄い色）
- 適用クラス: `iconColors.icon03`

#### iconOnColor

- 用途: 色付き背景上でのアイコン表示（通常は白色）
- 適用クラス: `iconColors.iconOnColor`

### 状態に応じたスタイル

#### 通常状態

- 基本スタイル: `inline-block shrink-0`
- カラー: `color`プロパティに応じた色が適用
- カラー未指定時: デフォルトの色（継承された色）

#### 無効状態（`isDisabled: true`）

- カラー: `fill-disabled01`
- `color`プロパティは無視される

## 使用例

### 基本的な使用例

```typescript
// デフォルト設定（medium サイズ、色未指定）
<Icon name="add" />

// 明示的な設定
<Icon
  name="add"
  size="medium"
  color="icon01"
/>
```

### サイズ指定

```typescript
<div className="flex items-center gap-4">
  <Icon name="settings" size="x-small" color="icon01" />
  <Icon name="settings" size="small" color="icon01" />
  <Icon name="settings" size="medium" color="icon01" />
  <Icon name="settings" size="large" color="icon01" />
  <Icon name="settings" size="x-large" color="icon01" />
</div>
```

### カラー指定

```typescript
// 基本的なアイコンカラー
<Icon name="user-one" color="icon01" />

// セカンダリカラー
<Icon name="user-one" color="icon02" />

// ターシャリカラー
<Icon name="user-one" color="icon03" />

// 色付き背景上での使用
<div className="bg-interactive01 p-4">
  <Icon name="user-one" color="iconOnColor" />
</div>
```

### 無効状態

```typescript
// 無効状態のアイコン
<Icon
  name="save"
  isDisabled={true}
/>

// 動的な無効状態
<Icon
  name="save"
  isDisabled={isSaving}
  color="icon01"
/>
```

### カスタムスタイル

```typescript
// className を使用した追加スタイル
<Icon
  name="arrow-right"
  className="rotate-90"
/>

// Tailwind の fill-* クラスで直接色指定
<Icon
  name="heart"
  className="fill-supportError"
/>

// サイズとカスタムスタイルの組み合わせ
<Icon
  name="star"
  size="large"
  className="fill-yellow-yellow100"
/>
```

### 実際の使用シーン

#### ボタン内での使用

```typescript
<button className="flex items-center gap-2">
  <Icon name="add" size="small" color="iconOnColor" />
  <span>項目を追加</span>
</button>
```

#### リスト項目での使用

```typescript
<ul>
  <li className="flex items-center gap-2">
    <Icon name="check" size="small" color="supportSuccess" />
    <span>完了したタスク</span>
  </li>
  <li className="flex items-center gap-2">
    <Icon name="close" size="small" color="supportError" />
    <span>失敗したタスク</span>
  </li>
</ul>
```

#### 状態表示での使用

```typescript
const StatusIcon = ({ status }: { status: 'success' | 'error' | 'warning' }) => {
  const iconMap = {
    success: { name: 'check-circle', color: 'fill-supportSuccess' },
    error: { name: 'close-circle', color: 'fill-supportError' },
    warning: { name: 'alert-triangle', color: 'fill-supportWarning' },
  };

  const config = iconMap[status];

  return (
    <Icon
      name={config.name}
      size="medium"
      className={config.color}
    />
  );
};
```

## アクセシビリティ

- `span`要素として実装されており、装飾的な要素として扱われます
- アイコンが情報を伝える重要な要素である場合は、親要素に適切な`aria-label`を設定することを推奨
- アイコンのみで意味を伝える場合は、スクリーンリーダー用のテキストを追加することを推奨

### 推奨パターン

```typescript
// 装飾的なアイコン（ラベルと併用）
<button>
  <Icon name="add" size="small" />
  <span>追加</span>
</button>

// 意味を持つアイコン（aria-label 付き）
<button aria-label="設定を開く">
  <Icon name="settings" size="medium" />
</button>

// スクリーンリーダー用テキストの追加
<div>
  <Icon name="check" color="icon01" />
  <span className="sr-only">完了</span>
</div>
```

## 技術的な詳細

### 実装について

- `clsx`を使用した動的クラス名の生成
- `@zenkigen-inc/component-icons`から提供される`iconElements`を使用
- `@zenkigen-inc/component-theme`の`iconColors`を使用した色管理
- `inline-block`と`shrink-0`による柔軟なレイアウト対応

### アイコンの提供元

すべてのアイコンは`@zenkigen-inc/component-icons`パッケージから提供されます。利用可能なアイコン名は以下で確認できます：

```typescript
import { iconElements } from '@zenkigen-inc/component-icons';

// 利用可能なすべてのアイコン名を取得
const availableIcons = Object.keys(iconElements);
console.log(availableIcons);
```

### レンダリングされる要素

```html
<span class="inline-block shrink-0 w-6 h-6 fill-[color]">
  <!-- SVG element -->
</span>
```

## 注意事項

1. **アイコン名の型安全性**: `name`プロパティは`IconName`型で型付けされており、存在しないアイコン名を指定するとTypeScriptエラーになります
2. **色の優先順位**: `isDisabled`が`true`の場合、`color`プロパティは無視され、常に`fill-disabled01`が適用されます
3. **カラー未指定時**: `color`プロパティを指定しない場合、親要素から継承された色（通常はテキスト色）が適用されます
4. **サイズのカスタマイズ**: `className`で`w-*`や`h-*`クラスを指定した場合、`size`プロパティによるサイズ指定は上書きされます
5. **fillプロパティ**: Tailwindの`fill-*`クラスを`className`で指定することで、`color`プロパティとは独立した色指定が可能です
6. **アイコンの追加**: 新しいアイコンを追加する場合は、`@zenkigen-inc/component-icons`パッケージにSVGファイルを追加し、コード生成を実行する必要があります

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config`で定義されたデザイントークンと`@zenkigen-inc/component-theme`のカラーテーマに依存しています。

カスタマイズ可能な要素：

- **サイズ**: `size`プロパティまたは`className`での`w-*`、`h-*`クラス指定
- **色**: `color`プロパティまたは`className`での`fill-*`クラス指定
- **その他**: `className`で任意のTailwindクラスを追加（`rotate-*`、`opacity-*`など）

### カスタムカラーの使用例

```typescript
// テーマカラーを使用
<Icon name="heart" className="fill-interactive01" />

// サポートカラーを使用
<Icon name="alert" className="fill-supportError" />

// カラーバリエーションを使用
<Icon name="star" className="fill-yellow-yellow100" />
```

## 更新履歴

| 日付       | 内容     | 担当者 |
| ---------- | -------- | ------ |
| 2025-10-14 | 新規作成 | -      |
