import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { SegmentedControl } from './segmented-control';

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    docs: {
      source: {
        code: ``,
      },
    },
  },
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
  'aria-label': ariaLabel,
  children,
  onChange,
}: {
  value?: string;
  size?: 'small' | 'medium';
  isDisabled?: boolean;
  'aria-label': string;
  children: React.ReactNode;
  onChange?: (value: string) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState(value);

  return (
    <SegmentedControl
      value={selectedValue}
      size={size}
      isDisabled={isDisabled}
      aria-label={ariaLabel}
      onChange={(value: string) => {
        setSelectedValue(value);
        onChange?.(value);
      }}
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
    'aria-label': 'SegmentedControlのサンプル',
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
  },
  render: (args) => (
    <SegmentedControlExample {...args}>
      <SegmentedControl.Item label="短い" value="short" icon="list" />
      <SegmentedControl.Item label="中くらいのラベル" value="medium" icon="table" />
      <SegmentedControl.Item label="ボタンラベル" value="normal" icon="table" isDisabled />
      <SegmentedControl.Item label="とても長いラベルのボタン" value="long" icon="documents" />
    </SegmentedControlExample>
  ),
};

export const LabelWithIconMediumSize: Story = {
  args: {
    value: 'short',
    size: 'medium',
    isDisabled: false,
    'aria-label': 'SegmentedControlのサンプル',
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
      <SegmentedControl.Item label="短い" value="short" icon="list" />
      <SegmentedControl.Item label="中くらいのラベル" value="medium" icon="table" />
      <SegmentedControl.Item label="ボタンラベル" value="value" icon="table" isDisabled />
      <SegmentedControl.Item label="とても長いラベルのボタン" value="long" icon="documents" />
    </SegmentedControlExample>
  ),
};

export const LabelWithIconSmallSize: Story = {
  args: {
    value: 'short',
    size: 'small',
    isDisabled: false,
    'aria-label': 'SegmentedControlのサンプル',
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
      <SegmentedControl.Item label="短い" value="short" icon="list" />
      <SegmentedControl.Item label="中くらいのラベル" value="medium" icon="table" />
      <SegmentedControl.Item label="ボタンラベル" value="value" icon="table" isDisabled />
      <SegmentedControl.Item label="とても長いラベルのボタン" value="long" icon="documents" />
    </SegmentedControlExample>
  ),
};
export const LabelOnlyMediumSize: Story = {
  args: {
    value: 'short',
    size: 'medium',
    isDisabled: false,
    'aria-label': 'SegmentedControlのサンプル',
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
      <SegmentedControl.Item label="短い" value="short" />
      <SegmentedControl.Item label="中くらいのラベル" value="medium" />
      <SegmentedControl.Item label="ボタンラベル" value="value" isDisabled />
      <SegmentedControl.Item label="とても長いラベルのボタン" value="long" />
    </SegmentedControlExample>
  ),
};

export const LabelOnlySmallSize: Story = {
  args: {
    value: 'short',
    size: 'small',
    isDisabled: false,
    'aria-label': 'SegmentedControlのサンプル',
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
      <SegmentedControl.Item label="短い" value="short" />
      <SegmentedControl.Item label="中くらいのラベル" value="medium" />
      <SegmentedControl.Item label="ボタンラベル" value="value" isDisabled />
      <SegmentedControl.Item label="とても長いラベルのボタン" value="long" />
    </SegmentedControlExample>
  ),
};

export const IconOnlyMediumSize: Story = {
  args: {
    value: 'list',
    size: 'medium',
    isDisabled: false,
    'aria-label': 'SegmentedControlのサンプル',
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
      <SegmentedControl.Item icon="list" value="list" aria-label="リスト表示" />
      <SegmentedControl.Item icon="table" value="table" aria-label="テーブル表示" />
      <SegmentedControl.Item icon="star" value="list" aria-label="スター表示" isDisabled />
      <SegmentedControl.Item icon="documents" value="documents" aria-label="ドキュメント表示" />
    </SegmentedControlExample>
  ),
};

export const IconOnlySmallSize: Story = {
  args: {
    value: 'list',
    size: 'small',
    isDisabled: false,
    'aria-label': 'SegmentedControlのサンプル',
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
      <SegmentedControl.Item icon="list" value="list" aria-label="リスト表示" />
      <SegmentedControl.Item icon="table" value="table" aria-label="テーブル表示" />
      <SegmentedControl.Item icon="star" value="list" aria-label="スター表示" isDisabled />
      <SegmentedControl.Item icon="documents" value="documents" aria-label="ドキュメント表示" />
    </SegmentedControlExample>
  ),
};

