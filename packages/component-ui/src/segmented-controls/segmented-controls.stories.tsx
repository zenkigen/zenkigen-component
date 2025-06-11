import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { SegmentedControls } from './segmented-controls';

const meta = {
  title: 'Components/SegmentedControls',
  component: SegmentedControls,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    selectedValue: { control: 'text', description: 'Currently selected value' },
    size: { control: 'radio', options: ['small', 'medium'], description: 'Size of the segmented controls' },
    isDisabled: { control: 'boolean', description: 'Whether the segmented controls are disabled' },
    fullWidth: { control: 'boolean', description: 'Whether the segmented controls should take full width' },
    variant: { control: 'radio', options: ['default', 'iconOnly'], description: 'Variant of the segmented controls' },
  },
} satisfies Meta<typeof SegmentedControls>;

export default meta;
type Story = StoryObj<typeof meta>;

// Component for reusable story logic
const SegmentedControlsExample = ({
  initialValue = 'option1',
  size = 'medium' as const,
  variant = 'default' as const,
  isDisabled = false,
  fullWidth = false,
  children,
}: {
  initialValue?: string;
  size?: 'small' | 'medium';
  variant?: 'default' | 'iconOnly';
  isDisabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  return (
    <SegmentedControls
      selectedValue={selectedValue}
      onChange={(value: string) => setSelectedValue(value)}
      size={size}
      variant={variant}
      isDisabled={isDisabled}
      fullWidth={fullWidth}
    >
      {children}
    </SegmentedControls>
  );
};

// Compound Component Pattern Examples
export const CompoundDefault: Story = {
  render: () => (
    <SegmentedControlsExample>
      <SegmentedControls.Item label="ボタンラベル" value="option1" />
      <SegmentedControls.Item label="ボタンラベル" value="option2" />
      <SegmentedControls.Item label="ボタンラベル" value="option3" />
    </SegmentedControlsExample>
  ),
  args: {},
};

export const CompoundSmall: Story = {
  render: () => (
    <SegmentedControlsExample initialValue="option2" size="small">
      <SegmentedControls.Item label="ボタンラベル" value="option1" />
      <SegmentedControls.Item label="ボタンラベル" value="option2" />
      <SegmentedControls.Item label="ボタンラベル" value="option3" />
    </SegmentedControlsExample>
  ),
  args: {},
};

export const CompoundIconOnly: Story = {
  render: () => (
    <SegmentedControlsExample initialValue="add1" variant="iconOnly">
      <SegmentedControls.Item icon="add" value="add1" />
      <SegmentedControls.Item icon="add" value="add2" />
      <SegmentedControls.Item icon="add" value="add3" />
    </SegmentedControlsExample>
  ),
  args: {},
};

export const CompoundWithIcons: Story = {
  render: () => (
    <SegmentedControlsExample initialValue="list">
      <SegmentedControls.Item label="リスト" value="list" icon="list" />
      <SegmentedControls.Item label="グリッド" value="grid" icon="table" />
      <SegmentedControls.Item label="カード" value="card" icon="documents" />
    </SegmentedControlsExample>
  ),
  args: {},
};

export const CompoundFullWidth: Story = {
  render: () => (
    <SegmentedControlsExample fullWidth>
      <SegmentedControls.Item label="ボタンラベル" value="option1" />
      <SegmentedControls.Item label="ボタンラベル" value="option2" />
      <SegmentedControls.Item label="ボタンラベル" value="option3" />
    </SegmentedControlsExample>
  ),
  args: {},
};

export const CompoundDisabled: Story = {
  render: () => (
    <SegmentedControlsExample isDisabled>
      <SegmentedControls.Item label="ボタンラベル" value="option1" />
      <SegmentedControls.Item label="ボタンラベル" value="option2" />
      <SegmentedControls.Item label="ボタンラベル" value="option3" />
    </SegmentedControlsExample>
  ),
  args: {},
};

export const CompoundPartiallyDisabled: Story = {
  render: () => (
    <SegmentedControlsExample>
      <SegmentedControls.Item label="ボタンラベル" value="option1" />
      <SegmentedControls.Item label="ボタンラベル" value="option2" isDisabled />
      <SegmentedControls.Item label="ボタンラベル" value="option3" />
    </SegmentedControlsExample>
  ),
  args: {},
};
