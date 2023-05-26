import { useCallback, useState } from 'react';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

import { Avatar } from '../avatar';
import { Dropdown } from '../dropdown';
import { DropdownItemType } from '../dropdown/type';
import { Icon } from '../icon';
import { SelectSort } from '../select-sort';
import { SortOrder } from '../select-sort/type';

import { TableContainer, TableRowContainer, TableCell } from '.';

const meta: Meta<typeof TableContainer> = {
  component: TableContainer,
};

export default meta;
type Story = StoryObj<typeof TableContainer>;

const items: DropdownItemType[] = [
  {
    id: '1',
    icon: 'edit' as const,
    label: '操作項目1',
    color: 'gray' as const,
    onClick: action('選択項目1'),
  },
  {
    id: '2',
    icon: 'edit' as const,
    label: '操作項目2',
    color: 'gray' as const,
    onClick: action('選択項目2'),
  },
  {
    id: '3',
    icon: 'edit' as const,
    label: '操作項目3',
    color: 'red' as const,
    onClick: action('選択項目3'),
  },
];

const TableStoryBasic = () => {
  const [sortKey, setSortKey] = useState<'name' | 'email' | null>(null);
  const [sortOrderName, setSortOrderName] = useState<SortOrder>(null);
  const [sortOrderEmail, setSortOrderEmail] = useState<SortOrder>(null);

  const handleSortName = useCallback((direction: SortOrder) => {
    setSortOrderName(direction);
    setSortOrderEmail(null);
    setSortKey('name');
  }, []);
  const handleSortEmail = useCallback((direction: SortOrder) => {
    setSortOrderEmail(direction);
    setSortOrderName(null);
    setSortKey('email');
  }, []);
  const handleClickDeselect = useCallback(() => {
    setSortKey(null);
    setSortOrderName(null);
    setSortOrderEmail(null);
  }, []);
  const headingClasses = clsx(typography.label.label2regular, 'text-text-text02');
  const cellClasses = clsx(typography.label.label1regular, 'text-text-text01', 'flex items-center', 'gap-2');

  return (
    <div className="flex items-center p-10">
      <TableContainer rows="40px repeat(3, 48px)" columns="200px 400px 1fr 80px">
        <TableRowContainer>
          <TableCell className={headingClasses}>
            <SelectSort
              size="small"
              variant="text"
              label="氏名"
              sortOrder={sortOrderName}
              isSortKey={sortKey === 'name'}
              onChange={handleSortName}
              onClickDeselect={handleClickDeselect}
            />
          </TableCell>
          <TableCell className={headingClasses}>
            <SelectSort
              size="small"
              variant="text"
              label="メールアドレス"
              sortOrder={sortOrderEmail}
              isSortKey={sortKey === 'email'}
              onChange={handleSortEmail}
              onClickDeselect={handleClickDeselect}
            />
          </TableCell>
          <TableCell className={headingClasses}>権限</TableCell>
          <TableCell />
        </TableRowContainer>
        <TableRowContainer>
          <TableCell className={cellClasses}>
            <Avatar size="x-small" userId={1} lastName="全機現" firstName="太郎" />
            全機現太郎
          </TableCell>
          <TableCell className={cellClasses}>taro.zenkigen@zk-creative.jp</TableCell>
          <TableCell className={cellClasses}>管理者</TableCell>
          <TableCell align="right">
            <Dropdown size="x-small" items={items} horizontalAlign="right">
              <Icon name="more" size="small" color="icon01" />
            </Dropdown>
          </TableCell>
        </TableRowContainer>
        <TableRowContainer>
          <TableCell className={cellClasses}>
            <Avatar size="x-small" userId={1} lastName="全機現" firstName="太郎" />
            全機現太郎
          </TableCell>
          <TableCell className={cellClasses}>taro.zenkigen@zk-creative.jp</TableCell>
          <TableCell className={cellClasses}>管理者</TableCell>
          <TableCell align="right">
            <Dropdown size="x-small" items={items} horizontalAlign="right">
              <Icon name="more" size="small" color="icon01" />
            </Dropdown>
          </TableCell>
        </TableRowContainer>
        <TableRowContainer>
          <TableCell className={cellClasses}>
            <Avatar size="x-small" userId={1} lastName="全機現" firstName="太郎" />
            全機現太郎
          </TableCell>
          <TableCell className={cellClasses}>taro.zenkigen@zk-creative.jp</TableCell>
          <TableCell className={cellClasses}>管理者</TableCell>
          <TableCell align="right">
            <Dropdown size="x-small" items={items} horizontalAlign="right">
              <Icon name="more" size="small" color="icon01" />
            </Dropdown>
          </TableCell>
        </TableRowContainer>
      </TableContainer>
    </div>
  );
};

export const Base: Story = {
  render: () => <TableStoryBasic />,
};