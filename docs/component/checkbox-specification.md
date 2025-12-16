# Checkbox コンポーネント仕様書

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

Checkbox コンポーネントは、単一のオン/オフ選択および擬似的な第三状態（インデターミネイト表示）を提供する入力コンポーネントである。ラベルを付与したテキスト表示と、カラー種別による視覚バリエーションを備える。

## インポート

```typescript
import { Checkbox } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';
import { Checkbox } from '@zenkigen-inc/component-ui';

const Example = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      id="agreement"
      label="利用規約に同意する"
      isChecked={checked}
      onChange={() => setChecked((prev) => !prev)}
    />
  );
};
```

## Props

### 必須プロパティ

| プロパティ | 型  | 説明 |
| ---------- | --- | ---- |
| なし       | -   | -    |

### オプションプロパティ

| プロパティ        | 型                                           | デフォルト値 | 説明                                                                                  |
| ----------------- | -------------------------------------------- | ------------ | ------------------------------------------------------------------------------------- |
| `id`              | `string`                                     | `undefined`  | 入力要素の `id`。`label` を指定する場合は関連付けのため付与することを推奨する。       |
| `name`            | `string`                                     | `undefined`  | フォーム送信用の `name`。                                                             |
| `value`           | `string`                                     | `undefined`  | フォーム送信用の値。                                                                  |
| `isChecked`       | `boolean`                                    | `false`      | チェック状態。                                                                        |
| `isIndeterminate` | `boolean`                                    | `false`      | インデターミネイト表示を行うかどうか（後述の挙動を参照）。                            |
| `isDisabled`      | `boolean`                                    | `false`      | 無効化するかどうか。                                                                  |
| `color`           | `'default' \| 'gray' \| 'error'`             | `'default'`  | ボーダーとフィルの色バリエーション。                                                  |
| `label`           | `string`                                     | `undefined`  | 右側に表示するラベルテキスト。                                                        |
| `onChange`        | `(e: ChangeEvent<HTMLInputElement>) => void` | `undefined`  | チェック状態が変更されたときのハンドラー。`isDisabled` が `true` の場合は呼ばれない。 |

### 排他的プロパティグループ

該当なし。

### 特殊機能の詳細

- **インデターミネイト表示**: `isIndeterminate` を `true` にするとマイナスアイコンを描画する。背景フィルは `isChecked` に連動するため、インデターミネイトを表示したい場合は `isChecked` も `true` にすること。
- **カラー**: `color` によりボーダーとフィルのトークンが切り替わる。`'default'` はインタラクティブ系、`'gray'` はグレー系、`'error'` はエラー用カラーで描画される。
- **イベント抑止**: `isDisabled` が `true` のとき `onChange` は実行されない。

### 継承プロパティ

特になし。必要な属性は個別の Props で明示する。

## 状態とスタイル

### 状態に応じたスタイル

- **通常（未選択）**: 白背景に `border-uiBorder04`（`color='default'`）、`border-interactive02`（`color='gray'`）、`border-supportError`（`color='error'`）で描画。
- **ホバー（有効時）**: ボーダーが `border-hoverUiBorder` / `border-hoverGray` / `border-hoverError` に変化し、未選択時は中央に `bg-hoverUi` の小さなホバーインジケータを表示。
- **フォーカス可視**: `focusVisible.normalPeer` により入力へフォーカスした際にボックスへフォーカススタイルが適用される。
- **選択済み**: 背景が `bg-interactive01`（`default`）、`bg-interactive02`（`gray`）、`bg-supportError`（`error`）になり、チェックアイコン（またはマイナスアイコン）が `fill-iconOnColor` で描画される。
- **無効状態**: `cursor-not-allowed`、`text-disabled01`、ボーダー/背景ともに `disabled01` 系トークンで淡色化される。ホバー・クリックは無効。
- **インデターミネイト**: チェック状態と同じ背景色でマイナスアイコンを表示する（`isChecked` が `true` の場合）。

### その他のスタイル仕様

- ラベル: `typography-label14regular` を使用し、`label` が指定されたときのみ `htmlFor={id}` 付きで右側に表示する。
- レイアウト: チェックボックスとラベルを `flex` で横並びに配置し、入力自体は透明な `peer` で配置して視覚的なボックスと連動させている。

## 使用例

### 基本的な使用例

```typescript
<Checkbox id="notify" label="通知を受け取る" isChecked={true} onChange={() => {}} />
```

### バリエーション例1

```typescript
// エラーカラーでの表示
<Checkbox
  id="agree"
  label="必須項目に同意する"
  isChecked
  color="error"
  onChange={() => {}}
/>
```

### バリエーション例2

```typescript
// グレー系カラーでのインデターミネイト表示
<Checkbox
  id="partial"
  label="一部のみ選択"
  isChecked
  isIndeterminate
  color="gray"
  onChange={() => {}}
/>
```

## アクセシビリティ

- ネイティブの `input type="checkbox"` を使用しており、キーボード操作（`Space`/`Enter`）とスクリーンリーダーの振る舞いを継承する。
- `label` と `id` を組み合わせて関連付けることでラベル読み上げが有効になる。ラベルを表示しない場合は周辺ラッパーで明示的なラベル付け（`aria-label` など）を行うこと。
- `disabled` 属性を付与して無効状態を示す。
- フォーカス可視スタイルを `focusVisible.normalPeer` で適用する。
- インデターミネイトは見た目のみで、ネイティブの `indeterminate` プロパティや `aria-checked="mixed"` は付与していない。必要に応じて利用側で付与すること。

## 技術的な詳細

### 実装について

- 内部状態はホバー検知のみで、チェック状態は完全に制御 Props (`isChecked`) に委ねる。
- `onChange` は `isDisabled` のとき実行せず、フォーム送信属性（`name`/`value`/`id`/`disabled`/`checked`）をそのまま input に渡す。
- 視覚ボックスとアイコンは透明な `peer` 入力と `focusVisible.normalPeer` を組み合わせてレンダリングする。

## 注意事項

1. インデターミネイト表示を行う場合は `isIndeterminate` と合わせて `isChecked` を `true` に設定すること（背景スケールが `isChecked` に依存するため）。
2. ラベルを表示しない場合は、アクセシビリティのために外部で適切なラベル属性（例: `aria-label`）を付与すること。
3. 追加の input 属性（`required` 等）はデフォルトでは受け付けないため、必要に応じてラップコンポーネント側で拡張すること。

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティと `@zenkigen-inc/component-config` で定義されたデザイントークン（例: `interactive01`/`interactive02`/`supportError`/`hoverUiBorder`/`disabled01`）を使用する。配色やフォーカスリングを変更する場合はテーマ設定（`@zenkigen-inc/component-theme`）を更新する。

## 更新履歴

| 日付                 | 内容     | 担当者 |
| -------------------- | -------- | ------ |
| 2025-12-02 08:33 JST | 新規作成 | -      |
