import type { InputHTMLAttributes } from 'react';
import { forwardRef, useCallback } from 'react';

import { useTextInputCompoundContext } from './text-input-context';
import { renderInputField } from './text-input-renderer';
import { assignRef } from './text-input-utils';

type TextInputInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;

export const TextInputInput = forwardRef<HTMLInputElement, TextInputInputProps>(
  ({ 'aria-describedby': ariaDescribedByFromSlot, 'aria-invalid': ariaInvalidFromSlot, ...slotProps }, ref) => {
    const { inputProps, forwardedRef, messageIds, errorIds } = useTextInputCompoundContext('TextInput.Input');

    const handleRef = useCallback(
      (node: HTMLInputElement | null) => {
        assignRef(forwardedRef, node);
        assignRef(ref, node);
      },
      [forwardedRef, ref],
    );

    const { className: contextClassName, ...restInputProps } = inputProps;
    const describedByList = [ariaDescribedByFromSlot, ...messageIds, ...errorIds].filter(
      (id): id is string => typeof id === 'string' && id.trim().length > 0,
    );
    const describedByProps = describedByList.length > 0 ? { 'aria-describedby': describedByList.join(' ') } : {};
    const shouldMarkInvalid = inputProps.isError === true || errorIds.length > 0;
    const ariaInvalidValue = ariaInvalidFromSlot ?? (shouldMarkInvalid ? true : null);
    const ariaInvalidProps = ariaInvalidValue === null ? {} : { 'aria-invalid': ariaInvalidValue };

    return renderInputField({
      props: { ...restInputProps, className: contextClassName },
      additionalInputProps: {
        ...slotProps,
        ...describedByProps,
        ...ariaInvalidProps,
      },
      inputRef: handleRef,
    });
  },
);
TextInputInput.displayName = 'TextInput.Input';
