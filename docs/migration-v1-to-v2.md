# v1 → v2 移行ガイド

zenkigen-component v2.0.0（Tailwind CSS v4 専用）への移行手順です。新規導入の場合は各パッケージの README のセットアップ手順を参照してください。

## 目次

- [重要: v2.0 は breaking change](#重要-v20-は-breaking-change)
- [対象バージョン](#対象バージョン)
  - [対応ブラウザ（移行前に必ず確認）](#対応ブラウザ移行前に必ず確認)
- [移行手順](#移行手順)
  - [Step 1: 事前準備](#step-1-事前準備)
  - [Step 2: パッケージのアップデート](#step-2-パッケージのアップデート)
  - [Step 3: PostCSS 設定の変更](#step-3-postcss-設定の変更)
  - [Step 4: CSS エントリファイルの変更](#step-4-css-エントリファイルの変更)
  - [Step 5: tailwind.config の簡素化](#step-5-tailwindconfig-の簡素化)
  - [Step 6: アプリケーションコードのクラス名修正](#step-6-アプリケーションコードのクラス名修正)
    - [クラス名以外に挙動が変わる点](#クラス名以外に挙動が変わる点)
  - [Step 7: 動作確認](#step-7-動作確認)
- [トラブルシューティング](#トラブルシューティング)

## 重要: v2.0 は breaking change

**v2.0 は Tailwind CSS v4 専用です。** v3 には対応しません。

- v1.x（Tailwind v3 対応）と v2.0（Tailwind v4 対応）は**非互換**です
- v1.x を継続利用する場合は変更不要です（`@zenkigen-inc/component-ui@v1` の dist-tag、または `package.json` の `^1` 固定で継続できます）
- バージョン系列と dist-tag の運用は [バージョン運用方針](./versioning-policy.md) を参照してください

主な変更点:

| 項目                                                            | v1.x                                      | v2.0                                                            |
| --------------------------------------------------------------- | ----------------------------------------- | --------------------------------------------------------------- |
| Tailwind CSS                                                    | v3                                        | **v4（必須）**                                                  |
| 設定の読み込み                                                  | JS preset（`presets: [componentConfig]`） | **CSS import（`@import '@zenkigen-inc/component-ui/styles'`）** |
| PostCSS プラグイン                                              | `tailwindcss` + `autoprefixer`            | **`@tailwindcss/postcss`**（autoprefixer 不要）                 |
| クラス検出                                                      | `content` 配列 + safelist                 | **自動検出**（`@source` はパッケージ側で同梱済み・記述不要）    |
| `@zenkigen-inc/component-config` の default export（JS preset） | あり                                      | **廃止**                                                        |

## 対象バージョン

- zenkigen-component: v2.0.0 以降
- Tailwind CSS: v4.x（必須）
- `@tailwindcss/postcss`: v4.x
- Node.js: 20 以降

### 対応ブラウザ（移行前に必ず確認）

**Tailwind v4 は要求ブラウザが大幅に上がります。** 生成される CSS が新しい機能に依存しており、**フォールバックはありません**。

| ブラウザ | 最小バージョン | リリース時期 |
| -------- | -------------- | ------------ |
| Safari   | **16.4 以上**  | 2023 年 3 月 |
| Chrome   | **111 以上**   | 2023 年 3 月 |
| Firefox  | **128 以上**   | 2024 年 7 月 |

これより古いブラウザをサポート対象に含む場合、v2.0 へは移行できません。v1.x を継続してください。

## 移行手順

### Step 1: 事前準備

移行作業前にブランチを作成し、クリーンな状態から始めてください。

```bash
git checkout -b feat/zenkigen-component-v2-migration
git status
```

> 古い v1 系バージョン（例: `^1.10.x`）を使っている場合は、先に v1 系の最新へ引き上げてから v2.0 へ進むと、変更の影響を切り分けやすくなります。

### Step 2: パッケージのアップデート

**使っている `@zenkigen-inc/*` パッケージはすべて同じバージョンに揃えてください。** 4 パッケージは常に同一バージョンで公開されるため、一部だけ v1 のまま残すと動作しません。`component-ui` を入れれば `component-icons` / `component-theme` は依存として入りますが、**アプリから直接 import している場合は明示的に更新してください**。

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

`@zenkigen-inc/component-icons` / `@zenkigen-inc/component-theme` を直接 import している場合は、上記に加えて同じバージョンへ更新してください。

> - `autoprefixer` は不要です（v4 のビルドに内蔵）
> - `@tailwindcss/container-queries` を使っていた場合も不要です（v4 は container queries を標準搭載。`@container` / `@md:` 等のコードはそのまま動作します）

#### 正式リリース前に試す場合（rc）

**v2.0.0 の正式リリース前は `@^2` では取得できません。** rc（リリース候補版）を**バージョンを明示して**インストールしてください。

**インストールするバージョンは [Releases](https://github.com/zenkigen/zenkigen-component/releases) で確認してください。** rc には `Pre-release` ラベルが付いています。rc は修正のたびに `-rc.1`, `-rc.2` … と更新されるため、検証時は常に最新の rc を使ってください。

```bash
# npm（バージョンは Releases で確認した最新の rc に置き換えてください）
npm install @zenkigen-inc/component-ui@2.0.0-rc.0 @zenkigen-inc/component-config@2.0.0-rc.0

# yarn
yarn add @zenkigen-inc/component-ui@2.0.0-rc.0 @zenkigen-inc/component-config@2.0.0-rc.0

# pnpm
pnpm add @zenkigen-inc/component-ui@2.0.0-rc.0 @zenkigen-inc/component-config@2.0.0-rc.0
```

> - **rc は検証用**です。本番環境では正式リリース（`@^2`）を待ってください
> - **4 パッケージは同じ rc バージョンで揃えてください**（`component-icons` / `component-theme` を直接使っている場合を含む）
> - `.npmrc` に `minimum-release-age`（インストール前の待機日数）を設定している場合、公開直後の rc は取得できません

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
@import '@zenkigen-inc/component-ui/styles';
```

`@zenkigen-inc/component-ui/styles` が、デザイントークンの読み込み（`@zenkigen-inc/component-config/styles`）と、コンポーネントが実行時に参照する動的クラスの検出（`@source`）をまとめて提供します。利用側で `@source` や `node_modules` への相対パスを記述する必要はありません（モノレポ/単体などアプリ構成にも依存しません）。

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

> v1 で独自の safelist を追加していた場合、`@zenkigen-inc` 関連のものは不要になります（`@zenkigen-inc/component-ui/styles` に同梱の `@source` で検出されます）。アプリ独自の動的クラスは [`@source inline(...)`](https://tailwindcss.com/docs/detecting-classes-in-source-files#safelisting-specific-utilities) に移行してください。

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

#### クラス名以外に挙動が変わる点

クラス名の置換だけでは吸収できない変更です。**該当箇所がないか確認してください。**

**1. bare `border` のデフォルト色（`gray-200` → `currentColor`）**

色クラスを併記していない `border` は、v3 では preflight の `#e5e7eb`（薄いグレー）でしたが、v4 では**その要素の文字色**になります。文字色が濃い場合、枠線が想定より目立ちます。

```diff
- <div className="border rounded p-4">      {/* v3: 薄グレー枠 → v4: 文字色の枠 */}
+ <div className="border border-uiBorder01 rounded p-4">
```

> **rc 時点の既知の未対応**: `Checkbox` の `color="gray"` に hover したとき、コンポーネント内部で
> 同じ事象が起きます（v1 はほぼ見えない枠、v2 は文字色の枠）。正式リリースに向けて対応方針を検討中です。

**2. `<input>` / `<textarea>` の背景が透明になる**

v4 の preflight はフォーム要素にも `background-color: transparent` を適用します。v3 はブラウザ既定（多くの場合白）のままでした。背景色を指定していない独自の入力欄は、**親要素の色が透ける**ようになります。

```diff
- <input className="rounded border px-2" />
+ <input className="rounded border bg-white px-2" />
```

**3. `space-y-*` / `space-x-*` の適用先が変わる**

v3 は「2 番目以降の子」に `margin-top`、v4 は「最後以外の子」に `margin-bottom` を付けます。通常の縦積みでは結果は同じですが、**`flex`（横並び）と併用している場合は要素の高さが変わります**。`flex` に `space-y-*` を付けている箇所は `gap-*` への置き換えを検討してください。

**4. カラーパレットが OKLCH ベースに変更**

Tailwind 標準パレット（`gray-500` / `blue-600` 等）の色定義が OKLCH に変わり、**同名クラスでも色がわずかに変わります**。zenkigen のデザイントークン（`text-text02` / `bg-interactive01` 等）は独自定義のため影響ありません。ブランドカラーの厳密一致が必要な箇所で標準パレットを使っている場合は確認してください。

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
- [ ] **色クラスを併記していない `border` の枠線色**（`currentColor` 化で濃くなっていないか）
- [ ] **背景色を指定していない `<input>` / `<textarea>`**（透過して親の色が出ていないか）
- [ ] **`flex` と `space-y-*` を併用している箇所**の高さ

> hover / disabled / focus など、初期表示では見えない状態も確認してください。上記の `border` 色は
> **hover 時にだけ現れる**ことがあります（hover 用の色クラスが未指定な場合）。

## トラブルシューティング

### スタイルが適用されない

1. **CSS エントリの import 確認**: `@import '@zenkigen-inc/component-ui/styles';` が記述されているか
2. **PostCSS 設定の確認**: `@tailwindcss/postcss` を使っているか（v3 の `tailwindcss` プラグイン指定は動きません）
3. **CSS ディレクティブの確認**: `@tailwind base;` ではなく `@import 'tailwindcss';` になっているか

### 特定のクラスだけ効かない

動的クラスが効かない場合は `@import '@zenkigen-inc/component-ui/styles';` が読み込まれているか確認してください。アプリ独自の safelist は `@source inline(...)` に移行が必要です。

### z-index が効かない

`z-modal` / `z-tooltip` 等のカスタム z-index は `@zenkigen-inc/component-config/styles` で定義され、`@zenkigen-inc/component-ui/styles` 経由で読み込まれます。この import が読み込まれているか確認してください。

### ビルドエラー: `Cannot find module '@zenkigen-inc/component-ui/styles'`

`@zenkigen-inc/component-ui` が v2.0 以上であることを確認してください。v1.x に `./styles` エクスポートはありません。

### 型エラー: `Module '"@zenkigen-inc/component-config"' has no default export`

v2.0 では JS preset（default export）が廃止されています。`tailwind.config` の `presets: [...]` 指定を削除してください（[Step 5](#step-5-tailwindconfig-の簡素化)）。
