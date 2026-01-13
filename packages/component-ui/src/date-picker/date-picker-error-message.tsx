import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { useDatePickerCompoundContext } from './date-picker-context';

export type DatePickerErrorMessageProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'>;

export const DatePickerErrorMessage = forwardRef<HTMLDivElement, DatePickerErrorMessageProps>(
  ({ 'aria-live': ariaLive = 'assertive', ...props }, ref) => {
    const { size, isError } = useDatePickerCompoundContext('DatePicker.ErrorMessage');
    const typographyClass = size === 'large' ? 'typography-label12regular' : 'typography-label11regular';

    if (isError !== true) {
      return null;
    }

    const errorMessageClassName = clsx(typographyClass, 'text-supportError');

    return <div ref={ref} className={errorMessageClassName} aria-live={ariaLive} {...props} />;
  },
);

DatePickerErrorMessage.displayName = 'DatePicker.ErrorMessage';
