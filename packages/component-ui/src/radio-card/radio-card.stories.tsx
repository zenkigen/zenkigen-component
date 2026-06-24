import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { RadioCard } from '.';

const meta: Meta<typeof RadioCard> = {
  title: 'Components/RadioCard',
  component: RadioCard,
};
export default meta;

type Story = StoryObj<typeof RadioCard>;

const plans = [
  { value: 'basic', label: 'ベーシック', description: '個人向けのプランです' },
  { value: 'pro', label: 'プロ', description: 'チーム向けのプランです' },
  { value: 'enterprise', label: 'エンタープライズ', description: '大規模組織向けのプランです' },
];

function PlanSelect({ isError = false, isDisabled = false }: { isError?: boolean; isDisabled?: boolean }) {
  const [value, setValue] = useState('basic');

  return (
    <div className="w-80">
      <RadioCard value={value} onChange={setValue} aria-label="プラン選択" isError={isError} isDisabled={isDisabled}>
        <RadioCard.Group>
          {plans.map((plan) => (
            <RadioCard.Item key={plan.value} value={plan.value} label={plan.label} description={plan.description} />
          ))}
        </RadioCard.Group>
        {isError ? <RadioCard.ErrorMessage>いずれかのプランを選択してください</RadioCard.ErrorMessage> : null}
      </RadioCard>
    </div>
  );
}

export const Component: Story = {
  args: {
    isError: false,
    isDisabled: false,
  },
  render: (args) => <PlanSelect isError={args.isError} isDisabled={args.isDisabled} />,
  parameters: {
    chromatic: { disable: true },
  },
};

export const Default: Story = {
  render: () => <PlanSelect />,
};

export const WithoutDescription: Story = {
  render: function WithoutDescriptionStory() {
    const [value, setValue] = useState('a');

    return (
      <div className="w-80">
        <RadioCard value={value} onChange={setValue} aria-label="サイズ選択">
          <RadioCard.Group>
            <RadioCard.Item value="a" label="スモール" />
            <RadioCard.Item value="b" label="ミディアム" />
            <RadioCard.Item value="c" label="ラージ" />
          </RadioCard.Group>
        </RadioCard>
      </div>
    );
  },
};

export const Error: Story = {
  render: () => <PlanSelect isError />,
};

export const Disabled: Story = {
  render: () => <PlanSelect isDisabled />,
};

export const Horizontal: Story = {
  render: function HorizontalStory() {
    const [value, setValue] = useState('a');

    return (
      <RadioCard value={value} onChange={setValue} aria-label="配送方法">
        <RadioCard.Group orientation="horizontal">
          <RadioCard.Item value="a" label="通常配送" description="3〜5日でお届け" />
          <RadioCard.Item value="b" label="速達配送" description="翌日お届け" />
        </RadioCard.Group>
      </RadioCard>
    );
  },
};

export const CustomGrid: Story = {
  render: function CustomGridStory() {
    const [value, setValue] = useState('1');

    return (
      <div className="w-[480px]">
        <RadioCard value={value} onChange={setValue} aria-label="数量選択">
          <RadioCard.Group orientation="custom" className="grid grid-cols-2 gap-2">
            <RadioCard.Item value="1" label="1個" />
            <RadioCard.Item value="2" label="2個" />
            <RadioCard.Item value="3" label="3個" />
            <RadioCard.Item value="4" label="4個" />
          </RadioCard.Group>
        </RadioCard>
      </div>
    );
  },
};
