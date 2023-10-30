import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { typography } from '@zenkigen-inc/component-theme';
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
  const classes = clsx('px-2', 'mt-1', `${typography.label.label4regular}`, {
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
              sizeValue="medium"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
            <TextArea
              value={value}
              placeholder="入力してください"
              sizeValue="medium"
              isError
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
            <TextArea
              value={value2}
              placeholder="入力してください"
              sizeValue="medium"
              isError
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
            <TextArea
              value={value}
              placeholder="入力してください"
              sizeValue="medium"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
            <TextArea
              value={value2}
              placeholder="入力してください"
              sizeValue="medium"
              isError
              disabled
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue2(e.target.value);
              }}
              onClickClearButton={() => {
                setValue2('');
              }}
            />
          </div>
        </div>
        <div style={{ width: 400 }} className="flex flex-col gap-12">
          <div>
            <TextArea
              value={value}
              placeholder="入力してください"
              sizeValue="medium"
              isResizable
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
            <TextArea
              value={value}
              placeholder="入力してください"
              sizeValue="medium"
              isError
              isResizable
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
            <TextArea
              value={value2}
              placeholder="入力してください"
              sizeValue="medium"
              isError
              isResizable
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
            <TextArea
              value={value}
              placeholder="入力してください"
              sizeValue="medium"
              isResizable
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
            <TextArea
              value={value2}
              placeholder="入力してください"
              sizeValue="medium"
              isError
              isResizable
              disabled
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue2(e.target.value);
              }}
              onClickClearButton={() => {
                setValue2('');
              }}
            />
          </div>
        </div>
        <div style={{ width: 400 }} className="flex flex-col gap-12">
          <div>
            <TextArea
              value={value}
              placeholder="入力してください"
              sizeValue="large"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
            <TextArea
              value={value}
              placeholder="入力してください"
              sizeValue="large"
              isError
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
            <TextArea
              value={value2}
              placeholder="入力してください"
              sizeValue="large"
              isError
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
            <TextArea
              value={value}
              placeholder="入力してください"
              sizeValue="large"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
            <TextArea
              value={value2}
              placeholder="入力してください"
              sizeValue="large"
              isError
              disabled
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue2(e.target.value);
              }}
              onClickClearButton={() => {
                setValue2('');
              }}
            />
          </div>
        </div>
        <div style={{ width: 400 }} className="flex flex-col gap-12">
          <div>
            <TextArea
              value={value}
              placeholder="入力してください"
              sizeValue="large"
              isResizable
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
            <TextArea
              value={value}
              placeholder="入力してください"
              sizeValue="large"
              isError
              isResizable
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
            <TextArea
              value={value2}
              placeholder="入力してください"
              sizeValue="large"
              isError
              isResizable
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
            <TextArea
              value={value}
              placeholder="入力してください"
              sizeValue="large"
              isResizable
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
            <TextArea
              value={value2}
              placeholder="入力してください"
              sizeValue="large"
              isError
              isResizable
              disabled
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue2(e.target.value);
              }}
              onClickClearButton={() => {
                setValue2('');
              }}
            />
          </div>
        </div>
      </div>
    );
  },
};
