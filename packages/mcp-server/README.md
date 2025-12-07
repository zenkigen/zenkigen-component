# ZENKIGEN Component MCP Server

ZENKIGEN Component の仕様書を MCP 経由で提供するサーバーです。コンポーネント仕様書（`docs/component/*-specification.md`）の一覧取得・全文取得・キーワード検索が行えます。

## 機能

- ツール
  - `get_component_list`: 仕様書ベースのコンポーネント一覧を返す（name と概要の表形式）。
  - `get_component_specification`: 指定した `name` の仕様書本文を返す。
  - `search_component_specifications`: 仕様書を横断検索し、ヒット件数と抜粋を返す。
- リソース
  - `component-specification`: `zenkigen://component-specification/{name}` で仕様書を読み取れる Resource Template。

## セットアップ

リポジトリをクローンし、依存をインストールしてビルドします（`<REPO_ROOT>` は自身のパスに置き換えてください）。

```bash
git clone <REPO_URL>
cd <REPO_ROOT>
yarn install
cd packages/mcp-server
yarn build
```

## 起動方法（STDIN/STDOUT）

```bash
node <REPO_ROOT>/packages/mcp-server/dist/index.js
```

補足:

- 必要に応じて環境変数を指定できます（省略可）。
  - `ROOT_DIR`: docs や packages のルートを明示したい場合に設定。
  - `LOG_LEVEL`: `debug`/`info`/`warn`/`error`
  - `CACHE_TTL_MS`: キャッシュ TTL（ms）

## Codex などでの設定例（TOML）

```toml
[mcp_servers."zenkigenComponent"]
command = "node"
args = ["<REPO_ROOT>/packages/mcp-server/dist/index.js"]
# 必要に応じて環境変数を指定（例）
# env.ROOT_DIR = "<REPO_ROOT>"
# env.LOG_LEVEL = "info"
```

## 開発用コマンド

ホットリロード用の watch スクリプトはありません。コード変更後は手動で `yarn build` を再実行してください。

- `yarn build`: バンドル + 型定義生成。
- `yarn type-check`: 型チェックのみ。
- `yarn lint`: lint + Prettier チェック（リポジトリルートで実行）。
- `yarn inspector`: ビルド後、MCP Inspector で挙動確認（`mcp-inspector node dist/index.js`）。

## 仕様書の探し方

1. `get_component_list` で name と概要を確認し、候補を絞る。
2. 詳細を見たいときは `get_component_specification` に name を渡す。
3. キーワードで横断的に探す場合は `search_component_specifications` を利用する。
