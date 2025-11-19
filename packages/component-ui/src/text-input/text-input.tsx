import { clsx } from 'clsx';
import type { ForwardRefExoticComponent, InputHTMLAttributes, ReactNode, RefAttributes } from 'react';
import { forwardRef, useCallback, useMemo, useState } from 'react';

import { IconButton } from '../icon-button';
import type { TextInputInternalProps } from './text-input.types';
import { TextInputCompoundContext } from './text-input-context';
import { TextInputErrorMessage } from './text-input-error-message';
import { TextInputHelperMessage } from './text-input-helper-message';
import { assignRef } from './text-input-utils';

export type { TextInputProps } from './text-input.types';

type TextInputRootProps = TextInputInternalProps & {
  children?: ReactNode;
};

type TextInputComponent = ForwardRefExoticComponent<TextInputRootProps & RefAttributes<HTMLInputElement>> & {
  HelperMessage: typeof TextInputHelperMessage;
  ErrorMessage: typeof TextInputErrorMessage;
};

const getValueLength = (value: InputHTMLAttributes<HTMLInputElement>['value']): number => {
  if (typeof value === 'string') {
    return value.length;
  }
  if (typeof value === 'number') {
    return String(value).length;
  }
  if (Array.isArray(value)) {
    return value.join('').length;
  }

  return 0;
};

const TextInput = forwardRef<HTMLInputElement, TextInputRootProps>((props, ref) => {
  const { children, ...rest } = props;
  const [helperMessageIds, setHelperMessageIds] = useState<string[]>([]);
  const [errorIds, setErrorIds] = useState<string[]>([]);

  const registerHelperMessageId = useCallback((id: string) => {
    setHelperMessageIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const unregisterHelperMessageId = useCallback((id: string) => {
    setHelperMessageIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const registerErrorId = useCallback((id: string) => {
    setErrorIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const unregisterErrorId = useCallback((id: string) => {
    setErrorIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const contextValue = useMemo(
    () => ({
      inputProps: rest,
      forwardedRef: ref,
      helperMessageIds,
      errorIds,
      registerHelperMessageId,
      unregisterHelperMessageId,
      registerErrorId,
      unregisterErrorId,
    }),
    [
      rest,
      ref,
      helperMessageIds,
      errorIds,
      registerHelperMessageId,
      unregisterHelperMessageId,
      registerErrorId,
      unregisterErrorId,
    ],
  );

  const handleRef = useCallback(
    (node: HTMLInputElement | null) => {
      assignRef(ref, node);
    },
    [ref],
  );

  const describedByFromProps = typeof rest['aria-describedby'] === 'string' ? rest['aria-describedby'] : null;
  const describedByList = [describedByFromProps, ...helperMessageIds, ...errorIds].filter(
    (id): id is string => typeof id === 'string' && id.trim().length > 0,
  );
  const describedByProps =
    describedByList.length > 0
      ? {
          'aria-describedby': describedByList.join(' '),
        }
      : {};

  const shouldMarkInvalid = rest.isError === true || errorIds.length > 0;
  const ariaInvalidFromProps = rest['aria-invalid'];
  const ariaInvalidValue = ariaInvalidFromProps != null ? ariaInvalidFromProps : shouldMarkInvalid ? true : null;
  const ariaInvalidProps = ariaInvalidValue == null ? {} : { 'aria-invalid': ariaInvalidValue };

  const {
    size = 'medium',
    isError = false,
    disabled: isDisabled = false,
    onClickClearButton,
    after,
    className,
    ...restInputProps
  } = rest;

  const additionalInputProps = { ...describedByProps, ...ariaInvalidProps };
  const mergedInputProps = {
    ...restInputProps,
    ...additionalInputProps,
    disabled: isDisabled,
    size: 1,
  };

  const currentValueLength = getValueLength(mergedInputProps.value);
  const isShowClearButton = !!onClickClearButton && currentValueLength !== 0 && !isDisabled;
  const hasTrailingElement = isShowClearButton || after != null;

  const inputWrapClasses = clsx('relative flex items-center gap-2 overflow-hidden rounded border', {
    'border-uiBorder02': !isError && !isDisabled,
    'border-supportError': isError && !isDisabled,
    'hover:border-hoverInput': !isDisabled && !isError,
    'hover:focus-within:border-activeInput': !isError,
    'focus-within:border-activeInput': !isError,
    'bg-disabled02 border-disabled01': isDisabled,
    'pr-2': size === 'medium' && hasTrailingElement,
    'pr-3': size === 'large' && hasTrailingElement,
  });

  const mergedClassName = clsx(
    'flex-1 outline-0 placeholder:text-textPlaceholder disabled:text-textPlaceholder',
    {
      ['typography-label14regular min-h-8 px-2']: size === 'medium',
      ['typography-label16regular min-h-10 px-3']: size === 'large',
      'text-text01': !isError,
      'text-supportError': isError,
      'pr-0': hasTrailingElement,
    },
    className,
  );

  return (
    <TextInputCompoundContext.Provider value={contextValue}>
      <div className="flex flex-col gap-2">
        <div className={inputWrapClasses}>
          <input ref={handleRef} className={mergedClassName} {...mergedInputProps} />
          {after}
          {isShowClearButton && <IconButton variant="text" icon="close" size="small" onClick={onClickClearButton} />}
        </div>
        {children}
      </div>
    </TextInputCompoundContext.Provider>
  );
}) as TextInputComponent;

TextInput.HelperMessage = TextInputHelperMessage;
TextInput.ErrorMessage = TextInputErrorMessage;
TextInput.displayName = 'TextInput';

export { TextInput };
