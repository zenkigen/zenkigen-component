import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import { createBootstrapConfig } from './config.js';
import {
  COMPONENT_SPECIFICATION_TEMPLATE,
  listComponentSpecificationResources,
  readComponentSpecification,
} from './resources/componentSpecification.js';
import { getComponentList } from './tools/getComponentList.js';
import { getComponentSpecification } from './tools/getComponentSpecification.js';
import { searchComponentSpecifications } from './tools/searchComponentSpecifications.js';

export async function main(): Promise<void> {
  const config = createBootstrapConfig();
  const server = new McpServer(
    {
      name: config.serverName,
      version: config.serverVersion,
      title: 'ZENKIGEN Component MCP',
    },
    {
      capabilities: {
        tools: { listChanged: true },
        resources: { listChanged: true },
        logging: {},
        experimental: {
          repository: {
            root: config.paths.repoRoot,
            docs: config.paths.docsDir,
            componentDocsGlob: config.paths.componentDocsGlob,
            tokensPath: config.paths.tokensPath,
            iconsDir: config.paths.iconsDir,
          },
          server: {
            logLevel: config.logLevel,
            cacheTtlMs: config.cacheTtlMs,
          },
        },
      },
      instructions: ['ZENKIGEN Component の仕様書/実装を提供する MCP サーバーです。'].join('\n'),
    },
  );

  // リソース登録: コンポーネント仕様書テンプレートと tokens
  const componentSpecificationTemplate = new ResourceTemplate(COMPONENT_SPECIFICATION_TEMPLATE, {
    list: async () => listComponentSpecificationResources(config.paths),
  });

  server.registerResource(
    'component-specification',
    componentSpecificationTemplate,
    {
      title: 'Component specifications',
      description: 'ZENKIGEN Component の仕様書リソースを提供します。',
      mimeType: 'text/markdown',
    },
    async (uri, variables) => readComponentSpecification(uri, variables, config.paths),
  );

  // 型計算が深くなりすぎないように、シンプルなラッパー経由でツールを登録する
  // SDK 側のジェネリクス推論を避けて、意図したスキーマ・ハンドラだけを渡す
  const registerTool = (
    name: string,
    config: { title?: string; description?: string; inputSchema?: unknown; outputSchema?: unknown },
    cb: (args?: unknown) => Promise<unknown> | unknown,
  ) => server.registerTool(name, config as never, cb as never);

  // ツール登録: コンポーネント一覧（仕様書ベース）
  registerTool(
    'get_component_list',
    {
      title: 'List components',
      description:
        '利用可能なコンポーネントの名前・概要を一覧表示します。name を get_component_specification の引数に渡すと仕様書全文を取得できます。',
    },
    async () => getComponentList(config.paths),
  );
  registerTool(
    'get_component_specification',
    {
      title: 'Get component specification',
      description: '指定された ZENKIGEN Component の仕様書全文を返します。',
      inputSchema: z.object({ name: z.string() }),
    },
    async (args) => {
      const { name } = (args as { name: string }) ?? { name: '' };

      return getComponentSpecification(config.paths, name);
    },
  );
  registerTool(
    'search_component_specifications',
    {
      title: 'Search component specifications',
      description: '仕様書を横断検索し、ヒット件数と抜粋を返します（デフォルト上限 5 件）。',
      inputSchema: z.object({
        query: z.string().min(1, { message: 'query is required' }),
        limit: z.number().int().min(1).max(50).optional(),
      }),
    },
    async (args) => {
      const { query, limit } = (args as { query: string; limit?: number }) ?? { query: '', limit: 0 };

      return searchComponentSpecifications(config.paths, query, limit);
    },
  );

  const transport = new StdioServerTransport();
  // eslint-disable-next-line no-console
  console.error(
    JSON.stringify(
      {
        message: 'MCP server starting',
        server: {
          name: config.serverName,
          version: config.serverVersion,
        },
        logLevel: config.logLevel,
        cacheTtlMs: config.cacheTtlMs,
        paths: config.paths,
      },
      null,
      2,
    ),
  );

  await server.connect(transport);
}

const isMainModule =
  typeof process.argv[1] === 'string' && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMainModule) {
  void main();
}
