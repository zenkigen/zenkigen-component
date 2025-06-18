import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

import { Button } from '../button';
import { TextInput } from '../text-input';
import { Snackbar, SnackbarProvider, useSnackbar } from '.';

const meta: Meta<typeof Snackbar> = {
  title: 'Components/Snackbar',
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Story: any) => (
      <SnackbarProvider>
        <Story />
      </SnackbarProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

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
    const { addSnackbar } = useSnackbar();
    const handleClick = useCallback(() => {
      if (args.state) addSnackbar({ state: args.state, message: value });
    }, [addSnackbar, args.state, value]);

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
          <Button onClick={handleClick}>スナックバーを表示</Button>
        </div>
      </div>
    );
  },
};

export function Base() {
  const { addSnackbar } = useSnackbar();

  const handleClick = useCallback(() => {
    addSnackbar({ message: 'テキスト', state: 'information' });
  }, [addSnackbar]);

  return (
    <>
      <div className="mb-10">
        <Button onClick={handleClick}>スナックバーを表示</Button>
      </div>
      <div className="flex flex-col gap-2">
        <Snackbar state="success" onClickClose={action('閉じる')} width="475px">
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </Snackbar>
        <Snackbar state="error" onClickClose={action('閉じる')} width="475px">
          テキスト
        </Snackbar>
        <Snackbar state="warning" onClickClose={action('閉じる')} width="475px">
          テキスト
        </Snackbar>
        <Snackbar state="information" onClickClose={action('閉じる')}>
          テキスト
        </Snackbar>
        <Snackbar state="success" onClickClose={action('閉じる')}>
          テキスト
        </Snackbar>
        <Snackbar state="error" onClickClose={action('閉じる')}>
          テキスト
        </Snackbar>
        <Snackbar state="warning" onClickClose={action('閉じる')}>
          テキスト
        </Snackbar>
        <Snackbar state="information" onClickClose={action('閉じる')}>
          テキスト
        </Snackbar>
      </div>
    </>
  );
}
