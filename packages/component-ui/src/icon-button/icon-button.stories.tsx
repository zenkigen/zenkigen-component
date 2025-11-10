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
