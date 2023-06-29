import { useCallback } from 'react';

import { action } from '@storybook/addon-actions';

import { Button } from '../button';

import { Toast, ToastProvider, useToast } from '.';

export default {
  component: Toast,
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Story: any) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
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
