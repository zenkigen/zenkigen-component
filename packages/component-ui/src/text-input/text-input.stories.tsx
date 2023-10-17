import { ChangeEvent, useState } from 'react';

import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { TextInput } from '.';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  argTypes: {
    // size: {
    //   options: ['medium', 'large'],
    //   control: { type: 'radio' },
    // },
    status: {
      options: [null, 'error'],
      control: { type: 'radio' },
    },
  },
};

type Story = StoryObj<typeof TextInput>;

export default meta;

export const Base: Story = {
  args: {},
  render: function MyFunc({ ...args }) {
    const [value, setValue] = useState<string>(args.value);
    const [value2, setValue2] = useState<string>('入力した文字列。');
    return (
      <div className="flex flex-col gap-10">
        <div>
          <TextInput
            value={value}
            placeholder="入力してください"
            hint="文字以内で入力してください"
            sizeValue="medium"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              action('onChange')(e);
              setValue(e.target.value);
            }}
            onClickClearButton={() => {
              setValue('');
            }}
          />
        </div>
        <div>
          <TextInput
            value={value}
            status="error"
            placeholder="入力してください"
            hint="入力内容にエラーがあります"
            sizeValue="medium"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              action('onChange')(e);
              setValue(e.target.value);
            }}
            onClickClearButton={() => {
              setValue('');
            }}
          />
        </div>
        <div>
          <TextInput
            value={value2}
            status="error"
            placeholder="入力してください"
            hint="入力内容にエラーがあります"
            sizeValue="medium"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              action('onChange')(e);
              setValue2(e.target.value);
            }}
            onClickClearButton={() => {
              setValue2('');
            }}
          />
        </div>
        <div>
          <TextInput
            value={value}
            placeholder="入力してください"
            hint="文字以内で入力してください"
            sizeValue="large"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              action('onChange')(e);
              setValue(e.target.value);
            }}
            onClickClearButton={() => {
              setValue('');
            }}
          />
        </div>
        <div>
          <TextInput
            value={value}
            status="error"
            placeholder="入力してください"
            hint="入力内容にエラーがあります"
            sizeValue="large"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              action('onChange')(e);
              setValue(e.target.value);
            }}
            onClickClearButton={() => {
              setValue('');
            }}
          />
        </div>
        <div>
          <TextInput
            value={value2}
            status="error"
            placeholder="入力してください"
            hint="入力内容にエラーがあります"
            sizeValue="large"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              action('onChange')(e);
              setValue2(e.target.value);
            }}
            onClickClearButton={() => {
              setValue2('');
            }}
          />
        </div>
      </div>
    );
  },
};

export const Layout: Story = {
  args: {
    placeholder: '入力してください',
    hint: '入力してください',
  },
  render: function MyFunc({ ...args }) {
    const [value, setValue] = useState<string>(args.value);
    return (
      <div className="flex flex-col gap-10">
        <div>
          <label htmlFor="my-input">名前：</label>
          <TextInput
            id="my-input"
            value={value}
            placeholder={args.placeholder}
            status={args.status}
            hint={args.hint}
            sizeValue="medium"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              action('onChange')(e);
              setValue(e.target.value);
            }}
            onClickClearButton={() => {
              setValue('');
            }}
          />
        </div>
        <div>
          <label htmlFor="my-input-2">住所：</label>
          <TextInput
            id="my-input-2"
            value={value}
            placeholder={args.placeholder}
            status={args.status}
            hint={args.hint}
            sizeValue="large"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              action('onChange')(e);
              setValue(e.target.value);
            }}
            onClickClearButton={() => {
              setValue('');
            }}
          />
        </div>
      </div>
    );
  },
};
