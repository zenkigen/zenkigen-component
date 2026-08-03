import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { useTimePickerCompoundContext } from './time-picker-context';

/**
 * TimePicker のエラーメッセージを表示するコンポーネントのプロパティ
 *
 * `isError={true}` の場合にのみレンダリングされる。
 * `className` プロパティは除外されており、内部スタイルが適用される。
 */
export type TimePickerErrorMessageProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'>;

export const TimePickerErrorMessage = forwardRef<HTMLDivElement, TimePickerErrorMessageProps>(
  ({ 'aria-live': ariaLive = 'assertive', ...props }, ref) => {
    const { size, isError } = useTimePickerCompoundContext('TimePicker.ErrorMessage');
    const typographyClass = size === 'large' ? 'typography-label12regular' : 'typography-label11regular';

    if (isError !== true) {
      return null;
    }

    const errorMessageClassName = clsx(typographyClass, 'text-supportError');

    return <div ref={ref} className={errorMessageClassName} aria-live={ariaLive} {...props} />;
  },
);

TimePickerErrorMessage.displayName = 'TimePicker.ErrorMessage';
