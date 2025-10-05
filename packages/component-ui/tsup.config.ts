import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  external: ['react', 'react-dom', '@zenkigen-inc/component-icons', '@zenkigen-inc/component-theme'],
  clean: true,
  esbuildOptions: (options) => {
    options.jsx = 'automatic';
    options.jsxImportSource = 'react';
  },
});
