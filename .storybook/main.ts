import { mergeConfig } from 'vite';
import path from 'path';
import turbosnap from 'vite-plugin-turbosnap';

const config = {
  stories: ['../packages/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-actions',
    '@storybook/addon-styling',
  ],
  framework: {
    name: '@storybook/react-vite',
  },
  features: {
    storyStoreV7: true,
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [turbosnap({ rootDir: config.root ?? process.cwd() })],
      resolve: {
        alias: {
          src: path.resolve(__dirname, '../src'),
        },
      },
    });
  },
};
export default config;
export const framework = '@storybook/react';
