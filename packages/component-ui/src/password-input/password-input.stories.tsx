import type { Meta, StoryObj } from '@storybook/react-vite';
import clsx from 'clsx';
import type { ChangeEvent, ReactNode } from 'react';
import { useState } from 'react';
import { action } from 'storybook/actions';

import { PasswordInput } from '.';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Component: Story = {
  args: {
    // eslint-disable-next-line no-undefined
    value: undefined,
    size: 'medium',
    placeholder: 'パスワードを入力してください',
    isError: false,
    disabled: false,
  },
  parameters: {
    chromatic: { disable: true },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['medium', 'large'],
    },
  },
  render: function MyFunc({ ...args }) {
    const [value, setValue] = useState<string>('');

    return (
      <div className="flex w-full flex-col">
        <div>
          <PasswordInput
            {...args}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              action('onChange')(e);
              setValue(e.target.value);
            }}
          />
        </div>
      </div>
    );
  },
};

type ErrorTextProps = {
  children?: ReactNode;
  isError?: boolean;
};

const ErrorText = ({ isError = false, ...props }: ErrorTextProps) => {
  const classes = clsx('typography-label11regular mt-1 px-2', {
    'text-text02': !isError,
    'text-supportError': isError,
  });

  return <div className={classes}>{props.children}</div>;
};

export const Base: Story = {
  args: {
    value: '',
  },
  render: function MyFunc({ ...args }) {
    const [value, setValue] = useState<string>(args.value);
    const [valueWithText, setValueWithText] = useState<string>('password123');
    const [errorValue, setErrorValue] = useState<string>('error');

    return (
      <div className="flex gap-10">
        {/* サイズ：medium */}
        <div style={{ width: 300 }} className="flex flex-col gap-12">
          <div>
            <PasswordInput
              value={value}
              placeholder="パスワードを入力してください"
              size="medium"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
            />
            <ErrorText>8文字以上で入力してください</ErrorText>
          </div>
          <div>
            <PasswordInput
              value={errorValue}
              placeholder="パスワードを入力してください"
              size="medium"
              isError
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setErrorValue(e.target.value);
              }}
            />
            <ErrorText isError>パスワードが正しくありません</ErrorText>
          </div>
          <div>
            <PasswordInput
              value={valueWithText}
              placeholder="パスワードを入力してください"
              size="medium"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValueWithText(e.target.value);
              }}
            />
            <ErrorText>入力済み（表示/非表示切り替え確認用）</ErrorText>
          </div>
          <div>
            <PasswordInput
              value={value}
              placeholder="パスワードを入力してください"
              size="medium"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
              disabled
            />
            <ErrorText>無効状態</ErrorText>
          </div>
          <div>
            <PasswordInput
              value={valueWithText}
              placeholder="パスワードを入力してください"
              size="medium"
              disabled
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValueWithText(e.target.value);
              }}
            />
            <ErrorText>無効状態（入力済み）</ErrorText>
          </div>
          <div>
            <PasswordInput
              value={value}
              placeholder="パスワードを入力してください"
              size="medium"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
            />
            <ErrorText>基本状態</ErrorText>
          </div>
        </div>
        {/* サイズ：large */}
        <div style={{ width: 300 }} className="flex flex-col gap-10">
          <div>
            <PasswordInput
              value={value}
              placeholder="パスワードを入力してください"
              size="large"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
            />
            <ErrorText>8文字以上で入力してください</ErrorText>
          </div>
          <div>
            <PasswordInput
              value={errorValue}
              placeholder="パスワードを入力してください"
              size="large"
              isError
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setErrorValue(e.target.value);
              }}
            />
            <ErrorText isError>パスワードが正しくありません</ErrorText>
          </div>
          <div>
            <PasswordInput
              value={valueWithText}
              placeholder="パスワードを入力してください"
              size="large"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValueWithText(e.target.value);
              }}
            />
            <ErrorText>入力済み（表示/非表示切り替え確認用）</ErrorText>
          </div>
          <div>
            <PasswordInput
              value=""
              placeholder="パスワードを入力してください"
              size="large"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
              disabled
            />
            <ErrorText>無効状態</ErrorText>
          </div>
          <div>
            <PasswordInput
              value={valueWithText}
              placeholder="パスワードを入力してください"
              size="large"
              disabled
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValueWithText(e.target.value);
              }}
            />
            <ErrorText>無効状態（入力済み）</ErrorText>
          </div>
          <div>
            <PasswordInput
              value={value}
              placeholder="パスワードを入力してください"
              size="large"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
            />
            <ErrorText>基本状態</ErrorText>
          </div>
        </div>
      </div>
    );
  },
};
