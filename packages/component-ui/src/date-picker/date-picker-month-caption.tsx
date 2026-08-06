import { clsx } from 'clsx';
import type { MonthCaptionProps } from 'react-day-picker';
import { useDayPicker } from 'react-day-picker';

import { IconButton } from '../icon-button';
import { useDatePickerCompoundContext } from './date-picker-context';
import { DATE_PICKER_SIZE_TOKENS } from './date-picker-styles';
import { formatMonthLabel } from './date-picker-utils';

/**
 * カレンダーヘッダー（月表示と前後月ナビゲーション）
 */
export const CustomMonthCaption = ({ calendarMonth, className, displayIndex, style, ...props }: MonthCaptionProps) => {
  // displayIndex は react-day-picker が複数月表示時に使用する内部インデックス。
  // カスタムコンポーネントでは不要だが、rest spread で DOM に渡ると React 警告が出るため、
  // ここで明示的に取り出して除外する。
  void displayIndex;

  const { goToMonth, nextMonth, previousMonth } = useDayPicker();
  const { size } = useDatePickerCompoundContext('DatePicker のカレンダー');
  const tokens = DATE_PICKER_SIZE_TOKENS[size];
  const captionMonth = calendarMonth.date;

  return (
    <div
      className={clsx(tokens.monthCaptionClass, className)}
      style={{ ...style, fontSize: 'inherit', fontWeight: 'inherit' }}
      {...props}
    >
      <IconButton
        icon="angle-left"
        size={tokens.navIconButton}
        variant="text"
        isDisabled={!previousMonth}
        aria-label="前の月"
        onClick={() => previousMonth && goToMonth(previousMonth)}
      />
      <span className={clsx(tokens.monthCaptionTypography, 'text-text02')}>{formatMonthLabel(captionMonth)}</span>
      <IconButton
        icon="angle-right"
        size={tokens.navIconButton}
        variant="text"
        isDisabled={!nextMonth}
        aria-label="次の月"
        onClick={() => nextMonth && goToMonth(nextMonth)}
      />
    </div>
  );
};
