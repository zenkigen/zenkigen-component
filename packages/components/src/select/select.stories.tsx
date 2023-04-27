import type { Meta, StoryObj } from '@storybook/react';

import { Select, SelectOption } from './select';

const meta: Meta<typeof Select> = {
  component: Select,
};
export default meta;
type Story = StoryObj<typeof Select>;

const optionsList1 = [
  { id: '1', value: '選択肢A', icon: 'add' },
  { id: '2', value: '選択肢B', icon: 'add' },
  { id: '3', value: '選択肢C', icon: 'add' },
] as SelectOption[];

const placeholder1: SelectOption = {
  id: 'placeholder',
  value: '選択してください',
  icon: 'add',
};

export const Base: Story = {
  render: ({ ...args }) => (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px', marginBottom: '200px' }}>
        <Select {...args} size="small" variant="outline" options={optionsList1} placeholder={placeholder1} />
        <Select {...args} size="small-medium" variant="outline" options={optionsList1} placeholder={placeholder1} />
        <Select {...args} size="medium" variant="outline" options={optionsList1} placeholder={placeholder1} />
        <Select {...args} size="large" variant="outline" options={optionsList1} placeholder={placeholder1} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
        <Select {...args} size="small" variant="text" options={optionsList1} placeholder={placeholder1} />
        <Select {...args} size="small-medium" variant="text" options={optionsList1} placeholder={placeholder1} />
        <Select {...args} size="medium" variant="text" options={optionsList1} placeholder={placeholder1} />
        <Select {...args} size="large" variant="text" options={optionsList1} placeholder={placeholder1} />
      </div>
    </>
  ),
};
