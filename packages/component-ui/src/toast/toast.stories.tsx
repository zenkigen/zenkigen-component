import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Button } from '../button';
import { Toast, ToastProvider, useToast } from '.';
import type { ToastState } from './type';

const withToastProvider: Decorator = (Story) => (
  <ToastProvider>
    <Story />
  </ToastProvider>
);

const states: ToastState[] = ['success', 'error', 'warning', 'information'];

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  decorators: [withToastProvider],
  argTypes: {
    state: {
      options: states,
      control: { type: 'radio' },
    },
    description: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Component: Story = {
  args: {
    state: 'success',
    children: 'テキスト',
    hasCloseButton: false,
    width: 475,
    onClickClose: action('閉じる'),
  },
  parameters: {
    chromatic: { disable: true },
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {states.map((state) => (
        <Toast key={state} state={state} width={475} onClickClose={action('閉じる')}>
          テキスト
        </Toast>
      ))}
    </div>
  ),
};

export const WithCloseButton: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {states.map((state) => (
        <Toast key={state} state={state} width={475} hasCloseButton onClickClose={action('閉じる')}>
          テキスト
        </Toast>
      ))}
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {states.map((state) => (
        <div key={state} className="flex items-start gap-4">
          <Toast state={state} width={475} description="説明が入ります" onClickClose={action('閉じる')}>
            テキスト
          </Toast>
          <Toast state={state} width={475} description="説明が入ります" hasCloseButton onClickClose={action('閉じる')}>
            テキスト
          </Toast>
        </div>
      ))}
    </div>
  ),
};

export const LongText: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Toast state="error" width={475} hasCloseButton onClickClose={action('閉じる')}>
        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
      </Toast>
      <Toast
        state="information"
        width={475}
        hasCloseButton
        description="説明テキストが折り返して複数行になる場合のレイアウトを確認します。説明テキストが折り返して複数行になる場合のレイアウトを確認します。"
        onClickClose={action('閉じる')}
      >
        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
      </Toast>
      <Toast state="success" width={475} hasCloseButton onClickClose={action('閉じる')}>
        https://storybook.zenkigen.co.jp/?path=/docs/components-toast--docs&globals=&args=state:success
      </Toast>
    </div>
  ),
};

export const Provider: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: function ProviderRender() {
    const { addToast } = useToast();

    return (
      <div className="flex flex-col items-start gap-2">
        <Button onClick={() => addToast({ message: '設定を保存しました', state: 'success' })}>基本</Button>
        <Button
          onClick={() =>
            addToast({
              message: 'アップロードに失敗しました',
              state: 'error',
              description: 'ファイルサイズを確認して、もう一度お試しください',
            })
          }
        >
          説明つき
        </Button>
        <Button onClick={() => addToast({ message: '設定を保存しました', state: 'success', hasCloseButton: true })}>
          閉じるボタンつき
        </Button>
        <Button
          onClick={() =>
            addToast({ message: 'バックアップを実行しています', state: 'information', isAutoClose: false })
          }
        >
          自動で閉じない
        </Button>
      </div>
    );
  },
};
