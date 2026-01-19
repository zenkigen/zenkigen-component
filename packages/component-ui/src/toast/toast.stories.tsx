import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';
import { action } from 'storybook/actions';

import { Button } from '../button';
import { TextInput } from '../text-input';
import { Toast, ToastProvider, useToast } from '.';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Story: any) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Component: Story = {
  args: {
    state: 'success',
  },
  argTypes: {
    state: {
      options: ['success', 'error', 'warning', 'information'],
      control: { type: 'radio' },
    },
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: function MyFunc({ ...args }) {
    const [value, setValue] = useState<string>('');
    const { addToast } = useToast();
    const handleClick = useCallback(() => {
      if (typeof args.state !== 'undefined') addToast({ state: args.state, message: value });
    }, [addToast, args.state, value]);

    return (
      <div className="flex flex-col justify-start gap-2">
        <div>
          <TextInput
            {...args}
            value={value}
            placeholder="テキストを入力"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValue(e.target.value);
            }}
            onClickClearButton={() => {
              setValue('');
            }}
          />
        </div>
        <div>
          <Button onClick={handleClick}>トーストを表示</Button>
        </div>
      </div>
    );
  },
};

export function Base() {
  const { addToast } = useToast();

  const handleClick = useCallback(() => {
    addToast({ message: 'テキスト', state: 'information' });
  }, [addToast]);

  return (
    <>
      <div className="mb-10">
        <Button onClick={handleClick}>トーストを表示</Button>
      </div>
      <div className="flex flex-col gap-2">
        <Toast state="success" onClickClose={action('閉じる')} width="475px">
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </Toast>
        <Toast state="error" onClickClose={action('閉じる')} width="475px">
          テキスト
        </Toast>
        <Toast state="warning" onClickClose={action('閉じる')} width="475px">
          テキスト
        </Toast>
        <Toast state="information" onClickClose={action('閉じる')}>
          テキスト
        </Toast>
        <Toast state="success" onClickClose={action('閉じる')}>
          テキスト
        </Toast>
        <Toast state="error" onClickClose={action('閉じる')}>
          テキスト
        </Toast>
        <Toast state="warning" onClickClose={action('閉じる')}>
          テキスト
        </Toast>
        <Toast state="information" onClickClose={action('閉じる')}>
          テキスト
        </Toast>
      </div>
    </>
  );
}
