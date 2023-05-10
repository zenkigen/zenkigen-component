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
    <div className="flex h-40 items-center justify-center">
      <Tooltip {...args} content="内容説明テキスト">
        <div className="flex h-10 w-24 items-center justify-center rounded border border-gray-400">target</div>
      </Tooltip>
    </div>
  ),
};
