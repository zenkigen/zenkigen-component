import fs from 'node:fs';
import path from 'node:path';

import fg from 'fast-glob';

import type { RepoPaths } from '../config.js';
import { parseComponentName } from '../utils/componentName.js';

type TextToolResponse = {
  content: [{ type: 'text'; text: string }];
};

const SUMMARY_MAX_LENGTH = 200;

function normalizeTitle(title?: string): string | undefined {
  if (title == null || title === '') {
    return;
  }

  // 末尾の「コンポーネント仕様書」「コンポーネント仕様」を取り除いて利用者向けの名称だけにする
  return title.replace(/コンポーネント仕様書?$/, '').trim();
}

function normalizeSummary(text?: string): string | undefined {
  const trimmed = text?.replace(/\s+/g, ' ').trim();
  if (trimmed == null || trimmed === '') {
    return;
  }

  if (trimmed.length > SUMMARY_MAX_LENGTH) {
    return `${trimmed.slice(0, SUMMARY_MAX_LENGTH - 1)}…`;
  }

  return trimmed;
}

function parseTitleAndSummary(content: string): { title?: string; summary?: string } {
  const lines = content.split(/\r?\n/);
  const titleLine = lines.find((line) => line.trim().startsWith('# '));

  const overviewIndex = lines.findIndex((line) => /^##\s*概要/.test(line.trim()));
  let summaryText: string | undefined;

  // 優先: 「概要」セクション配下を 1 本のテキストとしてまとめる
  if (overviewIndex >= 0) {
    const overviewLines: string[] = [];
    for (const line of lines.slice(overviewIndex + 1)) {
      if (/^##\s/.test(line) || /^#\s/.test(line)) break;
      overviewLines.push(line);
    }
    summaryText = overviewLines.join(' ');
  }

  // 次点: 先頭の段落（見出しを除く最初の非空段落）
  if (summaryText == null || summaryText === '') {
    const firstParagraph: string[] = [];
    let hasStarted = false;
    for (const line of lines) {
      if (line.trim().startsWith('#')) continue;
      if (!hasStarted && line.trim() === '') continue;
      if (line.trim() === '') break;
      hasStarted = true;
      firstParagraph.push(line);
    }
    const paragraph = firstParagraph.join(' ');
    summaryText = paragraph;
  }

  const summary = normalizeSummary(summaryText);

  const rawTitle = titleLine?.replace(/^#\s*/, '').trim();
  const title = normalizeTitle(rawTitle);

  return { title, summary };
}

export async function getComponentList(paths: RepoPaths): Promise<TextToolResponse> {
  const componentDocsDir = path.join(paths.docsDir, 'component');
  const files = await fg(`*${'-specification.md'}`, { cwd: componentDocsDir, onlyFiles: true });

  const entries = await Promise.all(
    files.map(async (file) => {
      const safeName = file.replace(/\\/g, '/');
      const base = safeName.endsWith('-specification.md')
        ? safeName.slice(0, -'-specification.md'.length)
        : safeName.replace(/\.md$/, '');
      const name = parseComponentName(base);

      const fullPath = path.join(componentDocsDir, file);
      let meta: { title?: string; summary?: string } = {};
      try {
        const content = await fs.promises.readFile(fullPath, 'utf8');
        meta = parseTitleAndSummary(content);
      } catch {
        // タイトル取得に失敗しても一覧生成は続行
      }

      return { name, ...meta };
    }),
  );

  const unique = Array.from(
    new Map(
      entries.map((entry) => [
        entry.name,
        {
          summary: entry.summary,
        },
      ]),
    ).entries(),
  ).map(([name, meta]) => ({ name, ...meta }));

  const escapeCell = (value: string | undefined) => (value ?? '').replace(/\|/g, '\\|');

  const rows = unique.map(({ name, summary }) => `| ${escapeCell(name)} | ${escapeCell(summary)} |`);
  const tableLines = [
    '以下の name を get_component_specification の引数に渡すと仕様書全文を取得できます。',
    '',
    '| name | summary |',
    '| ---- | ------- |',
    ...rows,
  ];

  if (rows.length === 0) {
    return {
      content: [{ type: 'text', text: 'No component specifications found.' }],
    };
  }

  return {
    content: [{ type: 'text', text: tableLines.join('\n') }],
  };
}
