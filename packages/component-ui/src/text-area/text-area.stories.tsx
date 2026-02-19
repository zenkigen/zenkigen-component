import type { Meta, StoryObj } from '@storybook/react-vite';
import clsx from 'clsx';
import type { ChangeEvent, ReactNode } from 'react';
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
    isCounterVisible: { control: 'boolean', description: '文字数カウンターの表示/非表示' },
    counterMaxLength: {
      control: 'number',
      description: 'カウンター用の上限文字数。超過しても入力可能だが、カウンターがエラー色になる',
    },
    maxLength: {
      control: 'number',
      description: 'HTML ネイティブの最大文字数。上限を超える入力をブロックする',
    },
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
  render: function MyFunc({ ...args }) {
    const [value, setValue] = useState('');

    return (
      <div className="flex items-center gap-4">
        <div style={{ flex: 1 }}>
          <TextArea
            {...args}
            value={value}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              action('onChange')(e);
              setValue(e.target.value);
            }}
          >
            <TextArea.HelperMessage>○文字以内で入力してください</TextArea.HelperMessage>
            <TextArea.ErrorMessage>入力内容にエラーがあります</TextArea.ErrorMessage>
          </TextArea>
        </div>
        <div style={{ flex: 1 }}></div>
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

export const Counter: Story = {
  args: {},
  render: function CounterStory() {
    const [softValue, setSoftValue] = useState('');
    const [hardValue, setHardValue] = useState('');
    const [countOnlyValue, setCountOnlyValue] = useState('');
    const [helperValue, setHelperValue] = useState('');

    return (
      <div className="flex gap-10">
        <div style={{ width: 400 }} className="flex flex-col gap-12">
          <div>
            <p className="typography-label12regular mb-2 text-text02">超過を許容する上限（counterMaxLength=50）</p>
            <TextArea
              value={softValue}
              placeholder="超過しても入力可能"
              size="medium"
              height={100}
              isCounterVisible
              counterMaxLength={50}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setSoftValue(e.target.value)}
            />
          </div>
          <div>
            <p className="typography-label12regular mb-2 text-text02">入力をブロックする上限（maxLength=50）</p>
            <TextArea
              value={hardValue}
              placeholder="50文字で入力ブロック"
              size="medium"
              height={100}
              isCounterVisible
              maxLength={50}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setHardValue(e.target.value)}
            />
          </div>
          <div>
            <p className="typography-label12regular mb-2 text-text02">カウンターのみ（上限なし）</p>
            <TextArea
              value={countOnlyValue}
              placeholder="文字数のみ表示"
              size="medium"
              height={100}
              isCounterVisible
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCountOnlyValue(e.target.value)}
            />
          </div>
          <div>
            <p className="typography-label12regular mb-2 text-text02">
              HelperMessage + カウンター（counterMaxLength=100）
            </p>
            <TextArea
              value={helperValue}
              placeholder="ヘルプメッセージ付き"
              size="medium"
              height={100}
              isCounterVisible
              counterMaxLength={100}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setHelperValue(e.target.value)}
            >
              <TextArea.HelperMessage>
                100文字以内で入力してください。長いヘルプメッセージは折り返されます。
              </TextArea.HelperMessage>
            </TextArea>
          </div>
        </div>
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
