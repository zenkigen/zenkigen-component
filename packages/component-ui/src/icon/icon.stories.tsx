import type { Meta, StoryObj } from '@storybook/react';
import { iconElements } from '@zenkigen-inc/component-icons';
import type { iconColors } from '@zenkigen-inc/component-theme';

import type { ColorToken } from '../color-types';
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
    className: {
      control: 'text',
    },
    accentColor: {
      control: 'text',
      description: 'Color token for .accentColor elements (e.g. "interactive01", "supportError")',
    },
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
  accentColor?: ColorToken;
};

function IconList(props: Props) {
  const iconNames = Object.keys(iconElements);

  return (
    <div>
      <div className="text-1">
        {props.className}
        {props.accentColor}
      </div>
      {iconNames.map((iconName) => (
        <Icon
          key={iconName}
          name={iconName as keyof typeof iconElements}
          color={props.color}
          accentColor={props.accentColor}
          className={props.className}
        />
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

export function ColorFill() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Interactive Colors */}
      <div>Interactive Colors:</div>
      <IconList className="fill-interactive01" />
      <IconList className="fill-interactive02" />
      <IconList className="fill-interactive03" />
      <IconList className="fill-interactive04" />

      {/* Support Colors */}
      <div>Support Colors:</div>
      <IconList className="fill-supportError" />
      <IconList className="fill-supportSuccess" />
      <IconList className="fill-supportInfo" />
      <IconList className="fill-supportWarning" />
      <IconList className="fill-supportDanger" />

      {/* Disabled Colors */}
      <div>Disabled Colors:</div>
      <IconList className="fill-disabled01" />
      <IconList className="fill-disabled02" />
      <IconList className="fill-disabled03" />
      <IconList className="fill-disabled04" />

      {/* Color Variants */}
      <div>Color Variants:</div>
      <IconList className="fill-blue-blue100" />
      <IconList className="fill-gray-gray100" />
      <IconList className="fill-red-red100" />
      <IconList className="fill-yellow-yellow100" />
      <IconList className="fill-green-green100" />
      <IconList className="fill-purple-purple100" />
      <IconList className="fill-blueGreen-blueGreen100" />
    </div>
  );
}

export function AccentColorFill() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Interactive Colors */}
      <div>Interactive Colors:</div>
      <IconList color="icon01" accentColor="interactive01" />
      <IconList color="icon01" accentColor="interactive02" />
      <IconList color="icon01" accentColor="interactive03" />
      <IconList color="icon01" accentColor="interactive04" />

      {/* Support Colors */}
      <div>Support Colors:</div>
      <IconList color="icon01" accentColor="supportError" />
      <IconList color="icon01" accentColor="supportSuccess" />
      <IconList color="icon01" accentColor="supportInfo" />
      <IconList color="icon01" accentColor="supportWarning" />
      <IconList color="icon01" accentColor="supportDanger" />

      {/* Disabled Colors */}
      <div>Disabled Colors:</div>
      <IconList color="icon01" accentColor="disabled01" />
      <IconList color="icon01" accentColor="disabled02" />
      <IconList color="icon01" accentColor="disabled03" />
      <IconList color="icon01" accentColor="disabled04" />

      {/* Color Variants */}
      <div>Color Variants:</div>
      <IconList color="icon01" accentColor="blue-blue100" />
      <IconList color="icon01" accentColor="gray-gray100" />
      <IconList color="icon01" accentColor="red-red100" />
      <IconList color="icon01" accentColor="yellow-yellow100" />
      <IconList color="icon01" accentColor="green-green100" />
      <IconList color="icon01" accentColor="purple-purple100" />
      <IconList color="icon01" accentColor="blueGreen-blueGreen100" />
    </div>
  );
}
