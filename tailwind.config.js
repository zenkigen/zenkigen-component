import componentConfig from '@zenkigen-inc/component-config';

/** @type {import('tailwindcss').Config} */
module.exports = {
  // pnpm は各パッケージの下にも node_modules を作るため、packages/** だと依存パッケージの
  // .ts（型定義など）まで走査してしまう。対象をソースに限る。
  content: ['./packages/*/src/**/*.{ts,tsx}'],
  presets: [componentConfig],
  plugins: [],
};
