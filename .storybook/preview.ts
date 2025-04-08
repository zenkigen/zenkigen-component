import './globals.css';

import AXE_LOCALE_JA from 'axe-core/locales/ja.json';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    a11y: {
      config: {
        locale: AXE_LOCALE_JA,
      },
    },
  },
  tags: ['autodocs'],
};
export default preview;
