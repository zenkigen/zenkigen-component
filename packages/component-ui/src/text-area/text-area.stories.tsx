import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import type { ChangeEvent } from 'react';
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
    value: '',
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
          <TextArea.HelperMessage>補足テキスト</TextArea.HelperMessage>
          <TextArea.ErrorMessage>エラーメッセージ</TextArea.ErrorMessage>
        </TextArea>
      </div>
      <div style={{ flex: 1 }}></div>
    </div>
  ),
};

export const Base: Story = {
  args: {
    value: '',
  },
  render: function MyFunc({ ...args }) {
    const [value, setValue] = useState<string>(args.value ?? '');
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
            >
              <TextArea.HelperMessage>補足テキスト</TextArea.HelperMessage>
            </TextArea>
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
            >
              <TextArea.HelperMessage>リサイズ可能</TextArea.HelperMessage>
            </TextArea>
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
            >
              <TextArea.ErrorMessage>未入力 ＋ エラー</TextArea.ErrorMessage>
            </TextArea>
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
            >
              <TextArea.ErrorMessage>入力済み ＋ エラー</TextArea.ErrorMessage>
            </TextArea>
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
            >
              <TextArea.HelperMessage>未入力 ＋ disabled</TextArea.HelperMessage>
            </TextArea>
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
            >
              <TextArea.ErrorMessage>入力済み ＋ disabled</TextArea.ErrorMessage>
            </TextArea>
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
            >
              <TextArea.HelperMessage>補足テキスト</TextArea.HelperMessage>
            </TextArea>
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
            >
              <TextArea.HelperMessage>リサイズ可能</TextArea.HelperMessage>
            </TextArea>
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
            >
              <TextArea.ErrorMessage>未入力 ＋ エラー</TextArea.ErrorMessage>
            </TextArea>
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
            >
              <TextArea.ErrorMessage>入力済み ＋ エラー</TextArea.ErrorMessage>
            </TextArea>
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
            >
              <TextArea.HelperMessage>未入力 ＋ disabled</TextArea.HelperMessage>
            </TextArea>
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
            >
              <TextArea.HelperMessage>入力済み ＋ disabled</TextArea.HelperMessage>
            </TextArea>
          </div>
        </div>
      </div>
    );
  },
};

export const AutoHeight: Story = {
  args: {
    size: 'large',
    value: '',
    autoHeight: true,
    placeholder: '入力してください',
    height: '',
    maxHeight: '120px',
    isError: false,
    disabled: false,
  },
  render: function MyFunc({ ...args }) {
    const [value, setValue] = useState<string>(args.value ?? '');

    return (
      <div style={{ width: 400 }} className="flex flex-col">
        <TextArea
          {...args}
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            action('onChange')(e);
            setValue(e.target.value);
          }}
        >
          <TextArea.HelperMessage>入力量に応じて高さが変わります</TextArea.HelperMessage>
        </TextArea>
      </div>
    );
  },
};
