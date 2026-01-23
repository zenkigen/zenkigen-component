import { focusVisible } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';
import { DayButton, type DayButtonProps } from 'react-day-picker';

import { dayButtonBaseClass } from './date-picker-styles';

/**
 * カレンダーの日付ボタン
 *
 * 日付の状態に応じてスタイルを切り替える
 * react-day-picker の DayButton を使用してキーボードナビゲーションを維持
 */
export const CustomDayButton = ({ day, modifiers, className, ...buttonProps }: DayButtonProps) => {
  const isSelected = Boolean(modifiers.selected);
  const isOutside = Boolean(modifiers.outside);
  const isMinMaxDisabled = Boolean(modifiers.minMaxDisabled);
  const now = new Date();
  const isToday =
    day.date.getFullYear() === now.getFullYear() &&
    day.date.getMonth() === now.getMonth() &&
    day.date.getDate() === now.getDate();

  const isDisabledDay = isMinMaxDisabled;

  return (
    <DayButton
      {...buttonProps}
      day={day}
      modifiers={modifiers}
      className={clsx(
        className,
        dayButtonBaseClass,
        // 共通: フォーカスリング（有効な日のみ）
        // react-day-picker の rdp-day_button クラスが outline: none を設定しているため、!important で上書き
        !isDisabledDay && focusVisible.normalImportant,
        // minDate/maxDate 制限日
        isMinMaxDisabled && '!cursor-not-allowed !border-transparent !text-disabled01',
        // 範囲外の日（前後月）
        isOutside && !isMinMaxDisabled && '!border-transparent !text-interactive04',
        // 通常の日
        !isDisabledDay && !isSelected && '!border-transparent',
        !isDisabledDay && !isToday && '!text-interactive02 hover:!bg-hoverUi',
        // 今日
        !isDisabledDay && isToday && !isSelected && '!border-selectedUiBorder !bg-interactive01 !text-textOnColor',
        // 選択された日
        isSelected && '!border-selectedUiBorder !bg-uiBackgroundBlue',
      )}
    />
  );
};
