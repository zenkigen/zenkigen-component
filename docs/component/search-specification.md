# Search コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
   - [排他的プロパティグループ](#排他的プロパティグループ)
   - [特殊機能の詳細](#特殊機能の詳細)
   - [継承プロパティ](#継承プロパティ)
5. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [状態に応じたスタイル](#状態に応じたスタイル)
   - [その他のスタイル仕様](#その他のスタイル仕様)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [バリエーション例1](#バリエーション例1)
   - [バリエーション例2](#バリエーション例2)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
   - [実装について](#実装について)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

Searchコンポーネントは、検索キーワードを入力して送信するための単一行テキスト入力を提供するUIコンポーネントである。検索アイコンを備えた円形の入力フィールドと、任意のクリアボタンを組み合わせ、検索フォームを最小構成で提供する。

## インポート

```typescript
import { Search } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Search } from '@zenkigen-inc/component-ui';

const SearchExample = () => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // submit API
  };

  return (
    <Search
      value={keyword}
      placeholder="キーワードを入力"
      onChange={(event: ChangeEvent<HTMLInputElement>) => setKeyword(event.target.value)}
      onSubmit={handleSubmit}
      onClickClearButton={() => setKeyword('')}
    />
  );
};
```

## Props

### 必須プロパティ

| プロパティ | 型       | 説明               |
| ---------- | -------- | ------------------ |
| `value`    | `string` | 入力中のキーワード |

### オプションプロパティ

| プロパティ           | 型                                           | デフォルト値 | 説明                                                                                |
| -------------------- | -------------------------------------------- | ------------ | ----------------------------------------------------------------------------------- |
| `size`               | `'medium' \| 'large'`                        | `'medium'`   | サイズ                                                                              |
| `placeholder`        | `string`                                     | `undefined`  | 入力欄に表示するプレースホルダーテキスト                                            |
| `width`              | `string`                                     | `'100%'`     | 入力フィールドの幅（CSSの幅指定値を文字列で渡す）                                   |
| `onChange`           | `(e: ChangeEvent<HTMLInputElement>) => void` | `undefined`  | 入力値変更時に呼び出されるハンドラ。`value` を更新する処理を記述する                |
| `onSubmit`           | `(e: FormEvent<HTMLFormElement>) => void`    | `undefined`  | フォーム送信時に呼び出されるハンドラ。`event.preventDefault()` の明示呼び出しを推奨 |
| `onClickClearButton` | `() => void`                                 | `undefined`  | クリアボタンをクリックした際のハンドラ。指定されているかつ値が空でないときのみ表示  |

### 排他的プロパティグループ

本コンポーネントに排他的に組み合わせられるプロパティは存在しない。

### 特殊機能の詳細

#### クリアボタン

- `onClickClearButton` を設定すると、入力値が1文字以上のとき右端に `IconButton` を表示する。
- ボタンは `variant="text"` として描画され、`size` が `medium` のときは `IconButton` の `size="small"`、`large` のときは `size="medium"` を選択する。
- クリック時に内部状態は変更されないため、ハンドラ内で `value` を空にする処理を実装する。

### 継承プロパティ

`InputHTMLAttributes<HTMLInputElement>` のプロパティは、内部の `input` 要素にそのまま渡される（例: `autoComplete` / `name` / `id` / `aria-label` / `aria-describedby` / `onKeyDown` / `onFocus` / `onBlur`）。ただし以下は型で除外する（受け取らない）。

| 除外するプロパティ            | 理由                                                                                           |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| `size` / `width` / `onSubmit` | Search のプロパティとして別の意味で使う（`width` は外枠の幅、`onSubmit` は内部 `form` の送信） |
| `className` / `style`         | 見た目はコンポーネント側で固定する                                                             |
| `type`                        | 常に `text` として描画する                                                                     |
| `disabled`                    | 無効時のスタイルとクリアボタンの扱いを持たないため提供しない（[注意事項](#注意事項)を参照）    |

`ref` は従来どおり外側の `div` を指す（内部の `input` ではない）。

除外は型によるもので、実行時には取り除かない。型を介さずに渡された場合（オブジェクトを展開して渡す等）、`className` / `type` は上書きされるが、`style` / `disabled` は `input` に付く。

TextInput と同じく、以下は受け取るが Search 側で特別な扱いをしない。

- `readOnly`: 入力はできなくなるが、クリアボタンは表示され、押すと `onClickClearButton` が呼ばれる
- `defaultValue`: `value` が必須のため、渡すと React が制御／非制御の併用として警告を出す（表示は `value` が優先される）

#### ブラウザの自動入力を止める

プレースホルダーやラベルに「メールアドレス」などの語が含まれると、ブラウザが入力欄の種類を推測して保存済みの値を候補に出すことがある。検索欄で不要な場合は `autoComplete` で指定する。Search 自体は `autocomplete` 属性の既定値を持たない（指定しなければ属性を付けない）。

ただし、どの値で止まるかはブラウザとその版によって異なる。Chrome は `autoComplete="off"` を無視することがあるため、止まらない場合は別の値（例: `autoComplete="new-password"`。ブラウザによってはパスワードの提案が出る点に注意）も試すこと。

```tsx
<Search
  value={keyword}
  placeholder="名前・メールアドレスで検索"
  autoComplete="off"
  onChange={(event) => setKeyword(event.target.value)}
/>
```

## 状態とスタイル

### サイズバリエーション

- `medium`（デフォルト）
  - コンテナ: `h-8 px-3`
  - 入力テキスト: `typography-label14regular`
  - クリアボタンのアイコンサイズ: `small`
- `large`
  - コンテナ: `h-10 px-4`
  - 入力テキスト: `typography-label16regular`
  - クリアボタンのアイコンサイズ: `medium`

### 状態に応じたスタイル

- 通常状態
  - 背景: `bg-uiBackground01`
  - ボーダー: `border-uiBorder02`
  - テキストカラー: `text-text01`
  - プレースホルダー: `text-textPlaceholder`
- フォーカス（入力がフォーカスまたは内包要素がフォーカスされた状態）
  - `focus-within:border-activeInput` によりボーダー色をアクティブカラーへ変更する
- 値あり状態
  - `onClickClearButton` が設定されている場合のみクリアボタンを表示し、操作可能な状態を示す

### その他のスタイル仕様

- 角丸: 常に `rounded-full`
- 左端: `Icon` コンポーネントで検索アイコン（`name="search"`, `size="medium"`, `color="icon01"`）を表示する
- 入力: `mx-2 h-full flex-1 outline-0` で横幅を占有し、`size={1}` で余白を抑制する
- ラッパー: `div.relative > form > div` の構造を取り、`style={{ width }}` で幅を直接制御する

## 使用例

### 基本的な使用例

```typescript
import { ChangeEvent, useState } from 'react';
import { Search } from '@zenkigen-inc/component-ui';

const BasicSearch = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <Search
      value={keyword}
      placeholder="人名で検索"
      onChange={(event: ChangeEvent<HTMLInputElement>) => setKeyword(event.target.value)}
      onClickClearButton={() => setKeyword('')}
    />
  );
};
```

## アクセシビリティ

- 入力欄自体は標準の `input type="text"` であり、スクリーンリーダーから利用できる。
- アイコン類は装飾目的であり、入力欄の名前は別途与えること。画面にラベルを表示する場合は `<label htmlFor>` と `id` で関連付け、表示しない場合は `aria-label` を指定する。
- クリアボタンは `button` 要素として描画され、キーボード操作とフォーカスリング（`focus-visible`）に対応する `IconButton` を利用する。
- フォーカス可視化は `focus-within` によるボーダーの色変化で行う。

## 技術的な詳細

### 実装について

- `forwardRef<HTMLDivElement>` を用いてルート `div` への参照を転送する。
- Search 固有の props（`size` / `width` / `value` / `onChange` / `onSubmit` / `onClickClearButton`）を取り除いた残りを内部の `input` に展開する。`type` / `size` / `value` / `className` / `onChange` は展開の後に指定するため、実行時に渡されても上書きされる。
- `clsx` でサイズや状態に応じたクラスを合成する。
- 内部で `form` 要素を用いており、`onSubmit` に渡したハンドラに `FormEvent<HTMLFormElement>` を渡す。
- 検索アイコンは `Icon`、クリアボタンは `IconButton` を使用し、テーマのトークン（`icon01`, `text-text01`, `uiBorder02` など）を参照する。

## 注意事項

1. `value` は必須であり、`onChange` を指定せずに利用するとReactから制御/非制御の警告が出るため、常に状態更新ロジックと併せて利用すること。
2. 無効状態やエラー表示用のAPIは提供していない（`disabled` も受け取らない）。必要な場合は親レベルで `Search` を包むか、TextInputを利用すること。
3. ラベルや説明文は自動で提供されないため、`id` と `<label htmlFor>`、または `aria-label` / `aria-describedby` を指定して意味付けを行うこと。
4. `width` は文字列で渡す必要があるため、テーマトークンやTailwindクラスではなくインラインスタイルで制御する点に注意すること。

## スタイルのカスタマイズ

Tailwind CSSのユーティリティ（`rounded-full`, `border-uiBorder02`, `typography-labelXXregular` など）と `@zenkigen-inc/component-config` のデザイントークンに依存している。色や余白トークンを変更する場合は `@zenkigen-inc/component-config` および `@zenkigen-inc/component-theme` を更新し、`Search` はクラスの組み合わせを通じて自動的に最新のトークンを反映する。

## 更新履歴

| 日付                 | 内容                                                                                                       | 担当者 |
| -------------------- | ---------------------------------------------------------------------------------------------------------- | ------ |
| 2026-11-25 16:24 JST | `InputHTMLAttributes` を内部の `input` に渡すよう変更（`autoComplete` / `aria-*` / `name` 等が指定可能に） | -      |
| 2025-12-03 09:14 JST | 新規作成                                                                                                   | -      |
