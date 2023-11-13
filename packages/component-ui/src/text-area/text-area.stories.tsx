import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';
import { ChangeEvent, ReactNode, useState } from 'react';

import { TextArea } from '.';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
};

type Story = StoryObj<typeof TextArea>;

export default meta;

type ErrorTextProps = {
  children?: ReactNode;
  isError?: boolean;
};

const ErrorText = ({ ...props }: ErrorTextProps) => {
  const classes = clsx('typography-label4regular mt-1 px-2', {
    'text-text-text02': !props.isError,
    'text-support-supportError': props.isError,
  });

  return <div className={classes}>{props.children}</div>;
};

export const Base: Story = {
  args: {},
  render: function MyFunc({ ...args }) {
    const [value, setValue] = useState<string>(args.value);
    const [value2, setValue2] = useState<string>('入力した文字列。');

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
              value={value2}
              placeholder="入力してください"
              size="medium"
              height={120}
              isError
              disabled
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue2(e.target.value);
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
              isError
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
