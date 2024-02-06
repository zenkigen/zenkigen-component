import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';
import { ChangeEvent, ReactNode, useState } from 'react';

import { TextInput } from '.';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
};

type Story = StoryObj<typeof TextInput>;

export default meta;

type ErrorTextProps = {
  children?: ReactNode;
  isError?: boolean;
};

const ErrorText = ({ ...props }: ErrorTextProps) => {
  const classes = clsx('typography-label4regular mt-1 px-2', {
    'text-text02': !props.isError,
    'text-supportError': props.isError,
  });

  return <div className={classes}>{props.children}</div>;
};

export const Base: Story = {
  args: {},
  render: function MyFunc({ ...args }) {
    const [value, setValue] = useState<string>(args.value);
    const [value2, setValue2] = useState<string>('入力した文字列。');
    const [valueNumber, setValueNumber] = useState<string>('123');
    const [valuePassword, setValuePassword] = useState<string>('abcdefg');

    return (
      <div className="flex gap-10">
        <div style={{ width: 300 }} className="flex flex-col gap-12">
          <div>
            <TextInput
              value={value}
              placeholder="入力してください"
              size="medium"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
              onClickClearButton={() => {
                setValue('');
              }}
            />
            <ErrorText>文字以内で入力してください</ErrorText>
          </div>
          <div>
            <TextInput
              value={value}
              placeholder="入力してください"
              size="medium"
              isError
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
              onClickClearButton={() => {
                setValue('');
              }}
            />
            <ErrorText isError>文字以内で入力してください</ErrorText>
          </div>
          <div>
            <TextInput
              value={value2}
              placeholder="入力してください"
              size="medium"
              isError
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValue2(e.target.value);
              }}
              onClickClearButton={() => {
                setValue2('');
              }}
            />
            <ErrorText isError>文字以内で入力してください</ErrorText>
          </div>
          <div>
            <TextInput
              value={value}
              placeholder="入力してください"
              size="medium"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
              onClickClearButton={() => {
                setValue('');
              }}
              disabled
            />
          </div>
          <div>
            <TextInput
              value={value2}
              placeholder="入力してください"
              size="medium"
              isError
              disabled
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
              value={valueNumber}
              placeholder="入力してください"
              size="medium"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValueNumber(e.target.value);
              }}
              type="number"
            />
          </div>
          <div>
            <TextInput
              value={valuePassword}
              placeholder="入力してください"
              size="medium"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValuePassword(e.target.value);
              }}
              onClickClearButton={() => {
                setValuePassword('');
              }}
              type="password"
            />
          </div>
        </div>
        <div style={{ width: 300 }} className="flex flex-col gap-10">
          <div>
            <TextInput
              value={value}
              placeholder="入力してください"
              size="large"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
              onClickClearButton={() => {
                setValue('');
              }}
            />
            <ErrorText>文字以内で入力してください</ErrorText>
          </div>
          <div>
            <TextInput
              value={value}
              placeholder="入力してください"
              size="large"
              isError
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
              onClickClearButton={() => {
                setValue('');
              }}
            />
            <ErrorText isError>文字以内で入力してください</ErrorText>
          </div>
          <div>
            <TextInput
              value={value2}
              placeholder="入力してください"
              size="large"
              isError
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValue2(e.target.value);
              }}
              onClickClearButton={() => {
                setValue2('');
              }}
            />
            <ErrorText isError>文字以内で入力してください</ErrorText>
          </div>
          <div>
            <TextInput
              value=""
              placeholder="入力してください"
              size="large"
              isError
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValue2(e.target.value);
              }}
              onClickClearButton={() => {
                setValue2('');
              }}
              disabled
            />
          </div>
          <div>
            <TextInput
              value={value2}
              placeholder="入力してください"
              size="large"
              disabled
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
              value={valueNumber}
              placeholder="入力してください"
              size="large"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValueNumber(e.target.value);
              }}
              type="number"
            />
          </div>
          <div>
            <TextInput
              value={valuePassword}
              placeholder="入力してください"
              size="large"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                action('onChange')(e);
                setValuePassword(e.target.value);
              }}
              onClickClearButton={() => {
                setValuePassword('');
              }}
              type="password"
            />
          </div>
        </div>
      </div>
    );
  },
};
