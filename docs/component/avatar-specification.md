# Avatar コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
5. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [状態に応じたスタイル](#状態に応じたスタイル)
   - [ユーザーカラー](#ユーザーカラー)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [サイズ指定](#サイズ指定)
   - [ユーザーIDによる色分け](#ユーザーIDによる色分け)
   - [無効状態](#無効状態)
   - [特殊な名前パターン](#特殊な名前パターン)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

## 概要

Avatarコンポーネントは、ユーザーの名前のイニシャルを表示する円形のUIコンポーネントです。ユーザーIDに基づいて自動的に色分けされ、複数のサイズバリエーションを提供します。

## インポート

```typescript
import { Avatar } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { Avatar } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  return (
    <Avatar
      firstName="太郎"
      lastName="全機現"
      userId={1}
    />
  );
};
```

## Props

### 必須プロパティ

| プロパティ  | 型       | 説明           |
| ----------- | -------- | -------------- |
| `firstName` | `string` | ユーザーの名前 |
| `lastName`  | `string` | ユーザーの姓   |

### オプションプロパティ

| プロパティ   | 型                                                         | デフォルト値 | 説明                       |
| ------------ | ---------------------------------------------------------- | ------------ | -------------------------- |
| `size`       | `'x-small' \| 'small' \| 'medium' \| 'large' \| 'x-large'` | `'medium'`   | アバターのサイズ           |
| `userId`     | `number`                                                   | `undefined`  | ユーザーID（色分けに使用） |
| `isDisabled` | `boolean`                                                  | `false`      | 無効状態かどうか           |

## 状態とスタイル

### サイズバリエーション

#### x-small

- サイズ: `w-6 h-6` (24px × 24px)
- タイポグラフィ: `typography-label11regular`

#### small

- サイズ: `w-8 h-8` (32px × 32px)
- タイポグラフィ: `typography-label11regular`

#### medium（デフォルト）

- サイズ: `w-10 h-10` (40px × 40px)
- タイポグラフィ: `typography-label14regular`

#### large

- サイズ: `w-12 h-12` (48px × 48px)
- タイポグラフィ: `typography-label14regular`

#### x-large

- サイズ: `w-16 h-16` (64px × 64px)
- タイポグラフィ: `typography-label16regular`

### 状態に応じたスタイル

#### 通常状態

- 背景色: ユーザーIDに基づく色（`userColors`配列から選択）
- テキスト色: `text-textOnColor`
- 形状: `rounded-full`

#### 無効状態（isDisabled: true）

- 背景色: `bg-disabled01`
- テキスト色: `text-textOnColor`

#### ユーザーID未設定（userId: undefined）

- 背景色: `bg-icon01`
- テキスト色: `text-textOnColor`

### ユーザーカラー

ユーザーIDに基づいて以下の10色から自動選択されます：

1. `bg-user-red`
2. `bg-user-pink`
3. `bg-user-purple`
4. `bg-user-turquoise`
5. `bg-user-royalBlue`
6. `bg-user-blue`
7. `bg-user-aquamarine`
8. `bg-user-yellowGreen`
9. `bg-user-yellow`
10. `bg-user-orange`

色の選択は `userId % userColors.length` の計算により決定されます。

## 使用例

### 基本的な使用例

```typescript
<Avatar
  firstName="太郎"
  lastName="全機現"
  userId={1}
/>
```

### サイズ指定

```typescript
<div className="flex gap-2">
  <Avatar size="x-small" firstName="太郎" lastName="全機現" userId={1} />
  <Avatar size="small" firstName="太郎" lastName="全機現" userId={1} />
  <Avatar size="medium" firstName="太郎" lastName="全機現" userId={1} />
  <Avatar size="large" firstName="太郎" lastName="全機現" userId={1} />
  <Avatar size="x-large" firstName="太郎" lastName="全機現" userId={1} />
</div>
```

### ユーザーIDによる色分け

```typescript
<div className="flex gap-2">
  <Avatar size="medium" firstName="太郎" lastName="全機現" userId={1} />
  <Avatar size="medium" firstName="太郎" lastName="全機現" userId={2} />
  <Avatar size="medium" firstName="太郎" lastName="全機現" userId={3} />
  <Avatar size="medium" firstName="太郎" lastName="全機現" userId={4} />
  <Avatar size="medium" firstName="太郎" lastName="全機現" userId={5} />
</div>
```

### 無効状態

```typescript
<Avatar
  firstName="太郎"
  lastName="全機現"
  userId={1}
  isDisabled={true}
/>
```

### 特殊な名前パターン

#### 英語名（ASCII文字）

英語名の場合、姓と名の最初の文字を大文字で表示します：

```typescript
<Avatar
  firstName="John"
  lastName="Smith"
  userId={1}
/>
// 表示: "JS"
```

#### 日本語名

日本語名の場合、姓と名を結合して最初の2文字を表示します：

```typescript
<Avatar
  firstName="太郎"
  lastName="全機現"
  userId={1}
/>
// 表示: "全機"
```

#### 全角スペースの処理

全角スペース（　）は半角スペースに変換され、前後の空白はトリムされます：

```typescript
<Avatar
  firstName=""
  lastName="全　優"
  userId={1}
/>
// 表示: "全優"
```

## アクセシビリティ

- `span`要素として実装されており、装飾的な要素として扱われます
- テキストコンテンツ（イニシャル）が適切に表示されます
- 色のコントラストは`text-textOnColor`により確保されています

## 技術的な詳細

### 実装について

- `clsx`を使用した動的クラス名の生成
- `isAsciiString`関数による文字コード判定（ASCII文字の判定）
- 名前の正規化処理（全角スペースの変換、トリム処理）
- ユーザーカラーの循環選択（モジュロ演算）

### 名前表示ロジック

```typescript
// ASCII文字判定
const isAsciiString = (str: string) => {
  return str.charCodeAt(0) < 256;
};

// 名前の正規化
const trimmedFirstName = props.firstName.replace('　', ' ').trim();
const trimmedLastName = props.lastName.replace('　', ' ').trim();

// 表示文字の決定
const nameOnIcon = isAsciiString(trimmedLastName)
  ? trimmedFirstName.slice(0, 1).toUpperCase() + trimmedLastName.slice(0, 1).toUpperCase()
  : (trimmedLastName + trimmedFirstName).slice(0, 2);
```

## 注意事項

1. **名前の必須性**: `firstName`と`lastName`は必須プロパティです
2. **文字数制限**: 表示されるイニシャルは最大2文字です
3. **色の循環**: ユーザーカラーは10色で循環するため、同じ色が複数のユーザーに割り当てられる可能性があります
4. **ASCII文字判定**: 姓の最初の文字がASCII文字かどうかで表示ロジックが変わります
5. **全角スペース処理**: 全角スペース（　）は自動的に半角スペースに変換されます

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config`で定義されたデザイントークンに依存しています。カスタマイズする場合は、これらの設定を参照してください。

特に以下の要素がカスタマイズ可能です：

- サイズ（`w-*`, `h-*`クラス）
- タイポグラフィ（`typography-*`クラス）
- 背景色（`userColors`配列）
- テキスト色（`text-textOnColor`）

## 更新履歴

| 日付       | 内容     | 担当者 |
| ---------- | -------- | ------ |
| 2025-10-06 | 新規作成 | -      |
