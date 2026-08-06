import { clsx } from 'clsx';
import type { WeekdayProps } from 'react-day-picker';

import { useDatePickerCompoundContext } from './date-picker-context';
import { DATE_PICKER_SIZE_TOKENS } from './date-picker-styles';

/**
 * カレンダーの曜日ヘッダー（日〜土）
 */
export const CustomWeekday = ({ className, children, style, ...props }: WeekdayProps) => {
  const { size } = useDatePickerCompoundContext('DatePicker のカレンダー');
  const tokens = DATE_PICKER_SIZE_TOKENS[size];

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
