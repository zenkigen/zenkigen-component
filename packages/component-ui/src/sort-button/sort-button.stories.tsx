import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

import { Button } from '../button';
import { Table } from '../table';
import { SortButton } from './sort-button';
import type { SortOrder } from './type';

const meta: Meta<typeof SortButton> = {
  title: 'Components/SortButton',
  component: SortButton,
  parameters: {
    docs: {
      source: {
        code: ``,
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'ラベル',
    },
    size: {
      control: { type: 'radio' },
      options: ['x-small', 'small', 'medium', 'large'],
      description: 'サイズ',
    },
    sortOrder: {
      control: { type: 'radio' },
      options: [null, 'ascend', 'descend'],
      description: 'ソート順序',
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: '無効化',
    },
    width: {
      control: { type: 'text' },
      description: '幅',
    },
    'aria-label': { control: 'text', description: 'このボタンの説明' },
    onClick: {
      control: false,
      description: 'クリックイベント',
    },
  },
};
export default meta;
type Story = StoryObj<typeof SortButton>;

const ComponentRender = (args: React.ComponentProps<typeof SortButton>) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>(args.sortOrder || null);

  const handleClick = useCallback(() => {
    if (sortOrder === null) {
      setSortOrder('descend');
    } else if (sortOrder === 'descend') {
      setSortOrder('ascend');
    } else {
      setSortOrder('descend');
    }
    args.onClick?.();
  }, [sortOrder, args]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <SortButton
          {...args}
          sortOrder={sortOrder}
          onClick={handleClick}
          aria-label={`項目A ${sortOrder === null ? 'ソートなし' : sortOrder === 'ascend' ? '昇順' : '降順'}`}
        />
      </div>
      <hr />
      <div>
        {sortOrder === 'ascend' && <p>昇順 - ascend</p>}
        {sortOrder === 'descend' && <p>降順 - descend</p>}
        {sortOrder === null && <p>ソートなし - null</p>}
      </div>
      <div className="flex gap-2">
        <Button onClick={() => setSortOrder(null)} isDisabled={sortOrder === null}>
          ソートなし
        </Button>
        <Button onClick={() => setSortOrder('descend')} isDisabled={sortOrder === 'descend'}>
          降順
        </Button>
        <Button onClick={() => setSortOrder('ascend')} isDisabled={sortOrder === 'ascend'}>
          昇順
        </Button>
      </div>
    </div>
  );
};

export const Component: Story = {
  args: {
    label: '項目A',
    size: 'medium',
    sortOrder: null,
    isDisabled: false,
  },
  render: ComponentRender,
};

export const SizesAndStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-8">
        <SortButton label="項目A" size="x-small" sortOrder={null} onClick={() => {}} aria-label="項目A" />
        <SortButton label="項目A" size="small" sortOrder={null} onClick={() => {}} aria-label="項目A" />
        <SortButton label="項目A" size="medium" sortOrder={null} onClick={() => {}} aria-label="項目A" />
        <SortButton label="項目A" size="large" sortOrder={null} onClick={() => {}} aria-label="項目A" />
      </div>
      <div className="flex items-center gap-8">
        <SortButton label="項目A" size="x-small" sortOrder={null} onClick={() => {}} isDisabled aria-label="項目A" />
        <SortButton label="項目A" size="small" sortOrder={null} onClick={() => {}} isDisabled aria-label="項目A" />
        <SortButton label="項目A" size="medium" sortOrder={null} onClick={() => {}} isDisabled aria-label="項目A" />
        <SortButton label="項目A" size="large" sortOrder={null} onClick={() => {}} isDisabled aria-label="項目A" />
      </div>
      <div className="flex items-center gap-8">
        <SortButton label="項目A" size="x-small" sortOrder="descend" onClick={() => {}} aria-label="項目A" />
        <SortButton label="項目A" size="small" sortOrder="descend" onClick={() => {}} aria-label="項目A" />
        <SortButton label="項目A" size="medium" sortOrder="descend" onClick={() => {}} aria-label="項目A" />
        <SortButton label="項目A" size="large" sortOrder="descend" onClick={() => {}} aria-label="項目A" />
      </div>
      <div className="flex items-center gap-8">
        <SortButton label="項目A" size="x-small" sortOrder="ascend" onClick={() => {}} aria-label="項目A" />
        <SortButton label="項目A" size="small" sortOrder="ascend" onClick={() => {}} aria-label="項目A" />
        <SortButton label="項目A" size="medium" sortOrder="ascend" onClick={() => {}} aria-label="項目A" />
        <SortButton label="項目A" size="large" sortOrder="ascend" onClick={() => {}} aria-label="項目A" />
      </div>
      <div className="flex items-center gap-8">
        <SortButton label="項目A" size="x-small" sortOrder="ascend" onClick={() => {}} isDisabled aria-label="項目A" />
        <SortButton label="項目A" size="small" sortOrder="ascend" onClick={() => {}} isDisabled aria-label="項目A" />
        <SortButton label="項目A" size="medium" sortOrder="ascend" onClick={() => {}} isDisabled aria-label="項目A" />
        <SortButton label="項目A" size="large" sortOrder="ascend" onClick={() => {}} isDisabled aria-label="項目A" />
      </div>
    </div>
  ),
};

