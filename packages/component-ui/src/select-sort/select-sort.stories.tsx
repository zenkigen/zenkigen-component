import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';

import { SelectSort } from './select-sort';
import type { SortOrder } from './type';

const meta: Meta<typeof SelectSort> = {
  title: 'Components/SelectSort',
  component: SelectSort,
  parameters: {
    docs: {
      description: {
        component:
          'このButtonコンポーネントは、クリックイベントをハンドルするシンプルな例です。カスタムメモや補足情報をここに記載できます。',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SelectSort>;

const ComponentRender = (args: React.ComponentProps<typeof SelectSort>) => {
  const [sortKey, setSortKey] = useState<'day' | 'member' | null>(null);
  const [sortOrderDay, setSortOrderDay] = useState<SortOrder>(null);

  const handleSortDay = useCallback((direction: SortOrder) => {
    setSortOrderDay(direction);
    setSortKey('day');
  }, []);

  const handleClickDeselect = useCallback(() => {
    setSortKey(null);
    setSortOrderDay(null);
  }, []);

  return (
    <div style={{ height: '200px', display: 'flex' }}>
      <SelectSort
        {...args}
        sortOrder={sortOrderDay}
        isSortKey={sortKey === 'day'}
        onChange={handleSortDay}
        onClickDeselect={handleClickDeselect}
      />
    </div>
  );
};

export const Component: Story = {
  args: {
    size: 'medium',
    variant: 'outline',
    label: 'label',
    // eslint-disable-next-line no-undefined
    width: undefined,
  },
  parameters: {
    chromatic: { disable: true },
  },
  argTypes: {
    width: {
      control: { type: 'text' },
      // eslint-disable-next-line no-undefined
      defaultValue: undefined,
    },
  },
  render: (args) => <ComponentRender {...args} />,
};

const SelectSortBasic = () => {
  const [sortKey, setSortKey] = useState<'day' | 'member' | null>(null);
  const [sortOrderDay, setSortOrderDay] = useState<SortOrder>(null);
  const [sortOrderMember, setSortOrderMember] = useState<SortOrder>(null);

  const handleSortDay = useCallback((direction: SortOrder) => {
    setSortOrderDay(direction);
    setSortOrderMember(null);
    setSortKey('day');
  }, []);
  const handleSortMember = useCallback((direction: SortOrder) => {
    setSortOrderMember(direction);
    setSortOrderDay(null);
    setSortKey('member');
  }, []);
  const handleClickDeselect = useCallback(() => {
    setSortKey(null);
    setSortOrderDay(null);
    setSortOrderMember(null);
  }, []);

  return (
    <div style={{ margin: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px', marginBottom: '140px' }}>
        <SelectSort
          label="項目名1"
          size="x-small"
          variant="outline"
          sortOrder={sortOrderDay}
          isSortKey={sortKey === 'day'}
          onChange={handleSortDay}
          onClickDeselect={handleClickDeselect}
        />
        <SelectSort
          label="項目名1"
          size="small"
          variant="outline"
          sortOrder={sortOrderDay}
          isSortKey={sortKey === 'day'}
          onChange={handleSortDay}
          onClickDeselect={handleClickDeselect}
        />
        <SelectSort
          label="項目名1"
          size="medium"
          variant="outline"
          sortOrder={sortOrderDay}
          isSortKey={sortKey === 'day'}
          onChange={handleSortDay}
          onClickDeselect={handleClickDeselect}
        />
        <SelectSort
          label="項目名1"
          size="large"
          variant="outline"
          sortOrder={sortOrderDay}
          isSortKey={sortKey === 'day'}
          onChange={handleSortDay}
          onClickDeselect={handleClickDeselect}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px', marginBottom: '140px' }}>
        <SelectSort
          label="項目名2"
          size="x-small"
          variant="text"
          sortOrder={sortOrderMember}
          isSortKey={sortKey === 'member'}
          onChange={handleSortMember}
          onClickDeselect={handleClickDeselect}
        />
        <SelectSort
          label="項目名2"
          size="small"
          variant="text"
          sortOrder={sortOrderMember}
          isSortKey={sortKey === 'member'}
          onChange={handleSortMember}
          onClickDeselect={handleClickDeselect}
        />
        <SelectSort
          label="項目名2"
          size="medium"
          variant="text"
          sortOrder={sortOrderMember}
          isSortKey={sortKey === 'member'}
          onChange={handleSortMember}
          onClickDeselect={handleClickDeselect}
        />
        <SelectSort
          label="項目名2"
          size="large"
          variant="text"
          sortOrder={sortOrderMember}
          isSortKey={sortKey === 'member'}
          onChange={handleSortMember}
          onClickDeselect={handleClickDeselect}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px', marginBottom: '140px' }}>
        <SelectSort
          label="項目名項目名項目名"
          size="x-small"
          width={120}
          sortOrder={sortOrderMember}
          isSortKey={sortKey === 'member'}
          onChange={handleSortMember}
          onClickDeselect={handleClickDeselect}
        />
        <SelectSort
          label="項目名項目名項目名"
          size="small"
          width={120}
          sortOrder={sortOrderMember}
          isSortKey={sortKey === 'member'}
          onChange={handleSortMember}
          onClickDeselect={handleClickDeselect}
        />
        <SelectSort
          label="項目名項目名項目名"
          size="medium"
          width={120}
          sortOrder={sortOrderMember}
          isSortKey={sortKey === 'member'}
          onChange={handleSortMember}
          onClickDeselect={handleClickDeselect}
        />
        <SelectSort
          label="項目名項目名項目名"
          size="large"
          width={120}
          sortOrder={sortOrderMember}
          isSortKey={sortKey === 'member'}
          onChange={handleSortMember}
          onClickDeselect={handleClickDeselect}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px', marginBottom: '20px' }}>
        <SelectSort label="項目名1" size="x-small" variant="outline" sortOrder={sortOrderDay} isDisabled />
        <SelectSort label="項目名1" size="small" variant="outline" sortOrder={sortOrderDay} isDisabled />
        <SelectSort label="項目名1" size="medium" variant="outline" sortOrder={sortOrderDay} isDisabled />
        <SelectSort label="項目名1" size="large" variant="outline" sortOrder={sortOrderDay} isDisabled />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
        <SelectSort label="項目名2" size="x-small" variant="text" sortOrder={sortOrderMember} isDisabled />
        <SelectSort label="項目名2" size="small" variant="text" sortOrder={sortOrderMember} isDisabled />
        <SelectSort label="項目名2" size="medium" variant="text" sortOrder={sortOrderMember} isDisabled />
        <SelectSort label="項目名2" size="large" variant="text" sortOrder={sortOrderMember} isDisabled />
      </div>
    </div>
  );
};

export const Basic: Story = {
  render: () => <SelectSortBasic />,
};
