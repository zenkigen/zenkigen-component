import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { action } from 'storybook/actions';

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
    placeholder: 'placeholder',
    height: 'auto',
    autoHeight: false,
    isResizable: false,
    isError: false,
    disabled: false,
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <div style={{ flex: 1 }}>
        <TextArea {...args}>
          <TextArea.HelperMessage>○文字以内で入力してください</TextArea.HelperMessage>
          <TextArea.ErrorMessage>入力内容にエラーがあります</TextArea.ErrorMessage>
        </TextArea>
      </div>
      <div style={{ flex: 1 }}></div>
    </div>
  ),
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

export const Composition: Story = {
  args: {
    value: '',
  },
  render: function MyFunc({ ...args }) {
    const [value, setValue] = useState<string>(args.value ?? '');
    const [value2, setValue2] = useState<string>(
      '入力文字列入力文字列入力文字列入力文字列入力文字列入力文字列入力文字列入力文字列入力文字列入力文字列入力文字列入力文字列入力文字列入力文字列入力文字列入力文字列入力文字列入力文字列入力文字列入力文字列入力文字列入力文字列入力文字列',
    );

    const classNameLine = 'flex w-[300px] flex-col gap-12';
    const classNameCell = 'h-[150px]';

    return (
      <div className="flex gap-10">
        <div className={classNameLine}>
          <div className={classNameCell}>
            <TextArea
              value={value}
              placeholder="入力してください"
              size="medium"
              height={120}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
            >
              <TextArea.HelperMessage>○文字以内で入力してください</TextArea.HelperMessage>
            </TextArea>
          </div>
          <div className={classNameCell}>
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
            >
              <TextArea.HelperMessage>○文字以内で入力してください</TextArea.HelperMessage>
            </TextArea>
          </div>
          <div className={classNameCell}>
            <TextArea
              value={value}
              placeholder="入力してください"
              size="medium"
              height={120}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
            >
              <TextArea.HelperMessage>
                ○文字以内で入力してください ○文字以内で入力してください ○文字以内で入力してください
              </TextArea.HelperMessage>
              <TextArea.HelperMessage>○文字以内で入力してください</TextArea.HelperMessage>
            </TextArea>
          </div>
          <div className={classNameCell}>
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
            >
              <TextArea.HelperMessage>○文字以内で入力してください</TextArea.HelperMessage>
              <TextArea.ErrorMessage>入力内容にエラーがあります</TextArea.ErrorMessage>
            </TextArea>
          </div>
          <div className={classNameCell}>
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
            >
              <TextArea.ErrorMessage>
                入力内容にエラーがあります 入力内容にエラーがあります 入力内容にエラーがあります
              </TextArea.ErrorMessage>
              <TextArea.ErrorMessage>入力内容にエラーがあります</TextArea.ErrorMessage>
            </TextArea>
          </div>
          <div className={classNameCell}>
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
            ></TextArea>
          </div>
          <div className={classNameCell}>
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
            ></TextArea>
          </div>
        </div>
        <div className={classNameLine}>
          <div className={classNameCell}>
            <TextArea
              value={value}
              placeholder="入力してください"
              size="large"
              height={120}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
            >
              <TextArea.HelperMessage>○文字以内で入力してください</TextArea.HelperMessage>
            </TextArea>
          </div>
          <div className={classNameCell}>
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
            >
              <TextArea.HelperMessage>○文字以内で入力してください</TextArea.HelperMessage>
            </TextArea>
          </div>
          <div className={classNameCell}>
            <TextArea
              value={value}
              placeholder="入力してください"
              size="large"
              height={120}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                action('onChange')(e);
                setValue(e.target.value);
              }}
            >
              <TextArea.HelperMessage>
                ○文字以内で入力してください ○文字以内で入力してください ○文字以内で入力してください
              </TextArea.HelperMessage>
              <TextArea.HelperMessage>○文字以内で入力してください</TextArea.HelperMessage>
            </TextArea>
          </div>
          <div className={classNameCell}>
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
            >
              <TextArea.HelperMessage>○文字以内で入力してください</TextArea.HelperMessage>
              <TextArea.ErrorMessage>入力内容にエラーがあります</TextArea.ErrorMessage>
            </TextArea>
          </div>
          <div className={classNameCell}>
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
            >
              <TextArea.ErrorMessage>
                入力内容にエラーがあります 入力内容にエラーがあります 入力内容にエラーがあります
              </TextArea.ErrorMessage>
              <TextArea.ErrorMessage>入力内容にエラーがあります</TextArea.ErrorMessage>
            </TextArea>
          </div>
          <div className={classNameCell}>
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
            ></TextArea>
          </div>
          <div className={classNameCell}>
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
            ></TextArea>
          </div>
        </div>
      </div>
    );
  },
};