const LayoutExampleRender = () => {
  const [sortKey, setSortKey] = useState<'date' | 'name' | 'status' | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const handleSort = (key: 'date' | 'name' | 'status') => () => {
    const currentSortOrder = sortKey === key ? sortOrder : null;

    let newOrder: SortOrder;
    if (currentSortOrder === null) {
      newOrder = 'descend';
    } else if (currentSortOrder === 'ascend') {
      newOrder = 'descend';
    } else {
      newOrder = 'ascend';
    }

    setSortKey(key);
    setSortOrder(newOrder);
  };

  const headingClasses = 'typography-label14regular flex text-text02 flex-col pr-2';
  const cellClasses = 'typography-label16regular text-text01 flex items-center ';

  return (
    <Table width="100%" templateRows="40px" autoRows="48px" templateColumns="40px 200px 1fr 180px">
      <Table.Row>
        <Table.Cell className={headingClasses} isHeader></Table.Cell>
        <Table.Cell className={headingClasses} isHeader>
          <SortButton
            label="作成日"
            sortOrder={sortKey === 'date' ? sortOrder : null}
            onClick={handleSort('date')}
            size="small"
            aria-label="作成日"
          />
        </Table.Cell>
        <Table.Cell className={headingClasses} isHeader>
          <SortButton
            label="名前"
            sortOrder={sortKey === 'name' ? sortOrder : null}
            onClick={handleSort('name')}
            size="small"
            aria-label="名前"
          />
        </Table.Cell>
        <Table.Cell className={headingClasses} isHeader>
          <SortButton
            label="ステータス"
            sortOrder={sortKey === 'status' ? sortOrder : null}
            onClick={handleSort('status')}
            size="small"
            aria-label="ステータス"
          />
        </Table.Cell>
      </Table.Row>
      <Table.Row isHoverBackgroundVisible>
        <Table.Cell className={cellClasses}>1</Table.Cell>
        <Table.Cell className={cellClasses}>2024-01-15</Table.Cell>
        <Table.Cell className={cellClasses}>山田太郎</Table.Cell>
        <Table.Cell className={cellClasses}>完了</Table.Cell>
      </Table.Row>
      <Table.Row isHoverBackgroundVisible>
        <Table.Cell className={cellClasses}>2</Table.Cell>
        <Table.Cell className={cellClasses}>2024-01-15</Table.Cell>
        <Table.Cell className={cellClasses}>佐藤花子</Table.Cell>
        <Table.Cell className={cellClasses}>進行中</Table.Cell>
      </Table.Row>
      <Table.Row isHoverBackgroundVisible>
        <Table.Cell className={cellClasses}>3</Table.Cell>
        <Table.Cell className={cellClasses}>2024-01-20</Table.Cell>
        <Table.Cell className={cellClasses}>田中一郎</Table.Cell>
        <Table.Cell className={cellClasses}>待機中</Table.Cell>
      </Table.Row>
    </Table>
  );
};

export const LayoutExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <LayoutExampleRender />
    </div>
  ),
};
