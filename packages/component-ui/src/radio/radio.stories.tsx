import type { Meta, StoryObj } from '@storybook/react-vite';

import { Radio } from '.';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
};
export default meta;

type Story = StoryObj<typeof Radio>;

export const Component: Story = {
  args: {
    label: 'ラベル',
    isChecked: false,
    isDisabled: false,
    name: 'radio-component',
    value: 'value',
    id: 'radio-component',
  },
  parameters: {
    chromatic: { disable: true },
  },
};

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Radio id="default-unchecked" name="default-group" label="未選択" value="unchecked" />
        <Radio id="default-checked" name="default-checked" label="選択済み" value="checked" isChecked />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Radio id="disabled-unchecked" name="disabled-group" label="無効（未選択）" value="unchecked" isDisabled />
        <Radio
          id="disabled-checked"
          name="disabled-checked"
          label="無効（選択済み）"
          value="checked"
          isChecked
          isDisabled
        />
      </div>
    </div>
  ),
};
