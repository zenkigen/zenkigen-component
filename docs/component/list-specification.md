# List コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [List のプロパティ](#list-のプロパティ)
   - [List.OptionItem のプロパティ](#listoptionitem-のプロパティ)
5. [コンポジション（子コンポーネント）](#コンポジション子コンポーネント)
6. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [バリアントによるスタイル](#バリアントによるスタイル)
   - [List.OptionItem の状態に応じたスタイル](#listoptionitem-の状態に応じたスタイル)
7. [使用例](#使用例)
   - [Combobox の候補リストとして](#combobox-の候補リストとして)
   - [borderless variant](#borderless-variant)
   - [スクロール可能な長いリスト](#スクロール可能な長いリスト)
8. [アクセシビリティ](#アクセシビリティ)
9. [技術的な詳細](#技術的な詳細)
10. [注意事項](#注意事項)
11. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
12. [更新履歴](#更新履歴)

---

## 概要

List コンポーネントは、候補リストやメニューなどの **オーバーレイリスト UI 全般の基盤** となるコンテナコンポーネントである。`<ul>` をベースに ARIA role・Outline / borderless・size を統一的に提供し、`List.OptionItem` を Compound として持つ。Combobox の候補リストとして利用されており、将来的には Select / Dropdown もこの基盤に統合する予定である。

## インポート

```typescript
import { List, ListOptionItem } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { List } from '@zenkigen-inc/component-ui';

<List role="listbox" aria-label="候補一覧" maxHeight={240}>
  {options.map((opt) => (
    <List.OptionItem
      key={opt.value}
      id={`combobox-option-${opt.value}`}
      isActive={activeValue === opt.value}
      isSelected={selectedValue === opt.value}
      onClick={() => handleSelect(opt.value)}
      onMouseEnter={() => setActiveValue(opt.value)}
    >
      {opt.label}
    </List.OptionItem>
  ))}
</List>
```

## Props

### List のプロパティ

| プロパティ        | 型                          | デフォルト値 | 説明                                        |
| ----------------- | --------------------------- | ------------ | ------------------------------------------- |
| `size`            | `'medium' \| 'large'`       | `'medium'`   | リスト全体のサイズ                          |
| `variant`         | `'outline' \| 'borderless'` | `'outline'`  | 枠線の有無                                  |
| `maxHeight`       | `CSSProperties['height']`   | `undefined`  | リストの最大高さ。指定時は内部スクロール    |
| `width`           | `CSSProperties['width']`    | `undefined`  | リストの幅                                  |
| `role`            | `'listbox' \| 'menu'`       | `'listbox'`  | ARIA role                                   |
| `id`              | `string`                    | `undefined`  | 要素 ID（aria-controls のターゲットに使う） |
| `aria-label`      | `string`                    | `undefined`  | アクセシブルな名前                          |
| `aria-labelledby` | `string`                    | `undefined`  | アクセシブルな名前（参照）                  |

### List.OptionItem のプロパティ

| プロパティ      | 型                                           | デフォルト値 | 必須 | 説明                                          |
| --------------- | -------------------------------------------- | ------------ | :--: | --------------------------------------------- |
| `id`            | `string`                                     | -            |  ✓   | aria-activedescendant のターゲット ID         |
| `isActive`      | `boolean`                                    | `false`      |      | キーボードフォーカス中（視覚強調）            |
| `isSelected`    | `boolean`                                    | `false`      |      | 選択済み（背景強調）                          |
| `isDisabled`    | `boolean`                                    | `false`      |      | 無効状態                                      |
| `isError`       | `boolean`                                    | `false`      |      | エラー状態（Selected_Error スタイル用）       |
| `onClick`       | `(event: MouseEvent<HTMLLIElement>) => void` | `undefined`  |      | クリック時のハンドラ                          |
| `onMouseEnter`  | `() => void`                                 | `undefined`  |      | ホバー検知（activeIndex 同期用）              |
| `aria-selected` | `boolean`                                    | `isSelected` |      | ARIA 選択状態。未指定時は `isSelected` を使用 |
| `aria-disabled` | `boolean`                                    | `isDisabled` |      | ARIA 無効状態。未指定時は `isDisabled` を使用 |

> 注: `role` は内部固定で `"option"`。利用者から差し替え不可。Phase 4 で追加される `List.MenuItem`（仮）は `role="menuitem"` 固定となる予定。

## コンポジション（子コンポーネント）

| コンポーネント    | 説明                                                                |
| ----------------- | ------------------------------------------------------------------- |
| `List.OptionItem` | `role="option"` 用途の Item。`<li>` ベース。`<button>` を持たない。 |

## 状態とスタイル

### サイズバリエーション

`List.OptionItem` の高さとタイポグラフィは `List` の `size` に従う:

- `medium`（デフォルト）
  - 高さ: `h-8`
  - タイポグラフィ: `typography-label14regular`
- `large`
  - 高さ: `h-10`
  - タイポグラフィ: `typography-label16regular`

### バリアントによるスタイル

| 項目       | Outline                                 | Borderless              |
| ---------- | --------------------------------------- | ----------------------- |
| ボーダー   | `border border-solid border-uiBorder01` | なし                    |
| 背景       | `bg-uiBackground01`                     | `bg-uiBackground01`     |
| シャドウ   | `shadow-floatingShadow`                 | `shadow-floatingShadow` |
| パディング | `py-2`                                  | `py-2`                  |

### List.OptionItem の状態に応じたスタイル

優先順位は disabled > selected > active > base。

- 通常（base）: `bg-uiBackground01 text-interactive02 fill-icon01`
  - ホバー時: `hover:bg-hover02`
  - 押下時: `active:bg-active02`
- キーボードフォーカス中（`isActive: true`）: `bg-hover02 text-interactive02 fill-icon01`
- 選択済み（`isSelected: true`、isError 無し）: `bg-selectedUi text-interactive01 fill-interactive01`
- 選択済み + エラー（`isSelected: true` かつ `isError: true`）: `bg-uiBackgroundError text-supportError fill-supportError`
- 無効（`isDisabled: true`）: `cursor-not-allowed bg-uiBackground01 text-disabled01 fill-disabled01`
  - クリック / マウスエンターは無視される

すべての Item に `cursor: pointer` が当たる（disabled 時のみ `cursor-not-allowed`）。横方向は `px-3`、`flex w-full items-center` で中身を縦中央寄せ・横幅いっぱい。

## 使用例

### Combobox の候補リストとして

`Combobox` が内部で利用しているパターン。`role="listbox"` を指定し、`List.OptionItem` で各候補を描画する。`id` は `aria-activedescendant` のターゲットとして必須。

```typescript
<List role="listbox" aria-label="候補一覧" maxHeight={240}>
  {options.map((opt) => (
    <List.OptionItem
      key={opt.value}
      id={`combobox-option-${opt.value}`}
      isActive={activeValue === opt.value}
      isSelected={selectedValue === opt.value}
      onClick={() => handleSelect(opt.value)}
      onMouseEnter={() => setActiveValue(opt.value)}
    >
      {opt.label}
    </List.OptionItem>
  ))}
</List>
```

### borderless variant

popup 内部で利用する際は `variant="borderless"` を推奨する（Floating UI のシャドウのみ）。

```typescript
<List variant="borderless" size="medium" aria-label="候補">
  <List.OptionItem id="x">テキスト</List.OptionItem>
</List>
```

### スクロール可能な長いリスト

`maxHeight` を指定すると、リスト内スクロールに切り替わる。

```typescript
<List variant="outline" size="medium" maxHeight={160} aria-label="候補">
  {Array.from({ length: 20 }, (_, i) => (
    <List.OptionItem key={`item-${i}`} id={`item-${i}`}>
      アイテム {i + 1}
    </List.OptionItem>
  ))}
</List>
```

## アクセシビリティ

- `List` は `<ul>` で描画され、`role`（`'listbox'` または `'menu'`）を指定できる。
- `List.OptionItem` は `<li>` で描画され、`role="option"` 固定。
- `aria-selected` は `isSelected` から自動補完する（明示指定で上書き可能）。
- `aria-disabled` は `isDisabled` から自動補完する。
- `onMouseDown` で `event.preventDefault()` を実行し、Combobox の input フォーカスが奪われないようにしている（`aria-activedescendant` 方式と整合させるため）。
- `id` は必須。Combobox 等の親が `aria-activedescendant` で参照する。

## 技術的な詳細

- `List` は `forwardRef<HTMLUListElement, ListProps>` で実装され、`Object.assign` で `OptionItem` を Compound として attach する。
- `size` / `variant` は React Context（`ListContext`）で `List.OptionItem` に伝播する。
- `List.OptionItem` は List 外で使用するとエラー（`<List.OptionItem> must be used inside <List>`）を投げる。
- スタイル組み立てに `clsx` を使用する。
- フォーカスリング（`focusVisible.inset`）は `@zenkigen-inc/component-theme` から流用する。

## 注意事項

1. `List.OptionItem` は **必ず `<List>` の中** で使用すること。コンテキスト外ではエラーが投げられる。
2. `List.OptionItem` の `id` は **一意性を確保する** こと（`aria-activedescendant` のターゲットになるため）。
3. `List.OptionItem` の中に `<button>` などのフォーカス可能要素を入れないこと。Combobox のキーボード操作（`aria-activedescendant` 方式）が破綻する。
4. Dropdown のような `role="menu"` 用途で `<button>` ベースの Item が必要な場合は、Phase 4 で追加予定の `List.MenuItem`（仮）を待つこと。現状の `List.OptionItem` では代替できない。
5. `aria-label` または `aria-labelledby` のいずれかを必ず指定し、リストの目的をスクリーンリーダーに伝えること。

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config` で定義されたデザイントークンに依存している。カスタマイズする場合は、当該設定を参照すること。

## 更新履歴

| 日付       | 内容     | 担当者 |
| ---------- | -------- | ------ |
| 2026-04-17 | 新規作成 | -      |
