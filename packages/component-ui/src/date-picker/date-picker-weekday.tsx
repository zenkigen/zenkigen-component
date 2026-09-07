import { clsx } from 'clsx';
import type { WeekdayProps } from 'react-day-picker';

import { useDatePickerSizeTokens } from './date-picker-styles';

/**
 * カレンダーの曜日ヘッダー（日〜土）
 */
export const CustomWeekday = ({ className, children, style, ...props }: WeekdayProps) => {
  const { tokens } = useDatePickerSizeTokens();

  return (
    <th
      {...props}
      className={clsx(className, tokens.weekdayClass, 'text-text02')}
      style={{ ...style, fontSize: 'inherit', fontWeight: 'bold' }}
    >
      {children}
    </th>
  );
};
