import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControlItem } from './segmented-control-item';

const meta = {
  title: 'UI/SegmentedControlItem',
  component: SegmentedControlItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text', description: 'Unique identifier for the item' },
    label: { control: 'text', description: 'Text label for the item' },
    value: { control: 'text', description: 'Value associated with the item' },
    icon: { control: 'text', description: 'Icon to display' },
    isSelected: { control: 'boolean', description: 'Whether the item is currently selected' },
    isDisabled: { control: 'boolean', description: 'Whether the item is disabled' },
    isHovered: { control: 'boolean', description: 'Whether the item is hovered' },
    size: { control: 'radio', options: ['small', 'medium'], description: 'Size of the control item' },
    variant: { control: 'radio', options: ['default', 'iconOnly'], description: 'Variant of the control item' },
    onClick: { action: 'onClick', description: 'Callback fired when item is clicked' },
  },
} satisfies Meta<typeof SegmentedControlItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'item1',
    label: 'ボタンラベル',
    value: 'item1',
    isSelected: false,
    isDisabled: false,
    isHovered: false,
    size: 'medium',
    variant: 'default',
  },
};

export const Selected: Story = {
  args: {
    id: 'item1',
    label: 'ボタンラベル',
    value: 'item1',
    isSelected: true,
    isDisabled: false,
    isHovered: false,
    size: 'medium',
    variant: 'default',
  },
};

export const Hovered: Story = {
  args: {
    id: 'item1',
    label: 'ボタンラベル',
    value: 'item1',
    isSelected: false,
    isDisabled: false,
    isHovered: true,
    size: 'medium',
    variant: 'default',
  },
};

export const Disabled: Story = {
  args: {
    id: 'item1',
    label: 'ボタンラベル',
    value: 'item1',
    isSelected: false,
    isDisabled: true,
    isHovered: false,
    size: 'medium',
    variant: 'default',
  },
};

export const Small: Story = {
  args: {
    id: 'item1',
    label: 'ボタンラベル',
    value: 'item1',
    isSelected: false,
    isDisabled: false,
    isHovered: false,
    size: 'small',
    variant: 'default',
  },
};

export const WithIcon: Story = {
  args: {
    id: 'item1',
    label: 'リスト',
    value: 'item1',
    icon: '📋',
    isSelected: false,
    isDisabled: false,
    isHovered: false,
    size: 'medium',
    variant: 'default',
  },
};

export const IconOnly: Story = {
  args: {
    id: 'item1',
    value: 'item1',
    icon: '+',
    isSelected: false,
    isDisabled: false,
    isHovered: false,
    size: 'medium',
    variant: 'iconOnly',
  },
};

export const IconOnlySelected: Story = {
  args: {
    id: 'item1',
    value: 'item1',
    icon: '+',
    isSelected: true,
    isDisabled: false,
    isHovered: false,
    size: 'medium',
    variant: 'iconOnly',
  },
};
