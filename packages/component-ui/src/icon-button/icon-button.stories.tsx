import type { Meta, StoryObj } from '@storybook/react';
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
    isNoPadding: false,
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
      </div>
    </div>
  );
}
