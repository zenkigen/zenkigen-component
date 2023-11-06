import { typography } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

import { IconButton } from '../icon-button';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'medium' | 'large';
  value: string;
  isError?: boolean;
  onClickClearButton?: () => void;
}

export const TextInput = forwardRef<HTMLInputElement, Props>(({ size = 'medium', ...props }: Props, ref) => {
  const inputWrapClasses = clsx('flex items-center gap-2 overflow-hidden rounded border pl-2 pr-3', {
    'border-border-uiBorder01': !props.isError,
    'border-support-supportError': props.isError && !props.disabled,
    'hover:border-hover-hoverInput': !props.disabled && !props.isError,
    'hover:focus-within:border-active-activeInput': !props.isError,
    'focus-within:border-active-activeInput': !props.isError,
    'bg-disabled-disabled02 border-disabled-disabled02': props.disabled,
  });

  const inputClasses = clsx('flex-1 outline-0 placeholder:text-text-textPlaceholder disabled:text-text-textPlaceholder', {
    [`${typography.label.label2regular} pt-1.5 pb-2`]: size === 'medium',
    [`${typography.label.label1regular} py-2.5`]: size === 'large',
    'text-text-text01': !props.isError,
    'text-support-supportError': props.isError,
  });

  return (
    <div className={inputWrapClasses}>
      <input ref={ref} size={1} className={inputClasses} onChange={props.onChange} {...props} />
      {props.onClickClearButton && props.value && props.value.length !== 0 && !props.disabled && (
        <IconButton variant="text" icon="close" size="small" isNoPadding onClick={props.onClickClearButton} />
      )}
    </div>
  );
});
TextInput.displayName = 'TextInput';
