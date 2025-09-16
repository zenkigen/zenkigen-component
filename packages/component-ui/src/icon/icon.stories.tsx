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
    className: {
      control: 'text',
    },
    accentClassName: {
      control: 'text',
      description: 'Tailwind CSS class for .accentColor elements (e.g. "fill-red-500")',
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
  accentClassName?: string;
};

function IconList(props: Props) {
  const iconNames = Object.keys(iconElements);

  return (
    <div>
      <div className="text-1">
        {props.className}
        {props.accentClassName}
      </div>
      {iconNames.map((iconName) => (
        <Icon
          key={iconName}
          name={iconName as keyof typeof iconElements}
          color={props.color}
          accentClassName={props.accentClassName}
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
      <IconList color="icon01" accentClassName="fill-interactive01" />
      <IconList color="icon01" accentClassName="fill-interactive02" />
      <IconList color="icon01" accentClassName="fill-interactive03" />
      <IconList color="icon01" accentClassName="fill-interactive04" />

      {/* Support Colors */}
      <div>Support Colors:</div>
      <IconList color="icon01" accentClassName="fill-supportError" />
      <IconList color="icon01" accentClassName="fill-supportSuccess" />
      <IconList color="icon01" accentClassName="fill-supportInfo" />
      <IconList color="icon01" accentClassName="fill-supportWarning" />
      <IconList color="icon01" accentClassName="fill-supportDanger" />

      {/* Disabled Colors */}
      <div>Disabled Colors:</div>
      <IconList color="icon01" accentClassName="fill-disabled01" />
      <IconList color="icon01" accentClassName="fill-disabled02" />
      <IconList color="icon01" accentClassName="fill-disabled03" />
      <IconList color="icon01" accentClassName="fill-disabled04" />

      {/* Color Variants */}
      <div>Color Variants:</div>
      <IconList color="icon01" accentClassName="fill-blue-blue100" />
      <IconList color="icon01" accentClassName="fill-gray-gray100" />
      <IconList color="icon01" accentClassName="fill-red-red100" />
      <IconList color="icon01" accentClassName="fill-yellow-yellow100" />
      <IconList color="icon01" accentClassName="fill-green-green100" />
      <IconList color="icon01" accentClassName="fill-purple-purple100" />
      <IconList color="icon01" accentClassName="fill-blueGreen-blueGreen100" />
    </div>
  );
}

export function AccentClassName() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <h3 className="mb-4 text-xl font-semibold">アクセントクラス指定の例</h3>
        <p className="mb-6 text-base">
          accentClassNameプロパティを使用して、アイコン内の.accentColorクラス要素に自由なTailwind
          CSSクラスを適用できます。
          <br />
          例：micアイコンにはaccentColorクラス付きの要素があります。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>アクセントクラスなし:</div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Icon name="mic" size="large" color="icon01" />
            <span>デフォルトの色</span>
          </div>

          <div>fill-interactive01 アクセントクラス:</div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Icon name="mic" size="large" color="icon01" accentClassName="fill-interactive01" />
            <span>アクセント部分がインタラクティブカラーに</span>
          </div>

          <div>fill-red-500 アクセントクラス:</div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Icon name="mic" size="large" color="icon01" accentClassName="fill-supportSuccess" />
            <span>アクセント部分が赤色に</span>
          </div>

          <div>fill-blue-600 アクセントクラス:</div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Icon name="mic" size="large" color="icon01" accentClassName="fill-red-500" />
            <span>アクセント部分が青色に</span>
          </div>

          <div>fill-green-500 hover:fill-green-700 アクセントクラス:</div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Icon name="mic" size="large" color="icon01" accentClassName="fill-green-500 hover:fill-green-700" />
            <span>ホバーで色が変わる</span>
          </div>

          <div>無効状態（アクセントクラスも無効化される）:</div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Icon name="mic" size="large" color="icon01" accentClassName="fill-supportSuccess" isDisabled />
            <span>無効状態では全体がdisabled01色に</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xl font-semibold">様々なアクセントクラス例</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {[
            { className: 'fill-interactive01', label: 'Interactive01' },
            { className: 'fill-supportError', label: 'Error' },
            { className: 'fill-supportSuccess', label: 'Success' },
            { className: 'fill-supportWarning', label: 'Warning' },
            { className: 'fill-purple-500', label: 'Purple' },
            { className: 'fill-orange-500', label: 'Orange' },
            { className: 'fill-pink-500', label: 'Pink' },
          ].map(({ className, label }) => (
            <div
              key={className}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
            >
              <Icon name="mic" size="x-large" color="icon01" accentClassName={className} />
              <span className="text-sm">{label}</span>
              <code className="text-xs text-gray-600">{className}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
