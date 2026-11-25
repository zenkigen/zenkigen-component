# Select コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
   - [継承プロパティ](#継承プロパティ)
5. [SelectOption型](#selectoption型)
6. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [バリアントスタイル](#バリアントスタイル)
   - [状態に応じたスタイル](#状態に応じたスタイル)
7. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [アイコン付きオプション](#アイコン付きオプション)
   - [プレースホルダーアイコン](#プレースホルダーアイコン)
   - [エラー状態](#エラー状態)
   - [無効状態](#無効状態)
   - [幅の制御](#幅の制御)
   - [オプションリストの高さ制御](#オプションリストの高さ制御)
8. [技術的な詳細](#技術的な詳細)
   - [選択解除機能](#選択解除機能)
   - [自動スクロール](#自動スクロール)
   - [オプションリストが閉じる条件](#オプションリストが閉じる条件)
   - [オプションリストの表示位置と高さ](#オプションリストの表示位置と高さ)
   - [親要素の`overflow`設定の影響回避](#親要素のoverflow設定の影響回避)
9. [アクセシビリティ](#アクセシビリティ)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

## 概要

Selectコンポーネントは、ドロップダウン形式で複数の選択肢から1つを選択するUIコンポーネントである。アイコン付きのオプション表示、エラー状態の表示、選択解除機能など、柔軟な設定が可能なセレクトボックスを提供する。

## インポート

```typescript
import { Select } from '@zenkigen-inc/component-ui';
import type { SelectOption } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
const options = [
  { id: '1', label: '選択肢A', value: 'A' },
  { id: '2', label: '選択肢B', value: 'B' },
  { id: '3', label: '選択肢C', value: 'C' },
];

const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);

<Select
  placeholder="選択してください"
  selectedOption={selectedOption}
  onChange={(option) => setSelectedOption(option)}
>
  {options.map((option) => (
    <Select.Option key={option.id} option={option} />
  ))}
</Select>
```

## Props

### 必須プロパティ

なし（すべてオプション）

### オプションプロパティ

| プロパティ            | 型                                            | デフォルト値        | 説明                                                                                                                        |
| --------------------- | --------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `size`                | `'x-small' \| 'small' \| 'medium' \| 'large'` | `'medium'`          | コンポーネントのサイズ                                                                                                      |
| `variant`             | `'outline' \| 'text'`                         | `'outline'`         | 表示スタイルのバリエーション                                                                                                |
| `width`               | `CSSProperties['width']`                      | -                   | コンポーネントの幅                                                                                                          |
| `maxWidth`            | `CSSProperties['maxWidth']`                   | -                   | コンポーネントの最大幅                                                                                                      |
| `placeholder`         | `string`                                      | -                   | 未選択時に表示されるテキスト                                                                                                |
| `placeholderIcon`     | `IconName`                                    | -                   | プレースホルダー表示時のアイコン                                                                                            |
| `selectedOption`      | `SelectOption \| null`                        | `null`              | 現在選択されているオプション                                                                                                |
| `optionListMaxHeight` | `CSSProperties['height']`                     | オプション 8.5 個分 | オプションリストの最大高さの上限。画面内の空きが小さいときはさらに縮む。`"none"` で上限を外す（その場合も画面内には収まる） |
| `isDisabled`          | `boolean`                                     | `false`             | 無効状態の制御                                                                                                              |
| `isError`             | `boolean`                                     | `false`             | エラー状態の制御                                                                                                            |
| `isOptionSelected`    | `boolean`                                     | `false`             | 選択状態の見た目を適用するかどうか                                                                                          |
| `hasDeselectButton`   | `boolean`                                     | 後方互換の挙動      | 「選択解除」を表示するかどうか（未指定時の挙動は「選択解除機能」参照）                                                      |
| `matchListToTrigger`  | `boolean`                                     | `false`             | ドロップダウンリストの幅をトリガーボタンの幅に合わせる                                                                      |
| `aria-label`          | `string`                                      | -                   | トリガーボタンに設定する`aria-label`                                                                                        |
| `aria-describedby`    | `string`                                      | -                   | トリガーボタンに設定する`aria-describedby`                                                                                  |
| `onChange`            | `(option: SelectOption \| null) => void`      | -                   | 選択変更時のコールバック関数                                                                                                |

### 継承プロパティ

- `children` - `ReactNode`として`Select.Option`コンポーネントを受け取る

### トリガーボタンへの aria 属性

`aria-label` / `aria-describedby` は、指定した場合のみトリガーの`<button>`要素へそのまま付与される（未指定時は属性を付与しない）。`TimePicker`のように`Select`を合成するコンポーネントから、時/分などのラベルやエラーメッセージとの関連付けを配線するために使用する。

`aria-invalid`は props では受け取らず、`isError`から内部導出する。`isError={true}`のときのみトリガーの`<button>`へ`aria-invalid="true"`を出力し、`isError={false}`のときは属性自体を出力しない（他のフォーム系コンポーネントと同じ挙動）。

## SelectOption型

```typescript
type SelectOption = {
  id: string; // 一意識別子
  value: string; // 選択値
  label: string; // 表示ラベル
  icon?: IconName; // オプションのアイコン
};
```

## 状態とスタイル

### サイズバリエーション

#### x-small

- 高さ: `h-6` (24px)
- パディング: `px-2`
- タイポグラフィ: `typography-label12regular`
- アイコンサイズ: `small`

#### small

- 高さ: `h-6` (24px)
- パディング: `px-2`
- タイポグラフィ: `typography-label14regular`
- アイコンサイズ: `small`

#### medium（デフォルト）

- 高さ: `h-8` (32px)
- パディング: `px-4`
- タイポグラフィ: `typography-label14regular`
- アイコンサイズ: `small`

#### large

- 高さ: `h-10` (40px)
- パディング: `px-4`
- タイポグラフィ: `typography-label16regular`
- アイコンサイズ: `medium`

上記の高さ・余白・タイポグラフィはトリガーボタンの仕様。オプションリストの各オプション (`Select.Option`) と「選択解除」ボタンの高さは `size` に追従し、`size='large'` で `h-10`（40px）、それ以外（`x-small`/`small`/`medium`）では `h-8`（32px）となる。

### バリアントスタイル

#### outline（デフォルト）

- ボーダー付きのアウトライン表示
- オプションリストにもボーダーが適用される

#### text

- ボーダーなしのテキストのみ表示
- よりシンプルな見た目

### 状態に応じたスタイル

#### 通常状態

- ベース色でのスタイル適用
- ホバー・アクティブ状態のインタラクション有効

#### 選択状態（`isOptionSelected: true`）

- 選択されたオプションがハイライト表示
- `isError`が`false`かつ`isDisabled`が`false`の場合のみ適用

#### エラー状態（`isError: true`）

- ボーダー色が`border-supportError`に変更
- エラー用のカラーパレットが適用
- 選択されたオプションもエラー色で表示

#### 無効状態（`isDisabled: true`）

- カーソルが`cursor-not-allowed`に変更
- ポインターイベントが無効化
- 無効化用のスタイルが適用
- オプションリストが表示されない

## 使用例

### 基本的な使用例

```typescript
const options = [
  { id: '1', label: 'オプション1', value: 'option1' },
  { id: '2', label: 'オプション2', value: 'option2' },
  { id: '3', label: 'オプション3', value: 'option3' },
];

const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);

<Select
  placeholder="選択してください"
  selectedOption={selectedOption}
  onChange={(option) => setSelectedOption(option)}
>
  {options.map((option) => (
    <Select.Option key={option.id} option={option} />
  ))}
</Select>
```

### アイコン付きオプション

```typescript
const optionsWithIcons = [
  { id: '1', label: '追加', value: 'add', icon: 'add' as IconName },
  { id: '2', label: '警告', value: 'warning', icon: 'warning' as IconName },
  { id: '3', label: 'ユーザー', value: 'user', icon: 'user' as IconName },
];

<Select
  placeholder="アクションを選択"
  selectedOption={selectedOption}
  onChange={(option) => setSelectedOption(option)}
>
  {optionsWithIcons.map((option) => (
    <Select.Option key={option.id} option={option} />
  ))}
</Select>
```

### プレースホルダーアイコン

```typescript
<Select
  placeholder="カテゴリを選択"
  placeholderIcon="filter"
  selectedOption={selectedOption}
  onChange={(option) => setSelectedOption(option)}
>
  {options.map((option) => (
    <Select.Option key={option.id} option={option} />
  ))}
</Select>
```

### エラー状態

```typescript
<Select
  placeholder="必須項目"
  selectedOption={selectedOption}
  onChange={(option) => setSelectedOption(option)}
  isError={true}
>
  {options.map((option) => (
    <Select.Option key={option.id} option={option} />
  ))}
</Select>
```

### 無効状態

```typescript
<Select
  placeholder="無効化された選択"
  selectedOption={selectedOption}
  onChange={(option) => setSelectedOption(option)}
  isDisabled={true}
>
  {options.map((option) => (
    <Select.Option key={option.id} option={option} />
  ))}
</Select>
```

### 幅の制御

```typescript
// 固定幅
<Select
  width={200}
  selectedOption={selectedOption}
  onChange={(option) => setSelectedOption(option)}
>
  {options.map((option) => (
    <Select.Option key={option.id} option={option} />
  ))}
</Select>

// 最大幅制限
<Select
  maxWidth={150}
  selectedOption={selectedOption}
  onChange={(option) => setSelectedOption(option)}
>
  {options.map((option) => (
    <Select.Option key={option.id} option={option} />
  ))}
</Select>

// ドロップダウンリストの幅をトリガーボタンに合わせる
<Select
  width={200}
  matchListToTrigger
  selectedOption={selectedOption}
  onChange={(option) => setSelectedOption(option)}
>
  {options.map((option) => (
    <Select.Option key={option.id} option={option} />
  ))}
</Select>
```

### オプションリストの高さ制御

未指定の場合、オプションリストの高さはオプション 8.5 個分に制限される（`size='large'` で 350px、それ以外は 282px）。指定した値・既定値はどちらも高さの上限であり、画面内の空きのほうが小さいときは、空きの高さまで縮む（「オプションリストの表示位置と高さ」参照）。末尾の 0.5 個はスクロールできることを示すためのもの。「選択解除」ボタンを表示している場合（`hasDeselectButton` を参照）は、そのボタンもこの 8.5 個に含まれるため、選択済みのときは表示されるオプション数がその分減る。

```typescript
// 既定（オプション 8.5 個分）
<Select selectedOption={selectedOption} onChange={(option) => setSelectedOption(option)}>
  {manyOptions.map((option) => (
    <Select.Option key={option.id} option={option} />
  ))}
</Select>

// 高さを指定する
<Select
  optionListMaxHeight="120px"
  selectedOption={selectedOption}
  onChange={(option) => setSelectedOption(option)}
>
  {manyOptions.map((option) => (
    <Select.Option key={option.id} option={option} />
  ))}
</Select>

// 上限を外す（画面内に収まる高さまでは表示する）
<Select
  optionListMaxHeight="none"
  selectedOption={selectedOption}
  onChange={(option) => setSelectedOption(option)}
>
  {manyOptions.map((option) => (
    <Select.Option key={option.id} option={option} />
  ))}
</Select>
```

`"none"` を指定した場合も、リストは画面内に収まる高さまで縮み、収まらない分はリストの中をスクロールして選ぶ。

## 技術的な詳細

### 選択解除機能

「選択解除」ボタンは、表示が有効かつ何かが選択されている場合にオプションリストの下部へ表示される。このボタンをクリックすると、`onChange`に`null`が渡されて選択が解除される。

表示するかどうかは`hasDeselectButton`で制御する。

| `hasDeselectButton` | 「選択解除」 |
| ------------------- | ------------ |
| `true`              | 表示する     |
| `false`             | 表示しない   |

必須項目のように選択解除を許可したくない場合は`hasDeselectButton={false}`を指定する。

```tsx
<Select
  placeholder="選択してください"
  hasDeselectButton={false}
  selectedOption={selectedOption}
  onChange={handleChange}
>
  {options.map((option) => (
    <Select.Option key={option.id} option={option} />
  ))}
</Select>
```

> [!WARNING]
> `hasDeselectButton={true}`を使う場合は`placeholder`（または`aria-label`）を必ず併せて指定すること。どちらも指定しないまま選択を解除すると、トリガーの表示テキストとアクセシブルネームがともに空になる。

`hasDeselectButton`を指定しなかった場合は、後方互換のため`placeholder`が指定されているかどうかで表示が決まる（空文字も指定扱いとなる）。これは`hasDeselectButton`導入前の挙動を維持するためのものであり、**将来のメジャーバージョンで廃止して`hasDeselectButton`単独の制御に移行する予定である**。

**`placeholder`は未選択時の表示テキストを指定するプロパティであり、「選択解除」の表示制御に用いてはならない。表示を制御する場合は必ず`hasDeselectButton`を指定すること。**

### 自動スクロール

オプションリスト表示時に、選択中のアイテムがリストの中央付近に来るようにリストをスクロールする。

自動スクロールはリストが実際にスクロールする状態（`scrollHeight > clientHeight`）のときのみ実行される。全件が収まっている場合は実行されない。`optionListMaxHeight="none"` で上限を外している場合も、画面内の空きで高さが縮んでスクロールが必要になれば実行される。

### オプションリストが閉じる条件

オプションリストは、次のいずれかで閉じる。

| きっかけ                                   | 補足                                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| トリガーをもう一度押す                     |                                                                                                        |
| オプションを選ぶ、または「選択解除」を押す |                                                                                                        |
| Select の外側をクリックする                |                                                                                                        |
| Modal が開く                               | Modal より背面で開いていたリストを閉じる                                                               |
| トリガーを含む領域がスクロールされる       | ページ全体、またはトリガーを内側に含むスクロール領域（Modal の本文など）がスクロールされたときに閉じる |

次のスクロールでは閉じない。

- オプションリスト自身のスクロール（リストを開いた直後の自動スクロールを含む）
- トリガーを含まない、別の領域のスクロール（例: 同じ画面にある別のスクロール枠）

スクロールで閉じる理由: オプションリストは`FloatingPortal`で`body`の直下に表示され、トリガーの位置に合わせて動く。開いたままページや Modal の本文をスクロールすると、リストが Modal のヘッダー・フッターや画面に固定したヘッダーの上に重なるため、スクロールされた時点で閉じる。

注意:

- 画面に固定した要素（固定ヘッダーなど）の中に置いた Select も、ページがスクロールされると閉じる。トリガー自身は動かないが、ページ全体はトリガーを含む領域として扱うため。
- オプションリストには`overscroll-contain`を指定しており、リストを端までスクロールしたあとのスクロールはページへ伝わらない。ただし、全件が収まっていてスクロールしないリストの上でホイールを回すと、ブラウザによってはページがスクロールされ、リストが閉じる。
- どの閉じ方でも、フォーカスをトリガーへ戻す処理は行わない。フォーカスがトリガーにあるまま閉じた場合は、トリガーに残る。オプションリストの中にフォーカスがある状態で閉じた場合は、フォーカスを持っていた要素が無くなるため、フォーカスは `body` に移る（Modal の中では、次の Tab で Modal 内の最初の要素へ移り、Modal の外へは出ない）。

### オプションリストの表示位置と高さ

- 既定ではトリガーの下に表示する。下に収まらず、上のほうが広いときはトリガーの上に表示する。
- 「下に収まるか」は、画面内の空きで縮める前の高さ（`optionListMaxHeight`で決まる高さ）で判定する。そのため、`optionListMaxHeight`に`"none"`や大きな値を指定してリストが上にも下にも収まらない場合は、空きが広いほうに表示する。画面の中央付近では、わずかな差で上に表示されることがある。`optionListMaxHeight`未指定（既定値）であれば、下に既定の高さ分の空きがある限り下に表示する。
- 高さは、`optionListMaxHeight`（未指定時は既定値）と、画面内で使える高さ（画面の端から 8px 内側まで）の小さいほうになる。`optionListMaxHeight="none"` の場合は、画面内で使える高さになる。
- 画面内に収める理由: スクロールで閉じるため、画面の外にはみ出した選択肢へ、ページをスクロールして届かせることができない。そのため、リストは常に画面内に収め、収まらない分はリストの中をスクロールして選ぶ。
- `optionListMaxHeight`に長さとして解釈できない値（`"max-content"`・`"auto"`など）を渡した場合は、上限なしとして扱い、画面内で使える高さになる。
- `optionListMaxHeight`に CSS 変数（`"var(--x)"`）を渡し、その変数が長さでない値（`none`など）に解決される場合は、高さの制限が効かず、画面内に収める制限も効かない。変数の中身を事前に判定できないため。

### 親要素の`overflow`設定の影響回避

Floating UI統合とオーバーフロー対策を実装。親要素の`overflow`設定の影響を受けないよう、`FloatingPortal`でリストをポータル描画。

## アクセシビリティ

- `forwardRef`を使用してDOM要素への参照をサポート
- 標準的な`<button>`要素のすべてのアクセシビリティ機能を継承
- `disabled`属性が適切に設定される
- フォーカス管理が適切に実装されている（`focusVisible`による視覚的フィードバック）
- キーボードナビゲーションに対応（オプションリスト内での操作）
- 選択状態が視覚的に明確に表示される

## スタイルのカスタマイズ

Selectコンポーネントのスタイルは`@zenkigen-inc/component-theme`のTailwind CSS設定に基づいている。カスタマイズする場合は、テーマ設定を変更することで一括でスタイルを調整できる。

特に以下の要素がカスタマイズ可能：

- `selectColors` - 各バリエーションとエラー状態の色設定
- `focusVisible` - フォーカス時の視覚的フィードバック
- タイポグラフィトークンによる文字スタイル

## 更新履歴

| 日付                 | 内容                                                                                                                                                                                                          | 担当者 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 2026-11-25 08:59 JST | トリガーを含む領域のスクロールでオプションリストを閉じるようにした。リストを画面内に収めるため、下に収まらないときは上に開き、高さを画面内の空きまで縮めるようにした（`optionListMaxHeight`は上限として働く） | -      |
| 2026-09-07 12:04 JST | 「選択解除」の表示制御プロパティ`hasDeselectButton`を追加。未指定時は後方互換の挙動を維持                                                                                                                     | -      |
| 2026-08-19           | `optionListMaxHeight` の既定値としてオプション 8.5 個分を設定。自動スクロールの実行条件を実測ベースへ変更                                                                                                     | -      |
| 2026-07-13           | トリガーボタンへ`aria-label`/`aria-describedby`を追加。`aria-invalid`は props ではなく`isError`から内部導出                                                                                                   | -      |
| 2026-01-27           | `matchListToTrigger` プロパティを追加                                                                                                                                                                         | -      |
| 2025-10-10           | 親要素の`overflow`設定の影響回避                                                                                                                                                                              | -      |
| 2025-08-18           | 新規作成                                                                                                                                                                                                      | -      |
