# テーマシステムとTailwind CSS設定

このドキュメントでは、Zenkigen Component ライブラリのテーマシステムとTailwind CSS設定について説明します。

## テーマシステム概要

Zenkigen Component のテーマシステムは、`@zenkigen-inc/component-theme` パッケージで定義され、`@zenkigen-inc/component-config` パッケージを通じてTailwind CSSの設定に変換されます。

## パッケージの役割

### @zenkigen-inc/component-theme

このパッケージは、デザインシステムの基本的な変数（色、タイポグラフィ、フォームスタイルなど）を定義します。

主な役割：

- 色の定義
- タイポグラフィの定義
- フォームコントロールのスタイル定義
- コンポーネント間で共有されるスタイル変数の提供

### @zenkigen-inc/component-config

このパッケージは、`component-theme` で定義された変数をTailwind CSSの設定に変換し、Tailwindプリセットとして提供します。

主な役割：

- Tailwind CSSのプリセット設定の生成
- デザイントークンのTailwind CSS設定への変換
- タイポグラフィユーティリティクラスの生成

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

タイポグラフィシステムは、フォントサイズ、行の高さ、フォントウェイトなどの組み合わせを定義します。これらは、Tailwindプラグインにより `.typography-*` というユーティリティクラスとして使用できます。

例：

- `.typography-heading24bold`
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

z-index の値は `packages/component-config/src/tailwind-config.ts` で定義されています。

## Tailwind CSS設定

### 設定のカスタマイズ

`tailwind-config.ts` では、Tailwind CSSの設定をカスタマイズしています：

```tsx
export const tailwindConfig = {
  theme: {
    extend: {
      fontFamily: {
        sans: "Arial, 'Noto Sans JP', sans-serif",
      },
      colors: {
        user: tokens.user,
        ...text,
        ...link,
        ...border,
        ...background,
        ...icon,
        // ...その他の色定義
      },
      fontSize: tokens.fontSize,
      lineHeight: tokens.lineHeights,
      borderRadius: {
        button: '.25rem',
      },
      boxShadow: {
        modalShadow: tokens.shadow.modalShadow,
        floatingShadow: tokens.shadow.floatingShadow,
        layoutShadow: tokens.shadow.layoutShadow,
      },
      // ...その他の設定
    },
  },
  plugins: [
    // タイポグラフィユーティリティクラスを生成するプラグイン
    plugin(({ addComponents }) => {
      addComponents(
        Object.entries(typography).reduce(
          (acc, [, innerObj]) => (
            Object.entries(innerObj).forEach(
              ([innerKey, value]) => (acc[`.typography-${innerKey}`] = { [`@apply ${value}`]: {} }),
            ),
            acc
          ),
          {} as Record<string, Record<string, {}>>,
        ),
      );
    }),
  ],
};
```

### タイポグラフィプラグイン

タイポグラフィユーティリティクラスは、Tailwindプラグインを使用して生成されます。これにより、例えば以下のようなクラスが使用可能になります：

```html
<h1 class="typography-heading24bold">タイトル</h1>
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
2. Style Dictionaryを使用してJavaScriptオブジェクトを生成
3. 生成されたオブジェクトをTailwind CSS設定で使用

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

プロジェクトでZenkigen Componentを使用するには、以下のようにTailwind CSSの設定を行います：

```js
// tailwind.config.js
module.exports = {
  content: [
    // 既存の設定...
    './node_modules/@zenkigen-inc/**/*.{js,ts,tsx}',
  ],
  presets: [
    // 既存のプリセット...
    require('@zenkigen-inc/component-config'),
  ],
};
```

これにより、Zenkigen Componentで使用されているTailwindのユーティリティクラスが、プロジェクトのCSSビルドに含まれるようになります。
