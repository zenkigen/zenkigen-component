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
  { value: 'basic', label: 'ベーシック', description: '個人向け' },
  { value: 'pro', label: 'プロ', description: 'チームでの共同編集に適したプランです' },
  {
    value: 'enterprise',
    label: 'エンタープライズ',
    description:
      '大規模組織向けに、高度なセキュリティ管理・SSO 連携・専任サポート・カスタム契約など、運用に必要な機能を網羅的に提供する最上位プランです',
  },
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
