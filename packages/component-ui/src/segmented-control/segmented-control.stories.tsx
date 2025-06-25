import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { SegmentedControl } from './segmented-control';

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: '現在選択されている値' },
    size: { control: 'radio', options: ['small', 'medium'], description: 'サイズ' },
    isDisabled: { control: 'boolean', description: '無効化するかどうか' },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

const SegmentedControlExample = ({
  value = 'option1',
  size = 'medium' as const,
  isDisabled = false,
  children,
  onChange,
}: {
  value?: string;
  size?: 'small' | 'medium';
  isDisabled?: boolean;
  children: React.ReactNode;
  onChange?: (value: string) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState(value);

  return (
    <SegmentedControl
      value={selectedValue}
      onChange={(value: string) => {
        setSelectedValue(value);
        onChange?.(value);
      }}
      size={size}
      isDisabled={isDisabled}
    >
      {children}
    </SegmentedControl>
  );
};

export const Component: Story = {
  args: {
    value: 'short',
    size: 'medium',
    isDisabled: false,
    onChange: action('onChange'),
    children: <></>,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    chromatic: { disable: true },
    docs: {
      source: {
        code: `<SegmentedControl value="short" onChange={() => {}} aria-label="SegmentedControlのサンプル">
  <SegmentedControl.Item label="短い" id="short" icon="list" />
  <SegmentedControl.Item label="中くらいのラベル" id="medium" icon="table" />
  <SegmentedControl.Item label="ボタンラベル" id="value" icon="table" isDisabled />
  <SegmentedControl.Item label="とても長いラベルのボタン" id="long" icon="documents" />
</SegmentedControl>`,
      },
    },
  },
  render: (args) => (
    <SegmentedControlExample {...args}>
      <SegmentedControl.Item label="短いx" id="short" icon="list" />
      <SegmentedControl.Item label="中くらいのラベル" id="medium" icon="table" />
      <SegmentedControl.Item label="ボタンラベル" id="value" icon="table" isDisabled />
      <SegmentedControl.Item label="とても長いラベルのボタン" id="long" icon="documents" />
    </SegmentedControlExample>
  ),
};

export const LabelWithIconSmallSize: Story = {
  args: {
    value: 'short',
    size: 'small',
    isDisabled: false,
    onChange: action('onChange'),
    children: <></>,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => (
    <SegmentedControlExample {...args}>
      <SegmentedControl.Item label="短い" id="short" icon="list" />
      <SegmentedControl.Item label="中くらいのラベル" id="medium" icon="table" />
      <SegmentedControl.Item label="ボタンラベル" id="value" icon="table" isDisabled />
      <SegmentedControl.Item label="とても長いラベルのボタン" id="long" icon="documents" />
    </SegmentedControlExample>
  ),
};

export const LabelWithIconMediumSize: Story = {
  args: {
    value: 'short',
    size: 'medium',
    isDisabled: false,
    onChange: action('onChange'),
    children: <></>,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => (
    <SegmentedControlExample {...args}>
      <SegmentedControl.Item label="短い" id="short" icon="list" />
      <SegmentedControl.Item label="中くらいのラベル" id="medium" icon="table" />
      <SegmentedControl.Item label="ボタンラベル" id="value" icon="table" isDisabled />
      <SegmentedControl.Item label="とても長いラベルのボタン" id="long" icon="documents" />
    </SegmentedControlExample>
  ),
};

export const LabelOnlyMediumSize: Story = {
  args: {
    value: 'short',
    size: 'medium',
    isDisabled: false,
    onChange: action('onChange'),
    children: <></>,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => (
    <SegmentedControlExample {...args}>
      <SegmentedControl.Item label="短い" id="short" />
      <SegmentedControl.Item label="中くらいのラベル" id="medium" />
      <SegmentedControl.Item label="ボタンラベル" id="value" isDisabled />
      <SegmentedControl.Item label="とても長いラベルのボタン" id="long" />
    </SegmentedControlExample>
  ),
};

export const LabelOnlySmallSize: Story = {
  args: {
    value: 'short',
    size: 'small',
    isDisabled: false,
    onChange: action('onChange'),
    children: <></>,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => (
    <SegmentedControlExample {...args}>
      <SegmentedControl.Item label="短い" id="short" />
      <SegmentedControl.Item label="中くらいのラベル" id="medium" />
      <SegmentedControl.Item label="ボタンラベル" id="value" isDisabled />
      <SegmentedControl.Item label="とても長いラベルのボタン" id="long" />
    </SegmentedControlExample>
  ),
};

export const IconOnlySmallSize: Story = {
  args: {
    value: 'list',
    size: 'small',
    isDisabled: false,
    onChange: action('onChange'),
    children: <></>,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => (
    <SegmentedControlExample {...args}>
      <SegmentedControl.Item icon="list" id="list" aria-label="リスト表示" />
      <SegmentedControl.Item icon="table" id="table" aria-label="テーブル表示" />
      <SegmentedControl.Item icon="star" id="list" aria-label="スター表示" isDisabled />
      <SegmentedControl.Item icon="documents" id="documents" aria-label="ドキュメント表示" />
    </SegmentedControlExample>
  ),
};

export const IconOnlyMediumSize: Story = {
  args: {
    value: 'list',
    size: 'medium',
    isDisabled: false,
    onChange: action('onChange'),
    children: <></>,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => (
    <SegmentedControlExample {...args}>
      <SegmentedControl.Item icon="list" id="list" aria-label="リスト表示" />
      <SegmentedControl.Item icon="table" id="table" aria-label="テーブル表示" />
      <SegmentedControl.Item icon="star" id="list" aria-label="スター表示" isDisabled />
      <SegmentedControl.Item icon="documents" id="documents" aria-label="ドキュメント表示" />
    </SegmentedControlExample>
  ),
};
