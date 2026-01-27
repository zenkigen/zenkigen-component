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
   - [自動スクロール機能](#自動スクロール機能)
   - [外部クリック検知](#外部クリック検知)
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

| プロパティ            | 型                                            | デフォルト値 | 説明                                                   |
| --------------------- | --------------------------------------------- | ------------ | ------------------------------------------------------ |
| `size`                | `'x-small' \| 'small' \| 'medium' \| 'large'` | `'medium'`   | コンポーネントのサイズ                                 |
| `variant`             | `'outline' \| 'text'`                         | `'outline'`  | 表示スタイルのバリエーション                           |
| `width`               | `CSSProperties['width']`                      | -            | コンポーネントの幅                                     |
| `maxWidth`            | `CSSProperties['maxWidth']`                   | -            | コンポーネントの最大幅                                 |
| `placeholder`         | `string`                                      | -            | 未選択時に表示されるテキスト                           |
| `placeholderIcon`     | `IconName`                                    | -            | プレースホルダー表示時のアイコン                       |
| `selectedOption`      | `SelectOption \| null`                        | `null`       | 現在選択されているオプション                           |
| `optionListMaxHeight` | `CSSProperties['height']`                     | -            | オプションリストの最大高さ                             |
| `isDisabled`          | `boolean`                                     | `false`      | 無効状態の制御                                         |
| `isError`             | `boolean`                                     | `false`      | エラー状態の制御                                       |
| `isOptionSelected`    | `boolean`                                     | `false`      | 選択状態の見た目を適用するかどうか                     |
| `matchListToTrigger`  | `boolean`                                     | `false`      | ドロップダウンリストの幅をトリガーボタンの幅に合わせる |
| `onChange`            | `(option: SelectOption \| null) => void`      | -            | 選択変更時のコールバック関数                           |

### 継承プロパティ

- `children` - `ReactNode`として`Select.Option`コンポーネントを受け取る

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

```typescript
<Select
  optionListMaxHeight="120px"
  selectedOption={selectedOption}
  onChange={(option) => setSelectedOption(option)}
>
  {manyOptions.map((option) => (
    <Select.Option key={option.id} option={option} />
  ))}
</Select>
```

## 技術的な詳細

### 選択解除機能

プレースホルダーが設定されており、何かが選択されている場合、オプションリストの下部に「選択解除」ボタンが表示される。このボタンをクリックすると、`onChange`に`null`が渡されて選択が解除される。

### 自動スクロール・外部クリック検知

オプションリスト表示時に選択中のアイテムを視認可能位置までスクロールし、外部クリック時は自動的に閉じる。

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

| 日付       | 内容                                  | 担当者 |
| ---------- | ------------------------------------- | ------ |
| 2026-01-27 | `matchListToTrigger` プロパティを追加 | -      |
| 2025-10-10 | 親要素の`overflow`設定の影響回避      | -      |
| 2025-08-18 | 新規作成                              | -      |
