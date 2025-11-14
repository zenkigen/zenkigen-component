import type { HTMLAttributes } from 'react';
import { forwardRef, useEffect, useId } from 'react';

import { useTextInputCompoundContext } from './text-input-context';

export type TextInputErrorProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'>;

export const TextInputError = forwardRef<HTMLDivElement, TextInputErrorProps>(
  ({ id: idProp, role = 'alert', 'aria-live': ariaLive = 'assertive', ...props }, ref) => {
    const autoId = useId();
    const id = idProp ?? `${autoId}-error`;
    const { registerErrorId, unregisterErrorId, inputProps } = useTextInputCompoundContext('TextInput.Error');
    const typographyClass = inputProps.size === 'large' ? 'typography-label12regular' : 'typography-label11regular';

    useEffect(() => {
      registerErrorId(id);

      return () => unregisterErrorId(id);
    }, [id, registerErrorId, unregisterErrorId]);

    return (
      <div
        ref={ref}
        id={id}
        className={`${typographyClass} text-supportError`}
        role={role}
        aria-live={ariaLive}
        {...props}
      />
    );
  },
);
TextInputError.displayName = 'TextInput.Error';
