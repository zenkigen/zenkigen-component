# Radio コンポーネント仕様書

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
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

Radio コンポーネントは、複数の選択肢から単一項目を選択するための UI を提供する。チェック状態を制御でき、無効化やホバー時の視覚フィードバックを備える。

## インポート

```typescript
import { Radio } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState, ChangeEvent } from 'react';
import { Radio } from '@zenkigen-inc/component-ui';

const Example = () => {
  const [value, setValue] = useState('foo');

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <Radio
        id="option-foo"
        name="example-radio"
        label="Foo"
        value="foo"
        isChecked={value === 'foo'}
        onChange={handleChange}
      />
      <Radio
        id="option-bar"
        name="example-radio"
        label="Bar"
        value="bar"
        isChecked={value === 'bar'}
        onChange={handleChange}
      />
    </div>
  );
};
```

## Props

### 必須プロパティ

| プロパティ | 型  | 説明 |
| ---------- | --- | ---- |
| なし       | -   | -    |

### オプションプロパティ

| プロパティ   | 型                                           | デフォルト値 | 説明                                                                     |
| ------------ | -------------------------------------------- | ------------ | ------------------------------------------------------------------------ |
| `name`       | `string`                                     | `undefined`  | フォーム送信用の name 属性。グループ化して単一選択を扱う場合に指定する。 |
| `value`      | `string`                                     | `undefined`  | フォーム送信用の値。                                                     |
| `id`         | `string`                                     | `undefined`  | 入力要素の ID。`label` と関連付ける場合に指定する。                      |
| `label`      | `string`                                     | `undefined`  | 右側に表示するラベルテキスト。                                           |
| `isChecked`  | `boolean`                                    | `false`      | 選択状態（制御用）。                                                     |
| `isDisabled` | `boolean`                                    | `false`      | 無効状態にするか。                                                       |
| `onChange`   | `(e: ChangeEvent<HTMLInputElement>) => void` | `undefined`  | 状態変化時のハンドラー。`isDisabled` が `true` の場合は呼ばれない。      |

### 排他的プロパティグループ

該当なし。

### 特殊機能の詳細

- **ホバーインジケータ**: 未選択状態でホバー中は内側に `bg-hoverUi` の小さなインジケータを表示する。
- **ボックスと入力の分離**: 透明な `peer` input と視覚ボックスを分離し、`focusVisible.normalPeer` によりフォーカス可視を適用する。

### 継承プロパティ

特になし。必要な属性は個別の Props で明示する。

## 状態とスタイル

### 状態に応じたスタイル

- **通常（未選択）**: 白背景に `border-uiBorder04`。カーソルは有効時 `cursor-pointer`、無効時 `cursor-not-allowed`。
- **ホバー（有効時）**: ボーダーが `border-hoverUiBorder` へ変化し、未選択時は中央に `bg-hoverUi` インジケータを表示する。
- **選択済み**: 内側のドットが `bg-activeSelectedUi` に塗られスケールアップする。
- **無効状態**: ボーダー/ドットとも `disabled01` 系トークンで淡色化し、ホバーやクリックは無効化される。
- **フォーカス可視**: `focusVisible.normalPeer` によりフォーカスリングがボックスに適用される。

### その他のスタイル仕様

- 形状は円形（`rounded-full`）で固定。サイズは外枠 `size-5`、内側ドット `size-3`。
- ラベルは `typography-label14regular` を使用し、行末で折り返す。

## 使用例

### 基本的な使用例

```typescript
<Radio
  id="option-a"
  name="group-a"
  label="Option A"
  value="A"
  isChecked={true}
  onChange={() => {}}
/>;
```

### バリエーション例1

```typescript
// 無効状態の単一選択肢
<Radio
  id="option-disabled"
  name="group-disabled"
  label="Disabled option"
  value="disabled"
  isDisabled
  onChange={() => {}}
/>;
```

### バリエーション例2

```typescript
// 初期選択値を切り替える制御例
const [value, setValue] = useState('foo');

return (
  <>
    <Radio
      id="foo"
      name="controlled"
      label="Foo"
      value="foo"
      isChecked={value === 'foo'}
      onChange={({ target: { value } }) => setValue(value)}
    />
    <Radio
      id="bar"
      name="controlled"
      label="Bar"
      value="bar"
      isChecked={value === 'bar'}
      onChange={({ target: { value } }) => setValue(value)}
    />
  </>
);
```

## アクセシビリティ

- ネイティブ `input` を利用するが、現在の実装では `type="checkbox"` を使用しているため、必要に応じて利用側で `role="radio"` や `aria-checked` を付与し、単一選択の意味付けを行うこと。
- `label` と `id` を組み合わせることでラベルクリックによる選択をサポートする。`label` を省略する場合は外側で `aria-label` 等を付与して読み上げを確保する。
- `disabled` 属性を付与して無効状態を示す。
- `focusVisible.normalPeer` によりキーボードフォーカスが可視化される。

## 技術的な詳細

- チェック状態は完全に制御 Props (`isChecked`) に委ね、内部で管理しない。
- `onChange` は `isDisabled` のとき実行せず、フォーム属性（`name`/`value`/`id`/`disabled`/`checked`）をそのまま input に付与する。
- ホバー状態はローカルステートで管理し、ボーダー/インジケータのクラス切替に反映する。

## 注意事項

1. 単一選択のセマンティクスを満たすため、同一グループには同一の `name` を付与し、必要に応じて `role="radio"` や `aria-checked` を利用側で付加すること。
2. `label` を省略すると空のラベル要素が描画されるため、基本的にはラベル文字列を渡すこと。
3. 追加の input 属性（`required` 等）はデフォルトでは受け付けないため、必要に応じてラップコンポーネント側で拡張すること。

## スタイルのカスタマイズ

Tailwind ユーティリティと `@zenkigen-inc/component-config` のデザイントークン（例: `hoverUiBorder`、`activeSelectedUi`、`disabled01`）に依存している。配色やフォーカスリングを変更する場合はテーマ設定（`@zenkigen-inc/component-theme`）を調整する。

## 更新履歴

| 日付                 | 内容     | 担当者 |
| -------------------- | -------- | ------ |
| 2025-12-02 08:58 JST | 新規作成 | -      |
