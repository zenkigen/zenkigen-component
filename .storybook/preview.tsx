import React from 'react';

import type { Preview } from '@storybook/react';
import { ThemeProvider } from '../src/theme/theme-provider';
import { Reset } from 'styled-reset';
import { createTheme } from '../src/theme';

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
  decorators: [
    (Story) => (
      <ThemeProvider theme={createTheme({ space: 4 })}>
        <Reset />
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default preview;
