import { clsx } from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

import { IconButton } from '../icon-button';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: 'medium' | 'large';
  value: string;
  isError?: boolean;
  onClickClearButton?: () => void;
};

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ size = 'medium', isError, onClickClearButton, ...props }: Props, ref) => {
    const inputWrapClasses = clsx('relative flex items-center gap-2 overflow-hidden rounded border', {
      'border-border-uiBorder01': !isError,
      'border-support-supportError': isError && !props.disabled,
      'hover:border-hover-hoverInput': !props.disabled && !isError,
      'hover:focus-within:border-active-activeInput': !isError,
      'focus-within:border-active-activeInput': !isError,
      'bg-disabled-disabled02 border-disabled-disabled02': props.disabled,
    });

    const inputClasses = clsx(
      'flex-1 pl-2 pr-3 outline-0 placeholder:text-text-textPlaceholder disabled:text-text-textPlaceholder',
      {
        ['typography-label2regular pt-1.5 pb-2']: size === 'medium',
        ['typography-label1regular py-2.5']: size === 'large',
        'text-text-text01': !isError,
        'text-support-supportError': isError,
      },
    );

    return (
      <div className={inputWrapClasses}>
        <input ref={ref} size={1} className={inputClasses} onChange={props.onChange} {...props} />
        {onClickClearButton && props.value && props.value.length !== 0 && !props.disabled && (
          <div className="absolute right-2">
            <IconButton variant="text" icon="close" size="small" isNoPadding onClick={onClickClearButton} />
          </div>
        )}
      </div>
    );
  },
);
TextInput.displayName = 'TextInput';
