# SegmentedControl コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [SegmentedControl Props](#segmentedcontrol-props)
     - [必須プロパティ](#必須プロパティ)
     - [オプションプロパティ](#オプションプロパティ)
   - [SegmentedControl.Item Props](#segmentedcontrolitem-props)
     - [基本プロパティ](#基本プロパティ)
     - [排他的プロパティグループ](#排他的プロパティグループ)
5. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [状態に応じたスタイル](#状態に応じたスタイル)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [サイズ指定](#サイズ指定)
   - [アイコン付きラベル](#アイコン付きラベル)
   - [アイコンのみ](#アイコンのみ)
   - [無効状態](#無効状態)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

## 概要

SegmentedControlコンポーネントは、複数の選択肢から一つを選択するUIコンポーネントである。タブリストやラジオボタンのような単一選択機能を提供し、視覚的にグループ化された選択肢を表示する。

## インポート

```typescript
import { SegmentedControl } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
const [selectedValue, setSelectedValue] = useState('option1');

<SegmentedControl
  value={selectedValue}
  onChange={setSelectedValue}
  aria-label="表示方法の選択"
>
  <SegmentedControl.Item value="option1" label="オプション1" />
  <SegmentedControl.Item value="option2" label="オプション2" />
  <SegmentedControl.Item value="option3" label="オプション3" />
</SegmentedControl>
```

## Props

### SegmentedControl Props

#### 必須プロパティ

| プロパティ   | 型          | 説明                                                             |
| ------------ | ----------- | ---------------------------------------------------------------- |
| `children`   | `ReactNode` | 表示するSegmentedControl.Item要素群                              |
| `aria-label` | `string`    | コントロール群が何のためのものかを説明するアクセシビリティラベル |

#### オプションプロパティ

| プロパティ   | 型                        | デフォルト値 | 説明                               |
| ------------ | ------------------------- | ------------ | ---------------------------------- |
| `value`      | `string`                  | `undefined`  | 現在選択されている値               |
| `size`       | `'small' \| 'medium'`     | `'medium'`   | コンポーネントのサイズ             |
| `isDisabled` | `boolean`                 | `false`      | 全体の無効化状態                   |
| `onChange`   | `(value: string) => void` | `undefined`  | 選択値が変更された時のコールバック |

### SegmentedControl.Item Props

#### 基本プロパティ

| プロパティ   | 型        | デフォルト値 | 説明               |
| ------------ | --------- | ------------ | ------------------ |
| `value`      | `string`  | -            | 選択時に返される値 |
| `isDisabled` | `boolean` | `false`      | 個別の無効化状態   |

#### 排他的プロパティグループ

SegmentedControl.Itemは以下の4つのパターンのいずれかで使用する：

```typescript
// 1. アイコンのみ（labelなし）
type IconOnlyProps = {
  icon: IconName;
  label?: never;
  'aria-label': string; // 必須
};

// 2. アイコン + ラベル
type IconWithLabelProps = {
  icon: IconName;
  label: string;
  'aria-label'?: string; // オプション
};

// 3. ラベルのみ（iconなし）
type LabelOnlyProps = {
  icon?: never;
  label: string;
  'aria-label'?: string; // オプション
};

// 4. children使用（icon、labelともになし）
type ChildrenOnlyProps = {
  icon?: never;
  label?: never;
  'aria-label'?: string; // オプション
};
```

## 状態とスタイル

### サイズバリエーション

#### Small

- パディング: `px-2`
- 最小高さ: `min-h-[24px]`
- タイポグラフィ: `typography-label12regular`

#### Medium（デフォルト）

- パディング: `px-4`
- 最小高さ: `min-h-[32px]`
- タイポグラフィ: `typography-label14regular`

### 状態に応じたスタイル

#### 通常状態

- 背景: `bg-transparent`
- テキスト: `text-text01`
- ホバー: `hover:bg-hover02`

#### 選択状態

- 背景: `bg-uiBackground01`
- テキスト: `text-interactive01`
- アイコン: `fill-interactive01`

#### 無効状態（`isDisabled: true`）

- 背景: `bg-transparent`
- テキスト: `text-disabled01`
- アイコン: `fill-disabled01`

#### コンテナスタイル

- 背景: `bg-uiBackground02`
- パディング: `p-1`
- 角丸: `rounded-lg`
- レイアウト: CSS Grid（等幅配置）

## 使用例

### 基本的な使用例

```typescript
const [view, setView] = useState('list');

<SegmentedControl
  value={view}
  onChange={setView}
  aria-label="表示方法の選択"
>
  <SegmentedControl.Item value="list" label="リスト" />
  <SegmentedControl.Item value="grid" label="グリッド" />
  <SegmentedControl.Item value="table" label="テーブル" />
</SegmentedControl>
```

### サイズ指定

```typescript
// Smallサイズ
<SegmentedControl size="small" aria-label="表示選択">
  <SegmentedControl.Item value="compact" label="コンパクト" />
  <SegmentedControl.Item value="normal" label="標準" />
</SegmentedControl>

// Mediumサイズ（デフォルト）
<SegmentedControl size="medium" aria-label="表示選択">
  <SegmentedControl.Item value="compact" label="コンパクト" />
  <SegmentedControl.Item value="normal" label="標準" />
</SegmentedControl>
```

### アイコン付きラベル

```typescript
<SegmentedControl value={view} onChange={setView} aria-label="表示方法">
  <SegmentedControl.Item value="list" label="リスト" icon="list" />
  <SegmentedControl.Item value="table" label="テーブル" icon="table" />
  <SegmentedControl.Item value="documents" label="ドキュメント" icon="documents" />
</SegmentedControl>
```

### アイコンのみ

```typescript
<SegmentedControl value={view} onChange={setView} aria-label="表示方法">
  <SegmentedControl.Item value="list" icon="list" aria-label="リスト表示" />
  <SegmentedControl.Item value="table" icon="table" aria-label="テーブル表示" />
  <SegmentedControl.Item value="star" icon="star" aria-label="お気に入り表示" />
</SegmentedControl>
```

### 無効状態

```typescript
// 全体の無効化
<SegmentedControl isDisabled aria-label="表示選択">
  <SegmentedControl.Item value="option1" label="オプション1" />
  <SegmentedControl.Item value="option2" label="オプション2" />
</SegmentedControl>

// 個別の無効化
<SegmentedControl value={view} onChange={setView} aria-label="表示選択">
  <SegmentedControl.Item value="option1" label="オプション1" />
  <SegmentedControl.Item value="option2" label="オプション2" isDisabled />
  <SegmentedControl.Item value="option3" label="オプション3" />
</SegmentedControl>
```

## アクセシビリティ

- **WAI-ARIA準拠**: `role="tablist"`および`role="tab"`を使用してタブ構造を実装
- **キーボードナビゲーション**:
  - 矢印キー（上下左右）で選択肢間を移動
  - `Home`キーで最初の選択肢に移動
  - `End`キーで最後の選択肢に移動
  - `Tab`キーでコンポーネント全体からフォーカスが外れる
- **フォーカス管理**: Roving focusパターンを実装して適切なフォーカス制御を提供
- **aria-label**: SegmentedControlには必須、SegmentedControl.Itemではアイコンのみの場合に必須
- **aria-selected**: 選択状態を適切に伝達
- **disabled属性**: 無効化されたアイテムは適切にマークされ、フォーカス対象から除外される

## 技術的な詳細

### Context API使用

SegmentedControlとSegmentedControl.Item間の状態共有にReact Context APIを使用している。

```typescript
type SegmentedControlContextValue = {
  value?: string;
  onChange?: (value: string) => void;
  size: 'small' | 'medium';
  isDisabled: boolean;
  focusedValue: string | null;
  onFocusChange?: (value: string) => void;
  onBlur?: () => void;
  values: string[];
};
```

### Roving Focus実装

`useRovingFocus`カスタムフックを使用してキーボードナビゲーションを実装している。

### CSS Grid Layout

子要素は等幅で配置され、CSS Grid の `grid-template-columns: repeat(n, minmax(0,1fr))` を使用している。

## 注意事項

- SegmentedControl.Itemは必ずSegmentedControl内で使用する必要がある
- アイコンのみを使用する場合は、必ず`aria-label`を指定する
- `value`プロパティは制御されたコンポーネントとして使用することを推奨する
- 無効化されたアイテムがある場合、フォーカス可能な要素のリストから自動的に除外される
- マウス操作とキーボード操作が混在する場合も適切に動作するよう実装されている

## スタイルのカスタマイズ

このコンポーネントのスタイルは`@zenkigen-inc/component-config`のTailwind CSSプリセットに依存している。カスタマイズする場合は、プロジェクトのTailwind設定でデザイントークンを調整すること。

## 更新履歴

| 日付       | 内容     | 担当者 |
| ---------- | -------- | ------ |
| 2025-08-18 | 新規作成 | -      |
