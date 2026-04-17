import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../button';
import { Steps } from './steps';
import type { StepsOrientation, StepsSize, StepsTextOrientation, StepsVariant } from './types';

const defaultLabels = ['ステップ1', 'ステップ2', 'ステップ3', 'ステップ4'];

const meta = {
  title: 'Components/Steps',
  component: Steps,
  argTypes: {
    currentStep: { control: 'number', description: '現在のステップ index（0 始まり）' },
    size: { control: 'radio', options: ['small', 'medium', 'large'], description: 'サイズ' },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'], description: 'ステップの並ぶ方向' },
    textOrientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'テキストを円の横(horizontal)か下(vertical)に並べるか',
    },
    variant: { control: 'radio', options: ['subtle', 'bold'], description: 'ステップの表現強弱' },
    'aria-label': { control: 'text', description: 'ステップ群の意味を伝えるラベル' },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof Steps>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = (
  <>
    {defaultLabels.map((label) => (
      <Steps.Item key={label} label={label} />
    ))}
  </>
);

const sizes: StepsSize[] = ['small', 'medium', 'large'];
const textOrientations: StepsTextOrientation[] = ['horizontal', 'vertical'];

function renderVariantMatrix(variant: StepsVariant, orientation: StepsOrientation) {
  return (
    <div className="flex flex-col gap-8">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-4">
          <div className="typography-label12regular text-text02">size: {size}</div>
          <div className="flex flex-col gap-8 md:flex-row md:flex-wrap">
            {textOrientations.map((textOrientation) => (
              <div key={textOrientation} className="flex w-[480px] flex-col gap-2">
                <div className="typography-label12regular text-text02">textOrientation: {textOrientation}</div>
                <Steps
                  currentStep={2}
                  size={size}
                  orientation={orientation}
                  textOrientation={textOrientation}
                  variant={variant}
                  aria-label={`${variant} ${orientation} ${textOrientation}`}
                >
                  {defaultLabels.map((label) => (
                    <Steps.Item key={label} label={label} />
                  ))}
                </Steps>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export const Component: Story = {
  args: {
    currentStep: 2,
    size: 'medium',
    orientation: 'horizontal',
    textOrientation: 'horizontal',
    variant: 'bold',
    'aria-label': 'ステップのサンプル',
    children: defaultItems,
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: (args) => (
    <div className="flex w-full flex-col">
      <Steps {...args}>{defaultItems}</Steps>
    </div>
  ),
};

export const BoldHorizontal: Story = {
  args: { ...Component.args, variant: 'bold', orientation: 'horizontal' },
  render: () => <div className="w-[720px]">{renderVariantMatrix('bold', 'horizontal')}</div>,
};

export const SubtleHorizontal: Story = {
  args: { ...Component.args, variant: 'subtle', orientation: 'horizontal' },
  render: () => <div className="w-[720px]">{renderVariantMatrix('subtle', 'horizontal')}</div>,
};

export const BoldVertical: Story = {
  args: { ...Component.args, variant: 'bold', orientation: 'vertical' },
  render: () => <div>{renderVariantMatrix('bold', 'vertical')}</div>,
};

export const SubtleVertical: Story = {
  args: { ...Component.args, variant: 'subtle', orientation: 'vertical' },
  render: () => <div>{renderVariantMatrix('subtle', 'vertical')}</div>,
};

export const Progress: Story = {
  args: Component.args,
  render: () => (
    <div className="flex w-[600px] flex-col gap-6">
      {[-1, 0, 2, 4].map((step) => (
        <div key={step} className="flex flex-col gap-2">
          <div className="typography-label12regular text-text02">currentStep: {step}</div>
          <Steps currentStep={step} aria-label={`currentStep=${step}`}>
            {defaultLabels.map((label) => (
              <Steps.Item key={label} label={label} />
            ))}
          </Steps>
        </div>
      ))}
    </div>
  ),
};

// const itemsWithDescription = [
//   { label: '申込情報入力', description: 'お名前・メール' },
//   { label: '配送先', description: '住所入力' },
//   { label: 'お支払い', description: 'カード情報' },
//   { label: '確認', description: '内容の確認' },
// ];
//
// export const WithDescription: Story = {
//   args: Component.args,
//   render: () => (
//     <div className="flex w-[720px] flex-col gap-8">
//       {sizes.map((size) => (
//         <div key={size} className="flex flex-col gap-2">
//           <div className="typography-label12regular text-text02">size: {size}</div>
//           <Steps currentStep={1} size={size} aria-label={`description ${size}`}>
//             {itemsWithDescription.map((item) => (
//               <Steps.Item key={item.label} label={item.label} description={item.description} />
//             ))}
//           </Steps>
//         </div>
//       ))}
//     </div>
//   ),
// };

export const Interactive: Story = {
  args: Component.args,
  parameters: {
    chromatic: { disable: true },
  },
  render: function InteractiveRender() {
    const [step, setStep] = useState(0);
    const itemsCount = defaultLabels.length;

    return (
      <div className="flex w-[720px] flex-col gap-6">
        <Steps currentStep={step} aria-label="インタラクティブなステップ">
          {defaultLabels.map((label) => (
            <Steps.Item key={label} label={label} />
          ))}
        </Steps>
        <div className="flex gap-2">
          <Button isDisabled={step <= 0} onClick={() => setStep((prev) => Math.max(prev - 1, 0))}>
            前へ
          </Button>
          <Button isDisabled={step >= itemsCount} onClick={() => setStep((prev) => Math.min(prev + 1, itemsCount))}>
            次へ
          </Button>
          <Button variant="text" onClick={() => setStep(0)}>
            リセット
          </Button>
        </div>
        <div className="typography-label12regular text-text02">currentStep: {step}</div>
      </div>
    );
  },
};
