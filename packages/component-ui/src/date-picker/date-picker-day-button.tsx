import { focusVisible } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';
import type { DayButtonProps } from 'react-day-picker';

import { dayButtonBaseClass } from './date-picker-styles';

/**
 * カレンダーの日付ボタン
 *
 * 日付の状態に応じてスタイルを切り替える
 */
export const CustomDayButton = ({ day, modifiers, className, displayIndex, ...buttonProps }: DayButtonProps) => {
  // displayIndex は react-day-picker が複数月表示時に使用する内部インデックス。
  // カスタムコンポーネントでは不要だが、rest spread で DOM に渡ると React 警告が出るため、
  // ここで明示的に取り出して除外する。
  void displayIndex;

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
    <button
      type="button"
      {...buttonProps}
      disabled={isDisabledDay}
      className={clsx(
        className,
        dayButtonBaseClass,
        // 共通: フォーカスリング（有効な日のみ）
        !isDisabledDay && focusVisible.normal,
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
    >
      {buttonProps.children}
    </button>
  );
};
