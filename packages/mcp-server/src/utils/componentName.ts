import path from 'node:path';

import { z } from 'zod';

const rawNameSchema = z.string().trim().min(1);
const kebabNameSchema = z.string().regex(/^[a-z0-9-]+$/, 'only a-z, 0-9, hyphen are allowed');

function toKebab(input: string): string {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-z0-9-]/gi, '-')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

/**
 * Normalize component name to kebab-case and validate characters.
 * - Trims input
 * - Strips path segments via basename
 * - Converts Camel/Pascal to kebab
 * - Allows only [a-z0-9-] in the final form
 */
export function parseComponentName(input: string): string {
  const trimmed = rawNameSchema.parse(input);
  const basename = path.basename(trimmed);
  const kebab = toKebab(basename);

  return kebabNameSchema.parse(kebab);
}
