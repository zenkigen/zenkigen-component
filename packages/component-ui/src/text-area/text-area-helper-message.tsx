import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { useTextAreaCompoundContext } from './text-area-context';

export type TextAreaHelperMessageProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'>;

export const TextAreaHelperMessage = forwardRef<HTMLDivElement, TextAreaHelperMessageProps>((props, ref) => {
  const { textAreaProps } = useTextAreaCompoundContext('TextArea.HelperMessage');
  const typographyClass = textAreaProps.size === 'large' ? 'typography-label12regular' : 'typography-label11regular';
  const helperMessageClassName = clsx(typographyClass, 'text-text02');

  return <div ref={ref} className={helperMessageClassName} {...props} />;
});

TextAreaHelperMessage.displayName = 'TextArea.HelperMessage';
