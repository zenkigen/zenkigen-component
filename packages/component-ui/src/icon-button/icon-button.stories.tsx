import type { Meta, StoryObj } from '@storybook/react-vite';
import { iconElements } from '@zenkigen-inc/component-icons';

import { IconButton } from '.';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    icon: {
      options: [...Object.keys(iconElements).map((iconName) => iconName)],
      control: 'select',
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
    variant: {
      options: ['outline', 'text'],
      control: { type: 'radio' },
    },
    isDisabled: {
      control: 'boolean',
    },
    isSelected: {
      control: 'boolean',
    },
    isNoPadding: {
      control: 'boolean',
    },
    iconAccentColor: {
      control: 'text',
    },
  },
};
export default meta;
type Story = StoryObj<typeof IconButton>;

export const Component: Story = {
  args: {
    icon: 'add',
    size: 'medium',
    variant: 'outline',
    isDisabled: false,
    isSelected: false,
    isNoPadding: false,
  },
  parameters: {
    chromatic: { disable: true },
  },
};

export function Base() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        <IconButton icon="add" size="small" />
        <IconButton icon="add" size="small" isDisabled />
        <IconButton icon="add" size="small" isSelected />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <IconButton icon="add" size="medium" />
        <IconButton icon="add" size="medium" isDisabled />
        <IconButton icon="add" size="medium" isSelected />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <IconButton icon="add" size="large" />
        <IconButton icon="add" size="large" isDisabled />
        <IconButton icon="add" size="large" isSelected />
      </div>

      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <IconButton variant="text" icon="add" size="small" />
        <IconButton variant="text" icon="add" size="small" isDisabled />
        <IconButton variant="text" icon="add" size="small" isSelected />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <IconButton variant="text" icon="add" size="medium" />
        <IconButton variant="text" icon="add" size="medium" isDisabled />
        <IconButton variant="text" icon="add" size="medium" isSelected />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <IconButton variant="text" icon="add" size="large" />
        <IconButton variant="text" icon="add" size="large" isDisabled />
        <IconButton variant="text" icon="add" size="large" isSelected />
      </div>

      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <IconButton variant="text" icon="add" size="small" isNoPadding />
        <IconButton variant="text" icon="add" size="small" isNoPadding isDisabled />
        <IconButton variant="text" icon="add" size="small" isNoPadding isSelected />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <IconButton variant="text" icon="add" size="medium" isNoPadding />
        <IconButton variant="text" icon="add" size="medium" isNoPadding isDisabled />
        <IconButton variant="text" icon="add" size="medium" isNoPadding isSelected />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <IconButton variant="text" icon="add" size="large" isNoPadding />
        <IconButton variant="text" icon="add" size="large" isNoPadding isDisabled />
        <IconButton variant="text" icon="add" size="large" isNoPadding isSelected />
      </div>
    </div>
  );
}

