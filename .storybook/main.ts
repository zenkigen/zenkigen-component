import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import turbosnap from 'vite-plugin-turbosnap';

const config: StorybookConfig = {
  stories: ['../packages/**/*.stories.@(ts|tsx)', '../packages/**/*.mdx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-actions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import('vite');

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
