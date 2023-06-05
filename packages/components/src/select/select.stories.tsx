import type { Meta, StoryObj } from '@storybook/react';
import { IconName, iconElements } from '@zenkigen-component/icons';

import { Select } from './select';

const meta: Meta<typeof Select> = {
  component: Select,
  argTypes: {
    width: {
      type: 'string',
    },
    placeholder: {
      type: 'string',
    },
    placeholderIcon: {
      options: Object.keys(iconElements)
        .map((iconName) => iconName)
        .concat(['']),
      control: 'select',
    },
    defaultOptionId: {
      type: 'string',
    },
  },
};
export default meta;
type Story = StoryObj<typeof Select>;

const optionsList = [
  { id: '1', label: '選択肢A', value: 'A', icon: 'add' as IconName },
  { id: '2', label: '選択肢B', value: 'B', icon: 'add' as IconName },
  { id: '3', label: '選択肢C', value: 'C', icon: 'add' as IconName },
];

const optionsList2 = [
  { id: '1', label: '選択肢A', value: 'A', icon: 'add' as IconName },
  { id: '2', label: '選択肢B', value: 'B', icon: 'add' as IconName },
  { id: '3', label: '選択肢C', value: 'C', icon: 'add' as IconName },
  { id: '4', label: '選択肢D', value: 'D', icon: 'add' as IconName },
  { id: '5', label: '選択肢E', value: 'E', icon: 'add' as IconName },
  { id: '6', label: '選択肢F', value: 'F', icon: 'add' as IconName },
];

export const Base: Story = {
  render: ({ ...args }) => (
    <div style={{ display: 'grid', rowGap: '180px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
        <Select
          {...args}
          size="x-small"
          variant="outline"
          options={optionsList2}
          placeholder="選択"
          optionListMaxHeight="120px"
        />
        <Select {...args} size="small" variant="outline" options={optionsList} placeholder="選択" />
        <Select {...args} size="medium" variant="outline" options={optionsList} placeholder="選択" />
        <Select {...args} size="large" variant="outline" options={optionsList} placeholder="選択" />
        <Select {...args} size="large" variant="outline" options={optionsList} placeholder="選択" isDisabled />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
        <Select
          {...args}
          size="x-small"
          variant="text"
          options={optionsList2}
          placeholder="選択"
          optionListMaxHeight="120px"
        />
        <Select {...args} size="small" variant="text" options={optionsList} placeholder="選択" />
        <Select {...args} size="medium" variant="text" options={optionsList} placeholder="選択" />
        <Select {...args} size="large" variant="text" options={optionsList} placeholder="選択" />
        <Select {...args} size="large" variant="text" options={optionsList} placeholder="選択" isDisabled />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
        <Select
          {...args}
          size="x-small"
          variant="outline"
          options={optionsList2}
          placeholder="選択選択選択選択選択"
          width={140}
          optionListMaxHeight={120}
        />
        <Select
          {...args}
          size="small"
          variant="outline"
          options={optionsList}
          placeholder="選択選択選択選択選択"
          width={140}
        />
        <Select
          {...args}
          size="medium"
          variant="outline"
          options={optionsList}
          placeholder="選択選択選択選択選択"
          width={140}
        />
        <Select
          {...args}
          size="large"
          variant="outline"
          options={optionsList}
          placeholder="選択選択選択選択選択"
          width={140}
        />
        <Select
          {...args}
          size="large"
          variant="outline"
          options={optionsList}
          placeholder="選択選択選択選択選択"
          width={140}
          isDisabled
        />
      </div>
    </div>
  ),
};
