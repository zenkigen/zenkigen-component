import fs from 'node:fs';
import path from 'node:path';

import type { RepoPaths } from '../config.js';
import { parseComponentName } from '../utils/componentName.js';

type TextToolResponse = {
  content: [{ type: 'text'; text: string }];
};

const SPEC_SUFFIX = '-specification.md';

export async function getComponentSpecification(paths: RepoPaths, rawName: string): Promise<TextToolResponse> {
  const component = parseComponentName(rawName);
  const specPath = path.join(paths.docsDir, 'component', `${component}${SPEC_SUFFIX}`);

  try {
    // 仕様書本文だけを返す（エラー時はパス付きのメッセージ）
    const text = await fs.promises.readFile(specPath, 'utf8');

    return {
      content: [{ type: 'text', text }],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return {
      content: [{ type: 'text', text: `Spec not found at ${specPath} (${message})` }],
    };
  }
}
