# @zenkigen-inc/component-ui

## 目次

- [インストール](#インストール)
- [利用方法](#利用方法)
- [開発者向け](#開発者向け)
  - [コンポーネントの雛形を生成する](#コンポーネントの雛形を生成する)
  - [実装したコンポーネントを export する](#実装したコンポーネントを-export-する)
- [ライセンス](#ライセンス)

## インストール

```bash
yarn add @zenkigen-inc/component-ui @zenkigen-inc/component-config
```

**Tailwind CSS v4 が必須です。** CSS エントリ（例: `globals.css`）に以下を追加する。

```css
@import 'tailwindcss';
@import '@zenkigen-inc/component-config/styles';

/* zenkigen-component の動的クラスを検出（パスは globals.css から node_modules への相対パス。アプリ構成依存） */
@source '../../node_modules/@zenkigen-inc/component-theme/dist/**/*.mjs';
@source '../../node_modules/@zenkigen-inc/component-ui/dist/**/*.mjs';
```

PostCSS プラグインは `@tailwindcss/postcss` を使用する（`autoprefixer` は不要）。v1.x（Tailwind v3 / JS preset）からの移行手順は移行ガイドを参照。

## 利用方法

```tsx
import { Button } from '@zenkigen-inc/component-ui';

const Component = () => {
  return <Button>ボタン</Button>;
};
```

## 開発者向け

### コンポーネントの雛形を生成する

hygen で雛形を生成することができるので、必ずこのコマンドから生成されたファイルを元に実装を始めてください。

```bash
yarn generate-component
```

### 実装したコンポーネントを export する

使用する側の import を簡略化させるため root にある [packages/component-ui/src/index.ts](https://github.com/zenkigen/zenkigen-component/blob/main/packages/components/src/index.ts) に実装したコンポーネントを export してください。

## ライセンス

@zenkigen-inc/component-ui は MIT ライセンスに基づいています。
