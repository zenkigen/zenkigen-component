import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from '.';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Component: Story = {
  parameters: {
    chromatic: { disable: true },
  },
};

export const Base: Story = {
  render: () => (
    <div className="flex w-[480px] flex-col gap-4">
      <p className="typography-body14regular text-text01">セクション 1</p>
      <Divider />
      <p className="typography-body14regular text-text01">セクション 2</p>
      <Divider />
      <p className="typography-body14regular text-text01">セクション 3</p>
    </div>
  ),
};
