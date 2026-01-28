import { clsx } from 'clsx';
import type { MonthCaptionProps } from 'react-day-picker';
import { useDayPicker } from 'react-day-picker';

import { IconButton } from '../icon-button';
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
  const captionMonth = calendarMonth.date;

  return (
    <div
      className={clsx('flex items-center justify-between px-1 pb-0.5', className)}
      style={{ ...style, fontSize: 'inherit', fontWeight: 'inherit' }}
      {...props}
    >
      <IconButton
        icon="angle-left"
        size="small"
        variant="text"
        isDisabled={!previousMonth}
        aria-label="前の月"
        onClick={() => previousMonth && goToMonth(previousMonth)}
      />
      <span className="typography-label12bold text-text02">{formatMonthLabel(captionMonth)}</span>
      <IconButton
        icon="angle-right"
        size="small"
        variant="text"
        isDisabled={!nextMonth}
        aria-label="次の月"
        onClick={() => nextMonth && goToMonth(nextMonth)}
      />
    </div>
  );
};
