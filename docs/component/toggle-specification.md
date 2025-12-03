# Toggle コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
   - [継承プロパティ](#継承プロパティ)
5. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [状態に応じたスタイル](#状態に応じたスタイル)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [バリエーション例1](#バリエーション例1)
   - [バリエーション例2](#バリエーション例2)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
   - [実装について](#実装について)
   - [型安全性](#型安全性)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

Toggleコンポーネントは、相互排他的な2状態（ON/OFF）を切り替えるためのスイッチを提供する。制御下の状態を即時に反映し、フォーム設定やフィルターパネルなどで二者択一の設定を明確に示す用途に適している。

## インポート

```typescript
import { Toggle } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';
import { Toggle } from '@zenkigen-inc/component-ui';

const NotificationSetting = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Toggle
      id="notification-toggle"
      size="medium"
      label="通知を受け取る"
      isChecked={isEnabled}
      onChange={() => setIsEnabled((prev) => !prev)}
    />
  );
};
```

## Props

### 必須プロパティ

| プロパティ  | 型                              | 説明 |
| ----------- | ------------------------------- | ---- |
| `id`        | `string`                        | 内部の`input`要素の`id`および`name`として利用され、`label`要素との関連付けに必須である。 |
| `size`      | `'small' \| 'medium' \| 'large'` | トラック・インジケーター・ラベルタイポグラフィのサイズを決定する。指定がない場合は内部的に`'medium'`が適用される。 |
| `isChecked` | `boolean`                       | 現在の選択状態を制御する。必ず制御プロップとして管理し、外部状態と同期させる。 |
| `onChange`  | `() => void`                    | チェック状態が切り替わった際に呼び出されるコールバック。状態のトグル処理を実装する。 |

### オプションプロパティ

| プロパティ       | 型                     | デフォルト値 | 説明 |
| ---------------- | ---------------------- | ------------ | ---- |
| `label`          | `ReactNode`            | `undefined`  | トグルのラベル。文字列のほか任意のReactノードを受け付ける。 |
| `labelPosition`  | `'left' \| 'right'`    | `'right'`    | ラベルをトグルの左右どちらに配置するかを指定する。 |
| `isDisabled`     | `boolean`              | `false`      | 無効状態を制御する。`true`の際は全体の操作を禁止し、無効色に切り替わる。 |

### 継承プロパティ

継承プロパティは存在しない。`Toggle`は公開APIとして定義されているプロパティ以外を受け付けないため、任意の`aria-*`や`data-*`属性を渡す場合は周辺要素側で管理する。

## 状態とスタイル

### サイズバリエーション

#### Small

- トラック: `w-8` (32px) / `h-4` (16px) / `px-[3px]`
- インジケーター: `w-2.5` / `h-2.5`
- ラベル: `typography-label14regular`

#### Medium（デフォルト）

- トラック: `w-12` (48px) / `h-6` (24px) / `px-1`
- インジケーター: `w-4` / `h-4`
- ラベル: `typography-label14regular`

#### Large

- トラック: `w-12` (48px) / `h-6` (24px) / `px-1`（Mediumと同寸）
- インジケーター: `w-4` / `h-4`
- ラベル: `typography-label16regular`

ラベルは`labelPosition`に応じて`mr-2`（左配置時）または`ml-2`（右配置時）が適用され、常にトグルと最低8px相当の間隔を保つ。

### 状態に応じたスタイル

#### ON（`isChecked: true`）

- トラック色: `bg-interactive01`
- ホバー色: `peer-hover:bg-hover01`
- インジケーター: `bg-iconOnColor`、`ml-auto`で右端に寄せる
- ラベル: 有効状態の場合は`text-text01`で表示し、クリック操作に応答する

#### OFF（`isChecked: false`）

- トラック色: `bg-interactive02`
- ホバー色: `peer-hover:bg-hoverGray`
- インジケーター: 左端に寄せられ、同じく`bg-iconOnColor`で表示

#### 無効状態（`isDisabled: true`）

- トラック色: ON時は`bg-disabledOn`、OFF時は`bg-disabled01`
- インジケーター: `bg-iconOnColor`を維持するが、ポインターイベントを遮断
- 入力: `cursor-not-allowed`、`disabled`属性が設定される
- ラベル: `text-disabled01`と`pointer-events-none`が適用され、視覚的にも無効であることを示す

## 使用例

### 基本的な使用例

```typescript
const ToggleCard = () => {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <Toggle
      id="profile-visibility"
      size="large"
      label="プロフィールを公開する"
      isChecked={isPublic}
      onChange={() => setIsPublic((prev) => !prev)}
    />
  );
};
```

### バリエーション例1

左ラベルと右ラベルを切り替える例。フォームの説明をトグルの左側に揃える場合に使用する。

```typescript
<Toggle
  id="digest-mail"
  size="medium"
  label="ダイジェストメールを受け取る"
  labelPosition="left"
  isChecked={settings.digest}
  onChange={toggleDigest}
/>;
```

### バリエーション例2

リストアイテム内でラベルを別要素として表示し、トグル本体のみを右端に配置する例。`label`を渡さない場合は、同じ`id`に紐づく`label`要素を別途用意する。

```typescript
<li className="flex items-center gap-3">
  <label htmlFor={`filter-${item.id}`} className="flex-1 typography-label14regular text-text01">
    {item.label}
  </label>
  <Toggle
    id={`filter-${item.id}`}
    size="small"
    isChecked={item.isActive}
    onChange={() => handleToggle(item.id)}
  />
</li>
```

## アクセシビリティ

1. ネイティブの`input type="checkbox"`を利用しているため、スクリーンリーダーはON/OFFを自動で読み上げる。
2. `label`プロパティまたは外部の`<label htmlFor={id}>`を必ず用意し、操作対象をテキストで明示する。
3. `isDisabled`が`true`の際は`disabled`属性が付与され、フォーカス不可かつ操作不能となる。
4. トラック全体に絶対配置した`input`要素が存在するため、キーボード操作（スペースキー）でも状態を切り替えられる。

## 技術的な詳細

### 実装について

- `div`ラッパー内に`input`とビジュアル用トラックを配置し、`input`は`opacity-0`かつ`absolute`で全領域を覆う。
- `peer`クラスを利用することで、`input`のホバー状態をトラックの背景色に反映している。
- インジケーターは`span`で描画し、`ml-auto`の切り替えのみで左右の位置を制御するシンプルな実装である。

### 型安全性

- `Toggle`は`Props`型によって公開プロパティを厳密に制御している。余計な属性は型レベルで弾かれるため、意図しないHTML属性の混入を防げる。
- `label`には`ReactNode`を許容しているが、文字列以外を渡す場合でも`id`との関連付けが保たれるよう注意する。

## 注意事項

1. `id`はページ内で一意にする。`label`要素や外部ツールと関連付ける際に競合するとアクセシビリティが損なわれる。
2. `Toggle`は完全に制御されたコンポーネントであるため、`isChecked`と`onChange`を常にセットで利用する。
3. フォーム送信時に別ボタンのクリックを待つ必要がある場合はCheckboxの利用を検討する。
4. `label`を表示しないケースでも、外部に`<label>`や`aria-describedby`等でテキストコンテキストを提供しなければならない。

## スタイルのカスタマイズ

`Toggle`は`@zenkigen-inc/component-theme`のインタラクションカラーを参照する。

- トラック色: `interactive01`/`interactive02`/`hover01`/`hoverGray`/`disabled01`/`disabledOn`
- インジケーター色: `iconOnColor`
- ラベル色: `text01`/`disabled01`

テーマトークンを更新すればトラック色やホバー色を一括で変更できる。サイズの変更は`packages/component-config`のTailwindプリセットを介して行う。

## 更新履歴

| 日付                 | 内容     | 担当者 |
| -------------------- | -------- | ------ |
| 2025-12-03 09:22 JST | 新規作成 | -      |

