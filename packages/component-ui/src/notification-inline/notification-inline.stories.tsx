import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { NotificationInline } from '.';

const meta: Meta<typeof NotificationInline> = {
  title: 'Components/NotificationInline',
  component: NotificationInline,
};

export default meta;
type Story = StoryObj<typeof NotificationInline>;

export const Component: Story = {
  args: {
    children: 'Message',
    size: 'medium',
    state: 'success',
    showClose: false,
  },
  parameters: {
    chromatic: { disable: true },
  },
};

export function Base() {
  return (
    <div className="flex flex-col gap-2">
      <NotificationInline size="small" state="attention" showClose onClickClose={action('clicked')}>
        Attention
      </NotificationInline>
      <NotificationInline size="small" state="warning" showClose onClickClose={action('clicked')}>
        Warning
      </NotificationInline>
      <NotificationInline size="small" state="information" showClose onClickClose={action('clicked')}>
        Information
      </NotificationInline>
      <NotificationInline size="small" state="success" showClose onClickClose={action('clicked')}>
        Success
      </NotificationInline>
      <NotificationInline size="small" showClose onClickClose={action('clicked')}>
        Default
      </NotificationInline>
      <NotificationInline state="attention" showClose onClickClose={action('clicked')}>
        Attention
      </NotificationInline>
      <NotificationInline state="warning" showClose onClickClose={action('clicked')}>
        Warning
      </NotificationInline>
      <NotificationInline state="information" showClose onClickClose={action('clicked')}>
        Information
      </NotificationInline>
      <NotificationInline state="success" showClose onClickClose={action('clicked')}>
        Success
      </NotificationInline>
      <NotificationInline showClose onClickClose={action('clicked')}>
        Default
      </NotificationInline>
      <NotificationInline state="success">閉じるボタン無し</NotificationInline>
      <NotificationInline size="small" state="attention" showClose onClickClose={action('clicked')}>
        めっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキスト
      </NotificationInline>
    </div>
  );
}
