import type { Meta, StoryObj } from '@storybook/react-vite';

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
    variant: { control: 'radio', options: ['subtle', 'solid'], description: 'ステップの表現強弱' },
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
    variant: 'solid',
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

export const SolidHorizontal: Story = {
  args: { ...Component.args, variant: 'solid', orientation: 'horizontal' },
  render: () => <div className="w-[720px]">{renderVariantMatrix('solid', 'horizontal')}</div>,
};

export const SubtleHorizontal: Story = {
  args: { ...Component.args, variant: 'subtle', orientation: 'horizontal' },
  render: () => <div className="w-[720px]">{renderVariantMatrix('subtle', 'horizontal')}</div>,
};

export const SolidVertical: Story = {
  args: { ...Component.args, variant: 'solid', orientation: 'vertical' },
  render: () => <div>{renderVariantMatrix('solid', 'vertical')}</div>,
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

const applicationFlowItems = [{ label: '申込情報入力' }, { label: '配送先' }, { label: 'お支払い' }, { label: '確認' }];

const horizontalLayoutVariants: Array<{
  size: StepsSize;
  variant: StepsVariant;
  textOrientation: StepsTextOrientation;
}> = [
  { size: 'small', variant: 'solid', textOrientation: 'horizontal' },
  { size: 'medium', variant: 'solid', textOrientation: 'horizontal' },
  { size: 'large', variant: 'solid', textOrientation: 'horizontal' },
  { size: 'small', variant: 'subtle', textOrientation: 'horizontal' },
  { size: 'medium', variant: 'subtle', textOrientation: 'horizontal' },
  { size: 'large', variant: 'subtle', textOrientation: 'horizontal' },
  { size: 'small', variant: 'solid', textOrientation: 'vertical' },
  { size: 'medium', variant: 'solid', textOrientation: 'vertical' },
  { size: 'large', variant: 'solid', textOrientation: 'vertical' },
  { size: 'small', variant: 'subtle', textOrientation: 'vertical' },
  { size: 'medium', variant: 'subtle', textOrientation: 'vertical' },
  { size: 'large', variant: 'subtle', textOrientation: 'vertical' },
];

function renderHorizontalLayoutSteps(itemClassName: string) {
  return horizontalLayoutVariants.map(({ size, variant, textOrientation }) => (
    <div key={`${size}-${variant}-${textOrientation}`} className={itemClassName}>
      <Steps currentStep={2} aria-label="申込フロー" size={size} variant={variant} textOrientation={textOrientation}>
        {applicationFlowItems.map((item) => (
          <Steps.Item key={item.label} label={item.label} />
        ))}
      </Steps>
    </div>
  ));
}

export const LayoutExampleHorizontal: Story = {
  args: Component.args,
  parameters: {
    chromatic: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h3 className="typography-h5 text-text01">水平 幅なし(flex flex-col items-center)</h3>
        <div className="flex items-stretch justify-center rounded border border-uiBorder01 bg-uiBackground01 p-6">
          <div className="flex flex-col items-center gap-12 p-4">{renderHorizontalLayoutSteps('flex')}</div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="typography-h5 text-text01">水平 幅固定(flex w-[800px] flex-col)</h3>
        <div className="flex items-stretch justify-center rounded border border-uiBorder01 bg-uiBackground01 p-6">
          <div className="flex w-[800px] flex-col gap-12 p-4">{renderHorizontalLayoutSteps('flex flex-col gap-4')}</div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="typography-h5 text-text01">水平 幅100%(flex flex-col)</h3>
        <div className="flex items-stretch justify-center rounded border border-uiBorder01 bg-uiBackground01 p-6">
          <div className="flex w-full flex-col gap-12 p-4">{renderHorizontalLayoutSteps('flex flex-col gap-4')}</div>
        </div>
      </div>
    </div>
  ),
};

export const LayoutExampleVertical: Story = {
  args: Component.args,
  parameters: {
    chromatic: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h3 className="typography-h5 text-text01">垂直 高さなし(flex items-start)</h3>
        <div className="flex items-stretch justify-center rounded border border-uiBorder01 bg-uiBackground01 p-6">
          <div className="flex flex-wrap items-start justify-center gap-12 p-4">
            <Steps currentStep={2} aria-label="申込フロー" size="small" orientation="vertical">
              {applicationFlowItems.map((item) => (
                <Steps.Item key={item.label} label={item.label} />
              ))}
            </Steps>
            <Steps currentStep={2} aria-label="申込フロー" size="medium" orientation="vertical">
              {applicationFlowItems.map((item) => (
                <Steps.Item key={item.label} label={item.label} />
              ))}
            </Steps>
            <Steps currentStep={2} aria-label="申込フロー" size="large" orientation="vertical">
              {applicationFlowItems.map((item) => (
                <Steps.Item key={item.label} label={item.label} />
              ))}
            </Steps>
            <Steps currentStep={2} aria-label="申込フロー" size="small" variant="subtle" orientation="vertical">
              {applicationFlowItems.map((item) => (
                <Steps.Item key={item.label} label={item.label} />
              ))}
            </Steps>
            <Steps currentStep={2} aria-label="申込フロー" size="medium" variant="subtle" orientation="vertical">
              {applicationFlowItems.map((item) => (
                <Steps.Item key={item.label} label={item.label} />
              ))}
            </Steps>
            <Steps currentStep={2} aria-label="申込フロー" size="large" variant="subtle" orientation="vertical">
              {applicationFlowItems.map((item) => (
                <Steps.Item key={item.label} label={item.label} />
              ))}
            </Steps>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="typography-h5 text-text01">垂直 高さ固定(flex h-[600px] items-stretch)</h3>
        <div className="flex h-[900px] items-center justify-center rounded border border-uiBorder01 bg-uiBackground01 p-6">
          <div className="flex h-[600px] items-stretch gap-12 p-4">
            <Steps currentStep={2} aria-label="申込フロー" size="small" orientation="vertical">
              {applicationFlowItems.map((item) => (
                <Steps.Item key={item.label} label={item.label} />
              ))}
            </Steps>
            <Steps currentStep={2} aria-label="申込フロー" size="medium" orientation="vertical">
              {applicationFlowItems.map((item) => (
                <Steps.Item key={item.label} label={item.label} />
              ))}
            </Steps>
            <Steps currentStep={2} aria-label="申込フロー" size="large" orientation="vertical">
              {applicationFlowItems.map((item) => (
                <Steps.Item key={item.label} label={item.label} />
              ))}
            </Steps>
            <Steps currentStep={2} aria-label="申込フロー" size="small" variant="subtle" orientation="vertical">
              {applicationFlowItems.map((item) => (
                <Steps.Item key={item.label} label={item.label} />
              ))}
            </Steps>
            <Steps currentStep={2} aria-label="申込フロー" size="medium" variant="subtle" orientation="vertical">
              {applicationFlowItems.map((item) => (
                <Steps.Item key={item.label} label={item.label} />
              ))}
            </Steps>
            <Steps currentStep={2} aria-label="申込フロー" size="large" variant="subtle" orientation="vertical">
              {applicationFlowItems.map((item) => (
                <Steps.Item key={item.label} label={item.label} />
              ))}
            </Steps>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="typography-h5 text-text01">垂直 高さ100%(flex h-full items-stretch)</h3>
        <div className="flex h-[1000px] items-stretch justify-center rounded border border-uiBorder01 bg-uiBackground01 p-6">
          <div className="flex h-full items-stretch gap-12 p-4">
            <Steps currentStep={2} aria-label="申込フロー" size="small" orientation="vertical">
              {applicationFlowItems.map((item) => (
                <Steps.Item key={item.label} label={item.label} />
              ))}
            </Steps>
            <Steps currentStep={2} aria-label="申込フロー" size="medium" orientation="vertical">
              {applicationFlowItems.map((item) => (
                <Steps.Item key={item.label} label={item.label} />
              ))}
            </Steps>
            <Steps currentStep={2} aria-label="申込フロー" size="large" orientation="vertical">
              {applicationFlowItems.map((item) => (
                <Steps.Item key={item.label} label={item.label} />
              ))}
            </Steps>
            <Steps currentStep={2} aria-label="申込フロー" size="small" variant="subtle" orientation="vertical">
              {applicationFlowItems.map((item) => (
                <Steps.Item key={item.label} label={item.label} />
              ))}
            </Steps>
            <Steps currentStep={2} aria-label="申込フロー" size="medium" variant="subtle" orientation="vertical">
              {applicationFlowItems.map((item) => (
                <Steps.Item key={item.label} label={item.label} />
              ))}
            </Steps>
            <Steps currentStep={2} aria-label="申込フロー" size="large" variant="subtle" orientation="vertical">
              {applicationFlowItems.map((item) => (
                <Steps.Item key={item.label} label={item.label} />
              ))}
            </Steps>
          </div>
        </div>
      </div>
    </div>
  ),
};
