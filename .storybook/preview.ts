import './globals.css';

import type { Preview } from '@storybook/react';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).React = React;

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  tags: ['autodocs'],
};
export default preview;
