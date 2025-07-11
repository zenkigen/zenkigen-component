import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';
import type { ChangeEvent, ReactNode } from 'react';
import { useState } from 'react';

import { TextArea } from '.';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    docs: {
      source: {
        code: ``,
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['medium', 'large'], description: 'サイズ' },
    value: { control: 'text', description: '値' },
    height: { control: 'text', description: '高さ' },
    autoHeight: { control: 'boolean', description: '自動リサイズ' },
    maxHeight: { control: 'text', description: '最大高さ（autoHeightがtrueの場合のみ有効）' },
    isResizable: { control: 'boolean', description: 'リサイズ可能かどうか（autoHeightがtrueの場合は無効）' },
    isError: { control: 'boolean', description: 'エラーかどうか' },
    disabled: { control: 'boolean', description: '無効かどうか' },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Component: Story = {
  args: {
    size: 'medium',
    height: 'auto',
    autoHeight: false,
    isResizable: false,
    isError: false,
    disabled: false,
    placeholder: 'placeholder',
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <div style={{ flex: 1 }}>
        <TextArea {...args} />
      </div>
      <div style={{ flex: 1 }}></div>
    </div>
  ),
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
  args: {},
  render: function MyFunc({ ...args }) {
    const [value, setValue] = useState<string>(args.value);
    const [value2, setValue2] = useState<string>('入力した文字列。');
    const [value3, setValue3] = useState<string>('入力した文字列。');

    return (
      <div className="flex gap-10">
        <div style={{ width: 400 }} className="flex flex-col gap-12">
          <div>
            <TextArea
              value={value}
              placeholder="入力してください"
              size="medium"
              height={120}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
            />
            <ErrorText></ErrorText>
          </div>
          <div>
            <TextArea
              value={value}
              placeholder="入力してください"
              size="medium"
              height={120}
              isResizable
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
            />
            <ErrorText>リサイズ可能</ErrorText>
          </div>
          <div>
            <TextArea
              value={value}
              placeholder="入力してください"
              size="medium"
              height={120}
              isError
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
            />
            <ErrorText isError>未入力 ＋ エラー</ErrorText>
          </div>
          <div>
            <TextArea
              value={value2}
              placeholder="入力してください"
              size="medium"
              height={120}
              isError
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue2(e.target.value);
              }}
            />
            <ErrorText isError>入力済み ＋ エラー</ErrorText>
          </div>
          <div>
            <TextArea
              value={value}
              placeholder="入力してください"
              size="medium"
              height={120}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
              disabled
            />
            <ErrorText>未入力 ＋ disabled</ErrorText>
          </div>
          <div>
            <TextArea
              value={value3}
              placeholder="入力してください"
              size="medium"
              height={120}
              isError
              disabled
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue3(e.target.value);
              }}
            />
            <ErrorText>入力済み ＋ disabled</ErrorText>
          </div>
        </div>
        <div style={{ width: 400 }} className="flex flex-col gap-12">
          <div>
            <TextArea
              value={value}
              placeholder="入力してください"
              size="large"
              height={120}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
            />
            <ErrorText></ErrorText>
          </div>
          <div>
            <TextArea
              value={value}
              placeholder="入力してください"
              size="large"
              height={120}
              isResizable
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
            />
            <ErrorText>リサイズ可能</ErrorText>
          </div>
          <div>
            <TextArea
              value={value}
              placeholder="入力してください"
              size="large"
              height={120}
              isError
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
            />
            <ErrorText isError>未入力 ＋ エラー</ErrorText>
          </div>
          <div>
            <TextArea
              value={value2}
              placeholder="入力してください"
              size="large"
              height={120}
              isError
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue2(e.target.value);
              }}
            />
            <ErrorText isError>入力済み ＋ エラー</ErrorText>
          </div>
          <div>
            <TextArea
              value={value}
              placeholder="入力してください"
              size="large"
              height={120}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
              disabled
            />
            <ErrorText>未入力 ＋ disabled</ErrorText>
          </div>
          <div>
            <TextArea
              value={value2}
              placeholder="入力してください"
              size="large"
              height={120}
              disabled
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue2(e.target.value);
              }}
            />
            <ErrorText>入力済み ＋ disabled</ErrorText>
          </div>
        </div>
      </div>
    );
  },
};

export const AutoHeight: Story = {
  args: {
    size: 'large',
    autoHeight: true,
    placeholder: '入力してください',
    height: '',
    maxHeight: '120px',
    isError: false,
    disabled: false,
  },
  render: function MyFunc({ ...args }) {
    const [value, setValue] = useState<string>(args.value);

    return (
      <div style={{ width: 400 }} className="flex flex-col">
        <TextArea
          {...args}
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            action('onChange')(e);
            setValue(e.target.value);
          }}
        />
      </div>
    );
  },
};
