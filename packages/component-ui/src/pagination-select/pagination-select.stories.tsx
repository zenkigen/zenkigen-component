import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';

import { Heading } from '../heading';
import { Icon } from '../icon';

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

export const LayoutExample: Story = {
  args: {
    totalSize: 4000,
    currentPage: 1,
    sizePerPage: 50,
    countLabel: '件',
    pageLabel: '頁',
  },
  render: function MyFunc({ ...args }) {
    const [_, updateArgs] = useArgs();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Heading
          level={2}
          before={<Icon name="chart-bar" color="icon01" size="large" />}
          after={<Icon name="information" size="medium" />}
        >
          タイトル
        </Heading>
        <p>あいうえお、あいうえお、あいうえお、あいうえお、あいうえお、あいうえお。</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex' }}>
            <Icon name="triangle" />
            <Icon name="circle" />
            <Icon name="close" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
            結果：{args.totalSize}件
            <Icon name="triangle" />
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
          </div>
        </div>
        <div>
          {args.totalSize}件中、{(args.currentPage! - 1) * args.sizePerPage! + 1} ~{' '}
          {args.currentPage! * args.sizePerPage! > args.totalSize
            ? args.totalSize
            : args.currentPage! * args.sizePerPage!}{' '}
          をリスト表示
        </div>
      </div>
    );
  },
};
