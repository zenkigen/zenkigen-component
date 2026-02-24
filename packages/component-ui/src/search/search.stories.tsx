import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { action } from 'storybook/actions';

import { Search } from '.';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
};
export default meta;

type Story = StoryObj<typeof Search>;

export const Component: Story = {
  args: {
    size: 'medium',
    placeholder: 'placeholder',
    width: '100%',
    value: '',
  },
  parameters: {
    chromatic: { disable: true },
  },
};

export function Focused() {
  const [value, setValue] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.querySelector('input')?.focus();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ backgroundColor: 'white' }}>
        <Search
          ref={ref}
          placeholder="フォーカス状態"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
          }}
          onClickClearButton={() => {
            setValue('');
          }}
        />
      </div>
    </div>
  );
}

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
