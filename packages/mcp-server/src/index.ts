import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { createBootstrapConfig } from './config.js';
import { COMPONENT_SPEC_TEMPLATE, listComponentSpecResources, readComponentSpec } from './resources/componentSpec.js';
import { readTokens, TOKENS_URI } from './resources/tokens.js';

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
      instructions: [
        'ZENKIGEN Component の仕様書/実装を提供する MCP サーバーです。',
        '- 仕様書データソース: docs/component/*-specification.md',
        '- 実装データソース: packages/component-ui/src/<component>/',
        '- 主なツール: get_component_list, get_component_detail（実装予定）',
        '- LOG_LEVEL と CACHE_TTL_MS でロギング/キャッシュを制御します。',
      ].join('\n'),
    },
  );

  // リソース登録: コンポーネント仕様書テンプレートと tokens
  const componentSpecTemplate = new ResourceTemplate(COMPONENT_SPEC_TEMPLATE, {
    list: async () => listComponentSpecResources(config.paths),
  });

  server.registerResource(
    'component-spec',
    componentSpecTemplate,
    {
      title: 'Component specifications',
      description: 'docs/component/*-specification.md',
      mimeType: 'text/markdown',
    },
    async (uri, variables) => readComponentSpec(uri, variables, config.paths),
  );

  server.registerResource(
    'design-tokens',
    TOKENS_URI,
    {
      title: 'Design tokens (TypeScript)',
      description: 'packages/component-config/src/tokens/tokens.ts',
      mimeType: 'application/typescript',
    },
    async () => readTokens(config.paths),
  );

  const transport = new StdioServerTransport();
  // eslint-disable-next-line no-console
  console.log(
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
