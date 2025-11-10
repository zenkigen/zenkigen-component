import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  external: ['react'],
  clean: true,
  esbuildOptions: (options) => {
    options.jsx = 'automatic';
    options.jsxImportSource = 'react';
  },
});
