import './globals.css';

import type { Preview } from '@storybook/react-vite';
import axe from 'axe-core';
import AXE_LOCALE_JA from 'axe-core/locales/ja.json';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).React = React;

// axe の日本語ロケールは parameters（a11y.config.locale）に入れず、axe.configure に差し込む。
// - parameters はグローバル設定が全 Story に複製され、Chromatic の Story 抽出時に 1 Story あたり
//   約 36KB（ロケール JSON 全体）ずつ送信データが膨らみ、上限（entity-too-large）を超えるため
// - addon-a11y はチェックのたびに axe.reset() → axe.configure(parameters.a11y.config) を呼ぶため、
//   一度だけ configure しても消える。configure を包んで毎回ロケールを足す
// addon-a11y の実装が変わってこの差し込みが効かなくなった場合は、英語表示に戻るだけで動作は壊れない。
const configureAxe = axe.configure.bind(axe);
Object.assign(axe, {
  configure: (spec: Parameters<typeof axe.configure>[0]) => configureAxe({ locale: AXE_LOCALE_JA, ...spec }),
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Tokens', 'Components', 'Layout'],
      },
    },
  },
  tags: ['autodocs'],
};
export default preview;
