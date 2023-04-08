import type { StorybookViteConfig } from '@storybook/builder-vite';
import { mergeConfig } from 'vite';
import path from 'path';
const config: StorybookViteConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  core: {},
  features: {
    storyStoreV7: true
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          src: path.resolve(__dirname, '../src')
        }
      }
    });
  }
};
export default config;
export const framework = '@storybook/react';