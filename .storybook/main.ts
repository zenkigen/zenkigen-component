import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import turbosnap from 'vite-plugin-turbosnap';

const config: StorybookConfig = {
  stories: ['../packages/**/*.stories.@(ts|tsx)', '../packages/**/*.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import('vite');

    if (process.env.IS_CHROMATIC === 'true') {
      config.build ??= {};
      config.build.minify = 'terser';
      config.build.terserOptions = {
        ...config.build.terserOptions,
        // eslint-disable-next-line camelcase
        keep_fnames: true,
        // eslint-disable-next-line camelcase
        mangle: { keep_fnames: true, keep_classnames: true },
      };
    }

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
