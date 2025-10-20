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
   - [その他のスタイル仕様](#その他のスタイル仕様)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [サイズバリエーション](#サイズバリエーション-1)
   - [エラー状態](#エラー状態)
   - [無効状態](#無効状態)
   - [数値入力](#数値入力)
   - [パスワード入力](#パスワード入力)
   - [クリアボタンなし](#クリアボタンなし)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

TextInputコンポーネントは、単一行のテキスト入力を提供するUIコンポーネントである。サイズ指定、エラー表示、クリアボタン表示（任意）などの機能を備える。

## インポート

```typescript
import { TextInput } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState, type ChangeEvent } from 'react';
import { TextInput } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  const [value, setValue] = useState('');

  return (
    <TextInput
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      placeholder="入力してください"
      onClickClearButton={() => setValue('')}
    />
  );
};
```

## Props

### 必須プロパティ

| プロパティ | 型       | 説明                 |
| ---------- | -------- | -------------------- |
| `value`    | `string` | 入力の現在の値である |

### オプションプロパティ

| プロパティ           | 型                                              | デフォルト値 | 説明                                                                 |
| -------------------- | ----------------------------------------------- | ------------ | -------------------------------------------------------------------- |
| `size`               | `'medium' \| 'large'`                           | `'medium'`   | コンポーネントのサイズを指定する                                     |
| `isError`            | `boolean`                                       | `false`      | エラー状態かどうかを指定する                                         |
| `disabled`           | `boolean`                                       | `false`      | 入力を無効化するかどうかを指定する（継承）                           |
| `placeholder`        | `string`                                        | `undefined`  | プレースホルダーテキストを指定する（継承）                           |
| `type`               | `InputHTMLAttributes<HTMLInputElement>['type']` | `'text'`     | 入力タイプ（例: `'text'`, `'number'`, `'password'` など）（継承）    |
| `onClickClearButton` | `() => void`                                    | `undefined`  | クリアボタン押下時のハンドラ。指定時かつ値が空でない場合のみ表示する |

### 継承プロパティ

`InputHTMLAttributes<HTMLInputElement>` のすべてのプロパティが使用可能である（ネイティブの `size` は除外）。

## 状態とスタイル

### サイズバリエーション

- `medium`（デフォルト）
  - タイポグラフィ: `typography-label14regular`
  - 高さ: `min-h-8`
  - パディング: `px-2`
- `large`
  - タイポグラフィ: `typography-label16regular`
  - 高さ: `min-h-10`
  - パディング: `px-3`

### 状態に応じたスタイル

- 通常状態
  - ボーダー: `border-uiBorder02`
  - テキスト色: `text-text01`
  - ホバー時: `hover:border-hoverInput`
  - フォーカス（フォーカス内）: `focus-within:border-activeInput`
- エラー状態（`isError: true`）
  - ボーダー: `border-supportError`
  - テキスト色: `text-supportError`
  - ホバー時/フォーカス時もエラースタイルを維持
- 無効状態（`disabled: true`）
  - 背景: `bg-disabled02`
  - ボーダー: `border-disabled01`
  - プレースホルダー色: `placeholder:text-textPlaceholder`
  - エラースタイルは適用されない

### その他のスタイル仕様

- コンテナ: `relative flex items-center gap-2 overflow-hidden rounded border`
- 入力: `flex-1 outline-0 placeholder:text-textPlaceholder disabled:text-textPlaceholder`
- クリアボタン表示時、右側パディングを調整する（`pr-2`/`pr-3` 付与、入力側は `pr-0`）

## 使用例

> すべての例は実在APIで成立する。

### 基本的な使用例

```typescript
<TextInput
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="入力してください"
  onClickClearButton={() => setValue('')}
/>
```

### サイズバリエーション

```typescript
// medium（デフォルト）
<TextInput value={value} size="medium" onChange={(e) => setValue(e.target.value)} />

// large
<TextInput value={value} size="large" onChange={(e) => setValue(e.target.value)} />
```

### エラー状態

```typescript
<TextInput
  value={value}
  isError={true}
  placeholder="エラー状態です"
  onChange={(e) => setValue(e.target.value)}
  onClickClearButton={() => setValue('')}
/>
```

### 無効状態

```typescript
<TextInput value={value} disabled={true} placeholder="編集できません" onChange={(e) => setValue(e.target.value)} />
```

### 数値入力

```typescript
<TextInput value={value} type="number" onChange={(e) => setValue(e.target.value)} />
```

### パスワード入力

```typescript
<TextInput
  value={value}
  type="password"
  onChange={(e) => setValue(e.target.value)}
  onClickClearButton={() => setValue('')}
/>
```

### クリアボタンなし

```typescript
<TextInput value={value} onChange={(e) => setValue(e.target.value)} />
```

## アクセシビリティ

- `forwardRef`によりDOM要素への参照をサポートする。
- 標準的な`<input>`要素のアクセシビリティ特性を継承する。
- `disabled`属性が適切に設定される。
- クリアボタンはボタン要素（`IconButton`）で提供され、キーボード操作でフォーカス可能である（`disabled`時は非表示）。
- ラベル要素は含まれないため、フォームで使用する場合は外部で`<label>`と関連付けること。

## 技術的な詳細

- `forwardRef<HTMLInputElement, Props>` を使用してref転送をサポートする。
- クラス名の組み立てに `clsx` を使用する。
- クリアボタンの表示条件は「`onClickClearButton` が指定され、`value` が空ではなく、かつ `disabled` ではない」場合である。
- ネイティブ`size`属性は内部で `size={1}` を設定し、見た目の幅はレイアウトクラスで制御する。
- クリアボタンは `IconButton`（`variant="text"`, `icon="close"`, `size="small"`）で実装され、`@zenkigen-inc/component-icons` の `Icon` を内部で利用する。

## 注意事項

1. `value` は必須であり、制御コンポーネントとして使用すること。
2. クリアボタンを表示したい場合は `onClickClearButton` を指定すること。`value` が空、もしくは `disabled` の場合は表示されない。
3. 本コンポーネントはラベル要素を含まない。アクセシビリティのため外部で適切にラベル付けを行うこと。
4. `type` はネイティブの入力タイプを使用できる（`'number'`, `'password'` など）。

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config` で定義されたデザイントークンに依存している。カスタマイズする場合は、当該設定を参照すること。

## 更新履歴

| 日付                 | 内容     | 担当者 |
| -------------------- | -------- | ------ |
| 2025-10-17 09:17 JST | 新規作成 | -      |
