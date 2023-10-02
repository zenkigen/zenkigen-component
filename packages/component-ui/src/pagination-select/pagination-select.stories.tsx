import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';

import { PaginationSelect } from '.';

const meta: Meta<typeof PaginationSelect> = {
  component: PaginationSelect,
  argTypes: {
    totalSize: {
      type: 'number',
    },
    currentPage: {
      type: 'number',
    },
    countLabel: {
      type: 'string',
    },
    pageLabel: {
      type: 'string',
    },
    sizePerPage: {
      type: 'number',
    },
  },
};
export default meta;

type Story = StoryObj<typeof PaginationSelect>;

export const Base: Story = {
  args: {
    totalSize: 4000,
    currentPage: 1,
    sizePerPage: 25,
  },
  render: function MyFunc({ ...args }) {
    const [_, updateArgs] = useArgs();
    return (
      <PaginationSelect
        {...args}
        onChange={(value) => {
          updateArgs({
            currentPage: value,
          });
        }}
        onClickPrevButton={() => {
          updateArgs({
            currentPage: args.currentPage - 1,
          });
        }}
        onClickNextButton={() => {
          updateArgs({
            currentPage: args.currentPage + 1,
          });
        }}
      ></PaginationSelect>
    );
  },
};
