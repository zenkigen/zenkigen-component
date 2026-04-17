import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { action } from 'storybook/actions';

import { TextInput } from '.';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Component: Story = {
  args: {
    // eslint-disable-next-line no-undefined
    value: undefined,
    size: 'medium',
    placeholder: 'placeholder',
    isError: false,
    disabled: false,
  },
  parameters: {
    chromatic: { disable: true },
  },
  argTypes: {},
  render: function MyFunc({ ...args }) {
    const [value, setValue] = useState<string>('');

    return (
      <div className="flex w-full flex-col">
        <div>
          <TextInput
            {...args}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              action('onChange')(e);
              setValue(e.target.value);
            }}
            onClickClearButton={() => {
              setValue('');
            }}
          >
            <TextInput.HelperMessage>○文字以内で入力してください</TextInput.HelperMessage>
            <TextInput.ErrorMessage>入力内容にエラーがあります</TextInput.ErrorMessage>
          </TextInput>
        </div>
      </div>
    );
  },
};

export const Outline: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {/* デフォルト */}
      <div className="flex gap-4">
        <div className="w-[300px]">
          <TextInput value="" placeholder="入力してください" size="medium" readOnly />
        </div>
        <div className="w-[300px]">
          <TextInput value="入力文字列" size="medium" readOnly onClickClearButton={() => {}} />
        </div>
        <div className="w-[300px]">
          <TextInput value="入力文字列" size="medium" readOnly />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-[300px]">
          <TextInput value="" placeholder="入力してください" size="large" readOnly />
        </div>
        <div className="w-[300px]">
          <TextInput value="入力文字列" size="large" readOnly onClickClearButton={() => {}} />
        </div>
        <div className="w-[300px]">
          <TextInput value="入力文字列" size="large" readOnly />
        </div>
      </div>
      {/* エラー */}
      <div className="flex gap-4">
        <div className="w-[300px]">
          <TextInput value="" placeholder="入力してください" size="medium" isError readOnly>
            <TextInput.ErrorMessage>入力内容にエラーがあります</TextInput.ErrorMessage>
          </TextInput>
        </div>
        <div className="w-[300px]">
          <TextInput value="入力文字列" size="medium" isError readOnly onClickClearButton={() => {}}>
            <TextInput.ErrorMessage>入力内容にエラーがあります</TextInput.ErrorMessage>
          </TextInput>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-[300px]">
          <TextInput value="" placeholder="入力してください" size="large" isError readOnly>
            <TextInput.ErrorMessage>入力内容にエラーがあります</TextInput.ErrorMessage>
          </TextInput>
        </div>
        <div className="w-[300px]">
          <TextInput value="入力文字列" size="large" isError readOnly onClickClearButton={() => {}}>
            <TextInput.ErrorMessage>入力内容にエラーがあります</TextInput.ErrorMessage>
          </TextInput>
        </div>
      </div>
      {/* 無効 */}
      <div className="flex gap-4">
        <div className="w-[300px]">
          <TextInput value="" placeholder="入力してください" size="medium" disabled />
        </div>
        <div className="w-[300px]">
          <TextInput value="入力文字列" size="medium" disabled />
        </div>
        <div className="w-[300px]">
          <TextInput value="" placeholder="入力してください" size="medium" disabled isError />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-[300px]">
          <TextInput value="" placeholder="入力してください" size="large" disabled />
        </div>
        <div className="w-[300px]">
          <TextInput value="入力文字列" size="large" disabled />
        </div>
        <div className="w-[300px]">
          <TextInput value="" placeholder="入力してください" size="large" disabled isError />
        </div>
      </div>
      {/* type バリエーション */}
      <div className="flex gap-4">
        <div className="w-[300px]">
          <TextInput value="123" size="medium" type="number" readOnly />
        </div>
        <div className="w-[300px]">
          <TextInput value="abcdefg" size="medium" type="password" readOnly onClickClearButton={() => {}} />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-[300px]">
          <TextInput value="123" size="large" type="number" readOnly />
        </div>
        <div className="w-[300px]">
          <TextInput value="abcdefg" size="large" type="password" readOnly onClickClearButton={() => {}} />
        </div>
      </div>
    </div>
  ),
};

export const WithMessages: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="w-[300px]">
          <TextInput value="" placeholder="入力してください" size="medium" readOnly>
            <TextInput.HelperMessage>○文字以内で入力してください</TextInput.HelperMessage>
          </TextInput>
        </div>
        <div className="w-[300px]">
          <TextInput value="" placeholder="入力してください" size="medium" isError readOnly>
            <TextInput.HelperMessage>○文字以内で入力してください</TextInput.HelperMessage>
            <TextInput.ErrorMessage>入力内容にエラーがあります</TextInput.ErrorMessage>
          </TextInput>
        </div>
        <div className="w-[300px]">
          <TextInput value="" placeholder="入力してください" size="medium" isError readOnly>
            <TextInput.ErrorMessage>
              入力内容にエラーがあります 入力内容にエラーがあります 入力内容にエラーがあります
            </TextInput.ErrorMessage>
            <TextInput.ErrorMessage>入力内容にエラーがあります</TextInput.ErrorMessage>
          </TextInput>
        </div>
        <div className="w-[300px]">
          <TextInput value="" placeholder="入力してください" size="medium" readOnly>
            <TextInput.HelperMessage>
              ○文字以内で入力してください ○文字以内で入力してください ○文字以内で入力してください
            </TextInput.HelperMessage>
            <TextInput.HelperMessage>○文字以内で入力してください</TextInput.HelperMessage>
          </TextInput>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-[300px]">
          <TextInput value="" placeholder="入力してください" size="large" readOnly>
            <TextInput.HelperMessage>○文字以内で入力してください</TextInput.HelperMessage>
          </TextInput>
        </div>
        <div className="w-[300px]">
          <TextInput value="" placeholder="入力してください" size="large" isError readOnly>
            <TextInput.HelperMessage>○文字以内で入力してください</TextInput.HelperMessage>
            <TextInput.ErrorMessage>入力内容にエラーがあります</TextInput.ErrorMessage>
          </TextInput>
        </div>
        <div className="w-[300px]">
          <TextInput value="" placeholder="入力してください" size="large" isError readOnly>
            <TextInput.ErrorMessage>
              入力内容にエラーがあります 入力内容にエラーがあります 入力内容にエラーがあります
            </TextInput.ErrorMessage>
            <TextInput.ErrorMessage>入力内容にエラーがあります</TextInput.ErrorMessage>
          </TextInput>
        </div>
        <div className="w-[300px]">
          <TextInput value="" placeholder="入力してください" size="large" readOnly>
            <TextInput.HelperMessage>
              ○文字以内で入力してください ○文字以内で入力してください ○文字以内で入力してください
            </TextInput.HelperMessage>
            <TextInput.HelperMessage>○文字以内で入力してください</TextInput.HelperMessage>
          </TextInput>
        </div>
      </div>
    </div>
  ),
};

export const Focused: Story = {
  render: () => (
    <div className="w-[300px]">
      <TextInput value="" placeholder="フォーカス状態" size="medium" autoFocus readOnly />
    </div>
  ),
};
