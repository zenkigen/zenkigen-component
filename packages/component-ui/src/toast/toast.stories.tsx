import { action } from '@storybook/addon-actions';
import { useCallback, useEffect } from 'react';

import { Button } from '../button';
import { easeTypesOptionsList } from '../view-transition/Form/form';
import { ViewTransitionProvider } from '../view-transition/view-transition-provider';
import { Toast, ToastProvider, useToast } from '.';

export default {
  component: Toast,
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Story: any) => (
      <ViewTransitionProvider>
        <ToastProvider>
          <Story />
        </ToastProvider>
      </ViewTransitionProvider>
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

export function TransitionTest() {
  const { addToast, debugDispatch } = useToast();

  const handleClick = useCallback(() => {
    addToast({ message: 'テキスト', state: 'information' });
  }, [addToast]);

  useEffect(() => {
    debugDispatch({
      type: 'Reset',
      payload: {
        count: 2,
        list: [
          {
            valueLabel: '表示：単位ms',
            value: '150',
            option: easeTypesOptionsList[8],
          },
          {
            valueLabel: '非表示：単位ms',
            value: '150',
            option: easeTypesOptionsList[16],
          },
        ],
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mb-10">
        <Button onClick={handleClick}>トーストを表示</Button>
      </div>
    </>
  );
}
