import type { HTMLAttributes } from 'react';
import { forwardRef, useEffect, useId } from 'react';

import { useTextInputCompoundContext } from './text-input-context';

export type TextInputHelperMessageProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'>;

export const TextInputHelperMessage = forwardRef<HTMLDivElement, TextInputHelperMessageProps>(
  ({ id: idProp, ...props }, ref) => {
    const autoId = useId();
    const id = idProp ?? `${autoId}-helper-message`;
    const { registerHelperMessageId, unregisterHelperMessageId, inputProps } =
      useTextInputCompoundContext('TextInput.HelperMessage');
    const typographyClass = inputProps.size === 'large' ? 'typography-label12regular' : 'typography-label11regular';

    useEffect(() => {
      registerHelperMessageId(id);

      return () => unregisterHelperMessageId(id);
    }, [id, registerHelperMessageId, unregisterHelperMessageId]);

    return <div ref={ref} id={id} className={`${typographyClass} text-text02`} {...props} />;
  },
);

TextInputHelperMessage.displayName = 'TextInput.HelperMessage';
