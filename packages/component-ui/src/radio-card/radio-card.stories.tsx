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

// CustomGrid 用（5要素・3列で折り返し）
const gridPlans = [
  { value: 'free', label: 'フリー', description: 'まずはお試しで' },
  ...plans,
  { value: 'education', label: 'エデュケーション', description: '教育機関・学生向けの割引プランです' },
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

export const Vertical: Story = {
  render: function VerticalStory() {
    const [value, setValue] = useState('basic');

    return (
      <div className="">
        <RadioCard value={value} onChange={setValue} aria-label="プラン選択">
          <RadioCard.Group orientation="vertical">
            <RadioCard.Item value="basic" label="ベーシック" description="個人向け" />
            <RadioCard.Item value="pro" label="プロ" description="チーム向け" />
            <RadioCard.Item value="enterprise" label="エンタープライズ" description="大規模組織向け" />
          </RadioCard.Group>
        </RadioCard>
      </div>
    );
  },
};

export const Horizontal: Story = {
  render: function HorizontalStory() {
    const [value, setValue] = useState('basic');

    return (
      <RadioCard value={value} onChange={setValue} aria-label="プラン選択">
        <RadioCard.Group orientation="horizontal">
          <RadioCard.Item value="basic" label="ベーシック" description="個人向け" />
          <RadioCard.Item value="pro" label="プロ" description="チーム向け" />
          <RadioCard.Item value="enterprise" label="エンタープライズ" description="大規模組織向け" />
        </RadioCard.Group>
      </RadioCard>
    );
  },
};

// orientation="custom" のカスタムレイアウト見本（gridPlans を流用）。className を差し替えるだけで多様なレイアウトを実現できる。
// grid アイテムは stretch されるので [&>div>div]:h-full でカード見た目を埋め、auto-rows-fr で全行の高さを揃える。
function CustomLayoutSample({ className }: { className: string }) {
  const [value, setValue] = useState('basic');

  return (
    <RadioCard value={value} onChange={setValue} aria-label="プラン選択">
      <RadioCard.Group orientation="custom" className={className}>
        {gridPlans.map((plan) => (
          <RadioCard.Item key={plan.value} value={plan.value} label={plan.label} description={plan.description} />
        ))}
      </RadioCard.Group>
    </RadioCard>
  );
}

// orientation="custom" + className で実現できるカスタムレイアウトの見本集（1ストーリーに集約）。
export const CustomGrid: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <section>
        <p className="typography-label14bold mb-2 text-text01">3列グリッド（等幅・等高）</p>
        <div className="w-[720px]">
          <CustomLayoutSample className="grid auto-rows-fr grid-cols-3 gap-2 [&>div>div]:h-full" />
        </div>
      </section>

      <section>
        <p className="typography-label14bold mb-2 text-text01">
          レスポンシブグリッド（auto-fill で列数が幅に応じて変わる）
        </p>
        <div className="w-full max-w-[900px]">
          <CustomLayoutSample className="grid auto-rows-fr grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2 [&>div>div]:h-full" />
        </div>
      </section>

      <section>
        <p className="typography-label14bold mb-2 text-text01">等幅の横並び（flex-1）</p>
        <div className="w-full overflow-x-scroll pb-4">
          <div className="w-[1200px]">
            <CustomLayoutSample className="flex gap-2 [&>*]:flex-1 [&>div>div]:h-full" />
          </div>
        </div>
      </section>

      <section>
        <p className="typography-label14bold mb-2 text-text01">2カラム（等幅・等高）</p>
        <div className="w-[520px]">
          <CustomLayoutSample className="grid auto-rows-fr grid-cols-2 gap-2 [&>div>div]:h-full" />
        </div>
      </section>
    </div>
  ),
};
