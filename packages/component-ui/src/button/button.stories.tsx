import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from '../icon';
import { Button } from '.';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large', 'x-large'],
      control: { type: 'radio' },
    },
    variant: {
      options: ['fill', 'fillDanger', 'outline', 'text'],
      control: { type: 'radio' },
    },
    borderRadius: {
      control: { type: 'text' },
    },
    justifyContent: {
      options: ['start', 'center'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Component: Story = {
  args: {
    children: 'ボタンラベル',
    size: 'medium',
    width: '',
    isSelected: false,
    isDisabled: false,
    variant: 'fill',
    before: '',
    after: '',
    // eslint-disable-next-line no-undefined
    borderRadius: undefined,
    justifyContent: 'center',
  },
  parameters: {
    chromatic: { disable: true },
  },
};

export const Fill: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Button size="small">ボタンラベル</Button>
        <Button size="small" before={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button size="small" after={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button size="small" isDisabled>
          ボタンラベル
        </Button>
        <Button size="small" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button>ボタンラベル</Button>
        <Button before={<Icon name="add" size="small" />}>ボタンラベル</Button>
        <Button after={<Icon name="add" size="small" />}>ボタンラベル</Button>
        <Button isDisabled>ボタンラベル</Button>
        <Button before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="large">ボタンラベル</Button>
        <Button size="large" before={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button size="large" after={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button size="large" isDisabled>
          ボタンラベル
        </Button>
        <Button size="large" before={<Icon name="add" size="medium" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="x-large">ボタンラベル</Button>
        <Button size="x-large" before={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button size="x-large" after={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button size="x-large" isDisabled>
          ボタンラベル
        </Button>
        <Button size="x-large" before={<Icon name="add" size="medium" />} isSelected>
          ボタンラベル
        </Button>
      </div>
    </div>
  ),
};

export const FillDanger: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Button size="small" variant="fillDanger">
          ボタンラベル
        </Button>
        <Button size="small" variant="fillDanger" before={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button size="small" variant="fillDanger" after={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button size="small" variant="fillDanger" isDisabled>
          ボタンラベル
        </Button>
        <Button size="small" variant="fillDanger" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="fillDanger">ボタンラベル</Button>
        <Button variant="fillDanger" before={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="fillDanger" after={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="fillDanger" isDisabled>
          ボタンラベル
        </Button>
        <Button variant="fillDanger" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="large" variant="fillDanger">
          ボタンラベル
        </Button>
        <Button size="large" variant="fillDanger" before={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button size="large" variant="fillDanger" after={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button size="large" variant="fillDanger" isDisabled>
          ボタンラベル
        </Button>
        <Button size="large" variant="fillDanger" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="x-large" variant="fillDanger">
          ボタンラベル
        </Button>
        <Button size="x-large" variant="fillDanger" before={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button size="x-large" variant="fillDanger" after={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button size="x-large" variant="fillDanger" isDisabled>
          ボタンラベル
        </Button>
        <Button size="x-large" variant="fillDanger" before={<Icon name="add" size="medium" />} isSelected>
          ボタンラベル
        </Button>
      </div>
    </div>
  ),
};

export const Outline: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="small">
          ボタンラベル
        </Button>
        <Button variant="outline" size="small" before={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="outline" size="small" after={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="outline" size="small" isDisabled>
          ボタンラベル
        </Button>
        <Button variant="outline" size="small" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">ボタンラベル</Button>
        <Button variant="outline" before={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="outline" after={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="outline" isDisabled>
          ボタンラベル
        </Button>
        <Button variant="outline" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="large">
          ボタンラベル
        </Button>
        <Button variant="outline" size="large" before={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button variant="outline" size="large" after={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button variant="outline" size="large" isDisabled>
          ボタンラベル
        </Button>
        <Button variant="outline" size="large" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="x-large">
          ボタンラベル
        </Button>
        <Button variant="outline" size="x-large" before={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button variant="outline" size="x-large" after={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button variant="outline" size="x-large" isDisabled>
          ボタンラベル
        </Button>
        <Button variant="outline" size="x-large" before={<Icon name="add" size="medium" />} isSelected>
          ボタンラベル
        </Button>
      </div>
    </div>
  ),
};

export const Text: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Button variant="text" size="small">
          ボタンラベル
        </Button>
        <Button variant="text" size="small" before={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="text" size="small" after={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="text" size="small" isDisabled>
          ボタンラベル
        </Button>
        <Button variant="text" size="small" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="text">ボタンラベル</Button>
        <Button variant="text" before={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="text" after={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="text" isDisabled>
          ボタンラベル
        </Button>
        <Button variant="text" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="text" size="large">
          ボタンラベル
        </Button>
        <Button variant="text" size="large" before={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button variant="text" size="large" after={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button variant="text" size="large" isDisabled>
          ボタンラベル
        </Button>
        <Button variant="text" size="large" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="text" size="x-large">
          ボタンラベル
        </Button>
        <Button variant="text" size="x-large" before={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button variant="text" size="x-large" after={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button variant="text" size="x-large" isDisabled>
          ボタンラベル
        </Button>
        <Button variant="text" size="x-large" before={<Icon name="add" size="medium" />} isSelected>
          ボタンラベル
        </Button>
      </div>
    </div>
  ),
};
