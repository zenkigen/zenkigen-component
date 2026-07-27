import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { NotificationInline } from '.';

const meta: Meta<typeof NotificationInline> = {
  title: 'Components/NotificationInline',
  component: NotificationInline,
  argTypes: {
    variant: { control: 'radio', options: ['default', 'outline'] },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationInline>;

export const Component: Story = {
  args: {
    children: 'Message',
    size: 'medium',
    state: 'success',
    variant: 'default',
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

export function WithoutClose() {
  return (
    <div className="flex flex-col gap-2">
      <NotificationInline size="small" state="attention">
        Attention
      </NotificationInline>
      <NotificationInline size="small" state="warning">
        Warning
      </NotificationInline>
      <NotificationInline size="small" state="information">
        Information
      </NotificationInline>
      <NotificationInline size="small" state="success">
        Success
      </NotificationInline>
      <NotificationInline size="small">Default</NotificationInline>
      <NotificationInline state="attention">Attention</NotificationInline>
      <NotificationInline state="warning">Warning</NotificationInline>
      <NotificationInline state="information">Information</NotificationInline>
      <NotificationInline state="success">Success</NotificationInline>
      <NotificationInline>Default</NotificationInline>
      <NotificationInline state="attention" variant="outline">
        Attention Outline
      </NotificationInline>
      <NotificationInline variant="outline">Default Outline</NotificationInline>
      <NotificationInline size="small" state="attention">
        めっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキスト
      </NotificationInline>
      <NotificationInline state="attention">
        めっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキスト
      </NotificationInline>
    </div>
  );
}

export function Outline() {
  return (
    <div className="flex flex-col gap-2">
      <NotificationInline size="small" state="attention" variant="outline" showClose onClickClose={action('clicked')}>
        Attention
      </NotificationInline>
      <NotificationInline size="small" state="warning" variant="outline" showClose onClickClose={action('clicked')}>
        Warning
      </NotificationInline>
      <NotificationInline size="small" state="information" variant="outline" showClose onClickClose={action('clicked')}>
        Information
      </NotificationInline>
      <NotificationInline size="small" state="success" variant="outline" showClose onClickClose={action('clicked')}>
        Success
      </NotificationInline>
      <NotificationInline size="small" variant="outline" showClose onClickClose={action('clicked')}>
        Default
      </NotificationInline>
      <NotificationInline state="attention" variant="outline" showClose onClickClose={action('clicked')}>
        Attention
      </NotificationInline>
      <NotificationInline state="warning" variant="outline" showClose onClickClose={action('clicked')}>
        Warning
      </NotificationInline>
      <NotificationInline state="information" variant="outline" showClose onClickClose={action('clicked')}>
        Information
      </NotificationInline>
      <NotificationInline state="success" variant="outline" showClose onClickClose={action('clicked')}>
        Success
      </NotificationInline>
      <NotificationInline variant="outline" showClose onClickClose={action('clicked')}>
        Default
      </NotificationInline>
      <NotificationInline state="success" variant="outline">
        閉じるボタン無し
      </NotificationInline>
      <NotificationInline size="small" state="attention" variant="outline" showClose onClickClose={action('clicked')}>
        めっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキストめっちゃ長いテキスト
      </NotificationInline>
    </div>
  );
}
