import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    color: {
      options: ['default', 'gray', 'error'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Component: Story = {
  args: {
    label: 'ラベル',
    color: 'default',
    isChecked: false,
    isIndeterminate: false,
    isDisabled: false,
    id: 'checkbox-component',
  },
  parameters: {
    chromatic: { disable: true },
  },
};

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Checkbox id="default-unchecked" label="未選択" color="default" />
        <Checkbox id="default-checked" label="選択済み" color="default" isChecked />
        <Checkbox id="default-indeterminate" label="インデターミネイト" color="default" isChecked isIndeterminate />
      </div>
    </div>
  ),
};

export const Gray: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Checkbox id="gray-unchecked" label="未選択" color="gray" />
        <Checkbox id="gray-checked" label="選択済み" color="gray" isChecked />
        <Checkbox id="gray-indeterminate" label="インデターミネイト" color="gray" isChecked isIndeterminate />
      </div>
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Checkbox id="error-unchecked" label="未選択" color="error" />
        <Checkbox id="error-checked" label="選択済み" color="error" isChecked />
        <Checkbox id="error-indeterminate" label="インデターミネイト" color="error" isChecked isIndeterminate />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Checkbox id="disabled-unchecked" label="無効(未選択)" isDisabled />
        <Checkbox id="disabled-checked" label="無効(選択済み)" isDisabled isChecked />
        <Checkbox id="disabled-indeterminate" label="無効(インデターミネイト)" isDisabled isChecked isIndeterminate />
      </div>
    </div>
  ),
};
