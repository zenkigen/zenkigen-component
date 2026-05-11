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
   - [大量データの候補リスト表示抑制](#大量データの候補リスト表示抑制)
   - [ヘルパー/エラーメッセージ](#ヘルパーエラーメッセージ)
8. [キーボード操作](#キーボード操作)
9. [候補リストの開閉判定ルール](#候補リストの開閉判定ルール)
10. [アクセシビリティ](#アクセシビリティ)
11. [技術的な詳細](#技術的な詳細)
12. [注意事項](#注意事項)
13. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
14. [FAQ](#faq)
15. [更新履歴](#更新履歴)

---

## 概要

Combobox コンポーネントは、ユーザーが入力したテキストに応じて候補リストから値を選択する単一選択 UI を提供する。WAI-ARIA 1.2 Combobox パターン（`aria-activedescendant` 方式）に準拠し、内部で TextInput と List コンポーネントを利用する。フィルタリングは利用者責任（ヘッドレス）で、非同期サジェストや大量データの候補リスト表示抑制に対応する。

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
          <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
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

| プロパティ           | 型                          | デフォルト値 | 説明                                                                                                                           |
| -------------------- | --------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `size`               | `'medium' \| 'large'`       | `'medium'`   | コンポーネントのサイズ                                                                                                         |
| `variant`            | `'outline' \| 'text'`       | `'outline'`  | バリアント。`'text'` は枠なしスタイル                                                                                          |
| `isOpen`             | `boolean`                   | `undefined`  | 候補リストの開閉状態（任意、controlled）。指定時は `onOpenChange` と組で使う                                                   |
| `onOpenChange`       | `(isOpen: boolean) => void` | `undefined`  | 候補リストの開閉変更時のコールバック                                                                                           |
| `placeholder`        | `string`                    | `undefined`  | プレースホルダーテキスト                                                                                                       |
| `isError`            | `boolean`                   | `false`      | エラー状態                                                                                                                     |
| `isDisabled`         | `boolean`                   | `false`      | 無効状態                                                                                                                       |
| `width`              | `CSSProperties['width']`    | `undefined`  | 全体の幅                                                                                                                       |
| `maxWidth`           | `CSSProperties['maxWidth']` | `undefined`  | 全体の最大幅                                                                                                                   |
| `listMaxHeight`      | `CSSProperties['height']`   | `undefined`  | 候補リストの最大高さ。Floating UI が利用可能高と比較して小さい方を採用する                                                     |
| `matchListToTrigger` | `boolean`                   | `false`      | `true` のとき候補リストの幅を input と一致させる。`false` のときコンテンツに応じて広がる（min: input 幅, max: ビューポート幅） |

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

入力欄を描画する。内部で `InternalTextInput` を利用し、末尾にクリアボタン（×）と矢印ボタン（▼/▲）を `IconButton` で配置する。children は TextInput の children（HelperMessage / ErrorMessage）として素通しされる。矢印ボタンは **`Combobox.List` 直下に `Combobox.Item` / `Combobox.Loading` / `Combobox.Empty` のいずれも存在しない** とき自動で disabled になり、開いても何も表示されない dead click を防ぐ（`Combobox` 本体の `isDisabled` とも OR で連動）。

| プロパティ  | 型        | デフォルト値 | 説明           |
| ----------- | --------- | ------------ | -------------- |
| `autoFocus` | `boolean` | `false`      | 初期フォーカス |

### Combobox.List

候補リストの container。children に `Combobox.Item` / `Combobox.Loading` / `Combobox.Empty` のいずれかが含まれる場合のみ候補リストを表示する。

| プロパティ  | 型                        | デフォルト値                         | 説明                     |
| ----------- | ------------------------- | ------------------------------------ | ------------------------ |
| `maxHeight` | `CSSProperties['height']` | `Combobox` の `listMaxHeight` を継承 | このリストのみの最大高さ |

### Combobox.Item

個別の候補を表す。`value` と `label` は必須。`label` を 1 行 `truncate` 表示で自動レンダリングする（任意 JSX のカスタム描画には現時点では対応しない）。

| プロパティ   | 型        | 必須 | 説明                                                             |
| ------------ | --------- | :--: | ---------------------------------------------------------------- |
| `value`      | `string`  |  ✓   | 選択時に onChange へ渡す値                                       |
| `label`      | `string`  |  ✓   | input 表示・選択時の復元用テキスト。truncate span で自動描画する |
| `isDisabled` | `boolean` |      | 個別アイテムの無効化（キーボード巡回でスキップされる）           |

### Combobox.Loading

ローディング表示用。中央寄せのテキストとして固定文言 `読み込み中...` を描画する。`role="presentation"` で配置され、キーボード巡回対象外。props は取らない（children / 文言差し替えは現時点では非対応）。

### Combobox.Empty

該当なし表示用。中央寄せのテキストとして固定文言 `一致する情報が見つかりません` を描画する。`role="presentation"` で配置され、キーボード巡回対象外。props は取らない（children / 文言差し替えは現時点では非対応）。

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

入力欄のスタイルは TextInput の `variant` 仕様を継承する。候補リストは `variant` に関わらず常に borderless（枠なし）でレンダリングされ、Floating UI のシャドウのみが見た目を構成する。

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

選択中の Item には label の右端に check アイコン（16px）が表示される。`Combobox.List` は内部で `List` の `selectionIndicator='right'` を固定で適用しているため、非選択 Item もアイコン領域を確保し、Item 間で label の開始位置が揃う。

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
      <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
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
    {isLoading && <Combobox.Loading />}
    {!isLoading && inputText.length > 0 && results.length === 0 && <Combobox.Empty />}
    {!isLoading &&
      results.map((opt) => (
        <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
      ))}
  </Combobox.List>
</Combobox>
```

### 大量データの候補リスト表示抑制

未入力時または入力文字数が閾値未満のとき、利用者が候補配列を空にすることで候補リストを開かないように制御する。

```typescript
const filtered = useMemo(() => {
  if (inputText.length < 2) {
    return [];  // 候補ゼロ → Combobox.List に Item/Loading/Empty が無いため候補リストは表示されない
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
      <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
    ))}
  </Combobox.List>
</Combobox>
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

| キー         | 動作                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| `↓`          | アクティブ Item を次の有効 Item へ。閉じている場合は候補リストを開く                                          |
| `↑`          | アクティブ Item を前の有効 Item へ。閉じている場合は候補リストを開く                                          |
| `Enter`      | アクティブ Item を選択する（候補リストが開いていてアクティブがあるときのみ）                                  |
| `Escape`     | 候補リストを閉じる（inputValue は維持）。候補リストが開いているとき親要素（Popover / Modal 等）へは伝搬しない |
| `Home`/`End` | input のカーソル移動（標準動作維持）                                                                          |
| `Alt + ↓`    | 候補リストを開く                                                                                              |
| `Alt + ↑`    | 候補リストを閉じる                                                                                            |

`↑` / `↓` は **`Combobox.Item` のみを巡回** する。`Combobox.Loading` / `Combobox.Empty` はスキップされる。`isDisabled` の Item もスキップされる。

候補リストを新規に開いた瞬間の初期 active 位置は以下のように決まる:

- `value` と一致する有効 Item があれば、その Item を active にする
- 一致しない場合は先頭の有効 Item を active にする
- 有効 Item が 1 件も無い場合は active なし（null）

候補リストを開いた状態で items が変動した場合は、現在の active value が新 items に残っていれば維持され、残っていなければ先頭の有効 Item にフォールバックする。

## 候補リストの開閉判定ルール

`Combobox.List` の children を `React.Children.toArray` で走査し、以下のいずれかが含まれている場合のみ候補リストを開く:

- `Combobox.Item`
- `Combobox.Loading`
- `Combobox.Empty`

いずれも含まれない場合、`isOpen === true` の状態でも候補リストは描画されない。これにより「未入力時は何も書かない」だけで候補リストを抑制できる。さらに `Combobox.Input` の矢印（▼/▲）ボタンは自動で disabled になり、クリックしてもアイコンだけが反応して候補リストは出ない dead click を防ぐ。

## アクセシビリティ

- 入力欄に `role="combobox"` / `aria-expanded` / `aria-autocomplete="list"` を付与する。
- `aria-expanded` / `aria-controls` は **画面上で候補リストが実際に見えている状態** と連動する。`isOpen === true` でも `Combobox.List` 直下に `Combobox.Item` / `Combobox.Loading` / `Combobox.Empty` のいずれも無い場合（候補リスト非表示）は `aria-expanded=false` / `aria-controls` なし になる。
- 候補リストが開いている間は `aria-controls` で候補リストの `id` を指す。
- アクティブ Item は `aria-activedescendant` で参照する（DOM フォーカスは input に残る）。
- 候補リストは `role="listbox"` を持つ `<ul>`、各 Item は `role="option"` を持つ `<li>`。
- `Combobox.HelperMessage` / `Combobox.ErrorMessage` は TextInput と同じ仕組みで `aria-describedby` / `aria-invalid` を自動付与する。
- マウスクリック時の入力フォーカス維持のため、Item / クリアボタン / 矢印ボタンに `onMouseDown.preventDefault` を実装している。
- 矢印・クリアボタンは `tabIndex={-1}` で Tab キー巡回から除外し、フォーカスを input に集約する。

## 技術的な詳細

- 状態管理は `useCombobox` フックにまとめている（baseId / activeIndex / isOpen / items / キーボードハンドラ）。
- 候補リストの位置計算は `@floating-ui/react` の `useFloating`（`autoUpdate`、`offset(4)`、`flip`、`size` middleware）を使う。`size` middleware で利用可能高と `listMaxHeight` の小さい方を `maxHeight` に適用し、`matchListToTrigger` 時は input 幅に固定、それ以外は `min-width = input 幅`・`max-width = ビューポート幅` を適用する。
- 候補リストは `FloatingPortal` 経由で `z-popover` の階層に描画する。`Combobox.List` は候補リストを **常時 DOM に mount** し、`visibility: hidden` / `pointer-events: none` で開閉を表現する。
- Floating UI の `reference` は **input の親要素（TextInput 内部の inner wrap div）** にする。位置は input の枠を基準にし、幅は IconButton を含む input 全幅に揃う。
- 外部クリック検知は `useOutsideClick` フックを使う。
- `Combobox.Input` は内部で `InternalTextInput`（TextInput の internal API）を利用し、矢印・クリアボタンを `after` prop で差し込む。
- `Combobox.HelperMessage` / `Combobox.ErrorMessage` は `TextInput.HelperMessage` / `TextInput.ErrorMessage` をそのまま再エクスポートしている。
- `Combobox.List` は children を `React.Children.toArray` で走査し、`Combobox.Item` の `value` / `label` 配列を Context 経由で本体に通知する。
- `activeIndex` は items 変動時に **value 基準で再引き当て** する。`useCombobox` 内で active Item の `value` を ref に保持し、新 items 内に同じ value の有効 Item が残っていれば該当 index を active にする。残っていない場合は先頭の有効 Item にフォールバックする。
- 内部に `inputMode`（`'keyboard' | 'mouse'`）の状態を持ち、キーボード操作で active が変化したときのみ active Item を `scrollIntoView({ block: 'nearest' })` でスクロール表示する。マウスホバーで active が同期する場合はスクロールを発生させない。
- 候補リストが open のとき Escape は `event.stopPropagation()` で親要素（Popover / Modal 等）への伝搬を止める。Combobox を内包する Popover / Modal が Escape で同時に閉じる二重 close を防ぐためである。候補リストが closed のときは Escape を素通しする。

## 注意事項

1. `value` / `inputValue` は両方とも完全 controlled として渡すこと（v2 で uncontrolled 対応を検討中）。
2. `Combobox.HelperMessage` / `Combobox.ErrorMessage` は **必ず `Combobox.Input` の direct children** に配置すること。`Combobox` 直下に置くと TextInput の `aria-describedby` 連携が成立しない。
3. `Combobox.Item` / `Combobox.Loading` / `Combobox.Empty` は **必ず `Combobox.List` の direct children** に配置すること。Fragment や関数コンポーネントでラップすると走査されない。
4. `value` を渡しても `Combobox.List` 直下に該当 `Combobox.Item` が無い場合、選択中ラベルの表示は `inputValue` の値に依存する。利用者は初期 `inputValue` を渡すか、`onChange` の meta から受け取った label を保持すること。
5. フィルタリングはライブラリ側では行わない。利用者が `onInputChange` で受け取り、候補配列を絞り込んで再レンダリングする。
6. Restricted モード（リスト外の値は確定不可）の挙動として、blur 時に `inputValue` がリスト内の label に一致しない場合の復元は **利用者責任**。
7. 同じ `value` を持つ `Combobox.Item` を重複して配置しないこと（aria-activedescendant の一意性が崩れる）。

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config` で定義されたデザイントークンに依存している。カスタマイズする場合は、当該設定を参照すること。

## FAQ

### Q: フィルタリングはなぜライブラリ側でやらないのか？

A: 候補の取得方法（同期 / 非同期）、マッチングアルゴリズム（前方一致 / 部分一致 / あいまい検索）、表示件数の制限などは利用シーンごとに大きく異なるため、Combobox 本体はヘッドレスに徹し、フィルタリングは利用者が `onInputChange` のコールバック内で実行する設計とした。`inputValue` を元に候補配列を絞り込み、絞り込み結果を `Combobox.List` の children として再レンダリングする。

### Q: 候補リストが開かないときに確認すべきことは？

A: `Combobox.List` 直下に `Combobox.Item` / `Combobox.Loading` / `Combobox.Empty` のいずれかが存在するかを確認する。これらが 1 つも無いとき、`isOpen === true` でも候補リストは描画されず、矢印ボタンも自動で disabled になる。未入力時に何も表示したくない場合は、利用者側で `filtered` が空のとき children を空にすればよい。

### Q: `value` を渡しているのに input に何も表示されないのはなぜ？

A: input に表示されるテキストは `inputValue` で制御される（`value` ではない）。初期 `value` を渡す場合は、対応する label を初期 `inputValue` として一緒に渡すこと。選択時は `onChange` の第 2 引数 `meta.label` を `inputValue` に反映する運用にする。

### Q: `Combobox.HelperMessage` / `Combobox.ErrorMessage` を `Combobox` 直下に置くとどうなる？

A: TextInput の `aria-describedby` / `aria-invalid` 連携が成立せず、スクリーンリーダーが補助メッセージを読み上げなくなる。必ず `Combobox.Input` の direct children として配置すること。

### Q: `matchListToTrigger` はどう使い分ければよい？

A: 候補リストの幅を入力欄と完全に一致させたい（入力欄からはみ出して広がらないようにしたい）場合は `true` を指定する。長いラベルを省略せず全文表示したい場合はデフォルト（`false`）のままで、候補リストは「入力欄の幅以上、ビューポート幅以下」の範囲でコンテンツに合わせて広がる。

### Q: `listMaxHeight` を超えた候補リストはどう表示される？

A: 候補リストの内側で縦スクロールに切り替わる。スクロールバーは候補リストの内側のみに表示され、外枠の角丸（rounded）からコンテンツがはみ出ることはない。新しく候補リストを開いた瞬間はスクロール位置が先頭にリセットされる。

### Q: 同じ `value` を持つ `Combobox.Item` を複数配置するとどうなる？

A: `aria-activedescendant` のターゲット ID が衝突し、キーボード巡回や選択状態の判定が破綻する。表示用ラベル（`label`）が同じでも、必ず一意な `value` を割り当てること。

## 更新履歴

| 日付       | 内容     | 担当者 |
| ---------- | -------- | ------ |
| 2026-04-17 | 新規作成 | -      |
