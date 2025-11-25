import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';
import type { ChangeEvent, ReactNode } from 'react';
import { useState } from 'react';

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
          >
            <PasswordInput.HelperMessage>8文字以上で入力してください</PasswordInput.HelperMessage>
            <PasswordInput.ErrorMessage>入力内容にエラーがあります</PasswordInput.ErrorMessage>
          </PasswordInput>
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

export const Composition: Story = {
  render: function CompositionStory() {
    const [value, setValue] = useState<string>('');
    const [value2, setValue2] = useState<string>('password123');
    const [valueError, setValueError] = useState<string>('error');
    const [valueLong, setValueLong] = useState<string>('passwordpasswordpassword');

    const handleChange = (setter: (nextValue: string) => void) => (event: ChangeEvent<HTMLInputElement>) => {
      action('onChange')(event);
      setter(event.target.value);
    };

    const classNameLine = 'flex w-[300px] flex-col gap-12';
    const classNameCell = 'h-[52px]';
    const classNameCellS = 'h-[32px]';

    return (
      <div className="flex gap-10">
        <div className={classNameLine}>
          <div className={classNameCell}>
            <PasswordInput value={value} placeholder="パスワードを入力してください" onChange={handleChange(setValue)}>
              <PasswordInput.HelperMessage>8文字以上で入力してください</PasswordInput.HelperMessage>
            </PasswordInput>
          </div>
          <div className={classNameCell}>
            <PasswordInput
              value={valueLong}
              placeholder="パスワードを入力してください"
              onChange={handleChange(setValueLong)}
            >
              <PasswordInput.HelperMessage>
                8文字以上で入力してください 8文字以上で入力してください 8文字以上で入力してください
              </PasswordInput.HelperMessage>
              <PasswordInput.HelperMessage>8文字以上で入力してください</PasswordInput.HelperMessage>
            </PasswordInput>
          </div>
          <div className={classNameCell}>
            <PasswordInput
              value={valueError}
              placeholder="パスワードを入力してください"
              isError
              onChange={handleChange(setValueError)}
            >
              <PasswordInput.HelperMessage>8文字以上で入力してください</PasswordInput.HelperMessage>
              <PasswordInput.ErrorMessage>入力内容にエラーがあります</PasswordInput.ErrorMessage>
            </PasswordInput>
          </div>
          <div className={classNameCell}>
            <PasswordInput
              value={value2}
              placeholder="パスワードを入力してください"
              isError
              onChange={handleChange(setValue2)}
            >
              <PasswordInput.ErrorMessage>
                入力内容にエラーがあります 入力内容にエラーがあります 入力内容にエラーがあります
              </PasswordInput.ErrorMessage>
              <PasswordInput.ErrorMessage>入力内容にエラーがあります</PasswordInput.ErrorMessage>
            </PasswordInput>
          </div>
          <div className={classNameCell}>
            <PasswordInput
              value={value2}
              placeholder="パスワードを入力してください"
              isError
              onChange={handleChange(setValue2)}
            />
          </div>
          <div className={classNameCellS}>
            <PasswordInput value="" placeholder="パスワードを入力してください" disabled />
          </div>
          <div className={classNameCellS}>
            <PasswordInput value="disabled-error" placeholder="パスワードを入力してください" disabled isError />
          </div>
        </div>
        <div className={classNameLine}>
          <div className={classNameCell}>
            <PasswordInput
              value={value}
              placeholder="パスワードを入力してください"
              size="large"
              onChange={handleChange(setValue)}
            >
              <PasswordInput.HelperMessage>8文字以上で入力してください</PasswordInput.HelperMessage>
            </PasswordInput>
          </div>
          <div className={classNameCell}>
            <PasswordInput
              value={valueLong}
              placeholder="パスワードを入力してください"
              size="large"
              onChange={handleChange(setValueLong)}
            >
              <PasswordInput.HelperMessage>
                8文字以上で入力してください 8文字以上で入力してください 8文字以上で入力してください
              </PasswordInput.HelperMessage>
              <PasswordInput.HelperMessage>8文字以上で入力してください</PasswordInput.HelperMessage>
            </PasswordInput>
          </div>
          <div className={classNameCell}>
            <PasswordInput
              value={valueError}
              placeholder="パスワードを入力してください"
              size="large"
              isError
              onChange={handleChange(setValueError)}
            >
              <PasswordInput.HelperMessage>8文字以上で入力してください</PasswordInput.HelperMessage>
              <PasswordInput.ErrorMessage>入力内容にエラーがあります</PasswordInput.ErrorMessage>
            </PasswordInput>
          </div>
          <div className={classNameCell}>
            <PasswordInput
              value={value2}
              placeholder="パスワードを入力してください"
              size="large"
              isError
              onChange={handleChange(setValue2)}
            >
              <PasswordInput.ErrorMessage>
                入力内容にエラーがあります 入力内容にエラーがあります 入力内容にエラーがあります
              </PasswordInput.ErrorMessage>
              <PasswordInput.ErrorMessage>入力内容にエラーがあります</PasswordInput.ErrorMessage>
            </PasswordInput>
          </div>
          <div className={classNameCell}>
            <PasswordInput
              value={value2}
              placeholder="パスワードを入力してください"
              size="large"
              isError
              onChange={handleChange(setValue2)}
            />
          </div>
          <div className={classNameCellS}>
            <PasswordInput value="" placeholder="パスワードを入力してください" size="large" disabled />
          </div>
          <div className={classNameCellS}>
            <PasswordInput
              value="disabled-error"
              placeholder="パスワードを入力してください"
              size="large"
              disabled
              isError
            />
          </div>
        </div>
      </div>
    );
  },
};
