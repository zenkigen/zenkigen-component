import { clsx } from 'clsx';
import type { CSSProperties } from 'react';
import { getDefaultClassNames } from 'react-day-picker';

import type { DatePickerSize } from './date-picker-context';

const defaultDayPickerClassNames = getDefaultClassNames();

/**
 * size ごとの見た目の値をまとめたトークン
 *
 * `Record<DatePickerSize, DatePickerSizeTokens>` として定義することで、size を追加した際に
 * 未記入のキーがコンパイルエラーになる。clsx の真偽値を複数箇所に散らす方式だと、
 * 高さと typography のように離れた箇所を同時に直す必要があり型で守られないため採用しない。
 */
type DatePickerSizeTokens = {
  /** トリガーボタン左のカレンダーアイコン */
  triggerIcon: 'medium' | 'small';
  /** DayPicker root に渡す inline style（CSS 変数 + フォント） */
  dayPickerStyle: CSSProperties;
  /** DayPicker の classNames 上書き */
  dayPickerClassNames: { month: string };
  /** 日付ボタンの基本クラス */
  dayButtonClass: string;
  /**
   * 日付ボタンの inline fontSize
   *
   * react-day-picker の `.rdp-selected { font-size: large }` が日セルの `<td>` に効き、
   * `.rdp-day_button` は `font: inherit` のため、指定しないと選択日だけ文字が巨大化する。
   * 「ハードコードされた値」ではなく打ち消しのための必須指定なので削除しないこと。
   */
  dayButtonFontSize: string;
  /** 月ヘッダー（前月・次月ナビと月ラベル）のコンテナ */
  monthCaptionClass: string;
  /** 月ラベルの typography */
  monthCaptionTypography: string;
  /** 月ヘッダーの前月・次月ナビ */
  navIconButton: 'large' | 'small';
  /** 曜日ヘッダーの `<th>` */
  weekdayClass: string;
  /** フッターの「今日に戻る」 */
  footerIconButton: 'large' | 'medium';
  /** フッターの「クリア」 */
  footerClearButton: 'large' | 'small';
  /** ErrorMessage の typography */
  errorTypography: string;
};

/**
 * small / medium / large が共有する基本トークン
 *
 * x-large 追加にあたり既存 3 サイズの見た目を一切変えないため、共通の定数として持つ。
 */
const BASE_TOKENS: DatePickerSizeTokens = {
  triggerIcon: 'small',
  dayPickerStyle: {
    '--rdp-nav-height': '30px',
    '--rdp-day-width': '30px',
    '--rdp-day-height': '30px',
    '--rdp-day_button-width': '28px',
    '--rdp-day_button-height': '28px',
    '--rdp-day_button-border': '1px solid transparent',
    '--rdp-weekday-padding': '0px',
    fontFamily: "Arial, 'Noto Sans JP', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
  } as CSSProperties,
  dayPickerClassNames: {
    month: clsx(defaultDayPickerClassNames.month, 'flex flex-col px-[7px] py-2'),
  },
  dayButtonClass: 'relative grid size-full place-items-center rounded-full !border !border-solid',
  dayButtonFontSize: '12px',
  monthCaptionClass: 'flex items-center justify-between px-1 pb-0.5',
  monthCaptionTypography: 'typography-label12bold',
  navIconButton: 'small',
  weekdayClass: 'm-0 size-7 p-0 text-center align-middle',
  footerIconButton: 'medium',
  footerClearButton: 'small',
  errorTypography: 'typography-label11regular',
};

const LARGE_TOKENS: DatePickerSizeTokens = {
  ...BASE_TOKENS,
  triggerIcon: 'medium',
  errorTypography: 'typography-label12regular',
};

/**
 * x-large のトークン（モバイル向け。カレンダーは Figma の Large サイズ 342×440px に対応）
 *
 * react-day-picker は `<table>` + `border-collapse: collapse` で描画するため CSS の `gap` が使えない。
 * Figma の「40px の日ボタン + 8px の間隔」は、48px の日セルの中に 40px のボタンを中央配置して表現する。
 * 幅の検算: 日セル 48px × 7 + month の `px-[3px]` × 2 = 342px（Figma と一致）。
 *
 * `--rdp-day_button-*` と `dayButtonClass` の `size-*` は必ず同値にすること。
 * `.size-10` と `.rdp-day_button` は詳細度が同順位で CSS の注入順に勝敗が依存するため、
 * 両方に同じ値を入れてどちらが勝っても 40px になるようにしている（`!important` は付けない）。
 */
const X_LARGE_TOKENS: DatePickerSizeTokens = {
  triggerIcon: 'medium',
  dayPickerStyle: {
    '--rdp-nav-height': '40px',
    '--rdp-day-width': '48px',
    '--rdp-day-height': '48px',
    '--rdp-day_button-width': '40px',
    '--rdp-day_button-height': '40px',
    '--rdp-day_button-border': '1px solid transparent',
    '--rdp-weekday-padding': '0px',
    fontFamily: "Arial, 'Noto Sans JP', sans-serif",
    fontSize: '16px',
    fontWeight: 700,
  } as CSSProperties,
  dayPickerClassNames: {
    month: clsx(defaultDayPickerClassNames.month, 'flex flex-col px-[3px] pb-4 pt-2'),
  },
  dayButtonClass: 'relative grid size-10 place-items-center rounded-full !border !border-solid',
  dayButtonFontSize: '16px',
  monthCaptionClass: 'flex items-center justify-between px-1',
  monthCaptionTypography: 'typography-label16bold',
  // IconButton に x-large は無いが、large が 40px で Figma と一致する（内部アイコンも 24px になる）
  navIconButton: 'large',
  weekdayClass: 'm-0 size-10 p-0 text-center align-middle',
  footerIconButton: 'large',
  footerClearButton: 'large',
  errorTypography: 'typography-label12regular',
};

export const DATE_PICKER_SIZE_TOKENS: Record<DatePickerSize, DatePickerSizeTokens> = {
  small: BASE_TOKENS,
  medium: BASE_TOKENS,
  large: LARGE_TOKENS,
  'x-large': X_LARGE_TOKENS,
};
