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

| サイズ   | 円サイズ | チェックアイコン | 番号フォント                | ラベルフォント             |
| -------- | -------- | ---------------- | --------------------------- | -------------------------- |
| `small`  | 24px     | 24px             | `typography-label12regular` | `typography-body14regular` |
| `medium` | 32px     | 32px             | `typography-label12regular` | `typography-body14regular` |
| `large`  | 40px     | 40px             | `typography-label16regular` | `typography-body16regular` |

- description は `typography-body12regular` (12px / line-height 133%) で統一する
- チェックアイコンは Icon コンポーネント経由で描画し、`size` は円と同じ表示サイズ (`medium`/`large`/`x-large` = 24/32/40px) を渡す

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

| variant  | completed                               | current                                                | upcoming                                                  |
| -------- | --------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------- |
| `subtle` | `bg-supportInfoLight` + `text-text01`   | `bg-activeUi` + `text-text01`                          | `bg-uiBackground02` + `text-text01`                       |
| `solid`  | `bg-interactive01` + `text-iconOnColor` | `bg-activeUi` + `text-text01` + `border-interactive01` | `bg-uiBackground01` + `text-text01` + `border-uiBorder01` |

completed 時のチェックアイコンは variant に応じて fill 色を切り替える:

- `subtle`: `fill-gray-gray100`（Figma の Primitive `Gray100` を参照）
- `solid`: `fill-iconOnColor`（白）

すべての variant / state で円のボーダーは `border-2` を敷き、`solid/upcoming` は `border-uiBorder01`、`solid/current` は `border-interactive01`、それ以外は `border-transparent` で描画する（`box-sizing: border-box` により内径サイズが揃う）。

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
- 垂直レイアウトは Item 内部の grid/flex で縦線を描画し、Item 間で視覚的に連続する。separator には `min-h-6/8/12` を付与し、親に高さがなくても最小限の線が描画される
- 垂直レイアウトの Item（末尾以外）には `flex-1` を付与しており、親 flex コンテナが高さを持つ場合に各ステップと separator が均等に伸縮する。親に高さがない場合は従来どおり自然高さで描画される
- 子要素として渡された `React.Fragment` は内部で再帰展開する。`<>...</>` で `Steps.Item` をラップしても採番対象になる（任意の wrapper コンポーネントでのラップは非対応）

## 注意事項

1. `children` は `Steps.Item` または `Steps.Item` を含む `Fragment` を想定する。任意の wrapper コンポーネント（独自 component など）で `Steps.Item` をラップした場合、index の採番対象から外れる
2. `currentStep` と `defaultCurrentStep` が両方渡された場合は `currentStep`（controlled）を優先する
3. `currentStep` が負値または `items.length` 以上になっても破綻しない（負値なら全 upcoming、上限超過なら全 completed）
4. 現時点ではステップクリックによる遷移・前後ナビゲーション・content slot は提供していない
5. **水平と垂直で親サイズ未指定時の separator 挙動が非対称である**（意図的にそれぞれの利用実態に合わせた挙動）
   - `orientation="horizontal"`: 親が幅を持たない（shrink-to-fit）場合、separator 列の `1fr` が 0 幅になり線が消える。`w-full` や固定幅などを親に与える前提
   - `orientation="vertical"`: 親が高さを持たない場合でも、separator に `min-h-*` が付いているため最小サイズの線が残る。高さが与えられた場合は各 Item が `flex-1` で均等伸縮する

## 更新履歴

| 日付       | 内容                                                                                                                             | 担当者 |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 2026-04-17 | 新規作成                                                                                                                         | -      |
| 2026-04-20 | Figma 準拠の配色・typography・アイコンサイズに調整、variant 名を `solid` に統一、垂直方向の親高さ追従対応、Fragment 再帰展開対応 | -      |
