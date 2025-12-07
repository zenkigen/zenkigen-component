import fs from 'node:fs';
import path from 'node:path';

import fg from 'fast-glob';

import type { RepoPaths } from '../config.js';
import { parseComponentName } from '../utils/componentName.js';

type TextToolResponse = {
  content: [{ type: 'text'; text: string }];
};

const SPEC_SUFFIX = '-specification.md';
const DEFAULT_LIMIT = 5;
const EXCERPT_MAX_LENGTH = 200;

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// テキスト全体からクエリのヒット数と最初のインデックスを取得
function countMatches(content: string, query: string): { count: number; firstIndex: number } {
  const regex = new RegExp(escapeRegex(query), 'gi');
  const firstMatch = regex.exec(content);
  if (!firstMatch) {
    return { count: 0, firstIndex: -1 };
  }

  let count = 0;
  const firstIndex = firstMatch.index;
  let match: RegExpExecArray | null = firstMatch;
  while (match !== null) {
    count += 1;
    match = regex.exec(content);
  }

  return { count, firstIndex };
}

// マッチ位置の周辺テキストを抜粋として整形
function buildExcerpt(content: string, index: number, length: number): string {
  if (index < 0) {
    return '';
  }

  const start = Math.max(0, index - 60);
  const end = Math.min(content.length, index + length + 140);
  const raw = content.slice(start, end).replace(/\s+/g, ' ').trim();

  if (raw.length > EXCERPT_MAX_LENGTH) {
    return `${raw.slice(0, EXCERPT_MAX_LENGTH - 1)}…`;
  }

  return raw;
}

export async function searchComponentSpecifications(
  paths: RepoPaths,
  query: string,
  limit: number = DEFAULT_LIMIT,
): Promise<TextToolResponse> {
  const normalizedQuery = query.trim();
  if (normalizedQuery === '') {
    return {
      content: [{ type: 'text', text: 'Query is empty. Enter a keyword to search specifications.' }],
    };
  }

  const componentDocsDir = path.join(paths.docsDir, 'component');
  const files = await fg(`*${SPEC_SUFFIX}`, { cwd: componentDocsDir, onlyFiles: true });

  const results = await Promise.all(
    files.map(async (file) => {
      const safeName = file.replace(/\\/g, '/');
      const base = safeName.endsWith(SPEC_SUFFIX)
        ? safeName.slice(0, -SPEC_SUFFIX.length)
        : safeName.replace(/\.md$/, '');
      const name = parseComponentName(base);

      const fullPath = path.join(componentDocsDir, file);
      try {
        const content = await fs.promises.readFile(fullPath, 'utf8');
        const { count, firstIndex } = countMatches(content, normalizedQuery);
        if (count === 0) {
          return null;
        }

        const excerpt = buildExcerpt(content, firstIndex, normalizedQuery.length);

        return { name, count, excerpt };
      } catch (error) {
        const message = error instanceof Error ? error.message : 'unknown error';

        return { name, count: 0, excerpt: `Error reading spec: ${message}` };
      }
    }),
  );

  const filtered = results.filter(
    (item): item is { name: string; count: number; excerpt: string } =>
      item !== null && typeof item.count === 'number' && item.count > 0,
  );
  const sorted = filtered.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)).slice(0, limit);

  if (sorted.length === 0) {
    return {
      content: [{ type: 'text', text: 'No matches found in component specifications.' }],
    };
  }

  const escapeCell = (value: string) => value.replace(/\|/g, '\\|');
  const rows = sorted.map(({ name, count, excerpt }) => `| ${escapeCell(name)} | ${count} | ${escapeCell(excerpt)} |`);
  const tableLines = [
    `Query: "${normalizedQuery}"`,
    '',
    '| name | hits | excerpt |',
    '| ---- | ---- | ------- |',
    ...rows,
  ];

  return {
    content: [{ type: 'text', text: tableLines.join('\n') }],
  };
}
