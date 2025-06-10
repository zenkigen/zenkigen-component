import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SegmentedControls } from './segmented-controls';

const meta = {
  title: 'UI/SegmentedControls',
  component: SegmentedControls,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object', description: 'Array of segmented control options' },
    selectedValue: { control: 'text', description: 'Currently selected value' },
    size: { control: 'radio', options: ['small', 'medium'], description: 'Size of the segmented controls' },
    isDisabled: { control: 'boolean', description: 'Whether the segmented controls are disabled' },
    fullWidth: { control: 'boolean', description: 'Whether the segmented controls should take full width' },
    variant: { control: 'radio', options: ['default', 'iconOnly'], description: 'Variant of the segmented controls' },
  },
} satisfies Meta<typeof SegmentedControls>;

export default meta;
type Story = StoryObj<typeof meta>;

// Figmaのデザインに合わせた日本語ラベル
const defaultOptions = [
  { id: 'option1', label: 'ボタンラベル', value: 'option1' },
  { id: 'option2', label: 'ボタンラベル', value: 'option2' },
  { id: 'option3', label: 'ボタンラベル', value: 'option3' },
];

// +アイコンを使用したアイコンオンリーオプション
const iconOnlyOptions = [
  { id: 'add1', icon: '+', value: 'add1' },
  { id: 'add2', icon: '+', value: 'add2' },
  { id: 'add3', icon: '+', value: 'add3' },
];

export const Default: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('option1');
    return <SegmentedControls {...args} selectedValue={selectedValue} onChange={setSelectedValue as any} />;
  },
  args: { options: defaultOptions, size: 'medium', isDisabled: false, fullWidth: false, variant: 'default' },
};

export const Small: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('option2');
    return <SegmentedControls {...args} selectedValue={selectedValue} onChange={setSelectedValue as any} />;
  },
  args: { options: defaultOptions, size: 'small', isDisabled: false, fullWidth: false, variant: 'default' },
};

export const Medium: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('option1');
    return <SegmentedControls {...args} selectedValue={selectedValue} onChange={setSelectedValue as any} />;
  },
  args: { options: defaultOptions, size: 'medium', isDisabled: false, fullWidth: false, variant: 'default' },
};

export const IconOnly: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('add1');
    return <SegmentedControls {...args} selectedValue={selectedValue} onChange={setSelectedValue as any} />;
  },
  args: { options: iconOnlyOptions, size: 'medium', isDisabled: false, fullWidth: false, variant: 'iconOnly' },
};

export const IconOnlySmall: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('add2');
    return <SegmentedControls {...args} selectedValue={selectedValue} onChange={setSelectedValue as any} />;
  },
  args: { options: iconOnlyOptions, size: 'small', isDisabled: false, fullWidth: false, variant: 'iconOnly' },
};

export const FullWidth: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('option1');
    return <SegmentedControls {...args} selectedValue={selectedValue} onChange={setSelectedValue as any} />;
  },
  args: { options: defaultOptions, size: 'medium', isDisabled: false, fullWidth: true, variant: 'default' },
};

export const Disabled: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('option1');
    return <SegmentedControls {...args} selectedValue={selectedValue} onChange={setSelectedValue as any} />;
  },
  args: { options: defaultOptions, size: 'medium', isDisabled: true, fullWidth: false, variant: 'default' },
};

export const WithIcons: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('list');
    return <SegmentedControls {...args} selectedValue={selectedValue} onChange={setSelectedValue as any} />;
  },
  args: {
    options: [
      { id: 'list', label: 'リスト', value: 'list', icon: '📋' },
      { id: 'grid', label: 'グリッド', value: 'grid', icon: '⊞' },
      { id: 'card', label: 'カード', value: 'card', icon: '🃏' },
    ],
    size: 'medium',
    isDisabled: false,
    fullWidth: false,
    variant: 'default',
  },
};
