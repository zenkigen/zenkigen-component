import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';

const meta: Meta = {
  title: 'Tokens/Typography',
};

export default meta;
type Story = StoryObj;

type SampleTextProps = {
  label: string;
  className: string;
  height?: CSSProperties['height'];
};

function SampleText({ label, className, height = 279 }: SampleTextProps) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <div style={{ fontSize: 18 }}>typography-{label}</div>
      <div className={className} style={{ height }}>
        あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。
      </div>
    </div>
  );
}

function BodyContent() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full gap-4">
        <SampleText label="body12regular" className="typography-body12regular" height="auto" />
        <SampleText label="body12bold" className="typography-body12bold" height="auto" />
      </div>
      <div className="flex w-full gap-4">
        <SampleText label="body13regular" className="typography-body13regular" height="auto" />
        <SampleText label="body13bold" className="typography-body13bold" height="auto" />
      </div>
      <div className="flex w-full gap-4">
        <SampleText label="body14regular" className="typography-body14regular" height="auto" />
        <SampleText label="body14bold" className="typography-body14bold" height="auto" />
      </div>
      <div className="flex w-full gap-4">
        <SampleText label="body16regular" className="typography-body16regular" height="auto" />
        <SampleText label="body16bold" className="typography-body16bold" height="auto" />
      </div>
    </div>
  );
}

function LabelContent() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full gap-4">
        <SampleText label="label11regular" className="typography-label11regular" height="auto" />
        <SampleText label="label11bold" className="typography-label11bold" height="auto" />
      </div>
      <div className="flex w-full gap-4">
        <SampleText label="label12regular" className="typography-label12regular" height="auto" />
        <SampleText label="label12bold" className="typography-label12bold" height="auto" />
      </div>
      <div className="flex w-full gap-4">
        <SampleText label="label14regular" className="typography-label14regular" height="auto" />
        <SampleText label="label14bold" className="typography-label14bold" height="auto" />
      </div>
      <div className="flex w-full gap-4">
        <SampleText label="label16regular" className="typography-label16regular" height="auto" />
        <SampleText label="label16bold" className="typography-label16bold" height="auto" />
      </div>
    </div>
  );
}

export const Component: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-4">
        <BodyContent />
        <hr />
        <LabelContent />
      </div>
    </>
  ),
};

export const Body: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: () => <BodyContent />,
};

export const Label: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: () => <LabelContent />,
};
