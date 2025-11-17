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

TextInputコンポーネントは、単一行のテキスト入力を提供するUIコンポーネントである。サイズ指定、エラー表示、クリアボタン表示に加え、メッセージ/エラー用スロットを子要素として受け取り、用途に応じた構造を組み立てられる。

## インポート

```typescript
import { TextInput } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

### コンポジション API（推奨）

```typescript
import { useMemo, useState, type ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextInput } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  const [value, setValue] = useState('');
  const maxLength = 20;
  const isLimitExceeded = value.length > maxLength;

  return (
    <TextInput
      value={value}
      isError={isLimitExceeded}
      onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
      onClickClearButton={() => setValue('')}
      placeholder="メールアドレスを入力してください"
    >
      <TextInput.HelperTexts>
        <TextInput.HelperText>入力例: sample@example.com</TextInput.HelperText>
        <TextInput.HelperText>{`現在の文字数: ${value.length} / ${maxLength}`}</TextInput.HelperText>
      </TextInput.HelperTexts>
      <TextInput.Errors>
        <TextInput.Error>{`最大 ${maxLength} 文字まで入力できます。`}</TextInput.Error>
      </TextInput.Errors>
    </TextInput>
  );
};
```

> `<TextInput>` は内部で入力欄を自動で描画する。子要素にはメッセージ/エラー行のみを配置し、必要なときだけ `<TextInput.HelperTexts>`・`<TextInput.Errors>` を追加する。

## Props

### 必須プロパティ

| プロパティ | 型       | 説明                 |
| ---------- | -------- | -------------------- |
| `value`    | `string` | 入力の現在の値である |

### オプションプロパティ

| プロパティ           | 型                                              | デフォルト値 | 説明                                                                                                           |
| -------------------- | ----------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| `size`               | `'medium' \| 'large'`                           | `'medium'`   | コンポーネントのサイズを指定する                                                                               |
| `children`           | `ReactNode`                                     | `undefined`  | メッセージ/エラースロットなどの子要素。`<TextInput.HelperTexts>` / `<TextInput.Errors>` を必要に応じて追加する |
| `isError`            | `boolean`                                       | `false`      | エラー状態かどうかを指定する                                                                                   |
| `disabled`           | `boolean`                                       | `false`      | 入力を無効化するかどうかを指定する（継承）                                                                     |
| `placeholder`        | `string`                                        | `undefined`  | プレースホルダーテキストを指定する（継承）                                                                     |
| `type`               | `InputHTMLAttributes<HTMLInputElement>['type']` | `'text'`     | 入力タイプ（例: `'text'`, `'number'`, `'password'` など）（継承）                                              |
| `onClickClearButton` | `() => void`                                    | `undefined`  | クリアボタン押下時のハンドラ。指定時かつ値が空でない場合のみ表示する                                           |

### 継承プロパティ

`InputHTMLAttributes<HTMLInputElement>` のすべてのプロパティが使用可能である（ネイティブの `size` は除外）。

### サブコンポーネント（コンポジション API）

- `TextInput.HelperTexts`
  - 情報・補助テキストのラッパー。`Children.count(children) === 0` の場合は DOM を出力しない。
  - デフォルトクラス: `flex flex-col gap-1`。
- `TextInput.HelperText`
  - 任意の `id` を指定可能（省略時は自動生成）。登録済み ID は TextInput 本体の `aria-describedby` に追加される。
  - タイポグラフィ: `size='medium'` は `typography-label11regular text-text02`、`size='large'` は `typography-label12regular text-text02`。
- `TextInput.Errors`
  - エラーメッセージのラッパー。子要素が無い場合は描画せず、`flex flex-col gap-1` クラスを共有する。
- `TextInput.Error`
  - `role='alert'`, `aria-live='assertive'` をデフォルト設定し、TextInput 本体の `aria-describedby` に連携させる。
  - タイポグラフィ: `size='medium'` は `typography-label11regular text-supportError`、`size='large'` は `typography-label12regular text-supportError`。

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
- `<TextInput.HelperTexts>` / `<TextInput.Errors>` ラッパー: `flex flex-col gap-1`。子要素が 0 件の場合は DOM を生成しない。
- `<TextInput.HelperText>`: `size='medium'` は `typography-label11regular text-text02`、`size='large'` は `typography-label12regular text-text02`。
- `<TextInput.Error>`: `size='medium'` は `typography-label11regular text-supportError`、`size='large'` は `typography-label12regular text-supportError`。

## 使用例

> すべての例は実在APIで成立する。

### 基本的な使用例

```typescript
<TextInput
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="入力してください"
  onClickClearButton={() => setValue('')}
