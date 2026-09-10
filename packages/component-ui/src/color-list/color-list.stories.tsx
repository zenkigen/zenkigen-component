import type { Meta, StoryObj } from '@storybook/react';

import { ColorList } from './color-list';

const meta: Meta = {
  title: 'hooks/useColorList',
};

type Story = StoryObj<typeof ColorList>;
export default meta;

export const Component: Story = {
  args: {
    members: 30,
    saturation: 40,
    brightness: 90,
  },
  argTypes: {
    members: { control: 'number', description: '生成する数' },
    saturation: { control: 'number', description: '彩度 %（0-100）デフォルト 40' },
    brightness: { control: 'number', description: '輝度 %（0-100）デフォルト 90' },
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: (args) => <ColorList {...args} />,
};
