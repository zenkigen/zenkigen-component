import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';
import { action } from 'storybook/actions';

import { Avatar } from '../avatar';
import { Dropdown } from '../dropdown';
import type { DropdownItemType } from '../dropdown/type';
import { Icon } from '../icon';
import { IconButton } from '../icon-button';
import { SelectSort } from '../select-sort';
import type { SortOrder } from '../select-sort/type';
import { Tooltip } from '../tooltip';
import { Table } from '.';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
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

  const handleChangeSortName = useCallback((direction: SortOrder) => {
    setSortOrderName(direction);
    setSortOrderEmail(null);
    setSortKey('name');
  }, []);
  const handleChangeSortEmail = useCallback((direction: SortOrder) => {
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
              onChange={handleChangeSortName}
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
              onChange={handleChangeSortEmail}
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

  const handleChangeSortName = useCallback((direction: SortOrder) => {
    setSortOrderName(direction);
    setSortOrderEmail(null);
    setSortKey('name');
  }, []);
  const handleChangeSortEmail = useCallback((direction: SortOrder) => {
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
  const cellClasses = 'typography-label16regular text-text01 flex items-center gap-2 overflow-hidden';
  const truncateCellClasses = 'typography-label16regular text-text01 grid grid-cols-[minmax(0,1fr)] items-center';
  const truncateTextClasses = 'block w-full overflow-hidden text-ellipsis whitespace-nowrap';
  const randomIds = [
    'a8f3b1c9-2d7e-4a16-f91b-3c475e2d8a73',
    'c4b19f58-7a3e-2c81-b6f4-9d25e1d37a94',
    '9c52b8e3-3f8a-16d7-d24e-91bc8b73f4a5',
    '15ace62f-fab3-c781-6d94-e2a374c81f5b',
    '29b6ae4f-e871-5dc3-3d2a-9b67c571f829',
    'b3e9d7a4-8c21-4f65-9e0b-2a5d17f4c8e3',
    '7f4a2d91-c3b8-4e67-a025-d91bf3e87c42',
    '1e6b8f3a-2d94-4c71-b08e-5a3f9d1c72e4',
    '8d4a7c25-9f13-4b68-e23a-6c7d84f109b5',
    '2a9e3c57-b14d-4f82-90c6-f5a3e71d8b24',
    '6f8b2d91-4a73-4e05-c182-9b47d6a3f5e8',
    '0c73b1e4-7f25-4a96-83d5-2e9c4b68f17a',
    '4e2d9f07-b618-4a35-c94f-1d7a85e3c62b',
    '9b57f3a8-c2d4-4e91-86b0-f3a7d18e4c59',
    '3a6e1d8f-5b72-4c49-a2d8-7f4e95b1c308',
    'd18c5e97-2a4b-4f36-9c7e-8b3d51a7f4e9',
    '5f9b2c81-3d47-4ea6-b190-6c8f4d72a3e5',
    '7c3a1e5b-8f92-4d74-a6c1-053f78e4b926',
    '0e7d4b92-3c15-4a87-f628-d94a1f37b5c6',
    'b8f2c631-9a4d-4e07-85b3-71e6d9fa248c',
  ];
  const participantsList: { userId: number; lastName: string; firstName: string }[][] = [
    [
      { userId: 1, lastName: '全機現', firstName: '太郎' },
      { userId: 2, lastName: '鈴木', firstName: '一郎' },
    ],
    [{ userId: 3, lastName: '田中', firstName: '花子' }],
    [
      { userId: 4, lastName: '山田', firstName: '次郎' },
      { userId: 5, lastName: '佐藤', firstName: '美咲' },
      { userId: 6, lastName: '高橋', firstName: '健太' },
    ],
    [
      { userId: 7, lastName: '伊藤', firstName: '彩' },
      { userId: 8, lastName: '渡辺', firstName: '剛' },
    ],
    [{ userId: 9, lastName: '中村', firstName: '結衣' }],
    [
      { userId: 10, lastName: '小林', firstName: '翔太' },
      { userId: 11, lastName: '加藤', firstName: '茜' },
    ],
    [
      { userId: 12, lastName: '吉田', firstName: '龍' },
      { userId: 13, lastName: '山本', firstName: '葵' },
      { userId: 14, lastName: '松本', firstName: '陸' },
    ],
    [{ userId: 15, lastName: '井上', firstName: '玲奈' }],
    [
      { userId: 16, lastName: '木村', firstName: '颯' },
      { userId: 17, lastName: '林', firstName: '美月' },
    ],
    [
      { userId: 18, lastName: '斎藤', firstName: '悠' },
      { userId: 19, lastName: '清水', firstName: '七海' },
    ],
    [
      { userId: 20, lastName: '山口', firstName: '蓮' },
      { userId: 21, lastName: '池田', firstName: '芽衣' },
      { userId: 22, lastName: '阿部', firstName: '駿' },
    ],
    [{ userId: 23, lastName: '森', firstName: '莉子' }],
    [
      { userId: 24, lastName: '橋本', firstName: '湊' },
      { userId: 25, lastName: '石川', firstName: '凛' },
    ],
    [
      { userId: 26, lastName: '山崎', firstName: '陽翔' },
      { userId: 27, lastName: '中島', firstName: '柚' },
    ],
    [{ userId: 28, lastName: '藤田', firstName: '朱里' }],
    [
      { userId: 29, lastName: '後藤', firstName: '大和' },
      { userId: 30, lastName: '岡田', firstName: '澪' },
    ],
    [
      { userId: 31, lastName: '長谷川', firstName: '樹' },
      { userId: 32, lastName: '村上', firstName: '美羽' },
      { userId: 33, lastName: '近藤', firstName: '朝陽' },
    ],
    [
      { userId: 34, lastName: '石井', firstName: '琴音' },
      { userId: 35, lastName: '斉藤', firstName: '蒼' },
    ],
    [{ userId: 36, lastName: '坂本', firstName: '陽菜' }],
    [
      { userId: 37, lastName: '遠藤', firstName: '蒼空' },
      { userId: 38, lastName: '青木', firstName: '結菜' },
      { userId: 39, lastName: '藤井', firstName: '碧' },
    ],
  ];
  const eventNames = [
    '一次面接',
    'カジュアル面談',
    '技術面接',
    '二次面接',
    '会社説明会',
    'リクルーター面談',
    '最終面接',
    '人事面談',
    'オンライン面談',
    'グループディスカッション',
    '職場見学',
    '役員面談',
    '内定者面談',
    'スキルチェック',
    'ポートフォリオレビュー',
    '条件面談',
    'オファー面談',
    'メンター面談',
    'インターン説明会',
    'フォローアップ面談',
  ];

  return (
    <div className="flex flex-col gap-10">
      <Table
        width="100%"
        templateRows="40px"
        autoRows="48px"
        templateColumns="minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) 80px"
      >
        <Table.Row>
          <Table.Cell className={headingClasses} isHeader>
            ID
          </Table.Cell>
          <Table.Cell className={headingClasses} isHeader>
            <SelectSort
              size="small"
              variant="text"
              label="イベント名"
              sortOrder={sortOrderName}
              isSortKey={sortKey === 'name'}
              onChange={handleChangeSortName}
              onClickDeselect={handleClickDeselect}
            />
          </Table.Cell>
          <Table.Cell className={`${headingClasses} justify-center`} isHeader>
            <SelectSort
              size="small"
              variant="text"
              label="メールアドレス"
              sortOrder={sortOrderEmail}
              isSortKey={sortKey === 'email'}
              onChange={handleChangeSortEmail}
              onClickDeselect={handleClickDeselect}
            />
          </Table.Cell>
          <Table.Cell className={headingClasses} isHeader>
            参加者
          </Table.Cell>
          <Table.Cell className={`${headingClasses} justify-center`} isHeader>
            時間
          </Table.Cell>
          <Table.Cell isHeader />
        </Table.Row>
        {[...Array(20)].map((_, index) => {
          const timeText = `2026/04/14 ${String(10 + Math.floor(index / 6)).padStart(2, '0')}:${String((index * 7) % 60).padStart(2, '0')}`;
          const idText = randomIds[index] ?? '';
          const eventName = eventNames[index] ?? '';

          return (
            <Table.Row key={index} isHoverBackgroundVisible>
              <Table.Cell className={truncateCellClasses}>
                <Tooltip content={idText} portalTarget={document.body} verticalPosition="top">
                  <span className={truncateTextClasses}>{idText}</span>
                </Tooltip>
              </Table.Cell>
              <Table.Cell className={truncateCellClasses}>
                <div className="max-w-full justify-self-start">
                  <Tooltip content={eventName} portalTarget={document.body} verticalPosition="top">
                    <span className="inline-block max-w-full truncate align-middle">{eventName}</span>
                  </Tooltip>
                </div>
              </Table.Cell>
              <Table.Cell className={`${cellClasses} justify-center`}>
                <Tooltip content="taro.zenkigen@zk-creative.jp" verticalPosition="top" portalTarget={document.body}>
                  <IconButton icon="email" size="small" variant="outline" aria-label="メールを送信" />
                </Tooltip>
              </Table.Cell>
              <Table.Cell className={cellClasses}>
                {(participantsList[index] ?? []).map((participant) => (
                  <Tooltip
                    key={participant.userId}
                    content={`${participant.lastName} ${participant.firstName}`}
                    verticalPosition="top"
                    portalTarget={document.body}
                  >
                    <Avatar
                      size="x-small"
                      userId={participant.userId}
                      lastName={participant.lastName}
                      firstName={participant.firstName}
                    />
                  </Tooltip>
                ))}
              </Table.Cell>
              <Table.Cell className={truncateCellClasses}>
                <Tooltip content={timeText} portalTarget={document.body} verticalPosition="top">
                  <span className={`${truncateTextClasses} text-center`}>{timeText}</span>
                </Tooltip>
              </Table.Cell>
              <Table.Cell className="typography-label16regular flex items-center justify-end gap-2 text-text01">
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
          );
        })}
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
