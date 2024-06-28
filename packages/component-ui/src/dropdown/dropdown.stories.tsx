import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import type { IconName } from '@zenkigen-inc/component-icons';
import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { forwardRef, useRef, useState } from 'react';

import { Avatar } from '../avatar';
import { Button } from '../button';
import { Heading } from '../heading';
import { Icon } from '../icon';
import { Toggle } from '../toggle';
import { Dropdown } from './dropdown';
import type { DropdownItemType } from './type';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

const items: DropdownItemType[] = [
  {
    id: '1',
    content: (
      <div className="flex items-center gap-2">
        <Icon name="edit" size="small" />
        操作項目1
      </div>
    ),
    color: 'gray' as const,
    onClick: action('選択項目1'),
  },
  {
    id: '2',
    content: (
      <div className="flex items-center gap-2">
        操作項目2
        <Avatar userId={1} firstName="太郎" lastName="全機現" size="x-small" />
      </div>
    ),
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

const items2: DropdownItemType[] = [
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
    color: 'gray' as const,
    onClick: action('選択項目3'),
  },
  {
    id: '4',
    content: '操作項目4',
    color: 'gray' as const,
    onClick: action('選択項目4'),
  },
  {
    id: '5',
    content: '操作項目5',
    color: 'gray' as const,
    onClick: action('選択項目5'),
  },
  {
    id: '6',
    content: '操作項目6',
    color: 'red' as const,
    onClick: action('選択項目6'),
  },
];

const DropdownBasic = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '0 100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: '100px', marginBottom: '150px' }}>
        <Dropdown
          variant="text"
          size="small"
          target={<Avatar size="x-small" userId={1} lastName="全機現" firstName="太郎" />}
          isArrowHidden
        >
          <Dropdown.Menu horizontalAlign="right" maxHeight={120}>
            {items2.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown
          variant="text"
          size="medium"
          target={<Avatar size="small" userId={1} lastName="全機現" firstName="太郎" />}
          isArrowHidden
        >
          <Dropdown.Menu horizontalAlign="right">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown
          variant="text"
          size="large"
          target={<Avatar size="medium" userId={1} lastName="全機現" firstName="太郎" />}
          isArrowHidden
        >
          <Dropdown.Menu horizontalAlign="right">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown
          size="large"
          target={<Avatar size="medium" userId={1} lastName="全機現" firstName="太郎" />}
          isArrowHidden
        >
          <Dropdown.Menu horizontalAlign="right">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown
          variant="text"
          size="large"
          isDisabled
          target={<Avatar size="medium" userId={1} lastName="全機現" firstName="太郎" />}
          isArrowHidden
        >
          <Dropdown.Menu horizontalAlign="right">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: '100px', marginBottom: '150px' }}>
        <Dropdown variant="text" size="x-small" target={<Icon name="more" size="small" color="icon01" />} isArrowHidden>
          <Dropdown.Menu horizontalAlign="right" maxHeight={120}>
            {items2.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown variant="text" size="small" target={<Icon name="more" size="medium" color="icon01" />} isArrowHidden>
          <Dropdown.Menu horizontalAlign="right">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown variant="text" size="medium" target={<Icon name="more" size="large" color="icon01" />} isArrowHidden>
          <Dropdown.Menu horizontalAlign="right">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown size="medium" target={<Icon name="more" size="large" color="icon01" />} isArrowHidden>
          <Dropdown.Menu horizontalAlign="right">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown
          variant="text"
          size="medium"
          isDisabled
          target={<Icon name="more" size="large" color="icon01" />}
          isArrowHidden
        >
          <Dropdown.Menu horizontalAlign="right">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: '100px', marginBottom: '150px' }}>
        <Dropdown variant="text" target={<Heading level={5}>タイトル</Heading>}>
          <Dropdown.Menu horizontalAlign="right" maxHeight={120}>
            {items2.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown variant="text" target={<Heading level={4}>タイトル</Heading>}>
          <Dropdown.Menu horizontalAlign="right" maxHeight={120}>
            {items2.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown variant="text" target={<Heading level={3}>タイトル</Heading>}>
          <Dropdown.Menu horizontalAlign="right" maxHeight={120}>
            {items2.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown size="large" target={<Heading level={2}>タイトル</Heading>}>
          <Dropdown.Menu horizontalAlign="right" maxHeight={120}>
            {items2.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown variant="text" size="large" isDisabled target={<Heading level={1}>タイトル</Heading>}>
          <Dropdown.Menu horizontalAlign="right" maxHeight={120}>
            {items2.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: '60px', marginBottom: '150px' }}>
        <Dropdown size="x-small" label="選択">
          <Dropdown.Menu horizontalAlign="left" maxHeight={120}>
            {items2.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown size="small" label="選択">
          <Dropdown.Menu horizontalAlign="left">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown size="medium" label="選択">
          <Dropdown.Menu horizontalAlign="left">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown size="large" label="選択">
          <Dropdown.Menu horizontalAlign="left">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown size="large" label="選択" variant="text">
          <Dropdown.Menu horizontalAlign="left">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown size="large" label="選択" isDisabled>
          <Dropdown.Menu horizontalAlign="left">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: '60px', marginBottom: '150px' }}>
        <Dropdown size="x-small" label="選択" icon="add">
          <Dropdown.Menu horizontalAlign="left" maxHeight={120}>
            {items2.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown size="small" label="選択" icon="add">
          <Dropdown.Menu horizontalAlign="left">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown size="medium" label="選択" icon="add">
          <Dropdown.Menu horizontalAlign="left">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown size="large" label="選択" icon="add">
          <Dropdown.Menu horizontalAlign="left">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown size="large" label="選択" icon="add" variant="text">
          <Dropdown.Menu horizontalAlign="left">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown size="large" label="選択" icon="add" isDisabled>
          <Dropdown.Menu horizontalAlign="left">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: '60px', marginBottom: '150px' }}>
        <Dropdown size="x-small" label="選択" icon="add" isArrowHidden>
          <Dropdown.Menu horizontalAlign="left" maxHeight={120}>
            {items2.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown size="small" label="選択" icon="add" isArrowHidden>
          <Dropdown.Menu horizontalAlign="left">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown size="medium" label="選択" icon="add" isArrowHidden>
          <Dropdown.Menu horizontalAlign="left">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown size="large" label="選択" icon="add" isArrowHidden>
          <Dropdown.Menu horizontalAlign="left">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown size="large" label="選択" icon="add" variant="text" isArrowHidden>
          <Dropdown.Menu horizontalAlign="left">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown size="large" label="選択" icon="add" isDisabled isArrowHidden>
          <Dropdown.Menu horizontalAlign="left">
            {items.map((item) => (
              <Dropdown.Item key={item.id} onClick={item.onClick}>
                {item.content}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
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
  const [isOn4, setIsOn4] = useState(false);
  const [isOn5, setIsOn5] = useState(false);

  const handleClickReset = () => {
    setIsOn1(false);
    setIsOn2(false);
    setIsOn3(false);
    setIsOn4(false);
    setIsOn5(false);
  };

  type CustomItems = {
    id: string;
    icon?: IconName;
    label: string;
    color: string;
    isChecked: boolean;
    onChange: () => void;
  };

  const items: CustomItems[] = [
    {
      id: '1',
      icon: 'graph-line' as const,
      label: '発話比率',
      color: 'fill-user-aquamarine',
      isChecked: isOn1,
      onChange: () => setIsOn1((prev) => !prev),
    },
    {
      id: '2',
      icon: 'graph-line' as const,
      label: '体の向き',
      color: 'fill-user-blue',
      isChecked: isOn2,
      onChange: () => setIsOn2((prev) => !prev),
    },
    {
      id: '3',
      icon: 'graph-line',
      label: '会話テンポ',
      color: 'fill-user-pink',
      isChecked: isOn3,
      onChange: () => setIsOn3((prev) => !prev),
    },
    {
      id: '4',
      label: '相づち',
      color: 'fill-supportSuccess',
      isChecked: isOn4,
      onChange: () => setIsOn4((prev) => !prev),
    },
    {
      id: '5',
      label: 'NGワード',
      color: 'fill-supportError',
      isChecked: isOn5,
      onChange: () => setIsOn5((prev) => !prev),
    },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '60px 100px' }}>
      <Dropdown size="medium" label="フィルター" icon="filter">
        <Dropdown.Menu horizontalAlign="left" isNoPadding>
          <ul className="flex w-[208px] flex-col gap-y-2.5 px-4 py-3">
            {items.map((item) => (
              <li key={item.id} className={clsx('flex w-full items-center', item.color)}>
                {item.icon ? (
                  <Icon name={item.icon} size="small" />
                ) : (
                  <svg className="size-4">
                    <circle r="6" cx="8" cy="8" className={clsx(item.color)} />
                  </svg>
                )}
                <span className="typography-label14regular ml-2 flex-1 text-text01">{item.label}</span>
                <Toggle id="1" size="small" isChecked={item.isChecked} onChange={item.onChange} />
              </li>
            ))}
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="medium"
                onClick={handleClickReset}
                isDisabled={!isOn1 && !isOn2 && !isOn3 && !isOn4 && !isOn5}
              >
                初期値に戻す
              </Button>
            </div>
          </ul>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export const WithCustomMenu: Story = {
  render: () => <DropdownWithCustomMenu />,
};

const DropdownMenuContainer = forwardRef<HTMLDivElement, PropsWithChildren>(({ children }: PropsWithChildren, ref) => {
  const classes = clsx('absolute', 'top-10', 'left-10');

  return (
    <div className={classes} ref={ref}>
      {children}
    </div>
  );
});
DropdownMenuContainer.displayName = 'DropdownMenuContainer';

const DropdownWithPortal = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '100px' }}>
          <div>
            <Dropdown
              size="large"
              target={<Avatar size="medium" userId={1} lastName="全機現" firstName="太郎" />}
              portalTargetRef={containerRef}
              isArrowHidden
              variant="text"
            >
              <Dropdown.Menu>
                {items.map((item) => (
                  <Dropdown.Item key={item.id} onClick={item.onClick}>
                    {item.content}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
            <Dropdown
              size="medium"
              target={<Icon name="more" size="large" color="icon01" />}
              portalTargetRef={containerRef}
              isArrowHidden
              variant="text"
            >
              <Dropdown.Menu>
                {items.map((item) => (
                  <Dropdown.Item key={item.id} onClick={item.onClick}>
                    {item.content}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
            <Dropdown size="large" label="選択" portalTargetRef={containerRef}>
              <Dropdown.Menu horizontalAlign="left">
                {items2.map((item) => (
                  <Dropdown.Item key={item.id} onClick={item.onClick}>
                    {item.content}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
            <Dropdown size="large" label="選択" icon="add" portalTargetRef={containerRef}>
              <Dropdown.Menu horizontalAlign="left">
                {items2.map((item) => (
                  <Dropdown.Item key={item.id} onClick={item.onClick}>
                    {item.content}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
            <Dropdown size="large" label="選択" icon="add" isArrowHidden portalTargetRef={containerRef}>
              <Dropdown.Menu horizontalAlign="left">
                {items2.map((item) => (
                  <Dropdown.Item key={item.id} onClick={item.onClick}>
                    {item.content}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <DropdownMenuContainer ref={containerRef} />
    </div>
  );
};

export const WithPortal: Story = {
  render: () => <DropdownWithPortal />,
};
