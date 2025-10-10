# TextInput コンポーネント仕様書

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
   - [状態に応じたスタイル](#状態に応じたスタイル)
   - [プレースホルダー](#プレースホルダー)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [クリアボタン付き](#クリアボタン付き)
   - [エラー状態](#エラー状態)
   - [無効状態](#無効状態)
   - [異なる入力タイプ](#異なる入力タイプ)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
   - [実装について](#実装について)
   - [型安全性](#型安全性)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

TextInputコンポーネントは、単一行テキスト入力を提供するUIコンポーネントです。クリアボタン、エラー状態の表示、複数のサイズバリエーションなど、様々な機能を持つ高機能なテキスト入力コンポーネントです。

## インポート

```typescript
import { TextInput } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';
import { TextInput } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  const [value, setValue] = useState('');

  return (
    <TextInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="入力してください"
    />
  );
};
```

## Props

### 必須プロパティ

| プロパティ | 型       | 説明                   |
| ---------- | -------- | ---------------------- |
| `value`    | `string` | テキスト入力の現在の値 |

### オプションプロパティ

| プロパティ           | 型                    | デフォルト値 | 説明                         |
| -------------------- | --------------------- | ------------ | ---------------------------- |
| `size`               | `'medium' \| 'large'` | `'medium'`   | コンポーネントのサイズ       |
| `isError`            | `boolean`             | `false`      | エラー状態かどうか           |
| `disabled`           | `boolean`             | `false`      | 無効状態かどうか             |
| `onClickClearButton` | `() => void`          | `undefined`  | クリアボタンクリック時の処理 |

### 継承プロパティ

`InputHTMLAttributes<HTMLInputElement>` のすべてのプロパティが使用可能です（`size`、`value`以外）。

主な継承プロパティ：

- `placeholder` - プレースホルダーテキスト
- `type` - 入力タイプ（text, password, number, email等）
- `onChange` - 値変更時のイベントハンドラー
- `onFocus` - フォーカス時のイベントハンドラー
- `onBlur` - フォーカス解除時のイベントハンドラー
- `maxLength` - 最大文字数制限
- `readOnly` - 読み取り専用モード

## 状態とスタイル

### サイズバリエーション

#### Medium（デフォルト）

- 高さ: `min-h-8` (32px)
- パディング: `px-2`
- タイポグラフィ: `typography-label14regular`
- 右パディング（末尾要素あり）: `pr-2`

#### Large

- 高さ: `min-h-10` (40px)
- パディング: `px-3`
- タイポグラフィ: `typography-label16regular`
- 右パディング（末尾要素あり）: `pr-3`

### 状態に応じたスタイル

#### 通常状態

- ボーダー: `border-uiBorder02`
- ホバー時: `hover:border-hoverInput`
- フォーカス時: `focus-within:border-activeInput`
- テキスト色: `text-text01`

#### エラー状態（isError: true）

- ボーダー: `border-supportError`
- テキスト色: `text-supportError`
- 無効時はエラースタイルが適用されない

#### 無効状態（disabled: true）

- 背景: `bg-disabled02`
- ボーダー: `border-disabled01`
- テキスト色: `text-textPlaceholder`

### プレースホルダー

- 色: `placeholder:text-textPlaceholder`

## 使用例

### 基本的な使用例

```typescript
<TextInput
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="入力してください"
  size="medium"
/>
```

### クリアボタン付き

```typescript
<TextInput
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="クリア可能"
  onClickClearButton={() => setValue('')}
/>
```

### エラー状態

```typescript
<TextInput
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="エラー状態です"
  isError={true}
/>
```

### 無効状態

```typescript
<TextInput
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="編集できません"
  disabled={true}
/>
```

### 異なる入力タイプ

```typescript
// パスワード入力
<TextInput
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  type="password"
  placeholder="パスワードを入力"
/>

// 数値入力
<TextInput
  value={number}
  onChange={(e) => setNumber(e.target.value)}
  type="number"
  placeholder="数値を入力"
/>

// メール入力
<TextInput
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  type="email"
  placeholder="メールアドレスを入力"
/>
```

## アクセシビリティ

- `forwardRef`を使用してDOM要素への参照をサポート
- 標準的な`<input>`要素のすべてのアクセシビリティ機能を継承
- `disabled`属性が適切に設定される
- フォーカス管理が適切に実装されている
- クリアボタンは`IconButton`コンポーネントを使用し、適切なアクセシビリティ属性を持つ

## 技術的な詳細

### 実装について

- `forwardRef`を使用してref転送をサポート
- `clsx`を使用した動的クラス名の生成
- 内部実装用の`after`プロパティをサポート（型キャストを使用）
- クリアボタンの表示条件：
  - `onClickClearButton`が提供されている
  - `value`の長さが0より大きい
  - `disabled`が`false`

### 型安全性

```typescript
// ✅ 正しい使用
<TextInput value={value} onChange={handleChange} />
<TextInput value={value} isError={true} />
<TextInput value={value} onClickClearButton={handleClear} />

// ❌ コンパイルエラー
<TextInput /> // valueは必須
<TextInput value={value} size="small" /> // sizeは'medium' | 'large'のみ
```

### クリアボタンの動作

クリアボタンは以下の条件で表示されます：

1. `onClickClearButton`プロパティが提供されている
2. `value`の長さが0より大きい
3. `disabled`が`false`

クリアボタンが表示される場合、入力欄の右側に`IconButton`（closeアイコン）が配置され、クリックすると`onClickClearButton`が呼び出されます。

## 注意事項

1. `value`プロパティは必須です
2. クリアボタンは`onClickClearButton`が提供されている場合のみ表示されます
3. エラー状態は無効状態よりも優先度が低く、無効時はエラースタイルが適用されません
4. コンポーネントは`div`要素でラップされており、`relative flex items-center gap-2`クラスが適用されています
5. 末尾要素（クリアボタンや`after`プロパティ）がある場合、入力欄の右パディングが自動調整されます
6. `size`プロパティは`InputHTMLAttributes`の`size`属性と競合するため、除外されています

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config`で定義されたデザイントークンに依存しています。カスタマイズする場合は、これらの設定を参照してください。

特に以下の要素がカスタマイズ可能：

- ボーダー色（`uiBorder02`, `supportError`, `disabled01`等）
- ホバー・フォーカス色（`hoverInput`, `activeInput`）
- テキスト色（`text01`, `supportError`, `textPlaceholder`）
- 背景色（`disabled02`）
- タイポグラフィトークンによる文字スタイル

## 更新履歴

| 日付       | 内容     | 担当者 |
| ---------- | -------- | ------ |
| 2025-10-10 | 新規作成 | -      |
