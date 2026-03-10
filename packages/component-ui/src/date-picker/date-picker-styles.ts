import { clsx } from 'clsx';
import type { CSSProperties } from 'react';
import { getDefaultClassNames } from 'react-day-picker';

const defaultDayPickerClassNames = getDefaultClassNames();

/** カレンダー内の基本フォントサイズ */
export const DAY_PICKER_FONT_SIZE = '12px';

/** react-day-picker の CSS 変数およびフォントの上書き */
export const dayPickerStyle = {
  '--rdp-nav-height': '30px',
  '--rdp-day-width': '30px',
  '--rdp-day-height': '30px',
  '--rdp-day_button-width': '28px',
  '--rdp-day_button-height': '28px',
  '--rdp-day_button-border': '1px solid transparent',
  '--rdp-weekday-padding': '0px',
  fontFamily: "Arial, 'Noto Sans JP', sans-serif",
  fontSize: DAY_PICKER_FONT_SIZE,
  fontWeight: 700,
} as CSSProperties;

/** react-day-picker のクラス名上書き */
export const dayPickerClassNames = {
  month: clsx(defaultDayPickerClassNames.month, 'flex flex-col px-[7px] py-2'),
};

/** 日付ボタンの基本クラス */
export const dayButtonBaseClass = 'relative grid size-full place-items-center rounded-full !border !border-solid';
