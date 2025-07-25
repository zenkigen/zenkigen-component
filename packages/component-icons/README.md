# @zenkigen-inc/component-icons

コンポーネントで使用するアイコンを管理するパッケージです。

## 使い方

インストール:

```bash
yarn add @zenkigen-inc/component-icons
```

アイコンのインポート:

```tsx
import { iconElements } from '@zenkigen-inc/component-icons';

// アイコンを表示する
<div>{iconElements['add']}</div>;
```

## SVGアイコンの追加方法

新しいSVGアイコンを追加するには、以下の手順に従ってください。

### 1. SVGファイルの準備

SVGファイルは以下の条件を満たす必要があります:

- サイズ: 基本的に24x24サイズを推奨
- 命名: キャメルケースまたはケバブケース (例: `arrow-right.svg`、`userAdd.svg`)
- フォーマット: 基本的なSVG構造を持つこと

以下は適切なSVGファイルの例です:

```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.276 12.724H4.72399C4.3258 12.724 4 12.3982 4 12C4 11.6018 4.3258 11.276 4.72399 11.276H11.276V4.72398C11.276 4.32579 11.6018 4 12 4C12.3982 4 12.724 4.32579 12.724 4.72398V11.276H19.276C19.6742 11.276 20 11.6018 20 12C20 12.3982 19.6742 12.724 19.276 12.724H12.724V19.276C12.724 19.6742 12.3982 20 12 20C11.6018 20 11.276 19.6742 11.276 19.276V12.724Z" fill="#7C868A"/>
</svg>
```

> **注意**: `fill`属性はコード生成時に削除されるため、アイコン表示時のスタイルに影響しません。

### 2. SVGファイルの配置

準備したSVGファイルを以下のディレクトリに配置します:

```
packages/component-icons/src/svg/
```

### 3. ビルド実行

以下のコマンドを実行してアイコンをビルドします:

```bash
yarn build:all
```

このビルドプロセスで以下の処理が行われます:

1. `codegen.cjs` スクリプトが実行され、SVGフォルダ内のファイルが読み込まれます
2. 各SVGファイルから不要な属性が削除されます
3. テンプレートを使用して `icon.tsx` が生成されます
4. パッケージがビルドされます

### 4. アイコンの利用

ビルド後、追加したアイコンは Icon コンポーネントで利用できます:

```tsx
import { Icon } from '@zenkigen-inc/component-ui';

// 追加したアイコンを表示
<Icon name="new-icon-name" />;
```

アイコン名は、ファイル名から拡張子を除いたものになります (例: `arrow-right.svg` → `'arrow-right'`)

## ライセンス

@zenkigen-inc/component-icons は MIT ライセンスに基づいています。  
ただし、SVG ファイルは [Shape](https://shape.so/) の[利用規約](https://shape.so/terms)に準拠します。
