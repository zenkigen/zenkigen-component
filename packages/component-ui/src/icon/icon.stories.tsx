import type { Meta, StoryObj } from '@storybook/react-vite';
import { iconElements } from '@zenkigen-inc/component-icons';

import type { ColorToken } from '../color-types';
import { Icon } from '.';

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
    color: {
      control: 'text',
      description: 'Color token (e.g. "icon01", "interactive01", "supportError")',
    },
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
  color?: ColorToken;
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

export function SingleIconNoColor() {
  return (
    <div className="flex items-center gap-4 p-8">
      <Icon name="search" size="x-large" />
      <span>color 未指定</span>
    </div>
  );
}

/**
 * 着色 4 経路の結合検証用 fixture。
 * fill-* の CSS 変数ブリッジが stroke 系（lucide 由来）アイコンにも効くことを、
 * 利用側で実在する 4 つの着色経路すべてで確認する（④ は実際に hover して確認する）。
 */
export function ColorPaths() {
  const names = ['close', 'search', 'harutaka', 'signal-low'] as const;

  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <div className="typography-body14bold">① color prop（interactive01）:</div>
        <div className="flex items-center gap-2">
          {names.map((name) => (
            <Icon key={name} name={name} size="large" color="interactive01" />
          ))}
        </div>
      </div>
      <div>
        <div className="typography-body14bold">② className に fill-* 直渡し（supportError）:</div>
        <div className="flex items-center gap-2">
          {names.map((name) => (
            <Icon key={name} name={name} size="large" className="fill-supportError" />
          ))}
        </div>
      </div>
      <div>
        <div className="typography-body14bold">③ 親ラッパー要素へ fill-* 付与（supportSuccess）:</div>
        <div className="flex items-center gap-2 fill-supportSuccess">
          {names.map((name) => (
            <Icon key={name} name={name} size="large" />
          ))}
        </div>
      </div>
      <div>
        <div className="typography-body14bold">④ group-hover:fill-*（hover で supportError に変化）:</div>
        <div className="group flex items-center gap-2 fill-icon01">
          {names.map((name) => (
            <Icon key={name} name={name} size="large" className="group-hover:fill-supportError" />
          ))}
        </div>
      </div>
      <div>
        <div className="typography-body14bold">参考: accentColor 併用（color=icon01 / accentColor=supportError）:</div>
        <div className="flex items-center gap-2">
          <Icon name="signal-low" size="large" color="icon01" accentColor="supportError" />
          <Icon name="signal-off" size="large" color="icon01" accentColor="supportError" />
          <Icon name="volume-off" size="large" color="icon01" accentColor="supportError" />
          <Icon name="mic" size="large" color="icon01" accentColor="supportError" />
        </div>
      </div>
    </div>
  );
}
