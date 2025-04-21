import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

// Create an MCP server
const server = new McpServer({
  name: 'ZENKIGEN Component MCP Server',
  version: '1.0.0',
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

// コンポーネント一覧を取得するツール
server.tool('get_component_list', 'ZENKIGEN Component (ZDC) のコンポーネント一覧を取得する', {}, async () => {
  // Storybook で build された静的ファイルを読み込む
  const componentsData = fs.readFileSync(path.join(rootDir, 'storybook-static/index.json'));
  const components = JSON.parse(componentsData.toString());

  // components の entries の中から title を取得する
  const componentNames = Object.keys(components.entries);
  const componentList = componentNames.map((name) =>
    components.entries[name].title.replace('Components/', '').replace('Tokens/Typography', ''),
  );

  // componentList の重複排除
  const uniqueComponentList = [...new Set(componentList)];

  return {
    content: [{ type: 'text' as const, text: uniqueComponentList.join('\n') }],
  };
});

// コンポーネントの詳細を取得するツール
server.tool(
  'get_component_detail',
  '指定された ZENKIGEN Component (ZDC) のコンポーネント詳細情報を取得する',
  { name: z.string() },
  async ({ name }) => {
    const componentName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    // コンポーネントが実装されているファイルを取得する
    const componentsDir = path.join(rootDir, 'packages/component-ui/src');
    const componentPath = path.join(componentsDir, componentName);

    try {
      // コンポーネントディレクトリの存在確認
      await fs.promises.access(componentPath);

      // ディレクトリ内のファイル一覧取得
      const files = await fs.promises.readdir(componentPath);

      // 各ファイルの内容読み込み
      const fileContents: Record<string, string> = {};
      for (const file of files) {
        const filePath = path.join(componentPath, file);
        try {
          const content = await fs.promises.readFile(filePath, 'utf-8');
          fileContents[file] = content;
        } catch (error) {
          if (error instanceof Error) {
            fileContents[file] = `Error reading file: ${error.message}`;
          } else {
            fileContents[file] = 'Error reading file: Unknown error';
          }
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: [
              `Component: ${componentName}`,
              `Directory: ${componentPath}`,
              `\nFiles:\n${files.join('\n')}\n`,
              `File contents:\n`,
              ...Object.entries(fileContents).map(([filename, content]) => `=== ${filename} ===\n${content}\n`),
            ].join('\n'),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Component "${componentName}" not found. Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
      };
    }
  },
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
