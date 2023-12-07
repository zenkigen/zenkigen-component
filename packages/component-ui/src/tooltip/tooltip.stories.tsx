import { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from './tooltip';

const meta: Meta<typeof Tooltip> = {
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

export const Base: Story = {
  render: ({ ...args }) => (
    <div className="grid gap-10 px-20 py-10">
      <div className="flex items-center gap-20">
        <Tooltip {...args} content="内容説明テキストテキスト" verticalPosition="top" horizontalAlign="right">
          <div className="flex h-10 w-24 items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
        <Tooltip {...args} content="内容説明テキストテキスト" verticalPosition="top" horizontalAlign="center">
          <div className="flex h-10 w-24 items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
        <Tooltip {...args} content="内容説明テキストテキスト" verticalPosition="top" horizontalAlign="left">
          <div className="flex h-10 w-24 items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
      </div>
      <div className="flex items-center gap-20">
        <Tooltip {...args} content="内容説明テキストテキスト" verticalPosition="bottom" horizontalAlign="right">
          <div className="flex h-10 w-24 items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
        <Tooltip {...args} content="内容説明テキストテキスト" verticalPosition="bottom" horizontalAlign="center">
          <div className="flex h-10 w-24 items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
        <Tooltip {...args} content="内容説明テキストテキスト" verticalPosition="bottom" horizontalAlign="left">
          <div className="flex h-10 w-24 items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
      </div>
      <div className="flex items-center gap-20">
        <Tooltip
          {...args}
          size="medium"
          content="内容説明テキストテキスト"
          verticalPosition="top"
          horizontalAlign="right"
        >
          <div className="flex h-10 w-24 items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
        <Tooltip
          {...args}
          size="medium"
          content="内容説明テキストテキスト"
          verticalPosition="top"
          horizontalAlign="center"
        >
          <div className="flex h-10 w-24 items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
        <Tooltip
          {...args}
          size="medium"
          content="内容説明テキストテキスト"
          verticalPosition="top"
          horizontalAlign="left"
        >
          <div className="flex h-10 w-24 items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
      </div>
      <div className="flex items-center gap-20">
        <Tooltip
          {...args}
          size="medium"
          content="内容説明テキストテキスト"
          verticalPosition="bottom"
          horizontalAlign="right"
        >
          <div className="flex h-10 w-24 items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
        <Tooltip
          {...args}
          size="medium"
          content="内容説明テキストテキスト"
          verticalPosition="bottom"
          horizontalAlign="center"
        >
          <div className="flex h-10 w-24 items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
        <Tooltip
          {...args}
          size="medium"
          content="内容説明テキストテキスト"
          verticalPosition="bottom"
          horizontalAlign="left"
        >
          <div className="flex h-10 w-24 items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
      </div>
      <div className="flex items-center gap-20">
        <Tooltip {...args} size="medium" content="内容説明テキスト" verticalPosition="bottom" horizontalAlign="right">
          <div className="flex h-10 w-[260px] items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
        <Tooltip {...args} size="medium" content="内容説明テキスト" verticalPosition="bottom" horizontalAlign="center">
          <div className="flex h-10 w-[260px] items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
        <Tooltip {...args} size="medium" content="内容説明テキスト" verticalPosition="bottom" horizontalAlign="left">
          <div className="flex h-10 w-[260px] items-center justify-center rounded border border-gray-400">target</div>
        </Tooltip>
      </div>
    </div>
  ),
};
