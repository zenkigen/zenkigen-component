import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Tooltip } from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    size: {
      options: ['small', 'medium'],
      control: 'select',
    },
    verticalPosition: {
      options: ['top', 'bottom'],
      control: 'select',
    },
    horizontalAlign: {
      options: ['left', 'center', 'right'],
      control: 'select',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Component: Story = {
  args: {
    size: 'small',
    content: (
      <>
        内容説明テキスト1
        <br />
        内容説明テキスト2
      </>
    ),
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: (args) => (
    <div className="grid gap-10 px-20 py-10">
      <div className="flex items-center gap-20">
        <Tooltip {...args}>
          <div className="flex h-10 w-[240px] items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
      </div>
    </div>
  ),
};

export const Base: Story = {
  args: {
    content: (
      <>
        内容説明テキスト1
        <br />
        内容説明テキスト2
      </>
    ),
  },
  render: (args) => (
    <div className="grid gap-10 px-20 py-10">
      <div className="flex items-center gap-20">
        <Tooltip {...args}>
          <div className="flex h-10 w-24 items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
      </div>
      <div className="flex items-center gap-20">
        <Tooltip {...args}>
          <div className="flex h-10 w-[240px] items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
      </div>
    </div>
  ),
};

export const Portal: Story = {
  args: {
    portalTarget: document.body,
    content: '内容説明テキスト',
  },
  render: (args) => (
    <div className="grid gap-10 px-20 py-10">
      <div className="flex items-center gap-20">
        <Tooltip {...args}>
          <div className="flex h-10 w-24 items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
      </div>
      <div className="flex items-center gap-20">
        <Tooltip {...args}>
          <div className="flex h-10 w-[240px] items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
      </div>
    </div>
  ),
};

/**
 * `portalTarget` 指定時に、内部スクロール可能なコンテナ内で target 位置が変化した場合でも、
 * ホバー時に正しい位置に Tooltip が表示されることを確認する再現用ストーリー。
 *
 * 確認手順:
 * 1. 内側の灰色コンテナをスクロール
 * 2. target にホバーする
 * 3. Tooltip が target の直上（または直下）に表示されればOK
 */
export const PortalWithInnerScroll: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: () => (
    <div className="px-20 py-10">
      <p className="typography-body14regular mb-2 text-text02">
        内側のコンテナをスクロールしてから target にホバーしてください。
      </p>
      <div className="h-[300px] w-[400px] overflow-y-auto border border-uiBorder01">
        <div className="h-[200px] bg-uiBackground02" />
        <div className="flex items-center justify-center p-4">
          <Tooltip content="内容説明テキスト" portalTarget={document.body} verticalPosition="top">
            <div className="flex h-10 w-[240px] items-center justify-center rounded border border-gray-400">target</div>
          </Tooltip>
        </div>
        <div className="h-[600px] bg-uiBackground02" />
      </div>
    </div>
  ),
};

/**
 * `portalTarget` 指定時に、親コンテナ幅が動的に変化した場合でも、
 * ホバー時に正しい位置に Tooltip が表示されることを確認する再現用ストーリー。
 *
 * harutaka-workspace でドロワー開閉により table 幅が変わる挙動を簡易再現したもの。
 *
 * 確認手順:
 * 1. トグルボタンで親コンテナの幅を変更
 * 2. target にホバーする
 * 3. Tooltip が target の直上に表示されればOK
 */
export const PortalWithLayoutShift: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: function Render() {
    const [isWide, setIsWide] = useState(false);

    return (
      <div className="px-20 py-10">
        <p className="typography-body14regular mb-2 text-text02">
          ボタンで幅を切り替えてから target にホバーしてください。
        </p>
        <button
          type="button"
          onClick={() => setIsWide((prev) => !prev)}
          className="mb-4 rounded border border-uiBorder02 px-3 py-1 text-text01"
        >
          幅を切り替える（現在: {isWide ? 'wide' : 'narrow'}）
        </button>
        <div style={{ width: isWide ? 600 : 300 }} className="border border-uiBorder01 p-4">
          <Tooltip content="内容説明テキスト" portalTarget={document.body} verticalPosition="top">
            <div className="flex h-10 w-full items-center justify-center rounded border border-gray-400">target</div>
          </Tooltip>
        </div>
      </div>
    );
  },
};
