import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from './pagination';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  argTypes: {
    sideNumPagesToShow: {
      type: 'number',
    },
    currentPage: {
      type: 'number',
    },
    totalPage: {
      type: 'number',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Base: Story = {
  args: {
    currentPage: 1,
    totalPage: 20,
    sideNumPagesToShow: 4,
  },
  render: function MyFunc({ ...args }) {
    const [_, updateArgs] = useArgs();

    return (
      <Pagination
        {...args}
        onClick={(value) => {
          updateArgs({
            currentPage: value,
          });
        }}
      ></Pagination>
    );
  },
};
