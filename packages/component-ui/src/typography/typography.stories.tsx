import type { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Tokens/Typography',
};

export default meta;

type SampleTextProps = {
  label: string;
  className: string;
};

function SampleText({ label, className }: SampleTextProps) {
  return (
    <div className="flex-1">
      <div style={{ fontSize: 14 }}>{label}</div>
      <div className={className} style={{ height: 279 }}>
        あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。
      </div>
    </div>
  );
}

const WIDTH = 784;

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
