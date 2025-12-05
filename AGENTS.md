# Repository Guidelines

Zenkigen コンポーネントライブラリへのコントリビュート手順を簡潔にまとめています。

## 基本ルール

- すべてのやり取りは日本語で行うこと

# タイムスタンプや日付を扱うときのルール

- 常に UTC または JST など特定のタイムゾーンに統一して日付・時刻を扱うこと。
- ドキュメントの更新履歴や日付を生成する際は、現在時刻を勝手に推測せず、
  必ずシステムが提供する正しい日付/時刻 API（例: `new Date()`）を利用すること。
- 過去の履歴を生成・要約する場合は「仮の日付」や「推測した時間」を書かないこと。
- 「YYYY-MM-DD HH:mm」形式で出力し、表記を統一すること。
- 日付に曖昧さがある場合は「不明」「要確認」と明記し、誤った時間を作らないこと。

## プロジェクト構成 / モジュール配置

- Yarn 4 ワークスペースは `packages/` 配下に集約：`component-ui` (React コンポーネントと Storybook)、`component-config` (Tailwind プリセット & tokens)、`component-theme` (デザイントークン)、`component-icons` (React SVG アイコン)。各コンポーネントは同ディレクトリにテストを置きます。
- 設計リファレンスは `docs/` に集約。大きめの変更前に `docs/project-structure.md` と `docs/coding-guidelines.md` を確認。
- ルートに共通設定 (`eslint.config.mjs`, `tsconfig*.json`, `vite.config.ts`, `tailwind.config.js`) と補助スクリプト (`scripts/`) を配置。

## ドキュメント参照

- 入口: `README.md`（利用方法・インストール）、`docs/README.md`（技術ドキュメントの目次）。
- 構造: `docs/project-structure.md` にパッケージの役割と依存関係の図示。
- 実装: `docs/component-patterns.md` で実装パターン/Do & Don't、`docs/theme-system.md` でデザイントークンと Tailwind プリセットの扱い。
- コーディング規約: `docs/coding-guidelines.md` に型/React/スタイル/命名の細則と良い例・悪い例。
- コンポーネント仕様: `docs/component/*.md` に API/props/挙動と Storybook の確認ポイント。UI 変更時は該当仕様書を更新。

## ビルド・テスト・開発コマンド

- 初期化は Corepack 前提で `yarn install`。コマンドはリポジトリ直下で実行。
- `yarn lint` / `yarn lint:fix`：ESLint + Prettier の検査/修正。`yarn check-filenames` はファイル名の大文字小文字チェック、`yarn lint:all` で併走。
- `yarn type-check`：全ワークスペースの TypeScript `--noEmit`。
- `yarn build:all` / `yarn build-lib:all`：全パッケージを `tsup` でビルド。リリース前や Storybook ビルド前に推奨。
- `yarn storybook` (開発) / `yarn build-storybook` (静的出力) で UI を確認。
- `yarn test` (watch) / `yarn test:ci` (headless) は `@zenkigen-inc/component-ui` の Vitest を実行。
- `yarn create-component` で新規コンポーネントの雛形生成、`yarn update-tokens` で `component-config` の Tailwind tokens を再生成。
- アイコン追加: SVG を `packages/component-icons/src/svg/` に配置し、`yarn build:all`（または `yarn workspace @zenkigen-inc/component-icons run build`）を実行。手順は `packages/component-icons/docs/icon-addition-workflow.md` を参照。
- カラートークン追加/修正: `packages/component-config/style-dictionary/tokens.json` を編集し、`yarn workspace @zenkigen-inc/component-config run build:tokens`（またはルートで `yarn update-tokens`）→ `yarn build:all`。詳細は `packages/component-config/README.md`。

## コーディングスタイル / 命名

- TypeScript + React 18–19。インデント 2 スペース、120 桁上限、セミコロン・シングルクォート・末尾カンマを Prettier で統一。コンポーネントは `.tsx`。
- Boolean は明示的に渡す (`disabled={true}`)、変数は `is/has/should/can` 接頭辞。型は `import type { ... }` を優先。
- `dangerouslySetInnerHTML` は禁止。`simple-import-sort` 準拠でインポート順を整理し、Tailwind クラスも ESLint 指摘に従う。ファイル名は kebab-case を基本。

## テスト方針

- フレームワークは Vitest + `@testing-library/react` (`packages/component-ui`)。テストは対象コンポーネントと同階層に `*.test.tsx` で配置。
- フォーカス/キーボード/aria などアクセシビリティ状態、主要プロップの境界値、ユーザー操作を中心にカバー。クエリは user-facing (`getByRole` 等) を優先。
- 挙動を変えたら Storybook のストーリーも更新。プッシュ前に `yarn test:ci` と `yarn lint:all` を実行し CI と揃える。

## コミット / PR ガイド

- 既存の Conventional 形式を踏襲：`type(scope): description` 例 `refactor(text-input): adjust error messaging`。scope はパッケージ/コンポーネント名を使用。
- PR には変更概要・関連 Issue/チケット・UI 変更のスクリーンショットまたは Storybook リンク・実行コマンド一覧 (lint/test/build) を添付。
- パッケージのバージョンは常に揃えること。公開時は `yarn build-lib:all` 後に `yarn publish:all` を使い、部分的なバージョン更新は避ける。
