import { clsx } from 'clsx';
import type { InputHTMLAttributes } from 'react';
import { forwardRef, useCallback } from 'react';

import { IconButton } from '../icon-button';
import type { TextInputInternalProps } from './text-input.types';
import { assignRef } from './text-input-utils';

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

type RenderInputFieldParams = {
  props: TextInputInternalProps;
  additionalInputProps?: InputHTMLAttributes<HTMLInputElement>;
  inputRef?: (node: HTMLInputElement | null) => void;
};

export const renderInputField = ({ props, additionalInputProps, inputRef }: RenderInputFieldParams) => {
  const {
    size = 'medium',
    isError = false,
    disabled: isDisabled = false,
    onClickClearButton,
    after,
    className,
    ...restInputProps
  } = props;

  const additionalProps = additionalInputProps ?? {};
  const mergedInputProps = {
    ...additionalProps,
    ...restInputProps,
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
    <div className={inputWrapClasses}>
      <input ref={inputRef} className={mergedClassName} {...mergedInputProps} />
      {after}
      {isShowClearButton && <IconButton variant="text" icon="close" size="small" onClick={onClickClearButton} />}
    </div>
  );
};

export const LegacyTextInput = forwardRef<HTMLInputElement, TextInputInternalProps>((props, ref) => {
  const handleRef = useCallback(
    (node: HTMLInputElement | null) => {
      assignRef(ref, node);
    },
    [ref],
  );

  return renderInputField({ props, inputRef: handleRef });
});
LegacyTextInput.displayName = 'LegacyTextInput';