export const LayoutExamples: Story = {
  args: {
    value: 'list',
    size: 'medium',
    isDisabled: false,
    'aria-label': 'SegmentedControlのサンプル',
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
  },
  render: (args) => (
    <div>
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SegmentedControlExample {...args}>
          <SegmentedControl.Item label="ボタンラベル" value="list" />
          <SegmentedControl.Item label="ボタンラベル" value="table" />
          <SegmentedControl.Item label="ボタンラベル" value="star" />
          <SegmentedControl.Item label="ボタンラベル" value="documents" />
        </SegmentedControlExample>

        <SegmentedControlExample {...args} size="small">
          <SegmentedControl.Item label="ボタンラベル" value="list" />
          <SegmentedControl.Item label="ボタンラベル" value="table" />
          <SegmentedControl.Item label="ボタンラベル" value="star" />
          <SegmentedControl.Item label="ボタンラベル" value="documents" />
        </SegmentedControlExample>

        <SegmentedControlExample {...args}>
          <SegmentedControl.Item label="ボタンラベル" value="list" icon="list" />
          <SegmentedControl.Item label="ボタンラベル" value="table" icon="table" />
          <SegmentedControl.Item label="ボタンラベル" value="star" icon="star" />
          <SegmentedControl.Item label="ボタンラベル" value="documents" icon="documents" />
        </SegmentedControlExample>

        <SegmentedControlExample {...args} size="small">
          <SegmentedControl.Item label="ボタンラベル" value="list" icon="list" />
          <SegmentedControl.Item label="ボタンラベル" value="table" icon="table" />
          <SegmentedControl.Item label="ボタンラベル" value="star" icon="star" />
          <SegmentedControl.Item label="ボタンラベル" value="documents" icon="documents" />
        </SegmentedControlExample>

        <SegmentedControlExample {...args}>
          <SegmentedControl.Item icon="list" value="list" aria-label="リスト表示" />
          <SegmentedControl.Item icon="table" value="table" aria-label="テーブル表示" />
          <SegmentedControl.Item icon="star" value="star" aria-label="スター表示" />
          <SegmentedControl.Item icon="documents" value="documents" aria-label="ドキュメント表示" />
        </SegmentedControlExample>

        <SegmentedControlExample {...args} size="small">
          <SegmentedControl.Item icon="list" value="list" aria-label="リスト表示" />
          <SegmentedControl.Item icon="table" value="table" aria-label="テーブル表示" />
          <SegmentedControl.Item icon="star" value="star" aria-label="スター表示" />
          <SegmentedControl.Item icon="documents" value="documents" aria-label="ドキュメント表示" />
        </SegmentedControlExample>
      </div>
      <div className="flex w-full flex-col gap-5 p-5">
        <SegmentedControlExample {...args}>
          <SegmentedControl.Item label="ボタンラベル" value="list" />
          <SegmentedControl.Item label="ボタンラベル" value="table" />
          <SegmentedControl.Item label="ボタンラベル" value="star" />
          <SegmentedControl.Item label="ボタンラベル" value="documents" />
        </SegmentedControlExample>

        <SegmentedControlExample {...args} size="small">
          <SegmentedControl.Item label="ボタンラベル" value="list" />
          <SegmentedControl.Item label="ボタンラベル" value="table" />
          <SegmentedControl.Item label="ボタンラベル" value="star" />
          <SegmentedControl.Item label="ボタンラベル" value="documents" />
        </SegmentedControlExample>

        <SegmentedControlExample {...args}>
          <SegmentedControl.Item label="ボタンラベル" value="list" icon="list" />
          <SegmentedControl.Item label="ボタンラベル" value="table" icon="table" />
          <SegmentedControl.Item label="ボタンラベル" value="star" icon="star" />
          <SegmentedControl.Item label="ボタンラベル" value="documents" icon="documents" />
        </SegmentedControlExample>

        <SegmentedControlExample {...args} size="small">
          <SegmentedControl.Item label="ボタンラベル" value="list" icon="list" />
          <SegmentedControl.Item label="ボタンラベル" value="table" icon="table" />
          <SegmentedControl.Item label="ボタンラベル" value="star" icon="star" />
          <SegmentedControl.Item label="ボタンラベル" value="documents" icon="documents" />
        </SegmentedControlExample>

        <SegmentedControlExample {...args}>
          <SegmentedControl.Item icon="list" value="list" aria-label="リスト表示" />
          <SegmentedControl.Item icon="table" value="table" aria-label="テーブル表示" />
          <SegmentedControl.Item icon="star" value="star" aria-label="スター表示" />
          <SegmentedControl.Item icon="documents" value="documents" aria-label="ドキュメント表示" />
        </SegmentedControlExample>

        <SegmentedControlExample {...args} size="small">
          <SegmentedControl.Item icon="list" value="list" aria-label="リスト表示" />
          <SegmentedControl.Item icon="table" value="table" aria-label="テーブル表示" />
          <SegmentedControl.Item icon="star" value="star" aria-label="スター表示" />
          <SegmentedControl.Item icon="documents" value="documents" aria-label="ドキュメント表示" />
        </SegmentedControlExample>
      </div>
    </div>
  ),
};
