import { forwardRef, InputHTMLAttributes } from 'react';

import { typography } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';

import { IconButton } from '../icon-button';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  hint?: string;
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
    'px-2',
    'hover:border-hover-hoverInput',
    {
      'focus-within:border-active-activeInput': props.status !== 'error',
    },
    {
      'border-border-uiBorder01': props.status !== 'error',
      'border-support-supportError': props.status === 'error',
    },
    {
      'bg-disabled-disabled02 border-disabled-disabled02': props.disabled,
    },
  );

  const inputClasses = clsx(
    'flex-1',
    'outline-0',
    'placeholder:text-text-textPlaceholder',
    {
      [`${typography.label.label2regular} my-1`]: sizeValue === 'medium',
      [`${typography.label.label1regular} my-2.5`]: sizeValue === 'large',
    },
    {
      'text-text-text01': props.status !== 'error',
      'text-support-supportError': props.status === 'error',
    },
    {
      'disabled:text-text-text01': props.disabled,
    },
  );

  const hintClasses = clsx('px-2', 'mt-1', `${typography.label.label4regular}`, {
    'text-text-text02': props.status !== 'error',
    'text-support-supportError': props.status === 'error',
  });

  return (
    <div className="flex flex-col">
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
        {props.onClickClearButton && props.value && props.value.length !== 0 && (
          <IconButton variant="text" icon="close" size="small" isNoPadding onClick={props.onClickClearButton} />
        )}
      </div>
      <div className={hintClasses}>{props.hint}</div>
    </div>
  );
});
TextInput.displayName = 'TextInput';
