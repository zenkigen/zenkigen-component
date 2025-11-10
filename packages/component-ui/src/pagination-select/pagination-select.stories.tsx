import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { PaginationSelect } from '.';

const meta: Meta<typeof PaginationSelect> = {
  title: 'Components/PaginationSelect',
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

export const Empty: Story = {
  args: {
    totalSize: 0,
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
