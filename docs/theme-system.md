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
