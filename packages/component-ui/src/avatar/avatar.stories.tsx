import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '.';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Component: Story = {
  args: {
    size: 'medium',
    userId: 1,
    lastName: '全機現',
    firstName: '太郎',
    isDisabled: false,
  },
  parameters: {
    chromatic: { disable: true },
  },
};

export function Base() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Avatar size="x-small" userId={1} lastName="全機現" firstName="太郎" />
        <Avatar size="small" userId={1} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={1} lastName="全機現" firstName="太郎" />
        <Avatar size="large" userId={1} lastName="全機現" firstName="太郎" />
        <Avatar size="x-large" userId={1} lastName="全機現" firstName="太郎" />
      </div>
      <div className="flex gap-2">
        <Avatar size="medium" userId={1} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={2} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={3} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={4} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={5} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={6} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={7} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={8} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={9} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={10} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" lastName="全機現" firstName="太郎" />
      </div>
      <div className="flex gap-2">
        <Avatar size="medium" userId={1} lastName="Smith" firstName="John" />
        <Avatar size="medium" lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={1} isDisabled lastName="全機現" firstName="太郎" />
      </div>
      {/* 特殊パターン */}
      <div className="flex gap-2">
        <Avatar size="medium" userId={1} lastName="全機現 太郎" firstName="" />
        <Avatar size="medium" userId={1} lastName="Smith John" firstName="" />
        <Avatar size="medium" userId={1} lastName="全 優" firstName="" />
        <Avatar size="medium" userId={1} lastName="全　優" firstName="" />
      </div>
    </div>
  );
}
