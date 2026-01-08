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
  children?: React.ReactNode;
};

function SampleText({ label, className, height = 279, children }: SampleTextProps) {
  return (
    <div className="flex-1">
      <div style={{ fontSize: 14 }}>{label}</div>
      <div className={className} style={{ height }}>
        {children ?? (
          <>
            あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。
          </>
        )}
      </div>
    </div>
  );
}

const WIDTH = 784;

export const Component: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: () => (
    <>
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
        <hr />
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
    </>
  ),
};

export function Heading() {
  const classes = 'flex gap-4';

  return (
    <div className="flex flex-col">
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="h1" className="typography-h1" height={75}>
          見出しタイトル h1
        </SampleText>
      </div>
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="h2" className="typography-h2" height={75}>
          見出しタイトル h2
        </SampleText>
      </div>
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="h3" className="typography-h3" height={75}>
          見出しタイトル h3
        </SampleText>
      </div>
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="h4" className="typography-h4" height={75}>
          見出しタイトル h4
        </SampleText>
      </div>
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="h5" className="typography-h5" height={75}>
          見出しタイトル h5
        </SampleText>
      </div>
    </div>
  );
}

export function Body() {
  const classes = 'flex gap-4';

  return (
    <div className="flex flex-col">
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="body12regular" className="typography-body12regular" />
        <SampleText label="body12bold" className="typography-body12bold" />
      </div>
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="body13regular" className="typography-body13regular" />
        <SampleText label="body13bold" className="typography-body13bold" />
      </div>
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="body14regular" className="typography-body14regular" />
        <SampleText label="body14bold" className="typography-body14bold" />
      </div>
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="body16regular" className="typography-body16regular" />
        <SampleText label="body16bold" className="typography-body16bold" />
      </div>
    </div>
  );
}

export function Label() {
  const classes = 'flex gap-4';

  return (
    <div className="flex flex-col">
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="label11regular" className="typography-label11regular" />
        <SampleText label="label11bold" className="typography-label11bold" />
      </div>
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="label12regular" className="typography-label12regular" />
        <SampleText label="label12bold" className="typography-label12bold" />
      </div>
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="label14regular" className="typography-label14regular" />
        <SampleText label="label14bold" className="typography-label14bold" />
      </div>
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="label16regular" className="typography-label16regular" />
        <SampleText label="label16bold" className="typography-label16bold" />
      </div>
    </div>
  );
}
