# PasswordInput コンポーネント仕様書

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
   - [状態に応じたスタイル](#状態に応じたスタイル)
   - [PasswordInput固有のスタイル](#passwordinput固有のスタイル)
7. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [サイズバリエーション](#サイズバリエーション-1)
   - [ヘルパー/エラーメッセージ](#ヘルパーエラーメッセージ)
   - [無効状態](#無効状態)
   - [パスワード表示/非表示切り替え](#パスワード表示非表示切り替え)
8. [アクセシビリティ](#アクセシビリティ)
9. [技術的な詳細](#技術的な詳細)
10. [注意事項](#注意事項)
11. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
12. [更新履歴](#更新履歴)

---

## 概要

PasswordInput コンポーネントは TextInput をベースに、パスワードの表示/非表示を切り替えるトグルボタンを末尾に備えた入力コンポーネントである。TextInput と同じ API とスタイル体系を継承しつつ、クリアボタンを排除し、HelperMessage / ErrorMessage を子要素として受け取れる。

## インポート

```typescript
import { PasswordInput } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState, type ChangeEvent } from 'react';
import { PasswordInput } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  const [password, setPassword] = useState('');

  return (
    <PasswordInput
      value={password}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      placeholder="パスワードを入力してください"
    />
  );
};
```

## Props

### 必須プロパティ

| プロパティ | 型       | 説明                       |
| ---------- | -------- | -------------------------- |
| `value`    | `string` | パスワード入力の現在の値。 |

### オプションプロパティ

| プロパティ    | 型                    | デフォルト値 | 説明                                                                   |
| ------------- | --------------------- | ------------ | ---------------------------------------------------------------------- |
| `size`        | `'medium' \| 'large'` | `'medium'`   | コンポーネントのサイズ。タイポグラフィ・高さ・パディングが変わる。     |
| `isError`     | `boolean`             | `false`      | エラー状態かどうか。`true` でボーダー/テキスト色をエラー用に変更する。 |
| `disabled`    | `boolean`             | `false`      | 入力とトグルボタンの双方を無効化する。                                 |
| `placeholder` | `string`              | `undefined`  | プレースホルダー（継承）。                                             |

### 継承プロパティ

`ComponentPropsWithoutRef<typeof TextInput>` から `type` と `onClickClearButton` を除外したすべてのプロパティが使用できる（ベースは `InputHTMLAttributes<HTMLInputElement>` でネイティブの `size` は除外）。主なもの:

- `onChange` / `onFocus` / `onBlur` などのイベントハンドラ
- `id`, `maxLength`, `readOnly`, `aria-*` 系属性

**除外されるプロパティ**

- `type` — 表示/非表示の切り替えで内部的に `password` / `text` を切り替えるため指定不可。
- `onClickClearButton` — パスワード入力ではクリアボタンを提供しない。
- `className` — 独自クラスによるスタイル上書きは許可しない。

## コンポジション（子コンポーネント）

PasswordInput は TextInput と同じくメッセージコンポーネントを子要素として受け取り、`aria-describedby` を自動連結する。

| コンポーネント                | 説明                                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `PasswordInput.HelperMessage` | 入力補足文。レンダー時に `aria-describedby` に ID が追加される。複数指定可。                                              |
| `PasswordInput.ErrorMessage`  | `isError === true` のときのみ描画されるエラーメッセージ。描画されると `aria-describedby` と `aria-invalid` の計算に参加。 |

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

- 通常: ボーダー `border-uiBorder02`、テキスト色 `text-text01`。ホバーで `hover:border-hoverInput`、フォーカス内で `focus-within:border-activeInput`。
- エラー（`isError: true`）: ボーダー `border-supportError`、テキスト色 `text-supportError`。ホバー/フォーカスでもエラースタイルを維持。
- 無効（`disabled: true`）: 背景 `bg-disabled02`、ボーダー `border-disabled01`。ホバーやエラー用ボーダーは適用されない。

### PasswordInput固有のスタイル

- 末尾にパスワード表示/非表示トグルボタン（`IconButton`）を常に表示。
- トグルボタンが入るため、コンテナには `pr-2`（medium）/`pr-3`（large）が付与され、入力本体は `pr-0` で余白調整される。
- トグルボタンは `variant="text"`, `size="small"`, `icon="visibility"` / `"visibility-off"` を状態に応じて切り替える。
- `disabled` 時はトグルボタンも無効化される。

## 使用例

> すべて実在の API で成立する例。

### 基本的な使用例

```typescript
<PasswordInput
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="パスワードを入力してください"
/>
```

### サイズバリエーション

```typescript
// medium（デフォルト）
<PasswordInput value={password} size="medium" onChange={(e) => setPassword(e.target.value)} />

// large
<PasswordInput value={password} size="large" onChange={(e) => setPassword(e.target.value)} />
```

### ヘルパー/エラーメッセージ

```typescript
<PasswordInput
  value={password}
  isError={password.length < 8}
  onChange={(e) => setPassword(e.target.value)}
>
  <PasswordInput.HelperMessage>8文字以上で入力してください</PasswordInput.HelperMessage>
  <PasswordInput.ErrorMessage>入力内容にエラーがあります</PasswordInput.ErrorMessage>
</PasswordInput>
```

### 無効状態

```typescript
<PasswordInput value="readonly-password" disabled onChange={() => {}} />
```

### パスワード表示/非表示切り替え

```typescript
// トグルボタンは常に末尾に表示され、クリックで type を password/text に切り替える
<PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
```

## アクセシビリティ

- `forwardRef` により入力要素への参照を転送可能。
- トグルボタンには状態に応じて `aria-label` を付与する（非表示時: 「パスワードを表示する」、表示時: 「パスワードを非表示にする」）。
- `PasswordInput.HelperMessage` / `PasswordInput.ErrorMessage` の ID と `aria-describedby` プロパティを結合して `aria-describedby` を自動設定。
- `aria-invalid` は `isError === true` または ErrorMessage が描画される場合に自動的に `true` となる（明示指定がある場合はそれを優先）。
- 入力はラベルを含まないため、フォームで使用する際は外部で `<label>` と関連付けること。
- `disabled` は入力とトグルボタンの双方に付与される。

## 技術的な詳細

- 型: `Props = Omit<ComponentPropsWithoutRef<typeof TextInput>, 'type' | 'onClickClearButton'>` で公開 API から `type` と `onClickClearButton` をコンパイル時に除外。
- 実装: `useState` で表示状態を管理し、`type` を `password` / `text` に動的切り替え。初期値は非表示（`password`）。
- トグルボタン: `IconButton`（`variant="text"`, `size="small"`、アイコンは `visibility` / `visibility-off`）。`aria-label` を状態に応じて付与し、`disabled` を連動。
- レイアウト: `InternalTextInput` の `after` スロットにトグルボタンを渡し、TextInput 側で余白調整とスタイルを一括管理。
- コンポジション: `Object.assign` で `HelperMessage` / `ErrorMessage` を静的プロパティとして付与し、`displayName` を `PasswordInput` として設定。
- メッセージ: `ErrorMessage` は `aria-live="assertive"`（デフォルト）で、`isError` が `true` のときのみレンダーされる。

## 注意事項

1. `value` は必須。制御コンポーネントとして使用すること。
2. `type` は指定できない。表示/非表示トグルが内部で制御する。
3. クリアボタンは存在しないため `onClickClearButton` は使用できない。
4. `className` によるスタイル上書きは不可。提供されたスタイルで利用すること。
5. `PasswordInput.ErrorMessage` を表示したい場合は必ず `isError` を `true` にすること（`false` の場合は描画されない）。
6. メッセージ系子コンポーネントは PasswordInput 直下に置くこと（コンテキスト外では動作しない）。
7. `disabled` のときはトグルボタンも無効となり、ボーダーはエラー色にならない。
8. ラベル要素は含まれない。必要に応じて外部で `<label htmlFor={id}>` を関連付けること。

## スタイルのカスタマイズ

TextInput と同じく Tailwind CSS のユーティリティクラスとテーマトークンに依存する。テーマの調整は [TextInput仕様書](./text-input-specification.md) の方針に従い、末尾ボタンを含む右側余白は TextInput 側で管理される。

## 更新履歴

| 日付                 | 内容                                                                                  | 担当者 |
| -------------------- | ------------------------------------------------------------------------------------- | ------ |
| 2025-11-25 10:51 JST | 実装に合わせて Props/コンポジション/アクセシビリティ/スタイル仕様を全面的に整理・追記 | -      |
| 2025-10-10           | 新規作成                                                                              | -      |
