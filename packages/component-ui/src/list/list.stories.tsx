import type { Meta, StoryObj } from '@storybook/react-vite';

import { List } from './list';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  argTypes: {
    size: {
      control: 'radio',
      options: ['medium', 'large'],
      description: 'サイズ',
      table: { defaultValue: { summary: 'medium' } },
    },
    variant: {
      control: 'radio',
      options: ['outline', 'borderless'],
      description: '枠線の有無',
      table: { defaultValue: { summary: 'outline' } },
    },
    role: {
      control: 'radio',
      options: ['listbox', 'menu'],
      description: 'ARIA role',
      table: { defaultValue: { summary: 'listbox' } },
    },
    selectionIndicator: {
      control: 'radio',
      options: ['none', 'left', 'right'],
      description: '選択項目のチェックマーク位置',
      table: { defaultValue: { summary: 'none' } },
    },
    maxHeight: { control: 'text', description: '最大高さ' },
    width: { control: 'text', description: '幅' },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

const sampleItems = [
  { id: 'opt-a', label: '選択肢 A' },
  { id: 'opt-b', label: '選択肢 B' },
  { id: 'opt-c', label: '選択肢 C' },
  { id: 'opt-d', label: '選択肢 D' },
] as const;

export const Component: Story = {
  args: {
    size: 'medium',
    variant: 'outline',
    role: 'listbox',
    selectionIndicator: 'none',
    width: '240px',
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: function ComponentRender(args) {
    return (
      <List {...args}>
        {sampleItems.map((item) => (
          <List.OptionItem key={item.id} id={item.id}>
            {item.label}
          </List.OptionItem>
        ))}
      </List>
    );
  },
};

export const Outline: Story = {
  render: () => (
    <div className="flex flex-col gap-12">
      <div className="flex items-start gap-8">
        <div style={{ width: 240 }}>
          <List variant="outline" size="medium" aria-label="medium / 状態混在">
            <List.OptionItem id="m-default">デフォルト</List.OptionItem>
            <List.OptionItem id="m-active" isActive>
              キーボードフォーカス
            </List.OptionItem>
            <List.OptionItem id="m-selected" isSelected>
              選択済み
            </List.OptionItem>
            <List.OptionItem id="m-selected-error" isSelected isError>
              選択済み (Error)
            </List.OptionItem>
            <List.OptionItem id="m-disabled" isDisabled>
              無効
            </List.OptionItem>
          </List>
        </div>
        <div style={{ width: 240 }}>
          <List variant="outline" size="large" aria-label="large / 状態混在">
            <List.OptionItem id="l-default">デフォルト</List.OptionItem>
            <List.OptionItem id="l-active" isActive>
              キーボードフォーカス
            </List.OptionItem>
            <List.OptionItem id="l-selected" isSelected>
              選択済み
            </List.OptionItem>
            <List.OptionItem id="l-selected-error" isSelected isError>
              選択済み (Error)
            </List.OptionItem>
            <List.OptionItem id="l-disabled" isDisabled>
              無効
            </List.OptionItem>
          </List>
        </div>
      </div>
    </div>
  ),
};

export const Borderless: Story = {
  render: () => (
    <div className="flex flex-col gap-12">
      <div className="flex items-start gap-8">
        <div style={{ width: 240 }}>
          <List variant="borderless" size="medium" aria-label="medium / 状態混在">
            <List.OptionItem id="bm-default">デフォルト</List.OptionItem>
            <List.OptionItem id="bm-active" isActive>
              キーボードフォーカス
            </List.OptionItem>
            <List.OptionItem id="bm-selected" isSelected>
              選択済み
            </List.OptionItem>
            <List.OptionItem id="bm-selected-error" isSelected isError>
              選択済み (Error)
            </List.OptionItem>
            <List.OptionItem id="bm-disabled" isDisabled>
              無効
            </List.OptionItem>
          </List>
        </div>
        <div style={{ width: 240 }}>
          <List variant="borderless" size="large" aria-label="large / 状態混在">
            <List.OptionItem id="bl-default">デフォルト</List.OptionItem>
            <List.OptionItem id="bl-active" isActive>
              キーボードフォーカス
            </List.OptionItem>
            <List.OptionItem id="bl-selected" isSelected>
              選択済み
            </List.OptionItem>
            <List.OptionItem id="bl-selected-error" isSelected isError>
              選択済み (Error)
            </List.OptionItem>
            <List.OptionItem id="bl-disabled" isDisabled>
              無効
            </List.OptionItem>
          </List>
        </div>
      </div>
    </div>
  ),
};

export const WithMaxHeight: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <List variant="outline" size="medium" maxHeight={160} aria-label="スクロール可">
        {Array.from({ length: 12 }, (_, i) => (
          <List.OptionItem key={`scroll-${String(i)}`} id={`scroll-${String(i)}`}>
            アイテム {i + 1}
          </List.OptionItem>
        ))}
      </List>
    </div>
  ),
};

export const SelectionIndicator: Story = {
  render: () => (
    <div className="flex items-start gap-8">
      <div style={{ width: 240 }}>
        <List variant="outline" size="medium" selectionIndicator="left" aria-label="左チェック">
          <List.OptionItem id="left-1">選択項目1</List.OptionItem>
          <List.OptionItem id="left-2">選択項目2</List.OptionItem>
          <List.OptionItem id="left-3">選択項目3</List.OptionItem>
          <List.OptionItem id="left-4">選択項目4</List.OptionItem>
          <List.OptionItem id="left-5" isSelected>
            選択項目5
          </List.OptionItem>
        </List>
      </div>
      <div style={{ width: 240 }}>
        <List variant="outline" size="medium" selectionIndicator="right" aria-label="右チェック">
          <List.OptionItem id="right-1">選択項目1</List.OptionItem>
          <List.OptionItem id="right-2">選択項目2</List.OptionItem>
          <List.OptionItem id="right-3">選択項目3</List.OptionItem>
          <List.OptionItem id="right-4">選択項目4</List.OptionItem>
          <List.OptionItem id="right-5" isSelected>
            選択項目5
          </List.OptionItem>
        </List>
      </div>
    </div>
  ),
};