export function WithAccentColor() {
  return (
    <div className="flex flex-col gap-4">
      {/* outline variant */}
      <div>
        <div className="typography-label12regular mb-1 text-text02">outline / small</div>
        <div className="flex items-center gap-2">
          <IconButton icon="calendar-today" variant="outline" size="small" iconAccentColor="supportInfo" />
          <IconButton icon="calendar-today" variant="outline" size="small" iconAccentColor="supportSuccess" />
          <IconButton icon="calendar-today" variant="outline" size="small" iconAccentColor="supportError" />
        </div>
      </div>
      <div>
        <div className="typography-label12regular mb-1 text-text02">outline / small / isSelected</div>
        <div className="flex items-center gap-2">
          <IconButton icon="calendar-today" variant="outline" size="small" iconAccentColor="supportInfo" isSelected />
          <IconButton icon="calendar-today" variant="outline" size="small" iconAccentColor="supportSuccess" isSelected />
          <IconButton icon="calendar-today" variant="outline" size="small" iconAccentColor="supportError" isSelected />
        </div>
      </div>
      <div>
        <div className="typography-label12regular mb-1 text-text02">outline / medium</div>
        <div className="flex items-center gap-2">
          <IconButton icon="calendar-today" variant="outline" size="medium" iconAccentColor="supportInfo" />
          <IconButton icon="calendar-today" variant="outline" size="medium" iconAccentColor="supportSuccess" />
          <IconButton icon="calendar-today" variant="outline" size="medium" iconAccentColor="supportError" />
        </div>
      </div>
      <div>
        <div className="typography-label12regular mb-1 text-text02">outline / medium / isSelected</div>
        <div className="flex items-center gap-2">
          <IconButton icon="calendar-today" variant="outline" size="medium" iconAccentColor="supportInfo" isSelected />
          <IconButton icon="calendar-today" variant="outline" size="medium" iconAccentColor="supportSuccess" isSelected />
          <IconButton icon="calendar-today" variant="outline" size="medium" iconAccentColor="supportError" isSelected />
        </div>
      </div>
      <div>
        <div className="typography-label12regular mb-1 text-text02">outline / large</div>
        <div className="flex items-center gap-2">
          <IconButton icon="calendar-today" variant="outline" size="large" iconAccentColor="supportInfo" />
          <IconButton icon="calendar-today" variant="outline" size="large" iconAccentColor="supportSuccess" />
          <IconButton icon="calendar-today" variant="outline" size="large" iconAccentColor="supportError" />
        </div>
      </div>
      <div>
        <div className="typography-label12regular mb-1 text-text02">outline / large / isSelected</div>
        <div className="flex items-center gap-2">
          <IconButton icon="calendar-today" variant="outline" size="large" iconAccentColor="supportInfo" isSelected />
          <IconButton icon="calendar-today" variant="outline" size="large" iconAccentColor="supportSuccess" isSelected />
          <IconButton icon="calendar-today" variant="outline" size="large" iconAccentColor="supportError" isSelected />
        </div>
      </div>

      {/* text variant */}
      <div>
        <div className="typography-label12regular mb-1 text-text02">text / small</div>
        <div className="flex items-center gap-2">
          <IconButton icon="calendar-today" variant="text" size="small" iconAccentColor="supportInfo" />
          <IconButton icon="calendar-today" variant="text" size="small" iconAccentColor="supportSuccess" />
          <IconButton icon="calendar-today" variant="text" size="small" iconAccentColor="supportError" />
        </div>
      </div>
      <div>
        <div className="typography-label12regular mb-1 text-text02">text / small / isSelected</div>
        <div className="flex items-center gap-2">
          <IconButton icon="calendar-today" variant="text" size="small" iconAccentColor="supportInfo" isSelected />
          <IconButton icon="calendar-today" variant="text" size="small" iconAccentColor="supportSuccess" isSelected />
          <IconButton icon="calendar-today" variant="text" size="small" iconAccentColor="supportError" isSelected />
        </div>
      </div>
      <div>
        <div className="typography-label12regular mb-1 text-text02">text / medium</div>
        <div className="flex items-center gap-2">
          <IconButton icon="calendar-today" variant="text" size="medium" iconAccentColor="supportInfo" />
          <IconButton icon="calendar-today" variant="text" size="medium" iconAccentColor="supportSuccess" />
          <IconButton icon="calendar-today" variant="text" size="medium" iconAccentColor="supportError" />
        </div>
      </div>
      <div>
        <div className="typography-label12regular mb-1 text-text02">text / medium / isSelected</div>
        <div className="flex items-center gap-2">
          <IconButton icon="calendar-today" variant="text" size="medium" iconAccentColor="supportInfo" isSelected />
          <IconButton icon="calendar-today" variant="text" size="medium" iconAccentColor="supportSuccess" isSelected />
          <IconButton icon="calendar-today" variant="text" size="medium" iconAccentColor="supportError" isSelected />
        </div>
      </div>
      <div>
        <div className="typography-label12regular mb-1 text-text02">text / large</div>
        <div className="flex items-center gap-2">
          <IconButton icon="calendar-today" variant="text" size="large" iconAccentColor="supportInfo" />
          <IconButton icon="calendar-today" variant="text" size="large" iconAccentColor="supportSuccess" />
          <IconButton icon="calendar-today" variant="text" size="large" iconAccentColor="supportError" />
        </div>
      </div>
      <div>
        <div className="typography-label12regular mb-1 text-text02">text / large / isSelected</div>
        <div className="flex items-center gap-2">
          <IconButton icon="calendar-today" variant="text" size="large" iconAccentColor="supportInfo" isSelected />
          <IconButton icon="calendar-today" variant="text" size="large" iconAccentColor="supportSuccess" isSelected />
          <IconButton icon="calendar-today" variant="text" size="large" iconAccentColor="supportError" isSelected />
        </div>
      </div>
    </div>
  );
}
