import fs from 'node:fs';
import path from 'node:path';

import type { Variables } from '@modelcontextprotocol/sdk/shared/uriTemplate.js';
import type { ListResourcesResult, ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import fg from 'fast-glob';

import type { RepoPaths } from '../config.js';
import { parseComponentName } from '../utils/componentName.js';

export const COMPONENT_SPECIFICATION_SUFFIX = '-specification.md';
export const COMPONENT_SPECIFICATION_TEMPLATE = 'zenkigen://component-specification/{name}';

export async function listComponentSpecificationResources(paths: RepoPaths): Promise<ListResourcesResult> {
  const componentDocsDir = path.join(paths.docsDir, 'component');
  const files = await fg(`*${COMPONENT_SPECIFICATION_SUFFIX}`, { cwd: componentDocsDir, onlyFiles: true });

  // docs 以下の仕様書を Resource 一覧に変換する
  const resources = files
    .map((file) => file.replace(/\\/g, '/'))
    .map((file) => {
      const base = file.endsWith(COMPONENT_SPECIFICATION_SUFFIX)
        ? file.slice(0, -COMPONENT_SPECIFICATION_SUFFIX.length)
        : file.replace(/\.md$/, '');
      const name = parseComponentName(base);

      return {
        uri: `zenkigen://component-specification/${name}`,
        name,
        description: `Component specification for ${name}`,
        mimeType: 'text/markdown',
      };
    });

  return { resources };
}

export async function readComponentSpecification(
  uri: URL,
  variables: Variables,
  paths: RepoPaths,
): Promise<ReadResourceResult> {
  const rawName = Array.isArray(variables.name) ? (variables.name[0] ?? '') : (variables.name ?? '');
  const name = parseComponentName(rawName);
  const specPath = path.join(paths.docsDir, 'component', `${name}${COMPONENT_SPECIFICATION_SUFFIX}`);
  const text = await fs.promises.readFile(specPath, 'utf8');

  return {
    contents: [
      {
        uri: uri.toString(),
        text,
        mimeType: 'text/markdown',
      },
    ],
  };
}
