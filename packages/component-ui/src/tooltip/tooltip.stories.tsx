import type { Meta, StoryObj } from '@storybook/react';

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
