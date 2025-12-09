# MCP サーバー開発手順 (zenkigen-component)

このリポジトリ向けに Model Context Protocol (MCP) サーバーを新規実装する手順の提案です。既存の `mcp-server/` ディレクトリは参照せず、Yarn 4 ワークスペース配下に新しいパッケージとして構築する想定です。

## 目的と想定ユースケース
- LLM クライアントからコンポーネント情報・デザイントークン・利用例を安全に取得できる API を提供する。
- リポジトリ内ドキュメント (`docs/` と `docs/component/*.md`) やトークン定義 (`packages/component-config/src/tokens/tokens.ts`) を検索・閲覧できるリソースを公開する。
- コンポーネントの props やアクセシビリティ要件を質問可能にし、Storybook の起動なく参照できる。

## 技術スタックと配置
- Node.js 20.19.3、Yarn 4（Corepack 前提）。
- TypeScript + tsup を利用し、`packages/mcp-server` に新規ワークスペースを追加。
- 主要依存の目安: `@modelcontextprotocol/sdk`、`zod`、`fast-glob`、`gray-matter`/`remark` 系（Markdown 解析が必要な場合）、`pino` などの軽量ロガー。
- 開発用依存の目安: `tsup`、`typescript`、`tsx`（dev 起動用）、`vitest`（単体テスト）、`eslint` はルート設定を流用。

## ディレクトリ構成例
```
packages/mcp-server/
  package.json
  tsconfig.json            # ルート設定を継承し、noEmit を解除してビルド専用に
  src/
    index.ts               # エントリーポイント（MCP サーバー起動）
    config.ts              # 環境変数やパス定義
    loaders/               # ファイルシステムからデータを読み込む層
    resources/             # MCP resources 定義（list/read）
    tools/                 # MCP tools 定義（検索や変換系）
    schemas/               # zod スキーマ
    logger.ts
  test/
    *.test.ts              # Vitest
```

## 実装フロー
1. **環境準備**
   - `corepack enable` 済みであることを確認し、`yarn install` を実行。
2. **ワークスペース作成**
   - `packages/mcp-server/package.json` を作成し、以下を目安に設定する。ルートの `workspaces` は `packages/*` なので追加不要。
     ```json
     {
       "name": "@zenkigen-inc/mcp-server",
       "version": "0.1.0",
       "private": true,
       "type": "module",
       "main": "dist/index.js",
       "types": "dist/index.d.ts",
       "scripts": {
         "dev": "tsx src/index.ts",
         "build": "rimraf dist && tsup",
         "type-check": "tsc --noEmit",
         "test": "vitest",
         "lint": "eslint './src/**/*.{ts,tsx}'"
       }
     }
     ```
   - `tsconfig.json` を用意し、`noEmit: false`、`moduleResolution: node` を維持しつつ `outDir: "./dist"` を設定。必要なら `paths` でリポジトリ内データパスを定義。
3. **サーバー起動コード**
   - `@modelcontextprotocol/sdk` の `createServer` を使い、HTTP か標準入出力で待ち受ける（使用クライアントに合わせて選択）。開発時は `tsx src/index.ts` でホットリロード。
   - SIGINT/SIGTERM を受けてクリーンに終了する処理を追加。
   - トランスポートは stdio を採用。ベースパスは `.git` または `package.json` を上向き探索してリポジトリルートを自動検出し、失敗時は `process.cwd()` にフォールバックする。`ROOT_DIR` 環境変数で明示指定できるようにしておくと CI などで便利。
   - 起動時の推奨デフォルト:
     - `LOG_LEVEL`: `info`（env で上書き可）
     - `CACHE_TTL_MS`: `60000`（1分、変更検知が十分なら `0` で無効化も可）
     - `ROOT_DIR`: 未指定なら上記自動検出に委ねる
     - サーバー名/バージョンは `package.json` から取得し、取得失敗時は `zenkigen-component-mcp` / `0.1.0` でフォールバック
