# Color 仕様書

## 目次

1. [概要](#概要)
2. [利用前提](#利用前提)
3. [基本的な使用方法](#基本的な使用方法)
4. [トークン仕様](#トークン仕様)
   - [Primitive Token](#primitive-token)
   - [Semantic Token](#semantic-token)
   - [状態トークン](#状態トークン)
5. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [バリエーション例1](#バリエーション例1)
   - [バリエーション例2](#バリエーション例2)
6. [アクセシビリティ](#アクセシビリティ)
7. [注意事項](#注意事項)
8. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
9. [更新履歴](#更新履歴)

---

## 概要

Color はコンポーネントではなく、Primitive Token と Semantic Token を通じて色の設計を提供する仕組みである。
Tailwind のユーティリティクラス（`text-*` / `bg-*` / `border-*` など）として利用し、デザインの一貫性を保つ。

## 利用前提

Tailwind のプリセットとして `@zenkigen-inc/component-config` を組み込んだ環境で利用する。
Color を import する必要はない。

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@zenkigen-inc/component-config')],
};
```

## 基本的な使用方法

```tsx
export const BasicColorUsage = () => (
  <div className="space-y-2">
    <p className="text-text02">セマンティックテキスト</p>
    <div className="bg-uiBackground02 p-3">背景色</div>
    <div className="border border-uiBorder01 p-3">ボーダー色</div>
  </div>
);
```

## トークン仕様

### Primitive Token

特定の用途を持たない基礎色である。Semantic Token の参照元として利用する。

### Semantic Token

UI の意味に応じた色である。色の由来を確認する場合は `rawValue` を参照する。

### 状態トークン

`hover` / `active` / `disabled` などの状態は Semantic Token として定義される。
必要に応じて `hover:bg-hover02` などの Tailwind クラスを併用する。

## 使用例

### 基本的な使用例

```tsx
export const Card = () => (
  <div className="bg-uiBackground01 border border-uiBorder01 p-4 text-text01">
    これは Color トークンを使ったカードである。
  </div>
);
```

### バリエーション例1

```tsx
export const StatusMessage = () => (
  <div className="space-y-2">
    <p className="text-supportSuccess">成功しました</p>
    <p className="text-supportError">エラーが発生しました</p>
    <p className="text-supportWarning">注意が必要です</p>
  </div>
);
```

### バリエーション例2

```tsx
export const InteractiveButton = () => (
  <button
    type="button"
    className="rounded bg-interactive01 px-4 py-2 text-textOnColor hover:bg-hover01 active:bg-active01"
  >
    送信
  </button>
);
```

## アクセシビリティ

- 文字色と背景色の組み合わせはコントラスト基準を満たすように選定する。
- 色だけで状態を伝えず、テキストやアイコンなど他の要素と併用する。
- `textOnColor` などのセマンティックトークンを使い、可読性を確保する。

## 注意事項

1. Semantic Token の `rawValue` は `$Colors.*` を参照する場合のみ付与される。
2. Primitive Token には `rawValue` が存在しないため、値は `value` を参照する。
3. 直接 HEX を指定せず、トークンを通じて色を利用する。

## スタイルのカスタマイズ

Color の変更は `@zenkigen-inc/component-config` のトークンを更新して行う。

1. `packages/component-config/style-dictionary/tokens.json` を更新する。
2. `yarn workspace @zenkigen-inc/component-config run build:tokens` を実行する。
3. `yarn build:all` で全体へ反映する。

## 更新履歴

| 日付                 | 内容     | 担当者 |
| -------------------- | -------- | ------ |
| 2026-01-06 09:50 JST | 新規作成 | -      |
