# テーマシステムとTailwind CSS設定

このドキュメントでは、Zenkigen Component ライブラリのテーマシステムとTailwind CSS設定について説明します。

## テーマシステム概要

Zenkigen Component のテーマシステムは、`@zenkigen-inc/component-theme` パッケージで定義され、`@zenkigen-inc/component-config` パッケージを通じて CSS-first 形式のスタイル（`@theme` / `@utility`）に変換されます。

## パッケージの役割

### @zenkigen-inc/component-theme

このパッケージは、デザインシステムの基本的な変数（色、タイポグラフィ、フォームスタイルなど）を定義します。

主な役割：

- 色の定義
- タイポグラフィの定義
- フォームコントロールのスタイル定義
- コンポーネント間で共有されるスタイル変数の提供

### @zenkigen-inc/component-config

このパッケージは、`component-theme` で定義された変数を CSS に変換し、`exports["./styles"]`（`dist/index.css`）として配布します。

主な役割：

- デザイントークンの CSS 変数への変換（`@theme` ディレクティブ）
- タイポグラフィ・z-index 等のカスタムユーティリティ生成（`@utility` ディレクティブ）
- 動的クラス（`fill-*`）の safelist 提供（`@source inline`）

## テーマの構成

### カラーシステム

カラーシステムは、様々な用途に応じた色の定義を提供します：

- **テキスト色**: text, link
- **背景色**: background
- **境界線色**: border
- **アイコン色**: icon
- **インタラクション状態**: hover, active, selected, disabled
- **サポート色**: support（成功、警告、エラーなど）

### タイポグラフィシステム

タイポグラフィシステムは、フォントサイズ、行の高さ、フォントウェイトなどの組み合わせを定義します。これらは `@utility` として生成され、`.typography-*` というユーティリティクラスで使用できます。

例：

- `.typography-h2`
- `.typography-label16regular`
- `.typography-body14regular`

### その他のデザイントークン

- **ボーダー半径**: borderRadius
- **シャドウ**: boxShadow
- **アニメーション**: keyframes, animation
- **z-index**: zIndex（レイヤー順序の管理）

### z-index レイヤーシステム

z-index はコンポーネントの重なり順を制御するために使用します。以下の階層が定義されており、Tailwind CSS のユーティリティクラスとして使用できます。

#### レイヤー階層一覧

| レベル    | 値   | 用途                   | Tailwind クラス |
| --------- | ---- | ---------------------- | --------------- |
| hide      | -1   | 非表示要素             | `z-hide`        |
| base      | 0    | 基本レイヤー           | `z-base`        |
| badge     | 10   | バッジ                 | `z-badge`       |
| header    | 100  | ヘッダー               | `z-header`      |
| dropdown  | 300  | ドロップダウンメニュー | `z-dropdown`    |
| overlay   | 1000 | オーバーレイ背景       | `z-overlay`     |
| modal     | 1100 | モーダルダイアログ     | `z-modal`       |
| popover   | 1150 | ポップオーバー         | `z-popover`     |
| preloader | 1200 | ローディング表示       | `z-preloader`   |
| toast     | 1300 | トースト通知           | `z-toast`       |
| tooltip   | 1400 | ツールチップ           | `z-tooltip`     |

#### 設計思想

- **Modal 内の Popover**: `z-popover`（1150）は `z-modal`（1100）より上に配置されているため、Modal 内で DatePicker や Dropdown を使用した場合でも正しく前面に表示されます
- **最上位レイヤー**: ツールチップ（1400）は常に最前面に表示されます
- **FloatingPortal**: Popover、Tooltip などの浮遊要素は `FloatingPortal` を使用して DOM 階層外にレンダリングされるため、親要素の `overflow: hidden` や z-index の影響を受けません

#### 使用例

```tsx
// ドロップダウンメニュー
<div className="z-dropdown">...</div>

// モーダルのオーバーレイ
<div className="z-overlay">...</div>

// ポップオーバーコンテンツ
<div className="z-popover">...</div>
```

#### 定義場所

z-index の値は `packages/component-config/src/generate-styles.mts` で定義され、`@utility z-*` として生成されます。

## CSS の生成（CSS-first 構成）

Tailwind CSS の CSS-first 構成に対応するため、`component-config` はビルド時に `src/generate-styles.mts` を実行し、tokens と `component-theme` の typography から以下の CSS を `dist/` に生成します：

| ファイル             | 内容                                                                                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dist/theme.css`     | `@theme` ディレクティブ。カラー・fontSize・lineHeight・shadow・アニメーションのトークンを CSS 変数として定義                                         |
| `dist/utilities.css` | `@utility` ディレクティブ。`z-*`・`typography-*`・`field-sizing-content` 等のカスタムユーティリティと、動的クラス用の `@source inline("fill-{...}")` |
| `dist/index.css`     | エントリファイル（上記 2 つを `@import`）。`exports["./styles"]` で公開                                                                              |

### タイポグラフィユーティリティ

タイポグラフィユーティリティクラスは `@utility typography-* { @apply ... }` として生成されます。これにより、例えば以下のようなクラスが使用可能になります：

```html
<h2 class="typography-h2">タイトル</h2>
<p class="typography-body14regular">テキスト</p>
```

## デザイントークンの管理

### トークン変換プロセス

デザイントークンは、Figmaなどのデザインツールからエクスポートされ、Style Dictionaryを使用して変換・管理されています。

```bash
yarn update-tokens # トークンの更新コマンド
```

このコマンドは以下のプロセスを実行します：

1. `token-transformer` を使用してトークンを変換
2. Style Dictionaryを使用してJavaScriptオブジェクト（`src/tokens/tokens.ts`）を生成
3. ビルド時に `generate-styles.mts` が生成されたオブジェクトから配布用 CSS（`@theme` / `@utility`）を生成

## コンポーネントでのテーマの利用

コンポーネントは、`@zenkigen-inc/component-theme` からエクスポートされた変数を使用してスタイリングを行います：

```tsx
import { buttonColors, focusVisible } from '@zenkigen-inc/component-theme';

// ...
const baseClasses = clsx(
  'flex shrink-0 items-center justify-center gap-1',
  buttonColors[variant].hover,
  buttonColors[variant].active,
  focusVisible.normal,
  // ...
);
```

## Tailwind CSSの組み込み方法

プロジェクトでZenkigen Componentを使用するには、CSS エントリ（例: `globals.css`）で以下のように読み込みます：

```css
@import 'tailwindcss';
@import '@zenkigen-inc/component-ui/styles';
```

`@zenkigen-inc/component-ui/styles` は、デザイントークンの読み込み（`@zenkigen-inc/component-config/styles`）と、コンポーネントが実行時に参照する動的クラスの検出（`@source`）をまとめて提供します。利用側で `@source` や `node_modules` への相対パスを記述する必要はありません。これにより、Zenkigen Componentで使用されているTailwindのユーティリティクラスが、プロジェクトのCSSビルドに含まれるようになります。v1.x（Tailwind v3 / JS preset）からの移行は [v1 → v2 移行ガイド](./migration-v1-to-v2.md) を参照してください。
