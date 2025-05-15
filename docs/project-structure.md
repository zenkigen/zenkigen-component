# Zenkigen Component ライブラリ構造

このドキュメントでは、Zenkigen Component ライブラリのプロジェクト構造と各パッケージの機能・役割について説明します。

## プロジェクト概要

Zenkigen Component は、React コンポーネントライブラリで、ZENKIGENのデザインシステムに準拠したUIを構築するためのツールを提供します。プロジェクトは複数のパッケージから構成され、それぞれが異なる役割を持ちます。

## パッケージ構成

プロジェクトは以下の4つの主要パッケージで構成されています：

1. **@zenkigen-inc/component-ui**: メインのUIコンポーネントライブラリ
2. **@zenkigen-inc/component-theme**: テーマ関連の設定と変数
3. **@zenkigen-inc/component-config**: Tailwind CSSの設定
4. **@zenkigen-inc/component-icons**: アイコンコンポーネント

## パッケージ間の依存関係

パッケージ間の依存関係は以下の通りです：

```
component-ui
  ├── component-icons
  └── component-theme

component-config
  └── component-theme

component-icons
  (独立)

component-theme
  (独立)
```

## 各パッケージの詳細

### 1. @zenkigen-inc/component-ui

このパッケージは、メインのUIコンポーネントライブラリで、様々なReactコンポーネントを提供します。

**主な特徴**:

- Reactコンポーネント集
- TailwindCSSを使用したスタイリング
- component-themeとcomponent-iconsに依存

**含まれるコンポーネント**:

- Avatar
- Breadcrumb
- Button
- Checkbox
- Dropdown
- EvaluationStar
- Heading
- Icon
- IconButton
- Loading
- Modal
- NotificationInline
- Pagination
- PaginationSelect
- Radio
- Search
- Select
- SelectSort
- Tab
- Table
- Tag
- TextArea
- TextInput
- Toast
- Toggle
- Tooltip

**実装スタイル**:

- 各コンポーネントはTypeScriptで実装
- コンポーネントは機能ごとにディレクトリ分け
- Storybookを用いた開発・テスト環境の提供
- ポリモーフィックなデザインパターンを使用（例：Button）

### 2. @zenkigen-inc/component-theme

このパッケージは、テーマ関連の設定とスタイル変数を提供します。

**主な特徴**:

- カラーパレット定義
- タイポグラフィ設定
- フォームコントロールのスタイル変数
- 他パッケージから参照される共通のスタイル定義

**主要ファイル**:

- colors.ts: カラー関連の定義
- typography.ts: フォントサイズ、ウェイト、行の高さなどの定義
- form.ts: フォーム要素のスタイル定義

### 3. @zenkigen-inc/component-config

このパッケージは、Tailwind CSS の設定を提供します。

**主な特徴**:

- Tailwind CSS のプリセット設定
- Design Token を Tailwind の設定に変換
- component-themeパッケージに依存
- Tailwindプラグインによるタイポグラフィユーティリティクラスの生成

**主要ファイル**:

- tailwind-config.ts: Tailwind CSS の設定
- tokens/tokens.ts: Design Token の定義

### 4. @zenkigen-inc/component-icons

このパッケージは、アイコンコンポーネントを提供します。

**主な特徴**:

- SVGアイコンをReactコンポーネントとして提供
- コード生成スクリプトによる自動生成
- 独立したパッケージとして機能

**主要ファイル**:

- icon.tsx: アイコンコンポーネント定義
- svg/: SVGファイルディレクトリ
- codegen.cjs: アイコンコンポーネント生成スクリプト

## ビルドシステム

プロジェクトでは以下のビルドツールを使用しています：

- **Microbundle**: パッケージのビルドに使用
- **TypeScript**: 型システムと最新のJavaScript機能
- **Storybook**: コンポーネントの開発・テスト環境

## パッケージバージョン

現在、すべてのパッケージは同一のバージョン（1.14.3）を共有しています。これは、パッケージ間の相互依存関係を管理しやすくするためと考えられます。

## 開発ワークフロー

1. **コンポーネント作成**: `yarn generate-component` コマンドを使用して雛形を生成
2. **テスト**: Storybookを使用してコンポーネントをテスト
3. **ビルド**: `yarn build` コマンドを使用してパッケージをビルド
4. **公開**: `yarn publish:all` コマンドを使用してパッケージを公開
