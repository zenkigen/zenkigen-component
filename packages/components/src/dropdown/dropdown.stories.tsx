import { useState } from 'react';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

import { Avatar } from '../avatar';
import { Button } from '../button';
import { Icon } from '../icon';
import { Toggle } from '../toggle';

import { Dropdown } from './dropdown';
import { DropdownItemType } from './type';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

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

const DropdownBasic = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '0 100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: '100px', marginBottom: '150px' }}>
        <Dropdown size="small" items={items} horizontalAlign="right">
          <Avatar size="x-small" userId={1} lastName="全機現" firstName="太郎" />
        </Dropdown>
        <Dropdown size="medium" items={items} horizontalAlign="right">
          <Avatar size="small" userId={1} lastName="全機現" firstName="太郎" />
        </Dropdown>
        <Dropdown size="large" items={items} horizontalAlign="right">
          <Avatar size="medium" userId={1} lastName="全機現" firstName="太郎" />
        </Dropdown>
        <Dropdown size="large" items={items} horizontalAlign="right" variant="outline">
          <Avatar size="medium" userId={1} lastName="全機現" firstName="太郎" />
        </Dropdown>
        <Dropdown size="large" items={items} horizontalAlign="right" isDisabled>
          <Avatar size="medium" userId={1} lastName="全機現" firstName="太郎" />
        </Dropdown>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: '100px', marginBottom: '150px' }}>
        <Dropdown size="x-small" items={items} horizontalAlign="right">
          <Icon name="more" size="small" color="icon01" />
        </Dropdown>
        <Dropdown size="small" items={items} horizontalAlign="right">
          <Icon name="more" size="medium" color="icon01" />
        </Dropdown>
        <Dropdown size="medium" items={items} horizontalAlign="right">
          <Icon name="more" size="large" color="icon01" />
        </Dropdown>
        <Dropdown size="medium" items={items} horizontalAlign="right" variant="outline">
          <Icon name="more" size="large" color="icon01" />
        </Dropdown>
        <Dropdown size="medium" items={items} horizontalAlign="right" isDisabled>
          <Icon name="more" size="large" color="icon01" />
        </Dropdown>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: '60px', marginBottom: '150px' }}>
        <Dropdown size="x-small" items={items} label="選択" icon="add" />
        <Dropdown size="small" items={items} label="選択" icon="add" />
        <Dropdown size="medium" items={items} label="選択" icon="add" />
        <Dropdown size="large" items={items} label="選択" icon="add" />
        <Dropdown size="large" items={items} label="選択" icon="add" variant="text" />
        <Dropdown size="large" items={items} label="選択" icon="add" isDisabled />
      </div>
    </div>
  );
};

export const Basic: Story = {
  render: () => <DropdownBasic />,
};

const DropdownWithCustomMenu = () => {
  const [isOn1, setIsOn1] = useState(false);
  const [isOn2, setIsOn2] = useState(false);
  const [isOn3, setIsOn3] = useState(false);

  const handleClickReset = () => {
    setIsOn1(false);
    setIsOn2(false);
    setIsOn3(false);
  };

  const items = [
    {
      id: '1',
      label: '発話比率',
      color: 'fill-user-turquoise',
      isChecked: isOn1,
      onChange: () => setIsOn1((prev) => !prev),
    },
    {
      id: '2',
      label: '体の向き',
      color: 'fill-user-blue',
      isChecked: isOn2,
      onChange: () => setIsOn2((prev) => !prev),
    },
    {
      id: '3',
      label: '会話テンポ',
      color: 'fill-user-pink',
      isChecked: isOn3,
      onChange: () => setIsOn3((prev) => !prev),
    },
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '60px 100px' }}>
      <Dropdown
        size="medium"
        label="フィルター"
        icon="filter"
        horizontalAlign="right"
        menuComponent={
          <ul className="flex w-[208px] flex-col gap-y-2.5 px-4 py-3">
            {items.map((item) => (
              <li key={item.id} className={clsx('flex w-full items-center', item.color)}>
                <Icon name="graph-line" size="small" />
                <span className={clsx('ml-2 flex-1 text-text-text01', typography.label.label2regular)}>
                  {item.label}
                </span>
                <Toggle id="1" size="small" isChecked={item.isChecked} onChange={item.onChange} />
              </li>
            ))}
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="medium"
                onClick={handleClickReset}
                isDisabled={!isOn1 && !isOn2 && !isOn3}
              >
                初期値に戻す
              </Button>
            </div>
          </ul>
        }
      />
    </div>
  );
};

export const WithCustomMenu: Story = {
  render: () => <DropdownWithCustomMenu />,
};
