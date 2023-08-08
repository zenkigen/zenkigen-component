import { FormEvent, ChangeEvent } from 'react';

import { action } from '@storybook/addon-actions';

import { Search } from '.';

export default {
  component: Search,
};

export function Base() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    action('onSubmit')(e);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    action('onChange')(e);
  };

  return (
    <div>
      <Search placeholder="検索" value="" onSubmit={handleSubmit} onChange={handleOnChange}></Search>
    </div>
  );
}
