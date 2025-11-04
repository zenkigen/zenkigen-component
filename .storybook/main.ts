import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import type { StorybookConfig } from '@storybook/react-vite';
import path, { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ['../packages/**/*.stories.@(ts|tsx)', '../packages/**/*.mdx'],
  addons: [getAbsolutePath('@storybook/addon-a11y'), getAbsolutePath('@storybook/addon-docs')],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
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

    // file:// プロトコルを処理するプラグイン
    config.plugins ??= [];
    config.plugins.push({
      name: 'fix-file-protocol',
      enforce: 'pre',
      resolveId(id) {
        if (id.startsWith('file://')) {
          return id.replace('file://', '');
        }
        return null;
      },
    });

    return mergeConfig(config, {
      resolve: {
        alias: {
          src: path.resolve(__dirname, '../src'),
        },
      },
    });
  },
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
