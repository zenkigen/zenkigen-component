# TextInput コンポーネント仕様書

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
   - [サイズバリエーション](#サイズバリエーション)
   - [バリアントによるスタイル](#バリアントによるスタイル)
   - [状態に応じたスタイル](#状態に応じたスタイル)
   - [その他のスタイル仕様](#その他のスタイル仕様)
7. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [サイズバリエーション](#サイズバリエーション-1)
   - [エラー状態](#エラー状態)
   - [ヘルパー/エラーメッセージ](#ヘルパーエラーメッセージ)
   - [無効状態](#無効状態)
   - [Text バリアント（枠無し）](#text-バリアント枠無し)
   - [数値入力](#数値入力)
   - [パスワード入力](#パスワード入力)
   - [クリアボタンなし](#クリアボタンなし)
8. [アクセシビリティ](#アクセシビリティ)
9. [技術的な詳細](#技術的な詳細)
10. [注意事項](#注意事項)
11. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
12. [更新履歴](#更新履歴)

---

## 概要

TextInputコンポーネントは、単一行のテキスト入力を提供するUIコンポーネントである。サイズ指定、エラー表示、クリアボタン表示（任意）に加え、補足文やエラーメッセージを子要素として受け取り、アクセシビリティ属性を自動的に付与する。

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
| `variant`            | `'outline' \| 'text'`                           | `'outline'`  | 表示バリアントを指定する。`'text'` はボーダーなしの枠無しスタイル    |
| `isError`            | `boolean`                                       | `false`      | エラー状態かどうかを指定する                                         |
| `disabled`           | `boolean`                                       | `false`      | 入力を無効化するかどうかを指定する（継承）                           |
| `placeholder`        | `string`                                        | `undefined`  | プレースホルダーテキストを指定する（継承）                           |
| `type`               | `InputHTMLAttributes<HTMLInputElement>['type']` | `'text'`     | 入力タイプ（例: `'text'`, `'number'`, `'password'` など）（継承）    |
| `onClickClearButton` | `() => void`                                    | `undefined`  | クリアボタン押下時のハンドラ。指定時かつ値が空でない場合のみ表示する |

> 注: 公開APIに `after` プロパティは存在しない。末尾に要素を差し込みたい場合は内部用の `InternalTextInput`（ライブラリ外には公開されない）でのみ `after?: ReactNode` が使用できる。
> 注: `className` による独自スタイルの上書きは不可（プロパティとして受け付けない）。

### 継承プロパティ

`InputHTMLAttributes<HTMLInputElement>` のすべてのプロパティが使用可能である（ネイティブの `size` は除外）。

## コンポジション（子コンポーネント）

TextInput は子要素としてメッセージコンポーネントを受け取り、`aria-describedby` を自動的に組み立てる。

| コンポーネント            | 説明                                                                                                              |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `TextInput.HelperMessage` | 入力補足文を表示する。レンダー時に `aria-describedby` に紐付けられる。複数配置可能。                              |
| `TextInput.ErrorMessage`  | `isError === true` のときのみ表示するエラーメッセージ。表示時に `aria-describedby` と `aria-invalid` を補助する。 |

## 状態とスタイル

### サイズバリエーション

- `medium`（デフォルト）
  - タイポグラフィ: `typography-label14regular`
  - 高さ: `min-h-8`
  - パディング: `px-2`（`variant="outline"` のみ。`variant="text"` ではパディングなし）
- `large`
  - タイポグラフィ: `typography-label16regular`
  - 高さ: `min-h-10`
  - パディング: `px-3`（`variant="outline"` のみ。`variant="text"` ではパディングなし）

### バリアントによるスタイル

#### Outline（デフォルト）

従来どおりのボーダー付きスタイル。

#### Text

ボーダーなし（`border-transparent`）の枠無しスタイル。入力欄のパディングは 0 となる。チャット入力欄やインライン編集など、枠を持たない UI に適する。

Outline との主な差分:

| 項目                  | Outline                            | Text                                   |
| --------------------- | ---------------------------------- | -------------------------------------- |
| ボーダー              | 状態に応じて変化                   | 常に `border-transparent`              |
| 入力パディング        | `px-2`（medium）/ `px-3`（large）  | なし                                   |
| 背景（通常）          | `bg-uiBackground01`                | `bg-uiBackground01`                    |
| 背景（無効）          | `bg-disabled02`                    | 変更なし（`bg-uiBackground01` のまま） |
| 無効時テキスト色      | `text-textPlaceholder`             | `text-disabled01`                      |
| エラー時placeholder色 | `placeholder:text-textPlaceholder` | `placeholder:text-supportErrorLight`   |
| クリアボタン右余白    | `pr-2`（medium）/ `pr-3`（large）  | なし                                   |

### 状態に応じたスタイル

#### Outline バリアント

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
  - テキスト色: `text-textPlaceholder`
  - プレースホルダー色: `placeholder:text-textPlaceholder`
  - エラースタイルは適用されない

#### Text バリアント

- 通常状態
  - ボーダー: `border-transparent`
  - テキスト色: `text-text01`
- エラー状態（`isError: true`）
  - ボーダー: `border-transparent`（変化なし）
  - テキスト色: `text-supportError`
  - プレースホルダー色: `placeholder:text-supportErrorLight`
- 無効状態（`disabled: true`）
  - ボーダー: `border-transparent`（変化なし）
  - 背景: 変更なし（`bg-uiBackground01` のまま）
  - テキスト色: `text-disabled01`
  - エラースタイルは適用されない

### その他のスタイル仕様

- コンテナ: `relative flex items-center gap-2 overflow-hidden rounded border`
- 入力: `flex-1 bg-transparent outline-none placeholder:text-textPlaceholder`
- クリアボタン表示時（Outline バリアント）、コンテナに右側パディングを付与する（`pr-2`/`pr-3`）。入力側は `pr-0` となる

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

### ヘルパー/エラーメッセージ

```typescript
<TextInput
  value={value}
  isError={true}
  onChange={(e) => setValue(e.target.value)}
  onClickClearButton={() => setValue('')}
>
  <TextInput.HelperMessage>○文字以内で入力してください</TextInput.HelperMessage>
  <TextInput.ErrorMessage>入力内容にエラーがあります</TextInput.ErrorMessage>
</TextInput>
```

### 無効状態

```typescript
<TextInput value={value} disabled={true} placeholder="編集できません" onChange={(e) => setValue(e.target.value)} />
```

### Text バリアント（枠無し）

```typescript
<TextInput
  value={value}
  variant="text"
  onChange={(e) => setValue(e.target.value)}
  placeholder="枠無しスタイルです"
  onClickClearButton={() => setValue('')}
/>
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
- `aria-describedby` は `TextInput.HelperMessage` / `TextInput.ErrorMessage` の ID と `aria-describedby` プロパティの値を結合して付与する。
- `aria-invalid` は `isError === true` またはエラーメッセージが描画される場合に自動的に `true` となる。`aria-invalid` を明示指定した場合はその値を優先する。

## 技術的な詳細

- `forwardRef<HTMLInputElement, Props>` を使用してref転送をサポートする。
- クラス名の組み立てに `clsx` を使用する。
- クリアボタンの表示条件は「`onClickClearButton` が指定され、`value` が空ではなく、かつ `disabled` ではない」場合である。
- ネイティブ`size`属性は内部で `size={1}` を設定し、見た目の幅はレイアウトクラスで制御する。
- クリアボタンは `IconButton`（`variant="text"`, `icon="close"`, `size="small"`）で実装され、`@zenkigen-inc/component-icons` の `Icon` を内部で利用する。
- 内部実装用に `after?: ReactNode` プロパティを持つ `InternalProps` 型が定義されており、入力欄の末尾にカスタム要素を配置できる（公開APIではない）。
- `TextInput.HelperMessage` はマウント時に `aria-describedby` へ ID を登録する。
- `TextInput.ErrorMessage` は `isError === true` のときのみレンダーされ、そのときのみ `aria-describedby` と `aria-invalid` の計算に参加する。

## 注意事項

1. `value` は必須であり、制御コンポーネントとして使用すること。
2. クリアボタンを表示したい場合は `onClickClearButton` を指定すること。`value` が空、もしくは `disabled` の場合は表示されない。
3. `className` による独自スタイルの注入はできない。提供されるスタイルで利用すること。
4. 本コンポーネントはラベル要素を含まない。アクセシビリティのため外部で適切にラベル付けを行うこと。
5. `type` はネイティブの入力タイプを使用できる（`'number'`, `'password'` など）。
6. `TextInput.ErrorMessage` を表示する場合は `isError` を `true` に設定すること（`false` の場合は描画されない）。
7. メッセージ系子コンポーネントは必ず `TextInput` 直下に配置すること（コンテキスト外ではエラーとなる）。

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config` で定義されたデザイントークンに依存している。カスタマイズする場合は、当該設定を参照すること。

## 更新履歴

| 日付                 | 内容                                                               | 担当者 |
| -------------------- | ------------------------------------------------------------------ | ------ |
| 2026-02-25 13:00 JST | `variant` プロパティ（`'outline' \| 'text'`）を追加し仕様を更新    | -      |
| 2025-11-25 11:23 JST | `className` によるスタイル上書きを不可とし仕様を追記               | -      |
| 2025-11-25 10:02 JST | 公開APIから `after` を除外した構成を反映し、内部専用である旨を明記 | -      |
| 2025-11-19 13:51 JST | ヘルパー/エラーメッセージのコンポジションAPIを反映                 | -      |
| 2025-10-17 09:39 JST | 内部実装用 `after` プロパティについての技術的詳細を追記            | -      |
| 2025-10-17 09:17 JST | 新規作成                                                           | -      |
