# v1 → v2 移行ガイド

zenkigen-component v2.0.0（Tailwind CSS v4 専用）への移行手順です。新規導入の場合は各パッケージの README のセットアップ手順を参照してください。

## 目次

- [重要: v2.0 は breaking change](#重要-v20-は-breaking-change)
- [対象バージョン](#対象バージョン)
- [移行手順](#移行手順)
  - [Step 1: 事前準備](#step-1-事前準備)
  - [Step 2: パッケージのアップデート](#step-2-パッケージのアップデート)
  - [Step 3: PostCSS 設定の変更](#step-3-postcss-設定の変更)
  - [Step 4: CSS エントリファイルの変更](#step-4-css-エントリファイルの変更)
  - [Step 5: tailwind.config の簡素化](#step-5-tailwindconfig-の簡素化)
  - [Step 6: アプリケーションコードのクラス名修正](#step-6-アプリケーションコードのクラス名修正)
  - [Step 7: 動作確認](#step-7-動作確認)
- [トラブルシューティング](#トラブルシューティング)

## 重要: v2.0 は breaking change

**v2.0 は Tailwind CSS v4 専用です。** v3 には対応しません。

- v1.x（Tailwind v3 対応）と v2.0（Tailwind v4 対応）は**非互換**です
- v1.x を継続利用する場合は変更不要です（`@zenkigen-inc/component-ui@v1` の dist-tag、または `package.json` の `^1` 固定で継続できます）
- バージョン系列と dist-tag の運用は [バージョン運用方針](./versioning-policy.md) を参照してください

主な変更点:

| 項目                                                            | v1.x                                      | v2.0                                                                |
| --------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------- |
| Tailwind CSS                                                    | v3                                        | **v4（必須）**                                                      |
| 設定の読み込み                                                  | JS preset（`presets: [componentConfig]`） | **CSS import（`@import '@zenkigen-inc/component-config/styles'`）** |
| PostCSS プラグイン                                              | `tailwindcss` + `autoprefixer`            | **`@tailwindcss/postcss`**（autoprefixer 不要）                     |
| クラス検出                                                      | `content` 配列 + safelist                 | **自動検出 + `@source`**                                            |
| `@zenkigen-inc/component-config` の default export（JS preset） | あり                                      | **廃止**                                                            |

## 対象バージョン

- zenkigen-component: v2.0.0 以降
- Tailwind CSS: v4.x（必須）
- `@tailwindcss/postcss`: v4.x
- Node.js: 20 以降

## 移行手順

### Step 1: 事前準備

移行作業前にブランチを作成し、クリーンな状態から始めてください。

```bash
git checkout -b feat/zenkigen-component-v2-migration
git status
```

> 古い v1 系バージョン（例: `^1.10.x`）を使っている場合は、先に v1 系の最新へ引き上げてから v2.0 へ進むと、変更の影響を切り分けやすくなります。

### Step 2: パッケージのアップデート

```bash
# npm
npm install @zenkigen-inc/component-ui@^2 @zenkigen-inc/component-config@^2
npm install -D tailwindcss@^4 @tailwindcss/postcss@^4
npm uninstall autoprefixer @tailwindcss/container-queries

# yarn
yarn add @zenkigen-inc/component-ui@^2 @zenkigen-inc/component-config@^2
yarn add -D tailwindcss@^4 @tailwindcss/postcss@^4
yarn remove autoprefixer @tailwindcss/container-queries

# pnpm
pnpm add @zenkigen-inc/component-ui@^2 @zenkigen-inc/component-config@^2
pnpm add -D tailwindcss@^4 @tailwindcss/postcss@^4
pnpm remove autoprefixer @tailwindcss/container-queries
```

> - `autoprefixer` は不要です（v4 のビルドに内蔵）
> - `@tailwindcss/container-queries` を使っていた場合も不要です（v4 は container queries を標準搭載。`@container` / `@md:` 等のコードはそのまま動作します）

### Step 3: PostCSS 設定の変更

```js
// Before (v3)
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

// After (v4)
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

> `tailwindcss/nesting` を指定していた場合は削除してください（v4 はネイティブサポート）。

### Step 4: CSS エントリファイルの変更

```css
/* Before (v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* After (v4) */
@import 'tailwindcss';
@import '@zenkigen-inc/component-config/styles';

/* zenkigen-component の動的クラス文字列を検出 */
@source '<node_modules への相対パス>/@zenkigen-inc/component-theme/dist/**/*.mjs';
@source '<node_modules への相対パス>/@zenkigen-inc/component-ui/dist/**/*.mjs';
```

`@source` のパスは **CSS エントリファイルから `node_modules` への相対パス**で指定します。

| CSS エントリの位置                             | `@source` パス                                                         |
| ---------------------------------------------- | ---------------------------------------------------------------------- |
| `src/app/globals.css`                          | `../../node_modules/...`                                               |
| `src/globals.css`                              | `../node_modules/...`                                                  |
| `services/web/src/app/globals.css`（モノレポ） | `../../../../node_modules/...`（リポジトリルートの node_modules まで） |

> **⚠️ v4 は SCSS/Less/Stylus 非対応**
>
> CSS エントリに `.scss` 等を使っている場合は `.css` への移行が必須です。SCSS 固有機能（変数・ネスト・mixin 等）は CSS カスタムプロパティやネイティブ CSS ネスティングに置き換えてください。参考: [Tailwind CSS v4 Compatibility](https://tailwindcss.com/docs/compatibility)

### Step 5: tailwind.config の簡素化

zenkigen-component 関連の設定をすべて削除します。

```ts
// Before (v3)
const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@zenkigen-inc/**/*.{js,ts,tsx}', // ← 削除
  ],
  presets: [require('@zenkigen-inc/component-config')], // ← 削除（v2 に default export はありません）
  plugins: [require('@tailwindcss/container-queries')], // ← 削除（v4 標準機能）
};
```

- アプリ固有の設定（`theme.extend` の独自フォントやアニメーション等）が**ない**場合: `tailwind.config` ファイル自体を削除できます
- アプリ固有の設定が**ある**場合: その部分だけ残し、CSS エントリに `@config` を追加します

```css
@config './tailwind.config.ts';
```

> v1 で独自の safelist を追加していた場合、`@zenkigen-inc` 関連のものは不要になります（`@source` で検出されます）。アプリ独自の動的クラスは [`@source inline(...)`](https://tailwindcss.com/docs/detecting-classes-in-source-files#safelisting-specific-utilities) に移行してください。

### Step 6: アプリケーションコードのクラス名修正

Tailwind v4 でいくつかのユーティリティクラスがリネームされています。**アプリコード内で使用している場合は修正が必要です。**

| v3 のクラス      | v4 のクラス      | 変更理由                        |
| ---------------- | ---------------- | ------------------------------- |
| `rounded-sm`     | `rounded-xs`     | スケールが 1 段階シフト         |
| `rounded`        | `rounded-sm`     | スケールが 1 段階シフト         |
| `shadow-sm`      | `shadow-xs`      | スケールが 1 段階シフト         |
| `shadow`         | `shadow-sm`      | スケールが 1 段階シフト         |
| `outline-none`   | `outline-hidden` | リネーム                        |
| `ring`           | `ring-3`         | デフォルト幅が 3px → 1px に変更 |
| `blur-sm`        | `blur-xs`        | スケールが 1 段階シフト         |
| `blur`           | `blur-sm`        | スケールが 1 段階シフト         |
| `drop-shadow-sm` | `drop-shadow-xs` | スケールが 1 段階シフト         |
| `drop-shadow`    | `drop-shadow-sm` | スケールが 1 段階シフト         |

> `rounded-md` / `shadow-lg` など「`-md` 以上」は v3/v4 で値が同じため置換不要です。

Tailwind 公式のアップグレードツールで大部分を自動適用できます:

```bash
npx @tailwindcss/upgrade
```

- 適用前に必ずコミットし、適用後は `git diff` で確認してください
- 動的に組み立てているクラス名には対応しない場合があります

このほか、v4 では bare な `border` クラスのデフォルト色が v3 の `gray-200` から `currentColor` に変わっています。色クラスを併記していない `border` を使っている場合は `border-uiBorder01` 等の明示を検討してください。

### Step 7: 動作確認

```bash
npm run build
npm run dev
```

確認ポイント:

- [ ] build が通る
- [ ] 全ページでレイアウトが崩れていない
- [ ] カラートークン（`bg-interactive01` 等）が適用されている
- [ ] ボタン等の hover / active / disabled 状態
- [ ] タイポグラフィ（`typography-h1` 等）のサイズ・ウェイト
- [ ] z-index の重なり順（Modal / Dropdown / Tooltip / Toast）
- [ ] Loading / Toast のアニメーション
- [ ] focus-visible のアウトライン表示

## トラブルシューティング

### スタイルが適用されない

1. **`@source` パスの確認**: CSS エントリから `node_modules` への相対パスが正しいか

   ```bash
   # CSS エントリのディレクトリから node_modules が見えるか確認
   ls <相対パス>/@zenkigen-inc/component-theme/dist/
   ```

2. **PostCSS 設定の確認**: `@tailwindcss/postcss` を使っているか（v3 の `tailwindcss` プラグイン指定は動きません）
3. **CSS ディレクティブの確認**: `@tailwind base;` ではなく `@import 'tailwindcss';` になっているか

### 特定のクラスだけ効かない

動的クラスが効かない場合は `@source` のパスを確認してください。アプリ独自の safelist は `@source inline(...)` に移行が必要です。

### z-index が効かない

`z-modal` / `z-tooltip` 等のカスタム z-index は `@import '@zenkigen-inc/component-config/styles'` で定義されます。この import が読み込まれているか確認してください。

### ビルドエラー: `Cannot find module '@zenkigen-inc/component-config/styles'`

`@zenkigen-inc/component-config` が v2.0 以上であることを確認してください。v1.x に `./styles` エクスポートはありません。

### 型エラー: `Module '"@zenkigen-inc/component-config"' has no default export`

v2.0 では JS preset（default export）が廃止されています。`tailwind.config` の `presets: [...]` 指定を削除してください（[Step 5](#step-5-tailwindconfig-の簡素化)）。
