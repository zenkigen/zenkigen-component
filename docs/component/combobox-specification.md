# Combobox コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
5. [コンポジション（子コンポーネント）](#コンポジション子コンポーネント)
   - [Combobox.Input](#comboboxinput)
   - [Combobox.List](#comboboxlist)
   - [Combobox.Item](#comboboxitem)
   - [Combobox.Loading](#comboboxloading)
   - [Combobox.Empty](#comboboxempty)
   - [Combobox.HelperMessage](#comboboxhelpermessage)
   - [Combobox.ErrorMessage](#comboboxerrormessage)
6. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [バリアントによるスタイル](#バリアントによるスタイル)
   - [状態に応じたスタイル](#状態に応じたスタイル)
7. [使用例](#使用例)
   - [基本的な使用例（同期データ）](#基本的な使用例同期データ)
   - [非同期サジェスト](#非同期サジェスト)
   - [大量データの popup 抑制](#大量データの-popup-抑制)
   - [カスタムアイテム描画](#カスタムアイテム描画)
   - [ヘルパー/エラーメッセージ](#ヘルパーエラーメッセージ)
8. [キーボード操作](#キーボード操作)
9. [popup の開閉判定ルール](#popup-の開閉判定ルール)
10. [アクセシビリティ](#アクセシビリティ)
11. [技術的な詳細](#技術的な詳細)
12. [注意事項](#注意事項)
13. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
14. [更新履歴](#更新履歴)

---

## 概要

Combobox コンポーネントは、ユーザーが入力したテキストに応じて候補リストから値を選択する単一選択 UI を提供する。WAI-ARIA 1.2 Combobox パターン（`aria-activedescendant` 方式）に準拠し、内部で TextInput と List コンポーネントを利用する。フィルタリングは利用者責任（ヘッドレス）で、非同期サジェストや大量データの popup 抑制に対応する。

## インポート

```typescript
import { Combobox } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useMemo, useState } from 'react';
import { Combobox } from '@zenkigen-inc/component-ui';

const options = [
  { value: 'apple', label: 'りんご' },
  { value: 'banana', label: 'バナナ' },
  { value: 'cherry', label: 'さくらんぼ' },
];

const MyComponent = () => {
  const [value, setValue] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');

  const filtered = useMemo(
    () => options.filter((o) => o.label.includes(inputText)),
    [inputText],
  );

  return (
    <Combobox
      value={value}
      onChange={(next, meta) => {
        setValue(next);
        setInputText(meta?.label ?? '');
      }}
      inputValue={inputText}
      onInputChange={setInputText}
      placeholder="果物を検索..."
    >
      <Combobox.Input />
      <Combobox.List>
        {filtered.map((opt) => (
          <Combobox.Item key={opt.value} value={opt.value} label={opt.label}>
            {opt.label}
          </Combobox.Item>
        ))}
      </Combobox.List>
    </Combobox>
  );
};
```

## Props

### 必須プロパティ

| プロパティ      | 型                                                                 | 説明                                                                             |
| --------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| `value`         | `string \| null`                                                   | 選択値。controlled                                                               |
| `onChange`      | `(value: string \| null, meta: { label: string } \| null) => void` | 選択変更時のコールバック。選択時は `(value, { label })`、解除時は `(null, null)` |
| `inputValue`    | `string`                                                           | input の表示テキスト。controlled                                                 |
| `onInputChange` | `(value: string) => void`                                          | input 変更時のコールバック。利用者がフィルタリングを実行する                     |

### オプションプロパティ

| プロパティ      | 型                          | デフォルト値 | 説明                                                                       |
| --------------- | --------------------------- | ------------ | -------------------------------------------------------------------------- |
| `size`          | `'medium' \| 'large'`       | `'medium'`   | コンポーネントのサイズ                                                     |
| `variant`       | `'outline' \| 'text'`       | `'outline'`  | バリアント。`'text'` は枠なしスタイル                                      |
| `isOpen`        | `boolean`                   | `undefined`  | popup の開閉状態（任意、controlled）。指定時は `onOpenChange` と組で使う   |
| `onOpenChange`  | `(isOpen: boolean) => void` | `undefined`  | popup 開閉変更時のコールバック                                             |
| `placeholder`   | `string`                    | `undefined`  | プレースホルダーテキスト                                                   |
| `isError`       | `boolean`                   | `false`      | エラー状態                                                                 |
| `isDisabled`    | `boolean`                   | `false`      | 無効状態                                                                   |
| `width`         | `CSSProperties['width']`    | `undefined`  | 全体の幅                                                                   |
| `listMaxHeight` | `CSSProperties['height']`   | `undefined`  | 候補リストの最大高さ。Floating UI が利用可能高と比較して小さい方を採用する |

> 注: `value` / `inputValue` は完全 controlled として実装される（v2 で uncontrolled 対応を検討予定）。
> 注: `isOpen` のみ hybrid（未指定時は内部 state、指定時は controlled）。

## コンポジション（子コンポーネント）

すべての Compound は `<Combobox>` 内（または `<Combobox.Input>` / `<Combobox.List>` の中）で使用する。コンテキスト外で使うとエラーとなる。

| コンポーネント           | 親                    | 役割                                                        |
| ------------------------ | --------------------- | ----------------------------------------------------------- |
| `Combobox.Input`         | `Combobox` 直下       | 入力欄 + クリア + 矢印ボタン                                |
| `Combobox.List`          | `Combobox` 直下       | 候補リスト（FloatingPortal で描画）                         |
| `Combobox.Item`          | `Combobox.List` 直下  | 個別の候補                                                  |
| `Combobox.Loading`       | `Combobox.List` 直下  | ローディング表示                                            |
| `Combobox.Empty`         | `Combobox.List` 直下  | 該当候補なし表示                                            |
| `Combobox.HelperMessage` | `Combobox.Input` 直下 | 補助メッセージ（TextInput.HelperMessage を再エクスポート）  |
| `Combobox.ErrorMessage`  | `Combobox.Input` 直下 | エラーメッセージ（TextInput.ErrorMessage を再エクスポート） |

### Combobox.Input

入力欄を描画する。内部で `InternalTextInput` を利用し、末尾にクリアボタン（×）と矢印ボタン（▼/▲）を `IconButton` で配置する。children は TextInput の children（HelperMessage / ErrorMessage）として素通しされる。

| プロパティ  | 型        | デフォルト値 | 説明           |
| ----------- | --------- | ------------ | -------------- |
| `autoFocus` | `boolean` | `false`      | 初期フォーカス |

### Combobox.List

候補リストの container。children に `Combobox.Item` / `Combobox.Loading` / `Combobox.Empty` のいずれかが含まれる場合のみ popup を表示する。

| プロパティ  | 型                        | デフォルト値                         | 説明                     |
| ----------- | ------------------------- | ------------------------------------ | ------------------------ |
| `maxHeight` | `CSSProperties['height']` | `Combobox` の `listMaxHeight` を継承 | このリストのみの最大高さ |

### Combobox.Item

個別の候補を表す。`value` と `label` は必須。`children` で任意の JSX を描画できる（アイコン + サブテキスト等）。

| プロパティ   | 型          | 必須 | 説明                                                   |
| ------------ | ----------- | :--: | ------------------------------------------------------ |
| `value`      | `string`    |  ✓   | 選択時に onChange へ渡す値                             |
| `label`      | `string`    |  ✓   | input 表示・選択時の復元用テキスト                     |
| `isDisabled` | `boolean`   |      | 個別アイテムの無効化（キーボード巡回でスキップされる） |
| `children`   | `ReactNode` |  ✓   | リスト内の描画                                         |

### Combobox.Loading

ローディング表示用。中央寄せのテキストを描画する。`role="presentation"` で配置され、キーボード巡回対象外。

### Combobox.Empty

該当なし表示用。中央寄せのテキストを描画する。`role="presentation"` で配置され、キーボード巡回対象外。

### Combobox.HelperMessage

`TextInput.HelperMessage` を再エクスポート。`Combobox.Input` の children として配置すると、TextInput が `aria-describedby` を input に自動付与する。

### Combobox.ErrorMessage

`TextInput.ErrorMessage` を再エクスポート。`isError === true` のときのみ表示され、`aria-describedby` と `aria-invalid` を補助する。

## 状態とスタイル

### サイズバリエーション

- `medium`（デフォルト）
  - 入力欄高さ: `min-h-8`
  - タイポグラフィ: `typography-label14regular`
  - 候補アイテム高さ: `h-8`
- `large`
  - 入力欄高さ: `min-h-10`
  - タイポグラフィ: `typography-label16regular`
  - 候補アイテム高さ: `h-10`

### バリアントによるスタイル

入力欄のスタイルは TextInput の `variant` 仕様を継承する。候補リスト（popup）は `variant` に関わらず常に borderless（枠なし）でレンダリングされ、Floating UI のシャドウのみが見た目を構成する。

| 項目                 | Outline                           | Text                      |
| -------------------- | --------------------------------- | ------------------------- |
| 入力欄ボーダー       | 状態に応じて変化                  | 常に `border-transparent` |
| 入力欄パディング     | `px-2`（medium）/ `px-3`（large） | なし                      |
| 候補リストのボーダー | なし                              | なし                      |
| 候補リストのシャドウ | `shadow-floatingShadow`           | `shadow-floatingShadow`   |

### 状態に応じたスタイル

入力欄の状態スタイルは TextInput の仕様に準ずる。候補アイテムは List.OptionItem の状態スタイルに準ずる:

- 通常: `bg-uiBackground01`、ホバー時 `hover:bg-hover02`、押下時 `active:bg-active02`
- キーボードフォーカス中（active）: `bg-hover02`
- 選択済み: `bg-selectedUi text-interactive01 fill-interactive01`
- 選択済み + isError: `bg-uiBackgroundError text-supportError fill-supportError`
- 無効: `cursor-not-allowed text-disabled01 fill-disabled01`

## 使用例

### 基本的な使用例（同期データ）

```typescript
const [value, setValue] = useState<string | null>(null);
const [inputText, setInputText] = useState('');
const filtered = useMemo(
  () => options.filter((o) => o.label.includes(inputText)),
  [inputText],
);

<Combobox
  value={value}
  onChange={(next, meta) => {
    setValue(next);
    setInputText(meta?.label ?? '');
  }}
  inputValue={inputText}
  onInputChange={setInputText}
>
  <Combobox.Input />
  <Combobox.List>
    {filtered.map((opt) => (
      <Combobox.Item key={opt.value} value={opt.value} label={opt.label}>
        {opt.label}
      </Combobox.Item>
    ))}
  </Combobox.List>
</Combobox>
```

### 非同期サジェスト

```typescript
const [value, setValue] = useState<string | null>(null);
const [inputText, setInputText] = useState('');
const [results, setResults] = useState<Option[]>([]);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  if (inputText.length === 0) {
    setResults([]);
    return;
  }
  setIsLoading(true);
  fetchOptions(inputText).then((data) => {
    setResults(data);
    setIsLoading(false);
  });
}, [inputText]);

<Combobox
  value={value}
  onChange={(next, meta) => {
    setValue(next);
    setInputText(meta?.label ?? '');
  }}
  inputValue={inputText}
  onInputChange={setInputText}
>
  <Combobox.Input />
  <Combobox.List>
    {isLoading && <Combobox.Loading>読み込み中...</Combobox.Loading>}
    {!isLoading && inputText.length > 0 && results.length === 0 && (
      <Combobox.Empty>該当する候補はありません</Combobox.Empty>
    )}
    {!isLoading &&
      results.map((opt) => (
        <Combobox.Item key={opt.value} value={opt.value} label={opt.label}>
          {opt.label}
        </Combobox.Item>
      ))}
  </Combobox.List>
</Combobox>
```

### 大量データの popup 抑制

未入力時または入力文字数が閾値未満のとき、利用者が候補配列を空にすることで popup を開かないように制御する。

```typescript
const filtered = useMemo(() => {
  if (inputText.length < 2) {
    return [];  // 候補ゼロ → Combobox.List に Item/Loading/Empty が無くなり popup 抑制
  }
  return largeDataset.filter((item) => item.label.includes(inputText)).slice(0, 50);
}, [inputText]);

<Combobox
  value={value}
  onChange={(next, meta) => {
    setValue(next);
    setInputText(meta?.label ?? '');
  }}
  inputValue={inputText}
  onInputChange={setInputText}
  listMaxHeight={240}
>
  <Combobox.Input />
  <Combobox.List>
    {filtered.map((opt) => (
      <Combobox.Item key={opt.value} value={opt.value} label={opt.label}>
        {opt.label}
      </Combobox.Item>
    ))}
  </Combobox.List>
</Combobox>
```

### カスタムアイテム描画

`Combobox.Item` の children に任意 JSX を渡してアイコン + サブテキストなどを描画できる。`label` は input 復元に使うため別途必須。

```typescript
<Combobox.Item value={user.id} label={user.name}>
  <div className="flex items-center gap-2">
    <Icon name="user" size="small" />
    <div className="flex flex-col">
      <span className="typography-label14regular">{user.name}</span>
      <span className="typography-label12regular text-text02">{user.email}</span>
    </div>
  </div>
</Combobox.Item>
```

### ヘルパー/エラーメッセージ

`HelperMessage` / `ErrorMessage` は **`Combobox.Input` の direct children** に配置する。

```typescript
<Combobox value={value} onChange={...} inputValue={inputText} onInputChange={...} isError={hasError}>
  <Combobox.Input>
    <Combobox.HelperMessage>選択中: {value ?? '未選択'}</Combobox.HelperMessage>
    <Combobox.ErrorMessage>該当する候補が存在しません</Combobox.ErrorMessage>
  </Combobox.Input>
  <Combobox.List>{/* ... */}</Combobox.List>
</Combobox>
```

## キーボード操作

DOM フォーカスは常に input に維持される（`aria-activedescendant` 方式）。Item / Loading / Empty クリック時は `onMouseDown.preventDefault` でフォーカスを奪わない。

| キー         | 動作                                                                     |
| ------------ | ------------------------------------------------------------------------ |
| `↓`          | アクティブ Item を次の有効 Item へ。閉じている場合は popup を開く        |
| `↑`          | アクティブ Item を前の有効 Item へ。閉じている場合は popup を開く        |
| `Enter`      | アクティブ Item を選択する（popup が開いていてアクティブがあるときのみ） |
| `Escape`     | popup を閉じる（inputValue は維持）                                      |
| `Home`/`End` | input のカーソル移動（標準動作維持）                                     |
| `Alt + ↓`    | popup を開く                                                             |
| `Alt + ↑`    | popup を閉じる                                                           |

`↑` / `↓` は **`Combobox.Item` のみを巡回** する。`Combobox.Loading` / `Combobox.Empty` はスキップされる。`isDisabled` の Item もスキップされる。

## popup の開閉判定ルール

`Combobox.List` の children を `React.Children.toArray` で走査し、以下のいずれかが含まれている場合のみ popup を開く:

- `Combobox.Item`
- `Combobox.Loading`
- `Combobox.Empty`

いずれも含まれない場合、`isOpen === true` の状態でも popup は描画されない。これにより「未入力時は何も書かない」だけで popup を抑制できる。

## アクセシビリティ

- 入力欄に `role="combobox"` / `aria-expanded` / `aria-autocomplete="list"` を付与する。
- popup が開いている間は `aria-controls` で候補リストの `id` を指す。
- アクティブ Item は `aria-activedescendant` で参照する（DOM フォーカスは input に残る）。
- 候補リストは `role="listbox"` を持つ `<ul>`、各 Item は `role="option"` を持つ `<li>`。
- `Combobox.HelperMessage` / `Combobox.ErrorMessage` は TextInput と同じ仕組みで `aria-describedby` / `aria-invalid` を自動付与する。
- マウスクリック時の入力フォーカス維持のため、Item / クリアボタン / 矢印ボタンに `onMouseDown.preventDefault` を実装している。
- 矢印・クリアボタンは `tabIndex={-1}` で Tab キー巡回から除外し、フォーカスを input に集約する。

## 技術的な詳細

- 状態管理は `useCombobox` フックにまとめている（baseId / activeIndex / isOpen / items / キーボードハンドラ）。
- 候補リストの位置計算は `@floating-ui/react` の `useFloating`（`autoUpdate`、`offset(4)`、`size` middleware）を使う。
- 候補リストは `FloatingPortal` 経由で `z-popover` の階層に描画する。
- 外部クリック検知は `useOutsideClick` フックを使う。
- `Combobox.Input` は内部で `InternalTextInput`（TextInput の internal API）を利用し、矢印・クリアボタンを `after` prop で差し込む。
- `Combobox.HelperMessage` / `Combobox.ErrorMessage` は `TextInput.HelperMessage` / `TextInput.ErrorMessage` をそのまま再エクスポートしている。
- `Combobox.List` は children を `React.Children.toArray` で走査し、`Combobox.Item` の `value` / `label` 配列を Context 経由で本体に通知する。
- `activeIndex` は items 変動時に「先頭の有効 Item」へリセットされる（`useEffect`）。

## 注意事項

1. `value` / `inputValue` は両方とも完全 controlled として渡すこと（v2 で uncontrolled 対応を検討中）。
2. `Combobox.HelperMessage` / `Combobox.ErrorMessage` は **必ず `Combobox.Input` の direct children** に配置すること。`Combobox` 直下に置くと TextInput の `aria-describedby` 連携が成立しない。
3. `Combobox.Item` / `Combobox.Loading` / `Combobox.Empty` は **必ず `Combobox.List` の direct children** に配置すること。Fragment や関数コンポーネントでラップすると走査されない。
4. `value` を渡しても children 側に該当 `Combobox.Item` が無い場合、選択中ラベルの表示は `inputValue` の値に依存する。利用者は初期 `inputValue` を渡すか、`onChange` の meta から受け取った label を保持すること。
5. フィルタリングはライブラリ側では行わない。利用者が `onInputChange` で受け取り、children を絞り込んで再レンダリングする。
6. Restricted モード（リスト外の値は確定不可）の挙動として、blur 時に `inputValue` がリスト内の label に一致しない場合の復元は **利用者責任**。
7. 同じ `value` を持つ `Combobox.Item` を重複して配置しないこと（aria-activedescendant の一意性が崩れる）。

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config` で定義されたデザイントークンに依存している。カスタマイズする場合は、当該設定を参照すること。

## 更新履歴

| 日付       | 内容     | 担当者 |
| ---------- | -------- | ------ |
| 2026-04-17 | 新規作成 | -      |
