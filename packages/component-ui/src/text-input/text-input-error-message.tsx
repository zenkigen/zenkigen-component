import type { HTMLAttributes } from 'react';
import { forwardRef, useEffect, useId } from 'react';

import { useTextInputCompoundContext } from './text-input-context';

export type TextInputErrorMessageProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'>;

export const TextInputErrorMessage = forwardRef<HTMLDivElement, TextInputErrorMessageProps>(
  ({ id: idProp, role = 'alert', 'aria-live': ariaLive = 'assertive', ...props }, ref) => {
    const autoId = useId();
    const id = idProp ?? `${autoId}-error-message`;
    const { registerErrorId, unregisterErrorId, inputProps } = useTextInputCompoundContext('TextInput.ErrorMessage');
    const typographyClass = inputProps.size === 'large' ? 'typography-label12regular' : 'typography-label11regular';
    const shouldRender = inputProps.isError === true;

    useEffect(() => {
      if (!shouldRender) {
        return;
      }

      registerErrorId(id);

      return () => unregisterErrorId(id);
    }, [id, registerErrorId, unregisterErrorId, shouldRender]);

    if (!shouldRender) {
      return null;
    }

    if (!shouldRender) {
      return null;
    }

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
TextInputErrorMessage.displayName = 'TextInput.ErrorMessage';
