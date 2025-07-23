export const useColorList = ({
  members,
  saturation = 40,
  brightness = 90,
}: {
  members: number;
  saturation?: number;
  brightness?: number;
}) => {
  const HSBtoRGB = (hue: number, saturation: number, brightness: number) => {
    const c = (brightness / 100) * (saturation / 100);
    const h = (hue / 60) % 6;
    const x = c * (1 - Math.abs((h % 2) - 1));

    let r = 0,
      g = 0,
      b = 0;

    switch (Math.floor(h)) {
      case 0:
        r = c;
        g = x;
        b = 0;
        break;
      case 1:
        r = x;
        g = c;
        b = 0;
        break;
      case 2:
        r = 0;
        g = c;
        b = x;
        break;
      case 3:
        r = 0;
        g = x;
        b = c;
        break;
      case 4:
        r = x;
        g = 0;
        b = c;
        break;
      case 5:
        r = c;
        g = 0;
        b = x;
        break;
    }

    const m = brightness / 100 - c;
    const rgb = {
      R: Math.round((r + m) * 255),
      G: Math.round((g + m) * 255),
      B: Math.round((b + m) * 255),
    };

    const RGBCode = [
      '#',
      `00${Number(rgb.R).toString(16)}`.slice(-2),
      `00${Number(rgb.G).toString(16)}`.slice(-2),
      `00${Number(rgb.B).toString(16)}`.slice(-2),
    ].join('');

    return RGBCode;
  };

  const selectColors: { id: number; color: string }[] = [];

  const range = 360 / members;
  let i = 1;
  while (i <= members) {
    const colorItem = {
      id: i,
      color: HSBtoRGB(range * i, saturation, brightness),
    };
    selectColors.push(colorItem);
    i++;
  }

  return [selectColors];
};
