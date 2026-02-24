import { clsx } from 'clsx';
import type { WeekdayProps } from 'react-day-picker';

/**
 * カレンダーの曜日ヘッダー（日〜土）
 */
export const CustomWeekday = ({ className, children, style, ...props }: WeekdayProps) => {
  return (
    <th
      {...props}
      className={clsx(className, 'm-0 size-7 p-0 text-center align-middle text-text02')}
      style={{ ...style, fontSize: 'inherit', fontWeight: 'bold' }}
    >
      {children}
    </th>
  );
};
