import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '../avatar';
import { Icon } from '../icon';

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
    // eslint-disable-next-line no-alert
    onClick: () => alert('選択項目1'),
  },
  {
    id: '2',
    icon: 'edit' as const,
    label: '操作項目2',
    color: 'gray' as const,
    // eslint-disable-next-line no-alert
    onClick: () => alert('選択項目2'),
  },
  {
    id: '3',
    icon: 'edit' as const,
    label: '操作項目3',
    color: 'red' as const,
    // eslint-disable-next-line no-alert
    onClick: () => alert('選択項目3'),
  },
];

const DropdownBasic = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '0 100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: '100px', marginBottom: '150px' }}>
        <Dropdown size="x-small" items={items} horizontalAlign="right">
          <Avatar userId={1} lastName="全機現" firstName="太郎" />
        </Dropdown>
        <Dropdown size="small" items={items} horizontalAlign="right">
          <Avatar userId={1} lastName="全機現" firstName="太郎" />
        </Dropdown>
        <Dropdown size="medium" items={items} horizontalAlign="right">
          <Avatar userId={1} lastName="全機現" firstName="太郎" />
        </Dropdown>
        <Dropdown size="large" items={items} horizontalAlign="right">
          <Avatar userId={1} lastName="全機現" firstName="太郎" />
        </Dropdown>
        <Dropdown size="large" items={items} horizontalAlign="right" isDisabled>
          <Avatar userId={1} lastName="全機現" firstName="太郎" />
        </Dropdown>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: '100px', marginBottom: '150px' }}>
        <Dropdown size="x-small" items={items} horizontalAlign="right">
          <Icon name="more" />
        </Dropdown>
        <Dropdown size="small" items={items} horizontalAlign="right">
          <Icon name="more" />
        </Dropdown>
        <Dropdown size="medium" items={items} horizontalAlign="right">
          <Icon name="more" />
        </Dropdown>
        <Dropdown size="large" items={items} horizontalAlign="right">
          <Icon name="more" />
        </Dropdown>
        <Dropdown size="large" items={items} horizontalAlign="right" isDisabled>
          <Icon name="more" />
        </Dropdown>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: '60px', marginBottom: '150px' }}>
        <Dropdown size="x-small" items={items} label="選択" icon="add" />
        <Dropdown size="small" items={items} label="選択" icon="add" />
        <Dropdown size="medium" items={items} label="選択" icon="add" />
        <Dropdown size="large" items={items} label="選択" icon="add" />
        <Dropdown size="large" items={items} label="選択" icon="add" isDisabled />
      </div>
    </div>
  );
};

export const Basic: Story = {
  render: () => <DropdownBasic />,
};
