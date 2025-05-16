import type { Meta, StoryObj } from '@storybook/react';

import { Loading } from '.';

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Component: Story = {
  args: {
    size: 'medium',
    position: 'static',
    height: '100%',
  },
  parameters: {
    chromatic: { disable: true },
  },
};

export const Base = { args: {} };
