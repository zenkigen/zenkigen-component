# Typography コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [クラス仕様](#クラス仕様)
   - [Heading](#heading)
   - [Body](#body)
   - [Label](#label)
   - [その他の仕様](#その他の仕様)
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

Typography はコンポーネントではなく、文字スタイルを `.typography-*` ユーティリティとして提供する仕組みである。
Heading / Body / Label を通じてサイズ・行高・太さを統一し、UI の可読性と一貫性を確保する。

## インポート

Typography は CSS ユーティリティのため import は不要である。
`@zenkigen-inc/component-config` の Tailwind プリセットを読み込んだ環境で利用する。

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@zenkigen-inc/component-config')],
};
```

## 基本的な使用方法

```tsx
export const Example = () => (
  <div className="space-y-2">
    <h1 className="typography-h1">見出しタイトル</h1>
    <p className="typography-body14regular">
      あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら。
    </p>
    <span className="typography-label12regular">ラベル</span>
  </div>
);
```

## クラス仕様

#### Heading

| クラス | font-size | line-height | font-weight | 用途 |
| --- | --- | --- | --- | --- |
| `typography-h1` | `32px` | `125%` | `bold` | 画面タイトルなど最上位の見出し |
| `typography-h2` | `24px` | `133%` | `bold` | セクション見出し |
| `typography-h3` | `20px` | `160%` | `bold` | 小見出し |
| `typography-h4` | `16px` | `150%` | `bold` | サブセクション見出し |
| `typography-h5` | `14px` | `171%` | `bold` | カード内タイトルなど |

#### Body

| クラス | font-size | line-height | font-weight | 用途 |
| --- | --- | --- | --- | --- |
| `typography-body16regular` | `16px` | `180%` | `normal` | 長文の本文 |
| `typography-body16bold` | `16px` | `180%` | `bold` | 本文の強調 |
| `typography-body14regular` | `14px` | `171%` | `normal` | 標準本文 |
| `typography-body14bold` | `14px` | `171%` | `bold` | 標準本文の強調 |
| `typography-body13regular` | `13px` | `153%` | `normal` | 補足テキスト |
| `typography-body13bold` | `13px` | `153%` | `bold` | 補足テキストの強調 |
| `typography-body12regular` | `12px` | `133%` | `normal` | 注釈など小さめの本文 |
| `typography-body12bold` | `12px` | `133%` | `bold` | 注釈の強調 |

#### Label

| クラス | font-size | line-height | font-weight | 用途 |
| --- | --- | --- | --- | --- |
| `typography-label16regular` | `16px` | `100%` | `normal` | 強調ラベル |
| `typography-label16bold` | `16px` | `100%` | `bold` | 強調ラベルの強調 |
| `typography-label14regular` | `14px` | `100%` | `normal` | 標準ラベル |
| `typography-label14bold` | `14px` | `100%` | `bold` | 標準ラベルの強調 |
| `typography-label12regular` | `12px` | `100%` | `normal` | 補足ラベル |
| `typography-label12bold` | `12px` | `100%` | `bold` | 補足ラベルの強調 |
| `typography-label11regular` | `11px` | `100%` | `normal` | 最小ラベル |
| `typography-label11bold` | `11px` | `100%` | `bold` | 最小ラベルの強調 |

### その他の仕様

- すべてのクラスに `tracking-normal`（letter-spacing: 0）と `no-underline` が適用される。
- フォントファミリーは設定しないため、アプリ側の `font-sans` などに依存する。

## 使用例

### 基本的な使用例

```tsx
export const BasicTypography = () => (
  <div className="space-y-3">
    <h2 className="typography-h2">セクションタイトル</h2>
    <p className="typography-body14regular">
      Typography クラスは Tailwind のユーティリティとして利用できる。
    </p>
    <span className="typography-label12regular text-text02">補足情報</span>
  </div>
);
```

### バリエーション例1

```tsx
export const EmphasisExample = () => (
  <div className="space-y-1">
    <h3 className="typography-h3 text-text01">アラート</h3>
    <p className="typography-body13regular text-text02">この操作は取り消せない。</p>
    <p className="typography-body13bold text-supportError">確認してください。</p>
  </div>
);
```

### バリエーション例2

```tsx
export const FormLabelExample = () => (
  <label className="flex flex-col gap-1">
    <span className="typography-label14regular text-text01">ユーザー名</span>
    <input className="typography-body14regular rounded border border-uiBorder02 px-2 py-1" />
  </label>
);
```

## アクセシビリティ

- 見出しは `h1`〜`h5` など適切なセマンティック要素に適用する。
- フォームのラベルは `<label htmlFor>` を用いて関連付ける。
- 色のコントラストは Typography 単体では保証しないため、`text-*` の指定で確保する。
- 文字サイズだけで情報の優先度を表現せず、構造や要素の意味付けを優先する。

## 注意事項

1. `typography-*` は色とフォントファミリーを設定しない。必要に応じて `text-*` と `font-*` を指定する。
2. `text-*`、`leading-*`、`tracking-*`、`font-*` を重ねる場合は意図した上書きか確認する。
3. クラス名は複数コンポーネントで参照されるため、変更時は関連仕様も更新する。

## スタイルのカスタマイズ

Typography の変更は `@zenkigen-inc/component-theme` と `@zenkigen-inc/component-config` の
トークンを更新して行う。

1. `packages/component-theme/src/typography.ts` のクラス定義を更新する。
2. 文字サイズや行高を変更する場合は
   `packages/component-config/style-dictionary/tokens.json` を更新する。
3. `yarn update-tokens` を実行してトークンを反映し、`yarn build:all` でビルドする。

## 更新履歴

| 日付 | 内容 | 担当者 |
| --- | --- | --- |
| 2026-01-06 08:26 JST | 新規作成 | - |
