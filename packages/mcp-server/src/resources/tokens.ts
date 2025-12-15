import fs from 'node:fs';

import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';

import type { RepoPaths } from '../config.js';

export const TOKENS_URI = 'zenkigen://tokens/tokens.ts';

export async function readTokens(paths: RepoPaths): Promise<ReadResourceResult> {
  const text = await fs.promises.readFile(paths.tokensPath, 'utf8');

  return {
    contents: [
      {
        uri: TOKENS_URI,
        text,
        mimeType: 'application/typescript',
      },
    ],
  };
}
