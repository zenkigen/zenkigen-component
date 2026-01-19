import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { useTextInputCompoundContext } from './text-input-context';

export type TextInputHelperMessageProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'>;

export const TextInputHelperMessage = forwardRef<HTMLDivElement, TextInputHelperMessageProps>((props, ref) => {
  const { inputProps } = useTextInputCompoundContext('TextInput.HelperMessage');
  const typographyClass = inputProps.size === 'large' ? 'typography-label12regular' : 'typography-label11regular';
  const helperMessageClassName = clsx(typographyClass, 'text-text02');

  return <div ref={ref} className={helperMessageClassName} {...props} />;
});

TextInputHelperMessage.displayName = 'TextInput.HelperMessage';