>
  <TextInput.HelperTexts>
    <TextInput.HelperText>全角 20 文字以内で入力してください</TextInput.HelperText>
  </TextInput.HelperTexts>
</TextInput>
```

### サイズバリエーション

```typescript
// medium（デフォルト）
<TextInput value={value} size="medium" onChange={(e) => setValue(e.target.value)}>
</TextInput>

// large
<TextInput value={value} size="large" onChange={(e) => setValue(e.target.value)}>
  <TextInput.HelperTexts>
    <TextInput.HelperText>ラージサイズでは typography-label12regular が適用される</TextInput.HelperText>
  </TextInput.HelperTexts>
</TextInput>
```

### エラー状態

```typescript
<TextInput
  value={value}
  isError={true}
  placeholder="エラー状態です"
  onChange={(e) => setValue(e.target.value)}
  onClickClearButton={() => setValue('')}
>
  <TextInput.Errors>
    <TextInput.Error>必須項目です</TextInput.Error>
  </TextInput.Errors>
</TextInput>
```

### 無効状態

```typescript
<TextInput value={value} disabled={true} placeholder="編集できません" onChange={(e) => setValue(e.target.value)}>
</TextInput>
```

### 数値入力

```typescript
<TextInput value={value} type="number" onChange={(e) => setValue(e.target.value)}>
</TextInput>
```

### パスワード入力

```typescript
<TextInput
  value={value}
  type="password"
  onChange={(e) => setValue(e.target.value)}
  onClickClearButton={() => setValue('')}
>
</TextInput>
```

### クリアボタンなし

```typescript
<TextInput value={value} onChange={(e) => setValue(e.target.value)}>
</TextInput>
```

## アクセシビリティ

- `forwardRef` により DOM 要素への参照とフォーカスマネージメントを行える。
- `TextInput.Error` は `role="alert"` `aria-live="assertive"` がデフォルトであり、エラー発生時に支援技術へ即座に通知される。
- クリアボタンは `IconButton`（`button` 要素）で実装し、タブフォーカス可能。`disabled` または入力値が空の場合は DOM から除外される。
- ラベル要素は含まれないため、フォーム利用時は外部で `<label>` と `htmlFor` を設定するか、`aria-labelledby` を用いること。
- `TextInput.HelperTexts` / `TextInput.Errors` は子要素が無いとレンダリングされず、空グループが支援技術に通知されない。

## 技術的な詳細

- `TextInput` は `forwardRef` + `TextInputCompoundContext` で構成され、常に内部で input を描画し、その下に子要素（メッセージ/エラー）を並べる。
- `TextInput.HelperText` / `TextInput.Error` は `useId` と登録関数で ID を管理し、`aria-describedby` を自動連結する。
- クラス結合は `clsx` を用い、`size`, `isError`, `disabled` に応じたユーティリティを適用する。ネイティブ `size` 属性は常に `1` とし、幅はレイアウトで制御する。
- クリアボタンは `IconButton`（`variant="text"`, `icon="close"`, `size="small"`）として描画され、表示条件は「`onClickClearButton` が存在し値が空でなく、かつ `disabled` ではない」場合である。
- `TextInput.HelperTexts` / `TextInput.Errors` は `Children.count` を利用して空ノードを抑止する。
- 内部向け `TextInputInternalProps` には `after?: ReactNode` が含まれ、旧 API や一部ラップコンポーネントで末尾アイコンなどを挿入できる（公開 API ではない）。

## 注意事項

1. `value` は常に制御し、`onChange` で最新値を反映させる。
2. 子要素にはメッセージ/エラー用の要素のみを配置する（input は TextInput が自動描画する）。
3. クリアボタンは `onClickClearButton` 指定時にのみ表示され、値が空または `disabled` の場合は非表示である。
4. ラベル要素は含まれないため、フォーム側で `<label>` を関連付けるか `aria-labelledby` を設定する。
5. `type` はネイティブ入力タイプをそのまま使用できる（`'text'`, `'number'`, `'password'` など）。

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config` で定義されたデザイントークンに依存している。カスタマイズする場合は、当該設定を参照すること。

## 更新履歴

| 日付                 | 内容                                                    | 担当者 |
| -------------------- | ------------------------------------------------------- | ------ |
| 2025-11-14 15:59 JST | コンポジション API 仕様・使用例・a11y 記述を全面更新    | -      |
| 2025-10-17 09:39 JST | 内部実装用 `after` プロパティについての技術的詳細を追記 | -      |
| 2025-10-17 09:17 JST | 新規作成                                                | -      |
