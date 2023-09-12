import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';

import { Heading } from '../heading';
import { Icon } from '../icon';

import { PaginationSelect } from '.';

const meta: Meta<typeof PaginationSelect> = {
  component: PaginationSelect,
  argTypes: {
    total: {
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
    pageLimit: {
      type: 'number',
    },
  },
};
export default meta;

type Story = StoryObj<typeof PaginationSelect>;

export const Base: Story = {
  args: {
    total: 4000,
    currentPage: 1,
    pageLimit: 25,
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
      ></PaginationSelect>
    );
  },
};

export const LayoutExample: Story = {
  args: {
    total: 4000,
    currentPage: 1,
    pageLimit: 50,
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
            結果：{args.total}件
            <Icon name="triangle" />
            <PaginationSelect
              {...args}
              onChange={(value) => {
                updateArgs({
                  currentPage: value,
                });
              }}
            ></PaginationSelect>
          </div>
        </div>
        <div>
          {args.total}件中、{(args.currentPage! - 1) * args.pageLimit! + 1} ~{' '}
          {args.currentPage! * args.pageLimit! > args.total ? args.total : args.currentPage! * args.pageLimit!}{' '}
          をリスト表示
        </div>
      </div>
    );
  },
};
