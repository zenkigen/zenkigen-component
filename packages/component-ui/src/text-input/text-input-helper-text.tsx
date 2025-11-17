import type { HTMLAttributes } from 'react';
import { forwardRef, useEffect, useId } from 'react';

import { useTextInputCompoundContext } from './text-input-context';

export type TextInputHelperTextProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'>;

export const TextInputHelperText = forwardRef<HTMLDivElement, TextInputHelperTextProps>(
  ({ id: idProp, ...props }, ref) => {
    const autoId = useId();
    const id = idProp ?? `${autoId}-helper-text`;
    const { registerHelperTextId, unregisterHelperTextId, inputProps } =
      useTextInputCompoundContext('TextInput.HelperText');
    const typographyClass = inputProps.size === 'large' ? 'typography-label12regular' : 'typography-label11regular';

    useEffect(() => {
      registerHelperTextId(id);

      return () => unregisterHelperTextId(id);
    }, [id, registerHelperTextId, unregisterHelperTextId]);

    return <div ref={ref} id={id} className={`${typographyClass} text-text02`} {...props} />;
  },
);
TextInputHelperText.displayName = 'TextInput.HelperText';
