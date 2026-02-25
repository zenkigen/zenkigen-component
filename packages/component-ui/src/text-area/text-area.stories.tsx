import type { Meta, StoryObj } from '@storybook/react-vite';
import clsx from 'clsx';
import type { ChangeEvent, ReactNode } from 'react';
import { useState } from 'react';
import { action } from 'storybook/actions';

import { Avatar } from '../avatar';
import { IconButton } from '../icon-button';
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
    variant: { control: 'select', options: ['outline', 'text'], description: 'バリアント' },
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

export const Focused: Story = {
  args: {
    value: '',
  },
  render: function FocusedStory({ ...args }) {
    const [value, setValue] = useState<string>(args.value);

    return (
      <div style={{ width: 400 }}>
        <TextArea
          value={value}
          placeholder="フォーカス状態"
          size="medium"
          height={120}
          autoFocus
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setValue(e.target.value);
          }}
        />
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

export const CompositionText: Story = {
  args: {
    value: '',
  },
  render: function CompositionTextStory({ ...args }) {
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
              variant="text"
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
              variant="text"
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
              variant="text"
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
              variant="text"
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
              variant="text"
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
              variant="text"
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
              variant="text"
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
              variant="text"
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
              variant="text"
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
              variant="text"
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
              variant="text"
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
              variant="text"
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
              variant="text"
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
              variant="text"
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

type ChatMessageProps = {
  userId: number;
  firstName: string;
  lastName: string;
  time: string;
  children: ReactNode;
};

const ChatMessage = ({ userId, firstName, lastName, time, children }: ChatMessageProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <Avatar size="small" userId={userId} firstName={firstName} lastName={lastName} />
        <span className="typography-label14bold text-text01">
          {lastName} {firstName}
        </span>
      </div>
      <span className="typography-body12regular text-text02">{time}</span>
    </div>
    {children}
  </div>
);

const ChatText = ({ children }: { children: ReactNode }) => (
  <p className="typography-body14regular leading-6 text-text01">{children}</p>
);

export const LayoutExample: Story = {
  args: {
    value: '',
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: function LayoutExampleStory() {
    const [inputValue, setInputValue] = useState('');

    return (
      <div className="relative flex h-[720px] w-[400px] flex-col justify-between bg-uiBackground01 p-6">
        {/* 閉じるボタン */}
        <div className="absolute right-1 top-1">
          <IconButton variant="text" icon="close" size="small" onClick={action('onClose')} />
        </div>

        {/* チャットメッセージ一覧 */}
        <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto">
          <ChatMessage userId={1} lastName="川上" firstName="直子" time="2分前">
            <ChatText>今、音声聞こえてますでしょうか？</ChatText>
          </ChatMessage>
          <ChatMessage userId={2} lastName="松井" firstName="麻衣" time="1分前">
            <ChatText>すみません、聞こえないです。</ChatText>
          </ChatMessage>
          <ChatMessage userId={1} lastName="川上" firstName="直子" time="1分前">
            <ChatText>少々お待ちください。</ChatText>
            <ChatText>ちょっと設定を直しますね。</ChatText>
          </ChatMessage>
          <div className="rounded-lg bg-uiBackgroundGray p-4">
            <p className="typography-body14regular leading-6 text-text01">川上 直子 が入室しました</p>
          </div>
          <ChatMessage userId={2} lastName="松井" firstName="麻衣" time="1分前">
            <ChatText>ありがとうございます。</ChatText>
          </ChatMessage>
          <ChatMessage userId={2} lastName="松井" firstName="麻衣" time="1分前">
            <ChatText>ポートフォリオリンク</ChatText>
            <p className="typography-body14regular leading-6 text-supportInfo underline">
              https://www.example.com/portfolio
            </p>
          </ChatMessage>
        </div>

        {/* チャット入力エリア: variant="text" の利用例 */}
        <div className="flex flex-col gap-2 pt-2">
          <div className="flex items-end gap-1 rounded border border-uiBorder01 p-2 focus-within:border-activeInput hover:border-hoverInput hover:focus-within:border-activeInput">
            <TextArea
              value={inputValue}
              variant="text"
              placeholder="応募者へメッセージ"
              size="medium"
              autoHeight
              maxHeight="120px"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setInputValue(e.target.value);
              }}
            />
            <IconButton
              variant="text"
              icon="send"
              size="small"
              onClick={() => {
                action('onSend')(inputValue);
                setInputValue('');
              }}
            />
          </div>
          <div className="relative rounded border border-uiBorder01 p-2 pr-0 focus-within:border-activeInput hover:border-hoverInput hover:focus-within:border-activeInput">
            <TextArea
              value={inputValue}
              variant="text"
              placeholder="応募者へメッセージ"
              size="medium"
              autoHeight
              maxHeight="120px"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setInputValue(e.target.value);
              }}
            />
            <div className="absolute bottom-2 right-2">
              <IconButton
                variant="text"
                icon="send"
                size="small"
                onClick={() => {
                  action('onSend')(inputValue);
                  setInputValue('');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};
