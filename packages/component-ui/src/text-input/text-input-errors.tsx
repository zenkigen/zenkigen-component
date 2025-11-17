import type { HTMLAttributes } from 'react';
import { Children, forwardRef } from 'react';

import { useTextInputCompoundContext } from './text-input-context';

export type TextInputErrorsProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'>;

export const TextInputErrors = forwardRef<HTMLDivElement, TextInputErrorsProps>(({ children, ...props }, ref) => {
  const { inputProps } = useTextInputCompoundContext('TextInput.Errors');

  if (inputProps.isError !== true) {
    return null;
  }

  if (Children.count(children) === 0) {
    return null;
  }

  return (
    <div ref={ref} className="flex flex-col gap-1" {...props}>
      {children}
    </div>
  );
});
TextInputErrors.displayName = 'TextInput.Errors';
