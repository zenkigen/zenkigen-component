import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

import { Avatar } from '../avatar';
import { Dropdown } from '../dropdown';
import type { DropdownItemType } from '../dropdown/type';
import { Icon } from '../icon';
import { SelectSort } from '../select-sort';
import type { SortOrder } from '../select-sort/type';
import { Table } from '.';

const meta: Meta<typeof Table> = {
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

const items: DropdownItemType[] = [
  {
    id: '1',
    content: '操作項目1',
    color: 'gray' as const,
    onClick: action('選択項目1'),
  },
  {
    id: '2',
    content: '操作項目2',
    color: 'gray' as const,
    onClick: action('選択項目2'),
  },
  {
    id: '3',
    content: '操作項目3',
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
  const headingClasses = 'typography-label14regular flex items-center text-text02';
  const cellClasses = 'typography-label16regular text-text01 flex items-center gap-2';

  return (
    <div className="flex flex-col gap-10">
      <Table width="100%" templateRows="40px" autoRows="48px" templateColumns="200px 400px 1fr 80px">
        <Table.Row>
          <Table.Cell className={headingClasses} isHeader>
            <SelectSort
              size="small"
              variant="text"
              label="氏名"
              sortOrder={sortOrderName}
              isSortKey={sortKey === 'name'}
              onChange={handleSortName}
              onClickDeselect={handleClickDeselect}
            />
          </Table.Cell>
          <Table.Cell className={headingClasses} isHeader>
            <SelectSort
              size="small"
              variant="text"
              label="メールアドレス"
              sortOrder={sortOrderEmail}
              isSortKey={sortKey === 'email'}
              onChange={handleSortEmail}
              onClickDeselect={handleClickDeselect}
            />
          </Table.Cell>
          <Table.Cell className={headingClasses} isHeader>
            権限
          </Table.Cell>
          <Table.Cell />
        </Table.Row>
        <Table.Row isHoverBackgroundVisible>
          <Table.Cell className={cellClasses}>
            <Avatar size="x-small" userId={1} lastName="全機現" firstName="太郎" />
            全機現太郎
          </Table.Cell>
          <Table.Cell className={cellClasses}>taro.zenkigen@zk-creative.jp</Table.Cell>
          <Table.Cell className={cellClasses}>管理者</Table.Cell>
          <Table.Cell className={`${cellClasses} flex justify-end`}>
            <Dropdown
              size="x-small"
              target={<Icon name="more" size="small" color="icon01" />}
              isArrowHidden
              variant="text"
            >
              <Dropdown.Menu horizontalAlign="right">
                {items.map((item) => (
                  <Dropdown.Item key={item.id} color={item.color} onClick={item.onClick}>
                    {item.content}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Table.Cell>
        </Table.Row>
        <Table.Row isHoverBackgroundVisible>
          <Table.Cell className={cellClasses}>
            <Avatar size="x-small" userId={1} lastName="全機現" firstName="太郎" />
            全機現太郎
          </Table.Cell>
          <Table.Cell className={cellClasses}>taro.zenkigen@zk-creative.jp</Table.Cell>
          <Table.Cell className={cellClasses}>管理者</Table.Cell>
          <Table.Cell className={`${cellClasses} flex justify-end`}>
            <Dropdown
              size="x-small"
              target={<Icon name="more" size="small" color="icon01" />}
              isArrowHidden
              variant="text"
            >
              <Dropdown.Menu horizontalAlign="right">
                {items.map((item) => (
                  <Dropdown.Item key={item.id} color={item.color} onClick={item.onClick}>
                    {item.content}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Table.Cell>
        </Table.Row>
        <Table.Row isHoverBackgroundVisible>
          <Table.Cell className={cellClasses}>
            <Avatar size="x-small" userId={1} lastName="全機現" firstName="太郎" />
            全機現太郎
          </Table.Cell>
          <Table.Cell className={cellClasses}>taro.zenkigen@zk-creative.jp</Table.Cell>
          <Table.Cell className={cellClasses}>管理者</Table.Cell>
          <Table.Cell className={`${cellClasses} flex justify-end`}>
            <Dropdown
              size="x-small"
              target={<Icon name="more" size="small" color="icon01" />}
              isArrowHidden
              variant="text"
            >
              <Dropdown.Menu horizontalAlign="right">
                {items.map((item) => (
                  <Dropdown.Item key={item.id} color={item.color} onClick={item.onClick}>
                    {item.content}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Table.Cell>
        </Table.Row>
      </Table>

      <Table width="100%" templateRows="40px" autoRows="48px" templateColumns="200px 400px 1fr 80px">
        <Table.Row isHoverBackgroundVisible>
          <Table.Cell className={cellClasses}>
            <Avatar size="x-small" userId={1} lastName="全機現" firstName="太郎" />
            全機現太郎
          </Table.Cell>
          <Table.Cell className={cellClasses}>taro.zenkigen@zk-creative.jp</Table.Cell>
          <Table.Cell className={cellClasses}>管理者</Table.Cell>
          <Table.Cell className={`${cellClasses} flex justify-end`}>
            <Dropdown
              size="x-small"
              target={<Icon name="more" size="small" color="icon01" />}
              isArrowHidden
              variant="text"
            >
              <Dropdown.Menu horizontalAlign="right">
                {items.map((item) => (
                  <Dropdown.Item key={item.id} color={item.color} onClick={item.onClick}>
                    {item.content}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Table.Cell>
        </Table.Row>
        <Table.Row isHoverBackgroundVisible>
          <Table.Cell className={cellClasses}>
            <Avatar size="x-small" userId={1} lastName="全機現" firstName="太郎" />
            全機現太郎
          </Table.Cell>
          <Table.Cell className={cellClasses}>taro.zenkigen@zk-creative.jp</Table.Cell>
          <Table.Cell className={cellClasses}>管理者</Table.Cell>
          <Table.Cell className={`${cellClasses} flex justify-end`}>
            <Dropdown
              size="x-small"
              target={<Icon name="more" size="small" color="icon01" />}
              isArrowHidden
              variant="text"
            >
              <Dropdown.Menu horizontalAlign="right">
                {items.map((item) => (
                  <Dropdown.Item key={item.id} color={item.color} onClick={item.onClick}>
                    {item.content}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Table.Cell>
        </Table.Row>
      </Table>
    </div>
  );
};

const TableStoryWithManyRows = () => {
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
  const headingClasses = 'typography-label14regular flex items-center text-text02';
  const cellClasses = 'typography-label16regular text-text01 flex items-center gap-2';

  return (
    <div className="flex flex-col gap-10">
      <Table width="100%" templateRows="40px" autoRows="48px" templateColumns="200px 400px 1fr 80px">
        <Table.Row>
          <Table.Cell className={headingClasses} isHeader>
            <SelectSort
              size="small"
              variant="text"
              label="氏名"
              sortOrder={sortOrderName}
              isSortKey={sortKey === 'name'}
              onChange={handleSortName}
              onClickDeselect={handleClickDeselect}
            />
          </Table.Cell>
          <Table.Cell className={headingClasses} isHeader>
            <SelectSort
              size="small"
              variant="text"
              label="メールアドレス"
              sortOrder={sortOrderEmail}
              isSortKey={sortKey === 'email'}
              onChange={handleSortEmail}
              onClickDeselect={handleClickDeselect}
            />
          </Table.Cell>
          <Table.Cell className={headingClasses} isHeader>
            権限
          </Table.Cell>
          <Table.Cell />
        </Table.Row>
        {[...Array(20)].map((_, index) => (
          <Table.Row key={index} isHoverBackgroundVisible>
            <Table.Cell className={cellClasses}>
              <Avatar size="x-small" userId={1} lastName="全機現" firstName="太郎" />
              全機現太郎
            </Table.Cell>
            <Table.Cell className={cellClasses}>taro.zenkigen@zk-creative.jp</Table.Cell>
            <Table.Cell className={cellClasses}>管理者</Table.Cell>
            <Table.Cell className={`${cellClasses} flex justify-end`}>
              <Dropdown
                size="x-small"
                target={<Icon name="more" size="small" color="icon01" />}
                isArrowHidden
                variant="text"
              >
                <Dropdown.Menu horizontalAlign="right">
                  {items.map((item) => (
                    <Dropdown.Item key={item.id} color={item.color} onClick={item.onClick}>
                      {item.content}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table>
    </div>
  );
};

export const Base: Story = {
  render: () => <TableStoryBasic />,
};

export const ManyRows: Story = {
  render: () => <TableStoryWithManyRows />,
};
