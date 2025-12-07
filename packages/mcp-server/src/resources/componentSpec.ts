import fs from 'node:fs';
import path from 'node:path';

import fg from 'fast-glob';
import type { Variables } from '@modelcontextprotocol/sdk/shared/uriTemplate.js';
import type { ListResourcesResult, ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';

import type { RepoPaths } from '../config.js';

export const COMPONENT_SPEC_SUFFIX = '-specification.md';
export const COMPONENT_SPEC_TEMPLATE = 'zenkigen://component-spec/{name}';

function normalizeComponentName(input: string): string {
  const kebab = input
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-z0-9-]/gi, '-')
    .toLowerCase();

  return kebab.replace(/--+/g, '-').replace(/^-|-$/g, '');
}

function ensureSafeComponentName(input: string): string {
  const normalized = normalizeComponentName(input);
  if (!normalized || !/^[a-z0-9-]+$/.test(normalized)) {
    throw new Error('Invalid component name');
  }

  return normalized;
}

export async function listComponentSpecResources(paths: RepoPaths): Promise<ListResourcesResult> {
  const componentDocsDir = path.join(paths.docsDir, 'component');
  const files = await fg(`*${COMPONENT_SPEC_SUFFIX}`, { cwd: componentDocsDir, onlyFiles: true });

  const resources = files
    .map((file) => file.replace(/\\/g, '/'))
    .map((file) => {
      const base = file.endsWith(COMPONENT_SPEC_SUFFIX)
        ? file.slice(0, -COMPONENT_SPEC_SUFFIX.length)
        : file.replace(/\.md$/, '');
      const name = ensureSafeComponentName(base);

      return {
        uri: `zenkigen://component-spec/${name}`,
        name,
        description: `Component specification for ${name}`,
        mimeType: 'text/markdown',
      };
    });

  return { resources };
}

export async function readComponentSpec(
  uri: URL,
  variables: Variables,
  paths: RepoPaths,
): Promise<ReadResourceResult> {
  const rawName = Array.isArray(variables.name) ? variables.name[0] ?? '' : variables.name ?? '';
  const name = ensureSafeComponentName(rawName);
  const specPath = path.join(paths.docsDir, 'component', `${name}${COMPONENT_SPEC_SUFFIX}`);
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
