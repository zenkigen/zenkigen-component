import { clsx } from 'clsx';
import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { IconButton } from '../icon-button';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: 'medium' | 'large';
  value: string;
  isError?: boolean;
  onClickClearButton?: () => void;
};

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ size = 'medium', isError = false, disabled = false, onClickClearButton, ...props }: Props, ref) => {
    const isShowClearButton = !!onClickClearButton && props.value.length !== 0 && !disabled;
    const inputWrapClasses = clsx('relative flex items-center gap-2 overflow-hidden rounded border', {
      'border-uiBorder02': !isError && !disabled,
      'border-supportError': isError && !disabled,
      'hover:border-hoverInput': !disabled && !isError,
      'hover:focus-within:border-activeInput': !isError,
      'focus-within:border-activeInput': !isError,
      'bg-disabled02 border-disabled01': disabled,
      'pr-2': size === 'medium' && isShowClearButton,
      'pr-3': size === 'large' && isShowClearButton,
    });

    const inputClasses = clsx('flex-1 outline-0 placeholder:text-textPlaceholder disabled:text-textPlaceholder', {
      ['typography-label14regular min-h-8 px-2']: size === 'medium',
      ['typography-label16regular min-h-10 px-3']: size === 'large',
      'text-text01': !isError,
      'text-supportError': isError,
      'pr-0': isShowClearButton,
    });

    return (
      <div className={inputWrapClasses}>
        <input ref={ref} size={1} className={inputClasses} disabled={disabled} onChange={props.onChange} {...props} />
        {isShowClearButton && <IconButton variant="text" icon="close" size="small" onClick={onClickClearButton} />}
      </div>
    );
  },
);
TextInput.displayName = 'TextInput';
