import type { Meta, StoryObj } from '@storybook/react';
import { iconElements } from '@zenkigen-inc/component-icons';
import type { iconColors } from '@zenkigen-inc/component-theme';

import { Icon } from '.';

type Color = keyof typeof iconColors;

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    docs: {
      source: {
        code: ``,
      },
    },
  },
  argTypes: {
    name: { control: 'select', options: Object.keys(iconElements) },
    size: { control: 'select', options: ['x-small', 'small', 'medium', 'large', 'x-large'] },
    color: { control: 'select', options: ['icon01', 'icon02', 'icon03', 'iconOnColor'] },
    isDisabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Component: Story = {
  args: {
    size: 'medium',
    color: 'icon01',
    isDisabled: false,
  },
  argTypes: {
    name: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: function MyFunc({ ...args }) {
    const iconNames = Object.keys(iconElements);

    return (
      <div className="flex flex-wrap gap-4">
        {iconNames.map((iconName) => (
          <div
            key={iconName}
            className={[
              'flex min-h-[100px] w-[140px] flex-col items-center justify-center gap-2 border border-gray-200 py-4',
              args.color === 'iconOnColor' ? 'bg-interactive01' : '',
            ].join(' ')}
          >
            <Icon {...args} name={iconName as keyof typeof iconElements} />
            <div className="typography-body12regular">{iconName}</div>
          </div>
        ))}
      </div>
    );
  },
};

type Props = {
  color?: Color;
  className?: string;
};

function IconList(props: Props) {
  const iconNames = Object.keys(iconElements);

  return (
    <div className={props.className}>
      {iconNames.map((iconName) => (
        <Icon key={iconName} name={iconName as keyof typeof iconElements} color={props.color} />
      ))}
    </div>
  );
}

export function Base() {
  return (
    <div>
      <IconList />
    </div>
  );
}

export function Color() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>icon01:</div>
      <IconList color="icon01" />
      <div>icon02:</div>
      <IconList color="icon02" />
      <div>icon03:</div>
      <IconList color="icon03" />
      <div>iconOnColor:</div>
      <IconList color="iconOnColor" className="bg-interactive01" />
    </div>
  );
}
