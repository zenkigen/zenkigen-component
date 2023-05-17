import { ChangeEvent, useCallback, useState } from 'react';

import { Radio } from '.';

export default {
  component: Radio,
};

export function Base() {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setSelectedValue(value),
    [],
  );

  return (
    <ul>
      <div
        style={{
          marginBottom: '24px',
        }}
      >
        <Radio
          name="radio-group"
          label="Radio button 1"
          value="foo"
          onChange={handleChange}
          isChecked={selectedValue === 'foo'}
        />
      </div>
      <div
        style={{
          marginBottom: '24px',
        }}
      >
        <Radio
          name="radio-group"
          label="Radio button 2"
          value="bar"
          onChange={handleChange}
          isChecked={selectedValue === 'bar'}
        />
      </div>
      <div
        style={{
          marginBottom: '24px',
        }}
      >
        <Radio
          name="radio-group"
          label="Radio button 1"
          value="foo"
          onChange={handleChange}
          isChecked={selectedValue === 'foo'}
          isDisabled
        />
      </div>
      <div
        style={{
          marginBottom: '24px',
        }}
      >
        <Radio
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
