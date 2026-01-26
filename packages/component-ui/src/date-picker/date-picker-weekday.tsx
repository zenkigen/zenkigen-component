import { clsx } from 'clsx';
import type { WeekdayProps } from 'react-day-picker';

/**
 * カレンダーの曜日ヘッダー（日〜土）
 */
export const CustomWeekday = ({ className, children, ...props }: WeekdayProps) => {
  return (
    <th
      {...props}
      className={clsx(className, 'm-0 flex size-7 items-center justify-center p-0 text-center text-text02')}
    >
      {children}
    </th>
  );
};
