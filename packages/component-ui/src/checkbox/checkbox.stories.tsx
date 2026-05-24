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
    size: {
      options: ['medium', 'large'],
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
    size: 'medium',
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
      <div className="flex items-center gap-4">
        <Checkbox id="default-large-unchecked" label="未選択" color="default" size="large" />
        <Checkbox id="default-large-checked" label="選択済み" color="default" size="large" isChecked />
        <Checkbox
          id="default-large-indeterminate"
          label="インデターミネイト"
          color="default"
          size="large"
          isChecked
          isIndeterminate
        />
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
      <div className="flex items-center gap-4">
        <Checkbox id="gray-large-unchecked" label="未選択" color="gray" size="large" />
        <Checkbox id="gray-large-checked" label="選択済み" color="gray" size="large" isChecked />
        <Checkbox
          id="gray-large-indeterminate"
          label="インデターミネイト"
          color="gray"
          size="large"
          isChecked
          isIndeterminate
        />
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
      <div className="flex items-center gap-4">
        <Checkbox id="error-large-unchecked" label="未選択" color="error" size="large" />
        <Checkbox id="error-large-checked" label="選択済み" color="error" size="large" isChecked />
        <Checkbox
          id="error-large-indeterminate"
          label="インデターミネイト"
          color="error"
          size="large"
          isChecked
          isIndeterminate
        />
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
      <div className="flex items-center gap-4">
        <Checkbox id="disabled-large-unchecked" label="無効(未選択)" size="large" isDisabled />
        <Checkbox id="disabled-large-checked" label="無効(選択済み)" size="large" isDisabled isChecked />
        <Checkbox
          id="disabled-large-indeterminate"
          label="無効(インデターミネイト)"
          size="large"
          isDisabled
          isChecked
          isIndeterminate
        />
      </div>
    </div>
  ),
};
