import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';

import { Pagination } from './pagination';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  argTypes: {
    count: {
      type: 'number',
    },
    current: {
      type: 'number',
    },
    total: {
      type: 'number',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Base: Story = {
  args: {
    current: 1,
    total: 20,
    count: 8,
  },
  render: function MyFunc({ ...args }) {
    const [_, updateArgs] = useArgs();
    return (
      <Pagination
        {...args}
        onClick={(value) => {
          updateArgs({
            current: value,
          });
        }}
      ></Pagination>
    );
  },
};

export const LayoutExample: Story = {
  args: {
    current: 1,
    total: 20,
    count: 8,
  },
  render: function MyFunc({ ...args }) {
    const [_, updateArgs] = useArgs();
    return (
      <div style={{ display: 'flex', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <Pagination
          {...args}
          onClick={(value) => {
            updateArgs({
              current: value,
            });
          }}
        ></Pagination>
      </div>
    );
  },
};
