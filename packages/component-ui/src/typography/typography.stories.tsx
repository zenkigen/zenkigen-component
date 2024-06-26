export default {
  component: null,
};

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
        <SampleText label="body3regular" className="typography-body3regular" />
        <SampleText label="body3bold" className="typography-body3bold" />
      </div>
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="body2regular" className="typography-body2regular" />
        <SampleText label="body2bold" className="typography-body2bold" />
      </div>
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="body1regular" className="typography-body1regular" />
        <SampleText label="body1bold" className="typography-body1bold" />
      </div>
    </div>
  );
}

export function Label() {
  const classes = 'flex gap-4';

  return (
    <div className="flex flex-col">
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="label4regular" className="typography-label4regular" />
        <SampleText label="label4bold" className="typography-label4bold" />
      </div>
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="label3regular" className="typography-label3regular" />
        <SampleText label="label3bold" className="typography-label3bold" />
      </div>
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="label2regular" className="typography-label2regular" />
        <SampleText label="label2bold" className="typography-label2bold" />
      </div>
      <div className={classes} style={{ width: WIDTH }}>
        <SampleText label="label1regular" className="typography-label1regular" />
        <SampleText label="label1bold" className="typography-label1bold" />
      </div>
    </div>
  );
}
