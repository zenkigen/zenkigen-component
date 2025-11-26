import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { useTextAreaCompoundContext } from './text-area-context';

export type TextAreaErrorMessageProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'>;

export const TextAreaErrorMessage = forwardRef<HTMLDivElement, TextAreaErrorMessageProps>(
  ({ 'aria-live': ariaLive = 'assertive', ...props }, ref) => {
    const { textAreaProps } = useTextAreaCompoundContext('TextArea.ErrorMessage');
    const typographyClass = textAreaProps.size === 'large' ? 'typography-label12regular' : 'typography-label11regular';
    const shouldRender = textAreaProps.isError === true;

    if (!shouldRender) {
      return null;
    }

    const errorMessageClassName = clsx(typographyClass, 'text-supportError');

    return <div ref={ref} className={errorMessageClassName} aria-live={ariaLive} {...props} />;
  },
);

TextAreaErrorMessage.displayName = 'TextArea.ErrorMessage';
