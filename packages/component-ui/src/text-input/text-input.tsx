import { forwardRef, InputHTMLAttributes } from 'react';

import { typography } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';

import { IconButton } from '../icon-button';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  status?: 'error';
  sizeValue?: 'medium' | 'large';
  value: string;
  onClickClearButton?: () => void;
}

export const TextInput = forwardRef<HTMLInputElement, Props>(({ sizeValue = 'medium', ...props }: Props, ref) => {
  const inputWrapClasses = clsx(
    'flex',
    'items-center',
    'gap-2',
    'border',
    'overflow-hidden',
    'rounded',
    'pl-2',
    'pr-3',
    {
      'border-border-uiBorder01': props.status !== 'error',
      'border-support-supportError': props.status === 'error' && !props.disabled,
    },
    {
      'hover:border-hover-hoverInput': !props.disabled && props.status !== 'error',
      'hover:focus-within:border-active-activeInput': props.status !== 'error',
      'focus-within:border-active-activeInput': props.status !== 'error',
    },
    {
      'bg-disabled-disabled02 border-disabled-disabled02': props.disabled,
    },
  );

  const inputClasses = clsx(
    'flex-1',
    'outline-0',
    'placeholder:text-text-textPlaceholder',
    'disabled:text-text-text03',
    {
      [`${typography.label.label2regular} pt-1.5 pb-2`]: sizeValue === 'medium',
      [`${typography.label.label1regular} py-2.5`]: sizeValue === 'large',
    },
    {
      'text-text-text01': props.status !== 'error',
      'text-support-supportError': props.status === 'error',
    },
  );

  return (
    <div className={inputWrapClasses}>
      <input
        ref={ref}
        size={1}
        id={props.id}
        className={inputClasses}
        placeholder={props.placeholder}
        onChange={props.onChange}
        {...props}
      />
      {props.onClickClearButton && props.value && props.value.length !== 0 && !props.disabled && (
        <IconButton variant="text" icon="close" size="small" isNoPadding onClick={props.onClickClearButton} />
      )}
    </div>
  );
});
TextInput.displayName = 'TextInput';
