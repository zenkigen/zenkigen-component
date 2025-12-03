# Toggle コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
5. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [状態に応じたスタイル](#状態に応じたスタイル)
   - [ラベル配置](#ラベル配置)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [ラベルを左側に配置する例](#ラベルを左側に配置する例)
   - [サイズの比較と無効状態](#サイズの比較と無効状態)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

Toggle コンポーネントは、ON/OFF の 2 状態を即時に切り替えるためのスイッチ UI です。設定項目の有効化や機能のオン/オフを通知なしで即時に反映させるケースを対象としています。ラベルはトラックの左右いずれにも配置でき、disabled 時は相応の淡色スタイルに切り替わります。

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
      label="メール通知"
      isChecked={isEnabled}
      onChange={() => setIsEnabled((prev) => !prev)}
    />
  );
};
```

## Props

### 必須プロパティ

| プロパティ | 型        | 説明                                                               |
| ---------- | --------- | ------------------------------------------------------------------ |
| `id`       | `string`  | `input` と `label` を結び付けるために使用するユニークな ID。       |
| `isChecked`| `boolean` | 現在の ON/OFF 状態。`true` でトグルが右側 (ON) に表示されます。    |
| `onChange` | `() => void` | ユーザー操作時に呼び出されるコールバック。親側で状態を更新します。 |

### オプションプロパティ

| プロパティ       | 型                               | デフォルト値 | 説明                                                                 |
| ---------------- | -------------------------------- | ------------ | -------------------------------------------------------------------- |
| `size`           | `'small' \| 'medium' \| 'large'` | `'medium'`   | トラック/インジケータの寸法とラベルのタイポグラフィを切り替えます。 |
| `label`          | `ReactNode`                      | `undefined`  | スイッチの対象を説明する任意の内容。テキスト以外の要素も可。       |
| `labelPosition`  | `'left' \| 'right'`              | `'right'`    | ラベルをトラックの左右どちらに配置するかを制御します。             |
| `isDisabled`     | `boolean`                        | `false`      | `true` の場合は操作不能にし、淡色スタイルへ変更します。             |

## 状態とスタイル

### サイズバリエーション

- **Small**
  - トラック: `w-8 h-4 px-[3px]`
  - インジケータ: `w-2.5 h-2.5`
  - ラベル: `typography-label14regular`
  - 主にフォーム内の補助的な設定項目で使用
- **Medium (デフォルト)**
  - トラック: `w-12 h-6 px-1`
  - インジケータ: `w-4 h-4`
  - ラベル: `typography-label14regular`
  - 標準の設定パネル用
- **Large**
  - トラック: `w-12 h-6 px-1`（Medium と同寸法、視認性をラベルで補完）
  - インジケータ: `w-4 h-4`
  - ラベル: `typography-label16regular`
  - ラベルテキストを大きく表示したい場合に使用

### 状態に応じたスタイル

| 状態                                 | トラック背景 / ホバー                                         | インジケータ / ラベル                         |
| ------------------------------------ | -------------------------------------------------------------- | --------------------------------------------- |
| 有効 + ON (`!isDisabled && isChecked`)   | `bg-interactive01`, `peer-hover:bg-hover01`                    | インジケータは右寄せ(`ml-auto`)、`bg-iconOnColor` |
| 有効 + OFF (`!isDisabled && !isChecked`) | `bg-interactive02`, `peer-hover:bg-hoverGray`                  | インジケータは左寄せ、`bg-iconOnColor`        |
| 無効 + ON (`isDisabled && isChecked`)    | `bg-disabledOn`                                                | ラベルは `text-disabled01`、カーソルは `not-allowed` |
| 無効 + OFF (`isDisabled && !isChecked`)  | `bg-disabled01`                                                | インジケータは淡色、操作不可スタイル          |

入力要素には `peer` クラスを付与し、透明なままトラック全体を覆うため、フォーカス/ホバーは `peer-hover` を通じてトラックに伝播します。

### ラベル配置

- `labelPosition="right"`（デフォルト）：トグルの右側にラベルを描画し、`ml-2` の余白を付ける。
- `labelPosition="left"`：左側に描画し、`mr-2` の余白を付ける。
- ラベルは `break-all` を適用し、長文でも折り返されます。無効状態では `pointer-events-none` を付与し、カーソルも `not-allowed` になります。

## 使用例

### 基本的な使用例

```tsx
const [value, setValue] = useState(false);

<Toggle
  id="two-factor"
  label="二段階認証"
  isChecked={value}
  onChange={() => setValue((prev) => !prev)}
/>;
```

### ラベルを左側に配置する例

```tsx
<Toggle
  id="public-profile"
  label="公開プロフィール"
  labelPosition="left"
  size="small"
  isChecked={isPublic}
  onChange={() => setIsPublic((prev) => !prev)}
/>;
```

### サイズの比較と無効状態

```tsx
<div className="flex flex-col gap-4">
  <Toggle id="toggle-small" size="small" label="Small" isChecked={true} onChange={() => {}} />
  <Toggle id="toggle-medium" size="medium" label="Medium" isChecked={false} onChange={() => {}} />
  <Toggle id="toggle-large" size="large" label="Large" isChecked={true} onChange={() => {}} isDisabled />
</div>
```

## アクセシビリティ

- 実体は `input type="checkbox"` であり、ブラウザ標準のキーボード操作（Space/Enter）を継承します。
- `id` と `label` (`htmlFor`) を必ず一致させ、視覚的ラベルとプログラム的ラベルを同期させます。
- ラベルが省略される場合は、外部で `aria-label` を供給するなど補完してください（コンポーネント自身は `aria-label` を受け取らないため、上位で `<label>` を用意する想定です）。
- `isDisabled` 時には `disabled` 属性を付与し、フォーカスできない状態になります。

## 技術的な詳細

- `clsx` を利用して、状態やサイズに応じた Tailwind クラスを動的に組み立てています。
- 透明な `input` を最前面 (`z-[1]`) に配置し、その下にトラック (`div`) とインジケータ (`span`) を描画します。`peer` と `peer-hover` により、`input` のホバー状態をトラックへ伝播させています。
- インジケータの位置は `ml-auto` の切り替えのみで制御しており、CSS トランジションは持ちません。必要に応じて上位でトランジションを付与してください。
- `name` は `id` と同一文字列を使用し、フォーム送信時には `on`/`off` のチェック状態が送出されます。

## 注意事項

1. 完全に制御されたコンポーネントです。`isChecked` の管理と `onChange` 内での状態更新を必ず親で実装してください。
2. `id` はページ内で一意にしてください。同じ ID を複数の Toggle で共有すると `<label>` 連携が破綻します。
3. ラベルを省略する場合は、別途テキストラベルや `aria-label` を用意しないとアクセシビリティ要件を満たしません。
4. Disabled 状態は視覚的にも操作的にも無効なため、操作説明ラベルなども非インタラクティブになります。
5. 大きなラベルを使用する場合は `size="large"` を選択し、行間や可読性を確保してください。

## スタイルのカスタマイズ

Toggle は `@zenkigen-inc/component-config` で提供される Tailwind プリセットとデザイントークン（例: `bg-interactive01`, `text-disabled01`）へ依存しています。カラーパレットや半径を変更する場合はテーマトークンを調整し、直接 `className` で上書きするよりもトークン更新を推奨します。

## 更新履歴

| 日付                 | 内容       | 担当者 |
| -------------------- | ---------- | ------ |
| 2025-12-03 00:21 UTC | 初版作成。 | -      |

