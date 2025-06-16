import './globals.css';

import type { Preview } from '@storybook/react';
import AXE_LOCALE_JA from 'axe-core/locales/ja.json';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).React = React;

const preview: Preview = {
  parameters: {
    chromatic: {
      diffThreshold: 0.063,
    },
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
