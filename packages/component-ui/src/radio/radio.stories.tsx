import type { Meta, StoryObj } from '@storybook/react';
import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

import { Radio } from '.';

const meta: Meta<typeof Radio> = {
  component: Radio,
};
export default meta;

type Story = StoryObj<typeof Radio>;

export const Component: Story = {
  args: {
    label: 'label',
    isChecked: false,
    isDisabled: false,
    name: 'name',
    value: 'value',
    id: 'id',
  },
};

export function Base() {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setSelectedValue(value),
    [],
  );

  return (
    <ul>
      <div className="mb-6">
        <Radio
          id="1"
          name="radio-group"
          label="Radio button 1"
          value="foo"
          onChange={handleChange}
          isChecked={selectedValue === 'foo'}
        />
      </div>
      <div className="mb-6">
        <Radio
          id="2"
          name="radio-group"
          label="Radio button 2"
          value="bar"
          onChange={handleChange}
          isChecked={selectedValue === 'bar'}
        />
      </div>
      <div className="mb-6">
        <Radio
          id="1"
          name="radio-group"
          label="Radio button 1"
          value="foo"
          onChange={handleChange}
          isChecked={selectedValue === 'foo'}
          isDisabled
        />
      </div>
      <div className="mb-6">
        <Radio
          id="2"
          name="radio-group"
          label="Radio button 2"
          value="bar"
          onChange={handleChange}
          isChecked={selectedValue === 'bar'}
          isDisabled
        />
      </div>
    </ul>
  );
}
