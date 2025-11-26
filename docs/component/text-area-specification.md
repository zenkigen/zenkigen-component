# TextArea コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
   - [排他的プロパティグループ](#排他的プロパティグループ)
   - [高さとリサイズ制御の詳細](#高さとリサイズ制御の詳細)
   - [継承プロパティ](#継承プロパティ)
5. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [状態に応じたスタイル](#状態に応じたスタイル)
   - [プレースホルダー](#プレースホルダー)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [リサイズ可能なテキストエリア](#リサイズ可能なテキストエリア)
   - [自動高さ調整](#自動高さ調整)
   - [エラー状態](#エラー状態)
   - [無効状態](#無効状態)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
   - [実装について](#実装について)
   - [型安全性](#型安全性)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

TextAreaコンポーネントは、複数行テキスト入力を提供するUIコンポーネントです。リサイズ機能、自動高さ調整、エラー状態の表示など、様々な機能を持つ高機能なテキストエリアコンポーネントです。

## インポート

```typescript
import { TextArea } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';
import { TextArea } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  const [value, setValue] = useState('');

  return (
    <TextArea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="入力してください"
    />
  );
};
```

## Props

### 必須プロパティ

| プロパティ | 型       | 説明                     |
| ---------- | -------- | ------------------------ |
| `value`    | `string` | テキストエリアの現在の値 |

### オプションプロパティ

| プロパティ    | 型                        | デフォルト値 | 説明                     |
| ------------- | ------------------------- | ------------ | ------------------------ |
| `size`        | `'medium' \| 'large'`     | `'medium'`   | コンポーネントのサイズ   |
| `height`      | `CSSProperties['height']` | `undefined`  | 高さの指定               |
| `isError`     | `boolean`                 | `false`      | エラー状態かどうか       |
| `disabled`    | `boolean`                 | `false`      | 無効状態かどうか         |
| `placeholder` | `string`                  | `undefined`  | プレースホルダーテキスト |

### 排他的プロパティグループ

#### 自動高さモード（autoHeight: true）

| プロパティ    | 型                           | デフォルト値 | 説明                       |
| ------------- | ---------------------------- | ------------ | -------------------------- |
| `autoHeight`  | `true`                       | -            | 自動高さ調整を有効にする   |
| `maxHeight`   | `CSSProperties['maxHeight']` | `undefined`  | 最大高さの制限             |
| `isResizable` | `never`                      | -            | 自動高さモードでは使用不可 |

#### 手動リサイズモード（autoHeight: false または未指定）

| プロパティ    | 型                   | デフォルト値 | 説明                                     |
| ------------- | -------------------- | ------------ | ---------------------------------------- |
| `autoHeight`  | `false \| undefined` | `false`      | 自動高さ調整を無効にする                 |
| `isResizable` | `boolean`            | `false`      | ユーザーによるリサイズを許可するかどうか |
| `maxHeight`   | `never`              | -            | 手動リサイズモードでは使用不可           |

### 高さとリサイズ制御の詳細

#### 高さ指定の優先順位

1. **自動高さモード（autoHeight: true）**

   ```typescript
   // heightが指定されている場合はminHeightとして使用
   <TextArea autoHeight height="80px" maxHeight="200px" />
   ```

2. **手動モード（autoHeight: false）**
   ```typescript
   // heightが指定されている場合はheightとして使用
   <TextArea height="120px" isResizable={true} />
   ```

#### リサイズ制御

- `isResizable: false`（デフォルト）: `resize-none` が適用される
- `isResizable: true`: ユーザーによるリサイズが可能
- `autoHeight: true` の場合、`isResizable` は使用できない

### 継承プロパティ

`TextareaHTMLAttributes<HTMLTextAreaElement>` のすべてのプロパティが使用可能です（`value`以外）。

## 状態とスタイル

### サイズバリエーション

#### Medium（デフォルト）

- パディング: `px-2 pt-1.5 pb-2`
- タイポグラフィ: `typography-body14regular`

#### Large

- パディング: `px-3.5 py-2.5`
- フォントサイズ: `text-4`
- ライン高: `leading-normal`

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
<TextArea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="メッセージを入力してください"
  size="medium"
  height="120px"
/>
```

### リサイズ可能なテキストエリア

```typescript
<TextArea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="リサイズ可能です"
  size="large"
  height="100px"
  isResizable={true}
/>
```

### 自動高さ調整

```typescript
<TextArea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="自動で高さが調整されます"
  autoHeight={true}
  maxHeight="200px"
  height="60px" // minHeightとして使用される
/>
```

### エラー状態

```typescript
<TextArea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="エラー状態です"
  isError={true}
/>
```

### ヘルパー/エラーメッセージ付き

```typescript
<TextArea value={value} onChange={(e) => setValue(e.target.value)} isError>
  <TextArea.HelperMessage>入力時の補足説明</TextArea.HelperMessage>
  <TextArea.ErrorMessage>バリデーションエラー</TextArea.ErrorMessage>
</TextArea>
```

### 無効状態

```typescript
<TextArea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="編集できません"
  disabled={true}
/>
```

## アクセシビリティ

- `forwardRef`を使用してDOM要素への参照をサポート
- 標準的な`<textarea>`要素のすべてのアクセシビリティ機能を継承
- `disabled`属性が適切に設定される
- フォーカス管理が適切に実装されている
- `TextArea.HelperMessage` / `TextArea.ErrorMessage` を子要素に配置すると、自動で`aria-describedby`が連結される
- `isError`がtrueのとき、`aria-invalid=true`が付与され、`TextArea.ErrorMessage`は`aria-live="assertive"`で通知される

## 技術的な詳細

### 実装について

- `forwardRef`を使用してref転送をサポート
- `clsx`を使用した動的クラス名の生成
- TypeScriptの排他的ユニオン型を使用した安全な型定義
- CSS Grid の `field-sizing: content` を使用した自動高さ調整

### 型安全性

自動高さモードと手動リサイズモードは排他的に設計されており、TypeScriptの型システムにより誤った組み合わせを防ぎます：

```typescript
// ✅ 正しい使用
<TextArea autoHeight={true} maxHeight="200px" />
<TextArea isResizable={true} />

// ❌ コンパイルエラー
<TextArea autoHeight={true} isResizable={true} />
<TextArea maxHeight="200px" isResizable={true} />
```

## 注意事項

1. `value`プロパティは必須です
2. `autoHeight`と`isResizable`は同時に使用できません
3. `maxHeight`は`autoHeight: true`の場合のみ有効です
4. エラー状態は無効状態よりも優先度が低く、無効時はエラースタイルが適用されません
5. コンポーネントは`div`要素でラップされており、`flex`クラスが適用されています
6. `TextArea.HelperMessage` / `TextArea.ErrorMessage` は TextArea の子要素としてのみ使用してください。単独ではコンテキストエラーになります。

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config`で定義されたデザイントークンに依存しています。カスタマイズする場合は、これらの設定を参照してください。

## 更新履歴

| 日付                 | 内容                                                          | 担当者 |
| -------------------- | ------------------------------------------------------------- | ------ |
| 2025-11-26 10:36 JST | ヘルパー/エラーメッセージを追加し、アクセシビリティ仕様を更新 | -      |
| 2025-08-18           | 新規作成                                                      | -      |
