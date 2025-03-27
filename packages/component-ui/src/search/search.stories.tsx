import { action } from '@storybook/addon-actions';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

import { Search } from '.';

export default {
  component: Search,
};

export function Base() {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    action('onSubmit')(e);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'white' }}>
        <Search
          placeholder="検索"
          value={value}
          onSubmit={handleSubmit}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
            action('onChange')(e);
          }}
          onClickClearButton={() => {
            setValue('');
          }}
        ></Search>
        <Search
          placeholder="検索"
          size="large"
          value={value2}
          onSubmit={handleSubmit}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValue2(e.target.value);
            action('onChange')(e);
          }}
          onClickClearButton={() => {
            setValue2('');
          }}
        ></Search>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'lightgrey' }}>
        <Search
          placeholder="検索"
          value={value}
          onSubmit={handleSubmit}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
            action('onChange')(e);
          }}
          onClickClearButton={() => {
            setValue('');
          }}
        ></Search>
        <Search
          placeholder="検索"
          size="large"
          value={value2}
          onSubmit={handleSubmit}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValue2(e.target.value);
            action('onChange')(e);
          }}
          onClickClearButton={() => {
            setValue2('');
          }}
        ></Search>
      </div>
    </div>
  );
}
