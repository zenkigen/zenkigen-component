# mcp-server

ZENKIGEN Component で実装できるコンポーネントの一覧・詳細を取得できる MCP Server

## Features

### Tools

- `get_component_list` - コンポーネント一覧を取得する
  - Storybook で build された静的ファイルを元にコンポーネントの一覧を取得
  - コンポーネントに変更や追加があった際は `npm run build-storybook` を実行する必要がある
  - Storybook の build 方式に依存するので、今後使用できなくなる可能性がある
    - 修正が必要な場合は `packages/component-ui/src` 配下のディレクトリ一覧などを返すようにするのが良さそう
- `get_component_detail` - 指定されたコンポーネントの詳細情報を取得する
  - 指定されたコンポーネント名のディレクトリ配下のファイルの中身を、読みやすく整形して返している
  - 複雑なコンポーネントになるとファイル容量が多くなり、レスポンスが重くなる可能性がある

### Prompts

- `get_component_detail` - Tools の `get_component_detail` を使用する際のプロンプト
  - `get_component_list` で返されるコンポーネント名は `PascalCase` の為、 `get_component_detail` に Props として渡す値を `kebab-case` へ変換するように指示

## How to Use

Install dependencies:

```bash
npm install
```

Build the server:

```bash
npm run build
```

Setting MCP:

```json filename="~/.cursor/mcp.json"
{
  "mcpServers": {
    "zenkigen-component-mcp": {
      "command": "node",
      "args": ["[/Your/Path]/zenkigen-component/mcp-server/build/index.js"]
    }
  }
}
```

### Debugging

MCPサーバーは標準入出力（stdio）を介して通信するため、デバッグが難しい場合があります。
デバッグには、パッケージスクリプトとして利用可能な[MCP Inspector](https://github.com/modelcontextprotocol/inspector)の使用を推奨します：

```bash
npm run inspector
```

Inspectorは、ブラウザでデバッグツールにアクセスするためのURLを提供します。
