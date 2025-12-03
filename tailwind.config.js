import componentConfig from '@zenkigen-inc/component-config';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./packages/**/*.{ts,tsx}'],
  presets: [componentConfig],
  plugins: [],
};