4. **リソース設計 (resources)**  
   | resource ID | 参照元 | 返却内容 | 補足 |
   | --- | --- | --- | --- |
   | `component-spec/<slug>` | `docs/component/*.md` | フロントマター＋本文 (Markdown) | 起動時に `relativePath → resourceId` マップを生成し、`listResources` で ID/relativePath 両方を返す |
   | `design-tokens` | `packages/component-config/src/tokens/tokens.ts` | トークンのメタデータ（名前・カテゴリ・説明など）を JSON 返却、値は非公開 | `zod` でカテゴリ/スコープをバリデート。値を直接返さず、Tailwind 経由利用を前提とする |
   | `icons` | `packages/component-icons/src/svg/*.svg` | アイコン名/slug/relativePath などのメタデータ | SVG 本文は返さず、Icon コンポーネント経由の利用を想定 |
   - Markdown は MCP 用に加工せずそのまま返す。  
   - README 内の相対リンクを解決する仲介として `resolveDocLink` ツールを提供する（例: `docs/component/button-specification.md` → `component-spec/button`）。
   - `guidelines`（開発者向けコーディング規約など）は利用者向けではないためリソース公開しない。
5. **ツール設計 (tools)**  
   | tool 名 | 入力例 | 主な処理 | 出力例 |
   | --- | --- | --- | --- |
   | `searchComponents` | `keyword`, `limit`, `scope` | `docs/component/*.md` からタイトル/props を抽出し全文検索 | 一致コンポーネントの概要リスト |
   | `getComponentUsage` | `component` (任意) | `packages/component-ui/src/**` から JSX サンプルを抽出 | 使用例スニペット集 |
   | `searchTokens` | `keyword`, `category`, `limit` | トークンのメタデータをフィルタ（値は返さない） | 名称・カテゴリ・説明などの一覧 |
   | `resolveDocLink` | `path: "docs/component/button-specification.md"` | 相対パスをリソース ID に変換 | `resourceId: "component-spec/button"` |
   - すべての入力を `zod` でバリデートし、エラーメッセージは日本語で統一。  
   - `limit` はデフォルト `5`、上限 `20` を推奨。上限超過は上限でクリップし、負数や 0 はバリデーションエラー。
6. **ロギングとエラーハンドリング**
   - 1 リクエスト 1 行の JSON ログを `pino` で出力（レベル: info/debug/error）。PII や機密データを含めない。
   - 例外は `McpError` で分類し、ユーザー向けメッセージとログ向け詳細を分離。
7. **テスト・静的解析**
   - `vitest` でローダー層とツール層を単体テスト。Markdown/JSON のパース結果をスナップショットで検証。
   - ルートの `yarn lint:all` と `yarn type-check` に新パッケージのスクリプトが引っかかるよう揃える。
8. **ローカル検証**
   - `yarn workspace @zenkigen-inc/mcp-server dev` で起動し、標準入出力モードなら `printf` でハンドシェイクを確認。
   - MCP クライアントへの接続例 (`.cursor/mcp.json` など) を用意し、手元のツールで疎通確認。
9. **運用・リリース方針**
   - 公開前に `yarn build:all` を通し、出力物が `dist/` のみになることを確認。
   - バージョンは既存パッケージと足並みをそろえる必要はないが、タグ付け・CHANGELOG を用意し、互換性の破壊がある場合はツール名をバージョン付きで別エンドポイントにする。

## 事前に整備しておくとツール実装が楽になる情報構造
- `docs/component/*.md` のフロントマターを必須化し、`title`, `slug`, `tags`, `props`（配列）などのキーを揃える。  
- Props テーブルの列名・型表記を統一し、`## Props`/`## Accessibility`/`## Examples` のように見出し構造を固定する。  
- ファイル命名は既存の `*-specification.md` を踏襲（slug 抽出を安定化）。  
- これらが未整備でもパーサで抽出は可能だが、揃えておくと `searchComponents` の精度・安定性が上がり、実装も簡潔になる。  

## クライアント設定例
`.cursor/mcp.json` への追加例（必要に応じて名称・ポートを変更する）。
```json
{
  "mcpServers": {
    "zenkigen-component": {
      "command": "yarn",
      "args": ["workspace", "@zenkigen-inc/mcp-server", "dev"]
    }
  }
}
```

## 注意点
- 既存の `mcp-server/` ディレクトリは参照しない。新規パッケージで設計・実装する。
- データソースは常に最新のリポジトリ内容から読み込む。ビルド成果物や Storybook 出力には依存しない。
- ユーザー向け応答は日本語をデフォルトとし、日付・時刻を扱う場合は UTC か JST のいずれかに統一する。
