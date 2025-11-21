import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { useTextInputCompoundContext } from './text-input-context';

export type TextInputErrorMessageProps = HTMLAttributes<HTMLDivElement>;

export const TextInputErrorMessage = forwardRef<HTMLDivElement, TextInputErrorMessageProps>(
  ({ className, role = 'alert', 'aria-live': ariaLive = 'assertive', ...props }, ref) => {
    const { inputProps } = useTextInputCompoundContext('TextInput.ErrorMessage');
    const typographyClass = inputProps.size === 'large' ? 'typography-label12regular' : 'typography-label11regular';
    const shouldRender = inputProps.isError === true;

    if (!shouldRender) {
      return null;
    }

    const errorMessageClassName = clsx(typographyClass, 'text-supportError', className);

    return <div ref={ref} className={errorMessageClassName} role={role} aria-live={ariaLive} {...props} />;
  },
);
TextInputErrorMessage.displayName = 'TextInput.ErrorMessage';
