# Combobox コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
   - [複数選択モード（isMultiple）](#複数選択モードismultiple)
5. [コンポジション（子コンポーネント）](#コンポジション子コンポーネント)
   - [Combobox.Input](#comboboxinput)
   - [Combobox.Chip](#comboboxchip)
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
   - [複数選択のチップ](#複数選択のチップ)
7. [使用例](#使用例)
   - [基本的な使用例（同期データ）](#基本的な使用例同期データ)
   - [非同期サジェスト](#非同期サジェスト)
   - [大量データの候補リスト表示抑制](#大量データの候補リスト表示抑制)
   - [ヘルパー/エラーメッセージ](#ヘルパーエラーメッセージ)
   - [クリアボタンを表示する](#クリアボタンを表示する)
   - [入力欄に名前を付ける](#入力欄に名前を付ける)
   - [複数選択（チップ）](#複数選択チップ)
   - [外せないチップ](#外せないチップ)
8. [キーボード操作](#キーボード操作)
9. [未確定入力の取り消し（revert）](#未確定入力の取り消しrevert)
10. [候補リストの開閉判定ルール](#候補リストの開閉判定ルール)
11. [アクセシビリティ](#アクセシビリティ)
12. [技術的な詳細](#技術的な詳細)
13. [注意事項](#注意事項)
14. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
15. [FAQ](#faq)
16. [更新履歴](#更新履歴)

---

## 概要

Combobox コンポーネントは、ユーザーが入力したテキストに応じて候補リストから値を選択する UI を提供する。既定は単一選択で、`isMultiple` を指定すると複数選択モードになり、選択済みの値を入力欄の中にチップ（`Combobox.Chip`）として並べる。WAI-ARIA 1.2 Combobox パターン（`aria-activedescendant` 方式）に準拠し、内部で TextInput と List コンポーネントを利用する。フィルタリングは利用者責任（ヘッドレス）で、非同期サジェストや大量データの候補リスト表示抑制に対応する。

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

| プロパティ           | 型                          | デフォルト値 | 説明                                                                                                                                                                   |
| -------------------- | --------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `size`               | `'medium' \| 'large'`       | `'medium'`   | コンポーネントのサイズ                                                                                                                                                 |
| `variant`            | `'outline' \| 'text'`       | `'outline'`  | バリアント。`'text'` は枠なしスタイル                                                                                                                                  |
| `isOpen`             | `boolean`                   | `undefined`  | 候補リストの開閉状態（任意、controlled）。指定時は `onOpenChange` と組で使う                                                                                           |
| `onOpenChange`       | `(isOpen: boolean) => void` | `undefined`  | 候補リストの開閉変更時のコールバック                                                                                                                                   |
| `onClickClearButton` | `() => void`                | `undefined`  | クリアボタンのクリック時に呼ばれるコールバック。**渡したときのみクリアボタンを表示**する。値のクリア（`onChange(null, null)` / `onInputChange('')`）は呼び出し側の責務 |
| `placeholder`        | `string`                    | `undefined`  | プレースホルダーテキスト                                                                                                                                               |
| `isError`            | `boolean`                   | `false`      | エラー状態                                                                                                                                                             |
| `isDisabled`         | `boolean`                   | `false`      | 無効状態                                                                                                                                                               |
| `width`              | `CSSProperties['width']`    | `undefined`  | 全体の幅                                                                                                                                                               |
| `maxWidth`           | `CSSProperties['maxWidth']` | `undefined`  | 全体の最大幅                                                                                                                                                           |
| `listMaxHeight`      | `CSSProperties['height']`   | `undefined`  | 候補リストの最大高さ。Floating UI が利用可能高と比較して小さい方を採用する                                                                                             |
| `matchListToTrigger` | `boolean`                   | `false`      | `true` のとき候補リストの幅を input と一致させる。`false` のときコンテンツに応じて広がる（min: input 幅, max: ビューポート幅）                                         |

> 注: `value` / `inputValue` は完全 controlled として実装される（v2 で uncontrolled 対応を検討予定）。
> 注: `isOpen` のみ hybrid（未指定時は内部 state、指定時は controlled）。

### 複数選択モード（isMultiple）

`isMultiple` を判別キーとするユニオン型（`ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps`）。`isMultiple: true` のとき `value` / `onChange` が配列を扱う型に切り替わる。上記以外の共通 props（`inputValue` / `onInputChange` / `size` / `isDisabled` 等）は単一選択と同じ。

| プロパティ           | 型                                                                            | 説明                                                                                                             |
| -------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `isMultiple`         | `true`                                                                        | 複数選択モードにする（単一選択では指定しない、または `false`）                                                   |
| `value`              | `string[]`                                                                    | 選択済みの値の配列。controlled。`aria-selected`・再選択での解除・Backspace の削除対象はこの配列で判定する        |
| `onChange`           | `(value: string[], meta: { type: 'add' \| 'remove'; value: string }) => void` | 追加・削除のたびに **次の配列** と差分（`ComboboxMultipleChangeMeta`）を渡す。通常は `setValue(next)` だけでよい |
| `onClickClearButton` | `never`                                                                       | 指定できない（型で禁止）。複数選択ではクリアボタンを表示しない                                                   |

- チップの表示は `value` とは別に、利用側が `Combobox.Chip` を `Combobox.Input` の children に並べて宣言する（[Combobox.Chip](#comboboxchip) 参照）
- 候補を選ぶ（クリック / `Enter`）と、未選択なら追加・選択済みなら解除（toggle）し、入力を空に戻す。**候補リストは閉じない**
- 入力欄のテキストは常に「未確定の検索語」として扱う。blur / `Escape` では空文字に戻し、`value` は変えない
- 選択済みの候補を候補リストから除外するのは利用側の責務（フィルタリングと同じ）
- 型: `ComboboxSingleProps` / `ComboboxMultipleProps` / `ComboboxMultipleChangeMeta` / `ComboboxChipProps` を export している。`ComboboxProps['value']` は `string | null | string[]` になる

## コンポジション（子コンポーネント）

すべての Compound は `<Combobox>` 内（または `<Combobox.Input>` / `<Combobox.List>` の中）で使用する。コンテキスト外で使うとエラーとなる。

| コンポーネント           | 親                    | 役割                                                        |
| ------------------------ | --------------------- | ----------------------------------------------------------- |
| `Combobox.Input`         | `Combobox` 直下       | 入力欄 + クリア（任意）+ 矢印ボタン                         |
| `Combobox.Chip`          | `Combobox.Input` 直下 | 複数選択の選択済みチップ（単一選択では描画しない）          |
| `Combobox.List`          | `Combobox` 直下       | 候補リスト（FloatingPortal で描画）                         |
| `Combobox.Item`          | `Combobox.List` 直下  | 個別の候補                                                  |
| `Combobox.Loading`       | `Combobox.List` 直下  | ローディング表示                                            |
| `Combobox.Empty`         | `Combobox.List` 直下  | 該当候補なし表示                                            |
| `Combobox.HelperMessage` | `Combobox.Input` 直下 | 補助メッセージ（TextInput.HelperMessage を再エクスポート）  |
| `Combobox.ErrorMessage`  | `Combobox.Input` 直下 | エラーメッセージ（TextInput.ErrorMessage を再エクスポート） |

### Combobox.Input

入力欄を描画する。内部で `InternalTextInput` を利用し、末尾に矢印ボタン（▼/▲）と、`Combobox` 本体に `onClickClearButton` が渡されている場合のみクリアボタン（×）を `IconButton` で配置する。children のうち `Combobox.Chip` は複数選択のチップとして入力欄の中（input の前）に描画し、それ以外（HelperMessage / ErrorMessage）は TextInput の children として素通しする。矢印ボタンは **`Combobox.List` 直下に `Combobox.Item` / `Combobox.Loading` / `Combobox.Empty` のいずれも存在しない** とき自動で disabled になり、開いても何も表示されない dead click を防ぐ（`Combobox` 本体の `isDisabled` とも OR で連動）。クリアボタンは `isDisabled` のとき・`inputValue` が空のときも非表示になる。

| プロパティ        | 型        | デフォルト値 | 説明                                                                 |
| ----------------- | --------- | ------------ | -------------------------------------------------------------------- |
| `autoFocus`       | `boolean` | `false`      | 初期フォーカス                                                       |
| `id`              | `string`  | `undefined`  | input の `id`。利用側の `<label htmlFor>` と関連付けるときに指定する |
| `aria-label`      | `string`  | `undefined`  | input の accessible name                                             |
| `aria-labelledby` | `string`  | `undefined`  | input の accessible name を、画面上の別要素の id で指定する          |

- `id` / `aria-label` / `aria-labelledby` は単一選択・複数選択の両方で使える。未指定時は input に付与しない（従来どおり）。`id` を指定しても、候補リスト・候補の id（`aria-controls` / `aria-activedescendant` の参照先）は内部で採番した別の id のまま
- placeholder だけでは accessible name にならない。`<label htmlFor>`、`aria-label`、`aria-labelledby` のいずれかで入力欄に名前を付けることを推奨する（複数選択では選択がある間 placeholder も表示しないため、特に必要）
- 複数選択モードでは、`value` が 1 件以上のとき placeholder を表示しない（チップの後ろに出さない）。判定は描画中のチップ数ではなく `value` で行う
- 複数選択モードでは、チップが折り返して縦に伸びた入力欄の余白を押すと input にフォーカスする（✗ ボタン上は除く）

### Combobox.Chip

複数選択モードで選択済みの値を表すチップ。`Combobox.Input` の **直接の子** に、`value` の要素ごとに 1 つずつ並べる。内部で Tag（編集可能・`medium`・`color="gray"` 固定）を描画する。

| プロパティ    | 型        | 必須 | デフォルト値 | 説明                                                                                                                          |
| ------------- | --------- | :--: | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `value`       | `string`  |  ✓   | -            | 対応する選択値。✗ で削除するとこの値が `value` から除かれる                                                                   |
| `label`       | `string`  |  ✓   | -            | チップの表示文字列。✗ の accessible name（`{label}を削除`）と、追加・削除の読み上げ（`aria-live`）にも使う                    |
| `isRemovable` | `boolean` |      | `true`       | `false` で外せないチップにする。✗ を描画せず（Tab 順にも出ない）、Backspace・候補の再選択でも外れない。形・文字色は通常のまま |

ライブラリが担うこと:

- ✗ のクリック / キーボード（`Enter` / `Space`）で、その値だけを `onChange(next, { type: 'remove', value })` で外す。`value` に無い値のチップの ✗ は何もしない
- ✗ のクリックで input のフォーカスを奪わない（`onMouseDown` の `preventDefault`）。候補リストの開閉も変えない（閉じていれば閉じたまま）
- キーボードで ✗ を押した場合は、削除前に input へフォーカスを戻す（フォーカスが body に落ちないようにする）
- `Combobox` の `isDisabled` をチップへ伝える（✗ を描画しない）
- チップの `label` を読み上げ用に登録する
- 長い `label` は 1 行で末尾を「…」で省略する（全文は `title` 属性と、✗ の accessible name・読み上げで伝わる）

利用側が担うこと:

- **`value` の全要素について、`value` と同じ順にチップを並べる**（Backspace は描画順ではなく `value` の末尾を削除するため、順序を揃えると「最後のチップが消える」と一致する）
- 1 つの `value` につきチップは 1 つにする（同じ `value` のチップを 2 つ置いた場合、どちらの ✗ でもその値が 1 回削除される）
- `key` を付ける。チップの色は指定できない（`gray` 固定）

制約:

- 単一選択モード（`isMultiple` 未指定）で置いた場合は描画しない
- `Combobox.Input` の直接の子のみをチップとして扱う（配列は可。Fragment やラッパーコンポーネントで包むとチップとして扱われない。`Combobox.List` の Item 走査と同じ制約）

### Combobox.List

候補リストの container。children に `Combobox.Item` / `Combobox.Loading` / `Combobox.Empty` のいずれかが含まれる場合のみ候補リストを表示する。

| プロパティ  | 型                        | デフォルト値                         | 説明                     |
| ----------- | ------------------------- | ------------------------------------ | ------------------------ |
| `maxHeight` | `CSSProperties['height']` | `Combobox` の `listMaxHeight` を継承 | このリストのみの最大高さ |

### Combobox.Item

個別の候補を表す。`value` と `label` は必須。children を省略した場合は `label` を 1 行 `truncate` 表示で自動レンダリングする。children を渡した場合は候補行の中身を children で描画する（見た目のみ）。

| プロパティ   | 型          | 必須 | 説明                                                                                                                                    |
| ------------ | ----------- | :--: | --------------------------------------------------------------------------------------------------------------------------------------- |
| `value`      | `string`    |  ✓   | 選択時に onChange へ渡す値                                                                                                              |
| `label`      | `string`    |  ✓   | input 表示・選択時の復元用テキスト。children 省略時は truncate span で自動描画する                                                      |
| `isDisabled` | `boolean`   |      | 個別アイテムの無効化（キーボード巡回でスキップされる）                                                                                  |
| `children`   | `ReactNode` |      | 候補行の見た目（例: 名前 + 右寄せの補足テキスト）。見た目のみで、選択時の入力値・`onChange` の `meta.label` には常に `label` が使われる |

children は `<span className="flex min-w-0 flex-1 items-center">` で包んで描画する（右端の選択チェックと共存させるため残り幅を取る）。children は Item の登録情報（`value` / `label` / `isDisabled`）には含まれない。

children の規約:

- **インタラクティブ要素を置かない**。候補行は `role="option"` のため、ボタン・リンク・入力などを子孫に置けない。静的な表示要素のみとする。
- **高さは 1 行固定**（`size` に応じた行の高さ）。複数行レイアウトには対応しない。はみ出し対策（`truncate` / `min-w-0` / `shrink-0`）は children 側で行う。
- **背景色を付けない**。ハイライト（背景・左ボーダー）と選択チェックは行（`li`）側で描画するため、children に背景色を付けると隠れる。
- **文字色は行の状態に応じて継承する**（既定 `interactive02`、選択中 `interactive01`、無効 `disabled01`、エラー時の選択中 `supportError`）。補足テキストの色を children 側で固定すると、無効・エラー時も色が変わらなくなる点に注意する。
- **読み上げ不要な要素（装飾アイコン・記号・重複情報）には利用側で `aria-hidden` を付ける**（下記「アクセシビリティ」参照）。

```tsx
<Combobox.Item value={fruit.value} label={fruit.label}>
  <span className="flex w-full min-w-0 items-center justify-between gap-4">
    <span className="truncate">{fruit.label}</span>
    <span className="typography-label12regular shrink-0">{fruit.origin}</span>
  </span>
</Combobox.Item>
```

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

選択中の Item には label の右端に check アイコン（16px）が表示される。`Combobox.List` は内部で `List` の `selectionIndicator='right'` を固定で適用しているため、非選択 Item もアイコン領域を確保し、Item 間で label の開始位置が揃う。複数選択モードでは `value` に含まれるすべての Item が選択中の表示になる。

### 複数選択のチップ

- チップは Tag の編集可能スタイル（`rounded-full`、`px-2`、`h-5`、`typography-label14regular`）で、色は `gray` 固定
- `size="large"` でもチップは `medium` のまま（入力欄の高さ・文字サイズだけが変わる）
- チップと input は同じ行に並び、入りきらない場合は折り返して入力欄が縦に伸びる。チップ間・チップと input の間隔は `gap-1`。チップが 0 件のときの入力欄の高さは単一選択と同じ
- 無効状態（`isDisabled`）: ✗ を描画せず、チップの文字色を `text-disabled01` にする（形・余白は変えない）。**デザイン確認中の仮の見た目**で、今後変更する可能性がある
- 外せないチップ（`isRemovable={false}`）: ✗ を描画しない。形・余白・文字色は通常のチップと同じ
- 長いラベル: チップの最大幅は入力欄の中のチップ領域の幅で、超える場合は文字を 1 行で末尾を「…」で省略する（折り返さない）。✗ は縮めず常に表示する。全文は `title` 属性で確認でき、省略は見た目だけで、スクリーンリーダーには全文が伝わる

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

### クリアボタンを表示する

クリアボタン（×）は `onClickClearButton` を渡したときのみ表示される（TextInput と同一仕様）。値のクリアは利用者責務で、コールバック内で `onChange(null, null)` と `onInputChange('')` を呼ぶ。`isDisabled` のとき・`inputValue` が空のときは自動で非表示になる。

```typescript
const [value, setValue] = useState<string | null>(null);
const [inputText, setInputText] = useState('');

const handleClickClearButton = () => {
  setValue(null);
  setInputText('');
};

<Combobox
  value={value}
  onChange={(next, meta) => {
    setValue(next);
    setInputText(meta?.label ?? '');
  }}
  inputValue={inputText}
  onInputChange={setInputText}
  onClickClearButton={handleClickClearButton}
>
  <Combobox.Input />
  <Combobox.List>
    {filtered.map((opt) => (
      <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
    ))}
  </Combobox.List>
</Combobox>
```

クリアボタンを表示しない場合は `onClickClearButton` を渡さない。`inputValue` をキーボードで全削除すれば値はクリアできる。

### 入力欄に名前を付ける

```typescript
// 画面上のラベルと関連付ける
<label htmlFor="favorite-fruit">好きな果物</label>
<Combobox /* ... */>
  <Combobox.Input id="favorite-fruit" />
  <Combobox.List>{/* ... */}</Combobox.List>
</Combobox>

// 画面上にラベルが無い場合
<Combobox /* ... */>
  <Combobox.Input aria-label="好きな果物" />
  <Combobox.List>{/* ... */}</Combobox.List>
</Combobox>
```

### 複数選択（チップ）

利用側のデータ（オブジェクト配列）から `value`（ID の配列）とチップを導出する。チップ表示用の配列は state ではなく `value` からの導出でよい。選択済みの候補の除外と入力での絞り込みは利用側で行う。

```typescript
const [selectedIds, setSelectedIds] = useState<string[]>([]);
const [inputText, setInputText] = useState('');

// チップ表示用（value の順に並べる）
const selectedFruits = selectedIds.flatMap((id) => {
  const fruit = fruits.find((item) => item.value === id);
  return fruit != null ? [fruit] : [];
});
// 候補: 選択済みを除外し、入力で絞り込む
const candidates = fruits.filter((fruit) => !selectedIds.includes(fruit.value) && fruit.label.includes(inputText));

<Combobox
  isMultiple
  value={selectedIds}
  onChange={(next) => setSelectedIds(next)}
  inputValue={inputText}
  onInputChange={setInputText}
  placeholder="果物を検索..."
>
  <Combobox.Input aria-label="果物">
    {selectedFruits.map((fruit) => (
      <Combobox.Chip key={fruit.value} value={fruit.value} label={fruit.label} />
    ))}
  </Combobox.Input>
  <Combobox.List>
    {candidates.map((fruit) => (
      <Combobox.Item key={fruit.value} value={fruit.value} label={fruit.label} />
    ))}
  </Combobox.List>
</Combobox>
```

追加・削除に応じた副作用（API 呼び出し等）は `onChange` の第 2 引数で受け取れる。

```typescript
const handleChange = (next: string[], meta: ComboboxMultipleChangeMeta) => {
  setSelectedIds(next);
  if (meta.type === 'add') {
    attachTag(meta.value);
  } else {
    detachTag(meta.value);
  }
};
```

候補をサーバーで検索する場合、検索語が変わると選択済みの表示情報（label）が手元の検索結果から消えるため、追加時に表示情報を保持しておく。

```typescript
const [selectedCache, setSelectedCache] = useState<Map<string, Fruit>>(new Map());

const handleChange = (next: string[], meta: ComboboxMultipleChangeMeta) => {
  if (meta.type === 'add') {
    const fruit = results.find((result) => result.value === meta.value);
    if (fruit != null) {
      setSelectedCache((prev) => new Map(prev).set(fruit.value, fruit));
    }
  }
  setSelectedIds(next);
};

const selectedFruits = selectedIds.flatMap((id) => {
  const fruit = selectedCache.get(id);
  return fruit != null ? [fruit] : [];
});
```

### 外せないチップ

最初から設定されていて外せない値は、その値のチップに `isRemovable={false}` を指定する。✗ が表示されず、Backspace・候補の再選択でも外れない。

```typescript
<Combobox.Input aria-label="果物">
  {selectedFruits.map((fruit) => (
    <Combobox.Chip
      key={fruit.value}
      value={fruit.value}
      label={fruit.label}
      isRemovable={!fixedIds.includes(fruit.value)}
    />
  ))}
</Combobox.Input>
```

外せるかどうかは **現在描画されているチップの宣言だけ** で判定する。チップを描画していない値は外せる扱いになるため、外せない値は必ずチップを描画すること。

## キーボード操作

DOM フォーカスは常に input に維持される（`aria-activedescendant` 方式）。Item / Loading / Empty クリック時は `onMouseDown.preventDefault` でフォーカスを奪わない。

| キー         | 動作                                                                                                                             |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `↓`          | アクティブ Item を次の有効 Item へ。閉じている場合は候補リストを開く                                                             |
| `↑`          | アクティブ Item を前の有効 Item へ。閉じている場合は候補リストを開く                                                             |
| `Enter`      | アクティブ Item を選択する（候補リストが開いていてアクティブがあるときのみ）。IME 変換確定の Enter は選択しない                  |
| `Escape`     | 候補リストを閉じ、未確定入力を選択値の表示へ戻す（revert）。候補リストが開いているとき親要素（Popover / Modal 等）へは伝搬しない |
| `Backspace`  | 複数選択モードで入力が空のときのみ、`value` の末尾から見て最初の外せる値を削除する（下記参照）。入力があるときは通常の文字削除   |
| `Home`/`End` | input のカーソル移動（標準動作維持）                                                                                             |
| `Alt + ↓`    | 候補リストを開く                                                                                                                 |
| `Alt + ↑`    | 候補リストを閉じる                                                                                                               |

`↑` / `↓` は **`Combobox.Item` のみを巡回** する。`Combobox.Loading` / `Combobox.Empty` はスキップされる。`isDisabled` の Item もスキップされる。

複数選択モードでの違い:

- `Enter`: アクティブ Item が未選択なら追加、選択済みなら解除（toggle）し、入力を空に戻す。候補リストは閉じない。外せないチップの値の再選択は何もしない
- `Escape`: 候補リストを閉じ、入力を空に戻す。`value`（チップ）は変えない
- `Backspace`: 入力が空のとき、`value` の **配列の末尾**（描画順ではない）から見て最初の外せる値を削除する。チップを描画していない値も対象になる。0 件・すべて外せないときは何もしない。IME 変換中は文字の削除として IME に委ね、チップは削除しない
- チップの ✗ ボタンは Tab 順に含まれる。input から `Shift + Tab` で直前のチップの ✗ へ移動し、`Enter` / `Space` でそのチップだけを削除できる。削除後は input にフォーカスが戻る（input のフォーカスで候補リストが開くのは通常どおり）
- ✗ へフォーカスが移ると、候補リストを閉じて入力を空に戻す（下記「未確定入力の取り消し」）。そのため ✗ にフォーカスがある状態の `Escape` は、候補リストが閉じた input での `Escape` と同じく親要素（Popover / Modal 等）へ伝搬する
- 外せないチップと無効状態のチップには ✗ が無いため、Tab 順にも出ない

日本語入力（IME）の変換中に押されたキー（keydown 時点で `isComposing` が true、一部環境では `keyCode === 229`）は、上表の操作を行わず IME に委ねる。変換中の各キーは IME 側の操作に使われるためである。

- `↑` / `↓`: 変換候補の移動に使われる。アクティブ Item の移動・候補リストの開閉は行わず、既定動作も妨げない（`preventDefault` しない）。
- `Enter`: 変換の確定に使われる。選択処理は行わない。選択として扱うと、input が選択ラベルに更新された直後に IME の確定文字が追記され「(選択ラベル)(入力中の文字)」のような二重入力になるため。変換確定後に改めて `Enter` を押すことでアクティブ Item を選択できる。
- `Escape`: 変換の取り消しに使われる。候補リストを閉じず、未確定入力の revert も行わない。また、候補リストの開閉にかかわらず親要素（Popover 等）へは伝搬しない（変換の取り消しで親まで閉じないようにするため）。

候補リストを新規に開いた瞬間の初期 active 位置は以下のように決まる:

- `value` と一致する有効 Item があれば、その Item を active にする（単一選択のみ。複数選択では選択済みが通常候補から除外されるため、常に先頭の有効 Item にする）
- 一致しない場合は先頭の有効 Item を active にする
- 有効 Item が 1 件も無い場合は active なし（null）

候補リストを開いた状態で items が変動した場合は、現在の active value が新 items に残っていれば維持され、残っていなければ先頭の有効 Item にフォールバックする。

## 未確定入力の取り消し（revert）

単一選択モードでは、`value` は候補の `value`、`inputValue` はその表示テキストとして対になる。候補を選択せずに input を編集しただけの「未確定入力」は、以下のタイミングで破棄され、表示が選択値と整合する状態へ戻る。

- **フォーカスが Combobox の外へ移動したとき（blur）**: `value` に対応する確定済みラベルへ input を戻す。`value` が `null`（未選択）の場合は空文字へ戻す。
- **Escape**: blur と同じ revert を行う。

戻す先の「確定済みラベル」は、最後に Item を選択した時点を内部に保持する。`value` が外部から変更された場合は、その時点の `inputValue` を確定済みとみなして追従する（`value === null` のときは常に空文字に正規化）。

フォーカス移動先が候補リスト内の Item や、クリアボタン / 開閉トグルボタンの場合は「Combobox の外」とはみなさず、revert・close を行わない（これらは `onMouseDown` の `preventDefault` で input のフォーカスを保持する）。Tab キーで外の要素へ移動した場合のように外部クリックを伴わないフォーカスアウトでも、blur 経由で確実に close + revert される。

複数選択モードでは、入力欄のテキストは常に未確定の検索語であり、戻す先は常に空文字になる（選択値はチップ側に保持される）。

- **blur / Escape**: 候補リストを閉じ、入力を空文字に戻す。`value` は変えない
- **チップの ✗ へのフォーカス移動（Shift + Tab）**: Combobox の内側への移動だが、blur と同じく close + revert する。リストを開いたまま ✗ に移ると、✗ 上の `Escape` が input の処理を通らず親（Popover / Modal 等）まで閉じてしまうため

## 候補リストの開閉判定ルール

`Combobox.List` の children を `React.Children.forEach` で走査し、以下のいずれかが含まれている場合のみ候補リストを開く:

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
- 各 Item の accessible name は描画内容のテキストになる。children 省略時は `label`、children 指定時は children のテキストの連結（例: 「りんご 青森県」）。補足情報も読み上げられるため、読み上げ不要な要素（装飾アイコン・記号・重複情報）には利用側で `aria-hidden` を付ける。
- `Combobox.HelperMessage` / `Combobox.ErrorMessage` は TextInput と同じ仕組みで `aria-describedby` / `aria-invalid` を自動付与する。複数選択でチップと併記しても同じ。
- 入力欄の accessible name は `Combobox.Input` の `id`（`<label htmlFor>` と関連付け）/ `aria-label` / `aria-labelledby` で付ける。placeholder は名前にならないため、いずれかの指定を推奨する。
- 複数選択モード:
  - 候補リストに `aria-multiselectable="true"` を付与し、`value` に含まれる Item の `aria-selected` を `true` にする。
  - チップの ✗ は `<button>` で、accessible name は `{label}を削除`（長いラベルを省略表示している場合も全文）。Tab で到達できるため、選択内容の確認と任意のチップの削除をキーボードで行える。
  - 追加・削除を `aria-live="polite"` の領域（視覚的に非表示）で読み上げる（例: `「りんご」を追加しました` / `「りんご」を削除しました`。複数の変化は「、」で連結）。前回の `value` との差分から生成するため、利用側が `value` を直接書き換えた場合も通知される。初期表示時は読み上げない。
  - 読み上げる label は、チップの `label`（最後に描画されたもの）または追加時に選んだ Item の `label` を使い、どちらも無ければ `value` の文字列を使う。
  - `value` に含まれるがチップを描画していない値は、見えないだけで選択中として扱う（`aria-selected`・再選択での解除・Backspace の削除対象・読み上げの対象に含める）。視覚的なフィードバックは無いため、すべての値のチップを描画すること。
- マウスクリック時の入力フォーカス維持のため、Item / クリアボタン（表示時）/ 矢印ボタンに `onMouseDown.preventDefault` を実装している。
- 矢印ボタン・クリアボタン（表示時）は `tabIndex={-1}` で Tab キー巡回から除外し、フォーカスを input に集約する。

## 技術的な詳細

- 状態管理は `useCombobox` フックにまとめている（baseId / activeIndex / isOpen / items / キーボードハンドラ）。
- 候補リストの位置計算は `@floating-ui/react` の `useFloating`（`autoUpdate`、`offset(4)`、`flip`、`size` middleware）を使う。`size` middleware で利用可能高と `listMaxHeight` の小さい方を `maxHeight` に適用し、`matchListToTrigger` 時は input 幅に固定、それ以外は `min-width = input 幅`・`max-width = ビューポート幅` を適用する。
- 候補リストは `FloatingPortal` 経由で `z-popover` の階層に描画する。`Combobox.List` は候補リストを **常時 DOM に mount** し、`visibility: hidden` / `pointer-events: none` で開閉を表現する。
- Floating UI の `reference` は **入力欄の枠 div**（`InternalTextInput` の内部 prop `frameRef` で受け取る要素）にする。位置は input の枠を基準にし、幅は IconButton を含む input 全幅に揃う。
- 外部クリック検知は `useOutsideClick` フックを使う。
- `Combobox.Input` は内部で `InternalTextInput`（TextInput の internal API）を利用し、矢印・クリアボタンを `after` prop で差し込む。
- 複数選択モードでは、`Combobox.Input` の children から `Combobox.Chip` を取り出し、`display: contents` のコンテナ（`chipsRef`）で包んで `InternalTextInput` の内部 prop `before` に渡す。チップの件数に関係なく常に `before` を渡し、DOM 構造はモード（単一 / 複数）だけで切り替える（0 ↔ 1 件の遷移で input が再マウントされてフォーカスが外れるのを防ぐため）。単一選択モードでは `before` を渡さず、DOM は従来と同じ。
- input の blur で、フォーカスの移動先が `chipsRef` の内側（チップの ✗）の場合は、wrapper 内への移動を無視する判定より先に close + revert する。
- 余白クリックで input にフォーカスする処理は、枠 div に native の `mousedown` listener を付けて行う（枠 div は `InternalTextInput` の内部にあり React のハンドラを渡せないため）。`HelperMessage` / `ErrorMessage` の有無で枠 div が別ノードに入れ替わるため、`frameRef` の callback ref でノードの変化に追従し、前のノードから外して新しいノードに付け直す。
- 読み上げ領域（`aria-live="polite"`）は複数選択モードで常時描画し、中身だけを通知ごとに増える連番を `key` にした要素で入れ替える。同じ label の別の値を続けて追加・削除すると文言が前回と同じになるが、要素が入れ替わるため新しい通知として伝わる。
- `Combobox.Chip` は `useLayoutEffect` で label を読み上げ用に登録する（unmount では消さず、通知に使い終えた時点で `value` に無い値を掃除する）。`isRemovable={false}` のときは外せない値として登録し、unmount・`isRemovable` の変化で解除する。
- 外せない値は、✗・Backspace・候補の再選択（toggle）の 3 つの削除経路すべてで削除を行わない。
- `Combobox.Chip` は Tag の内部 prop `isTruncated` を指定する（文字を `truncate` の span で包んで `title` に全文を入れ、Tag に `min-w-0 max-w-full`、✗ に `shrink-0` を付ける）。チップのルート div にも `flex min-w-0 max-w-full` を付け、折り返しコンテナ（flex-wrap）の中で入力欄の幅を超えないようにする。
- `Combobox.HelperMessage` / `Combobox.ErrorMessage` は `TextInput.HelperMessage` / `TextInput.ErrorMessage` をそのまま再エクスポートしている。
- `Combobox.List` は children を `React.Children.forEach` で走査し、`Combobox.Item` の `value` / `label` 配列を Context 経由で本体に通知する。`Combobox.Item` の children は走査対象に含めない（選択・入力表示はすべて `label` を使うため）。
- `activeIndex` は items 変動時に **value 基準で再引き当て** する。`useCombobox` 内で active Item の `value` を ref に保持し、新 items 内に同じ value の有効 Item が残っていれば該当 index を active にする。残っていない場合は先頭の有効 Item にフォールバックする。
- 内部に `inputMode`（`'keyboard' | 'mouse'`）の状態を持ち、キーボード操作で active が変化したときのみ active Item を `scrollIntoView({ block: 'nearest' })` でスクロール表示する。マウスホバーで active が同期する場合はスクロールを発生させない。
- 候補リストが open のとき Escape は `event.stopPropagation()` で親要素（Popover / Modal 等）への伝搬を止める。Combobox を内包する Popover / Modal が Escape で同時に閉じる二重 close を防ぐためである。候補リストが closed のときは Escape を素通しする（IME 変換中の Escape は除く。下記参照）。
- IME 変換中（`isComposing` / `keyCode === 229`）の keydown は `handleKeyDown` の冒頭で判定し、どのキーも Combobox では扱わない。変換中の Escape のみ `event.stopPropagation()` する。Popover は自前の keydown ハンドラで Escape を処理し IME 変換中かを判定しないため、伝搬すると変換の取り消しで Popover まで閉じてしまうためである。変換の取り消し自体を妨げないよう `preventDefault` はしない。

## 注意事項

1. `value` / `inputValue` は両方とも完全 controlled として渡すこと（v2 で uncontrolled 対応を検討中）。
2. `Combobox.HelperMessage` / `Combobox.ErrorMessage` は **必ず `Combobox.Input` の direct children** に配置すること。`Combobox` 直下に置くと TextInput の `aria-describedby` 連携が成立しない。
3. `Combobox.Item` / `Combobox.Loading` / `Combobox.Empty` は **必ず `Combobox.List` の direct children** に配置すること。Fragment や関数コンポーネントでラップすると走査されない。
4. `value` を渡しても `Combobox.List` 直下に該当 `Combobox.Item` が無い場合、選択中ラベルの表示は `inputValue` の値に依存する。利用者は初期 `inputValue` を渡すか、`onChange` の meta から受け取った label を保持すること。
5. フィルタリングはライブラリ側では行わない。利用者が `onInputChange` で受け取り、候補配列を絞り込んで再レンダリングする。
6. Restricted モード（リスト外の値は確定不可）の挙動として、blur 時に `inputValue` がリスト内の label に一致しない場合の復元は **利用者責任**。
7. 同じ `value` を持つ `Combobox.Item` を重複して配置しないこと（aria-activedescendant の一意性が崩れる）。
8. 複数選択モードでは、`Combobox.Chip` を **`Combobox.Input` の直接の子** として、`value` の全要素について `value` と同じ順に 1 つずつ描画すること。
9. 外せない値（`isRemovable={false}`）は、その値の `Combobox.Chip` を必ず描画すること。チップを描画していない値は外せる扱いになる。

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

### Q: 複数選択で、選択済みの候補をリストから消すには？

A: 利用側で候補配列から除外する（`fruits.filter((fruit) => !value.includes(fruit.value))`）。フィルタリングと同じく利用側の責務。除外しなかった場合は選択中の表示（チェック）になり、選ぶと選択を解除する。

### Q: チップの順序はどう決まる？

A: 利用側が `Combobox.Chip` を並べた順に描画される。`value` と同じ順に並べること。Backspace は描画順ではなく `value` の末尾を削除するため、順序がずれると見た目の最後のチップと削除されるチップが一致しなくなる。

### Q: チップの色は変えられる？

A: 現時点では指定できない（`gray` 固定）。

### Q: 選択をまとめてクリアしたい

A: 複数選択モードにはクリアボタンを用意していない（`onClickClearButton` は指定できない）。利用側のボタン等で `value` を空配列にすれば、削除は読み上げ（`aria-live`）でも通知される。

## 更新履歴

| 日付       | 内容                                                                                                                                                       | 担当者 |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 2026-04-17 | 新規作成                                                                                                                                                   | -      |
| 2026-06-29 | クリアボタンの仕様変更（`onClickClearButton` を渡したときのみ表示、値のクリアは利用者責務）に伴う記述更新                                                  | -      |
| 2026-10-05 | IME 変換中の `↑` / `↓` / `Escape` を Combobox で扱わないよう修正（従来は `Enter` のみ）                                                                    | -      |
| 2026-10-05 | `Combobox.Item` に `children`（候補行の見た目のみのカスタムレイアウト）を追加                                                                              | -      |
| 2026-10-05 | Floating UI の `reference` の取得を input の親要素の参照から `frameRef` 経由に変更（挙動は変わらない）                                                     | -      |
| 2026-10-06 | 複数選択モード（`isMultiple`）と `Combobox.Chip` を追加（長いラベルは 1 行で省略表示）。`Combobox.Input` に `id` / `aria-label` / `aria-labelledby` を追加 | -      |
