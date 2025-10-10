# PasswordInput コンポーネント仕様書

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
   - [エラー状態](#エラー状態)
   - [無効状態](#無効状態)
   - [パスワード表示/非表示切り替え](#パスワード表示非表示切り替え)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
   - [実装について](#実装について)
   - [型安全性](#型安全性)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

PasswordInputコンポーネントは、パスワード入力専用のUIコンポーネントです。TextInputコンポーネントをベースに、パスワードの表示/非表示を切り替える機能を追加した高機能なパスワード入力コンポーネントです。

## インポート

```typescript
import { PasswordInput } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';
import { PasswordInput } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  const [password, setPassword] = useState('');

  return (
    <PasswordInput
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="パスワードを入力してください"
    />
  );
};
```

## Props

### 必須プロパティ

| プロパティ | 型       | 説明                     |
| ---------- | -------- | ------------------------ |
| `value`    | `string` | パスワード入力の現在の値 |

### オプションプロパティ

| プロパティ | 型                    | デフォルト値 | 説明                   |
| ---------- | --------------------- | ------------ | ---------------------- |
| `size`     | `'medium' \| 'large'` | `'medium'`   | コンポーネントのサイズ |
| `isError`  | `boolean`             | `false`      | エラー状態かどうか     |
| `disabled` | `boolean`             | `false`      | 無効状態かどうか       |

### 継承プロパティ

`ComponentPropsWithoutRef<typeof TextInput>` から `type` と `onClickClearButton` を除外したすべてのプロパティが使用可能です。

主な継承プロパティ：

- `placeholder` - プレースホルダーテキスト
- `onChange` - 値変更時のイベントハンドラー
- `onFocus` - フォーカス時のイベントハンドラー
- `onBlur` - フォーカス解除時のイベントハンドラー
- `maxLength` - 最大文字数制限
- `readOnly` - 読み取り専用モード

**除外されるプロパティ：**

- `type` - 常に `password` または `text`（表示/非表示切り替えにより自動制御）
- `onClickClearButton` - パスワード入力ではクリアボタンは提供されない

## 状態とスタイル

PasswordInputはTextInputコンポーネントをベースにしているため、基本的なスタイルはTextInputと同じです。詳細については[TextInput仕様書](./text-input-specification.md)を参照してください。

### PasswordInput固有のスタイル

- 表示/非表示ボタンが常に右側に配置される
- 右パディングが表示/非表示ボタン用に自動調整される
- `disabled`状態では表示/非表示ボタンも無効化される

## 使用例

基本的な使用方法はTextInputと同じです。詳細な使用例については[TextInput仕様書](./text-input-specification.md)を参照してください。

### PasswordInput固有の使用例

#### パスワード表示/非表示切り替え

```typescript
// 表示/非表示ボタンは自動的に提供される
<PasswordInput
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="パスワードを入力してください"
/>
```

#### エラー状態での使用

```typescript
<PasswordInput
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="パスワードを入力してください"
  isError={true}
/>
```

## アクセシビリティ

基本的なアクセシビリティ機能はTextInputと同じです。詳細については[TextInput仕様書](./text-input-specification.md)を参照してください。

### PasswordInput固有のアクセシビリティ

- 表示/非表示ボタンには適切な`aria-label`が設定される：
  - 非表示状態: `'パスワードを表示する'`
  - 表示状態: `'パスワードを非表示にする'`
- 表示/非表示ボタンは`IconButton`コンポーネントを使用し、適切なアクセシビリティ属性を持つ
- `disabled`状態では表示/非表示ボタンも無効化される

## 技術的な詳細

### 実装について

- `TextInput`コンポーネントをベースに構築
- `forwardRef`を使用してref転送をサポート
- 内部で`useState`を使用してパスワード表示状態を管理
- 表示/非表示ボタンは`IconButton`コンポーネントを使用
- `after`プロパティを使用して表示/非表示ボタンを配置
- パスワード表示状態に応じて`type`属性を動的に切り替え：
  - 非表示: `type="password"`
  - 表示: `type="text"`

### 型安全性

```typescript
// ✅ 正しい使用
<PasswordInput value={password} onChange={handleChange} />
<PasswordInput value={password} isError={true} />
<PasswordInput value={password} size="large" />

// ❌ コンパイルエラー
<PasswordInput /> // valueは必須
<PasswordInput value={password} type="text" /> // typeは制御不可
<PasswordInput value={password} onClickClearButton={handleClear} /> // クリアボタンは提供されない
```

### パスワード表示/非表示機能

- 初期状態ではパスワードは非表示（`type="password"`）
- 表示/非表示ボタンをクリックすると状態が切り替わる
- ボタンのアイコンも状態に応じて変更される：
  - 非表示状態: `visibility`アイコン
  - 表示状態: `visibility-off`アイコン
- `disabled`状態では表示/非表示ボタンも無効化される

## 注意事項

1. `value`プロパティは必須です
2. `type`プロパティは制御できません（表示/非表示切り替えにより自動制御）
3. `onClickClearButton`プロパティは使用できません（パスワード入力ではクリアボタンは提供されない）
4. エラー状態は無効状態よりも優先度が低く、無効時はエラースタイルが適用されません
5. 表示/非表示ボタンは常に表示され、ユーザーがパスワードの可視性を制御できます
6. `disabled`状態では表示/非表示ボタンも無効化されます
7. コンポーネントは`TextInput`をベースにしているため、`TextInput`のすべての機能を継承します

## スタイルのカスタマイズ

基本的なスタイルカスタマイズはTextInputと同じです。詳細については[TextInput仕様書](./text-input-specification.md)を参照してください。

### PasswordInput固有のカスタマイズ

- 表示/非表示ボタンのスタイル（`IconButton`コンポーネントの設定）
- 表示/非表示ボタン用の右パディング調整

## 更新履歴

| 日付       | 内容     | 担当者 |
| ---------- | -------- | ------ |
| 2025-10-10 | 新規作成 | -      |
