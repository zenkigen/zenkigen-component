# @zenkigen-inc/component-icons

コンポーネントで使用するアイコンを管理するパッケージです。

## 使い方

インストール:

```bash
yarn add @zenkigen-inc/component-icons
```

### 直接インポートする方法

アイコン要素を直接インポートして使用できます:

```tsx
import { iconElements } from '@zenkigen-inc/component-icons';

// アイコンを表示する
<div>{iconElements['add']}</div>;
```

### Icon コンポーネントを使用する方法（推奨）

`@zenkigen-inc/component-ui` の Icon コンポーネントを使用することで、より柔軟にアイコンを扱えます:

```tsx
import { Icon } from '@zenkigen-inc/component-ui';

// 基本的な使用
<Icon name="add" size="medium" color="icon01" />

// サイズとカラーの指定
<Icon name="settings" size="large" color="icon02" />

// アクセントカラーを使用（対応アイコンのみ）
<Icon
  name="calendar-today"
  size="medium"
  color="icon01"
  accentColor="interactive01"
/>
```

詳細は [Icon コンポーネント仕様書](../../docs/component/icon-specification.md) を参照してください。

## アクセントカラー対応アイコン

一部のアイコンは **アクセントカラー** 機能に対応しています。これにより、アイコン内の特定要素に異なる色を適用して、状態やステータスを視覚的に表現できます。

### 対応アイコン一覧

現在、以下のアイコンがアクセントカラーに対応しています：

| アイコン名           | 用途                         | 推奨アクセントカラー例           |
| -------------------- | ---------------------------- | -------------------------------- |
| `calendar-attention` | カレンダー注意状態           | `supportError`                   |
| `calendar-check`     | カレンダーチェック状態       | `supportSuccess`                 |
| `calendar-minus`     | カレンダーマイナス状態       | `supportWarning`                 |
| `calendar-today`     | カレンダー今日表示           | `interactive01`                  |
| `mic`                | マイク（アクティブ状態表示） | `supportSuccess`, `supportError` |
| `volume-off`         | 音量オフ（オフライン表示）   | `supportError`                   |

### 使用例

```tsx
import { Icon } from '@zenkigen-inc/component-ui';

// カレンダー - 今日の日付を強調
<Icon
  name="calendar-today"
  color="icon01"
  accentColor="interactive01"
/>

// カレンダー - 注意が必要な日付
<Icon
  name="calendar-attention"
  color="icon01"
  accentColor="supportError"
/>

// マイク - アクティブ/ミュート状態の切り替え
const MicIcon = ({ isActive }: { isActive: boolean }) => (
  <Icon
    name="mic"
    color="icon01"
    accentColor={isActive ? 'supportSuccess' : 'supportError'}
  />
);
```

## SVGアイコンの追加方法

新しいSVGアイコンを追加するには、以下の手順に従ってください。

### 1. SVGファイルの準備

SVGファイルは以下の条件を満たす必要があります:

- サイズ: 基本的に24x24サイズを推奨
- 命名: キャメルケースまたはケバブケース (例: `arrow-right.svg`、`userAdd.svg`)
- フォーマット: 基本的なSVG構造を持つこと

#### 通常のSVGアイコン

以下は標準的なSVGファイルの例です:

```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.276 12.724H4.72399C4.3258 12.724 4 12.3982 4 12C4 11.6018 4.3258 11.276 4.72399 11.276H11.276V4.72398C11.276 4.32579 11.6018 4 12 4C12.3982 4 12.724 4.32579 12.724 4.72398V11.276H19.276C19.6742 11.276 20 11.6018 20 12C20 12.3982 19.6742 12.724 19.276 12.724H12.724V19.276C12.724 19.6742 12.3982 20 12 20C11.6018 20 11.276 19.6742 11.276 19.276V12.724Z" fill="#7C868A"/>
</svg>
```

> **注意**: `fill`属性はコード生成時に削除されるため、アイコン表示時のスタイルに影響しません。

#### アクセントカラー対応SVGアイコン

アクセントカラー機能に対応させたい場合は、異なる色を適用したい要素に `class="accentColor"` を追加します:

```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- 基本形状（通常の色） -->
  <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" fill="#7C868A"/>

  <!-- アクセントカラーを適用する要素 -->
  <circle class="accentColor" cx="12" cy="12" r="3" fill="#FF0000"/>
</svg>
```

**ポイント**:

- アクセントカラーを適用したい要素に `class="accentColor"` を追加
- 複数の要素に適用可能
- Icon コンポーネントの `accentColor` プロパティで色を動的に変更可能
- アクセントカラー要素の `fill` 属性も削除されるため、初期値は無視されます

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

// 通常のアイコン
<Icon name="new-icon-name" size="medium" color="icon01" />

// アクセントカラー対応アイコン
<Icon
  name="new-icon-name"
  size="medium"
  color="icon01"
  accentColor="interactive01"
/>
```

**アイコン名の規則**:

- ファイル名から拡張子を除いたものがアイコン名になります
- 例: `arrow-right.svg` → `'arrow-right'`
- 例: `calendar-today.svg` → `'calendar-today'`

**TypeScript型定義**:

- 追加したアイコンは `IconName` 型に自動的に含まれ、型安全に使用できます
- 存在しないアイコン名を指定するとコンパイルエラーになります

## 関連ドキュメント

より詳細な情報については、以下のドキュメントを参照してください：

- **[Icon コンポーネント仕様書](../../docs/component/icon-specification.md)** - Icon コンポーネントの詳細な使用方法、Props、アクセシビリティ情報

## ライセンス

@zenkigen-inc/component-icons は MIT ライセンスに基づいています。  
ただし、SVG ファイルは [Shape](https://shape.so/) の[利用規約](https://shape.so/terms)に準拠します。
