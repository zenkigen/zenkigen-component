# Steps コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [Steps Props](#steps-props)
   - [Steps.Item Props](#stepsitem-props)
5. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [ステップ状態](#ステップ状態)
   - [バリアント](#バリアント)
6. [使用例](#使用例)
7. [アクセシビリティ](#アクセシビリティ)
8. [設計原則](#設計原則)
9. [注意事項](#注意事項)
10. [更新履歴](#更新履歴)

## 概要

Steps コンポーネントは、長時間かかるタスクや複数工程のフローにおいて、ユーザーの進捗状況を視覚的・直感的に表示するためのコンポーネントである。ステップの並び（水平 / 垂直）、テキストの配置（円の横 / 下）、サイズ、スタイルバリアントを組み合わせて様々な進捗表示に対応する。

## インポート

```typescript
import { Steps } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```tsx
<Steps currentStep={2} aria-label="申込フロー">
  <Steps.Item label="申込情報入力" description="お名前・メール" />
  <Steps.Item label="配送先" description="住所入力" />
  <Steps.Item label="お支払い" />
  <Steps.Item label="確認" />
</Steps>
```

## Props

### Steps Props

| プロパティ           | 型                               | デフォルト値   | 説明                                        |
| -------------------- | -------------------------------- | -------------- | ------------------------------------------- |
| `children`           | `ReactNode`                      | -              | `Steps.Item` 要素の並び                     |
| `currentStep`        | `number`                         | `undefined`    | controlled 用。0 始まりの現在ステップ index |
| `defaultCurrentStep` | `number`                         | `0`            | uncontrolled 時の初期値                     |
| `size`               | `'small' \| 'medium' \| 'large'` | `'medium'`     | 円とテキストのサイズ                        |
| `orientation`        | `'horizontal' \| 'vertical'`     | `'horizontal'` | ステップの並ぶ方向                          |
| `textOrientation`    | `'horizontal' \| 'vertical'`     | `'horizontal'` | テキストを円の横に並べるか下に並べるか      |
| `variant`            | `'subtle' \| 'solid'`            | `'solid'`      | 完了/現在のステップの表現強弱               |
| `aria-label`         | `string`                         | `undefined`    | ステップ群の意味を支援技術へ伝えるラベル    |

### Steps.Item Props

| プロパティ    | 型       | デフォルト値 | 説明                                |
| ------------- | -------- | ------------ | ----------------------------------- |
| `label`       | `string` | -            | ステップの主タイトル                |
| `description` | `string` | `undefined`  | 任意のサブテキスト（12px / text02） |

`Steps.Item` は内部利用の `_index` / `_status` / `_isLast` props を持つが、これらは `Steps` が自動注入するため外部から直接指定しない。

## 状態とスタイル

### サイズバリエーション

| サイズ   | 円サイズ | 番号フォント                | ラベルフォント              |
| -------- | -------- | --------------------------- | --------------------------- |
| `small`  | 24px     | `typography-label12regular` | `typography-label14regular` |
| `medium` | 32px     | `typography-label12regular` | `typography-label14regular` |
| `large`  | 40px     | `typography-label16regular` | `typography-label16regular` |

### ステップ状態

`currentStep` とステップの index を比較して状態が自動判定される。ユーザーは個別に状態を指定できない（順序の線形性を保証する）。

| 条件                    | 状態        |
| ----------------------- | ----------- |
| `index < currentStep`   | `completed` |
| `index === currentStep` | `current`   |
| `index > currentStep`   | `upcoming`  |

- `completed`: チェックアイコンで表示、セパレータは `bg-interactive01`（青）
- `current`: 現在のステップ。`aria-current="step"` が付与される
- `upcoming`: 円は薄く表示、セパレータは `bg-uiBorder01`

### バリアント

| variant  | completed                               | current                                                       | upcoming                                                  |
| -------- | --------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------- |
| `subtle` | `bg-supportInfoLight` + `text-text01`   | `bg-activeUi` + `text-text01`                                 | `bg-uiBackground02` + `text-text01`                       |
| `solid`  | `bg-interactive01` + `text-iconOnColor` | `bg-activeUi` + `text-interactive01` + `border-interactive01` | `bg-uiBackground01` + `text-text01` + `border-uiBorder01` |

## 使用例

### 水平 + 横テキスト（デフォルト）

```tsx
<Steps currentStep={1} aria-label="申込フロー">
  <Steps.Item label="申込情報入力" />
  <Steps.Item label="配送先" />
  <Steps.Item label="お支払い" />
  <Steps.Item label="確認" />
</Steps>
```

### 水平 + 縦テキスト（円下にラベル）

```tsx
<Steps currentStep={2} textOrientation="vertical" aria-label="申込フロー">
  <Steps.Item label="ステップ1" />
  <Steps.Item label="ステップ2" />
  <Steps.Item label="ステップ3" />
  <Steps.Item label="ステップ4" />
</Steps>
```

### 垂直配置

```tsx
<Steps currentStep={1} orientation="vertical" aria-label="申込フロー">
  <Steps.Item label="申込情報入力" description="お名前・メール" />
  <Steps.Item label="配送先" description="住所入力" />
  <Steps.Item label="お支払い" />
</Steps>
```

### サブトルバリアント

```tsx
<Steps currentStep={2} variant="subtle" aria-label="申込フロー">
  <Steps.Item label="ステップ1" />
  <Steps.Item label="ステップ2" />
  <Steps.Item label="ステップ3" />
</Steps>
```

### uncontrolled

```tsx
<Steps defaultCurrentStep={0} aria-label="オンボーディング">
  <Steps.Item label="はじめに" />
  <Steps.Item label="プロフィール" />
  <Steps.Item label="完了" />
</Steps>
```

## アクセシビリティ

- ルートは `<ol role="list">`。`aria-label` を渡すとステップ群の意味を伝える
- 各ステップは `<li>` として描画され、現在のステップのみ `aria-current="step"` が付く
- 各ステップの先頭に `sr-only` で状態ラベル（"完了: "/"現在のステップ: "/"未着手: "）を埋め込み、completed / current / upcoming を支援技術で区別可能にする
- 番号とチェックアイコンは装飾のため `aria-hidden="true"`。ラベル本文がスクリーンリーダーの主情報
- セパレータは `<div aria-hidden="true">` で、支援技術には読まれない

## 設計原則

- ステップの状態は `currentStep` から自動算出する。個別指定は提供しない（順序性を保証）
- Separator は Steps が内部で自動配置する。利用者が手動で挟む API は提供しない
- 水平レイアウトは `grid` の `grid-template-columns` を `max-content 1fr max-content 1fr ...` と組み、ステップ本体（ACEG）を `max-content`、セパレータ（BDF）を `1fr` で均等配分する。ステップ本体同士、セパレータ同士がそれぞれ同じ幅で揃い、列間に 8px の gap を入れる
- 垂直レイアウトは Item 内部の grid/flex で縦線を描画し、Item 間で視覚的に連続する

## 注意事項

1. `children` は `Steps.Item` のみを想定する。`Fragment` や任意の wrapper で `Steps.Item` をラップした場合、index の採番対象から外れる
2. `currentStep` と `defaultCurrentStep` が両方渡された場合は `currentStep`（controlled）を優先する
3. `currentStep` が負値または `items.length` 以上になっても破綻しない（負値なら全 upcoming、上限超過なら全 completed）
4. 現時点ではステップクリックによる遷移・前後ナビゲーション・content slot は提供していない

## 更新履歴

| 日付       | 内容     | 担当者 |
| ---------- | -------- | ------ |
| 2026-04-17 | 新規作成 | -      |
