import type { HTMLAttributes } from 'react';
import { forwardRef, useEffect, useId } from 'react';

import { useTextInputCompoundContext } from './text-input-context';

export type TextInputMessageProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'>;

export const TextInputMessage = forwardRef<HTMLDivElement, TextInputMessageProps>(({ id: idProp, ...props }, ref) => {
  const autoId = useId();
  const id = idProp ?? `${autoId}-message`;
  const { registerMessageId, unregisterMessageId, inputProps } = useTextInputCompoundContext('TextInput.Message');
  const typographyClass = inputProps.size === 'large' ? 'typography-label12regular' : 'typography-label11regular';

  useEffect(() => {
    registerMessageId(id);

    return () => unregisterMessageId(id);
  }, [id, registerMessageId, unregisterMessageId]);

  return <div ref={ref} id={id} className={`${typographyClass} text-text02`} {...props} />;
});
TextInputMessage.displayName = 'TextInput.Message';
