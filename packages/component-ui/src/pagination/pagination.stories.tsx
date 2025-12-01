import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { Pagination } from './pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
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

function RenderWithArgs({ ...args }: Parameters<NonNullable<Story['render']>>[0]) {
  const [, updateArgs] = useArgs();

  return (
    <Pagination
      {...args}
      onClick={(value) => {
        updateArgs({
          currentPage: value,
        });
      }}
    />
  );
}

export const Base: Story = {
  args: {
    currentPage: 1,
    totalPage: 200,
    sideNumPagesToShow: 4,
  },
  render: RenderWithArgs,
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPage: 1,
    sideNumPagesToShow: 3,
  },
  render: RenderWithArgs,
};

export const FewPagesWithLargeSide: Story = {
  args: {
    currentPage: 1,
    totalPage: 3,
    sideNumPagesToShow: 5,
  },
  render: RenderWithArgs,
};
