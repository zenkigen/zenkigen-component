import { typography } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';
import { forwardRef, TextareaHTMLAttributes } from 'react';

import { IconButton } from '../icon-button';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  sizeValue?: 'medium' | 'large';
  value: string;
  isResizable?: boolean;
  isError?: boolean;
  onClickClearButton?: () => void;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ sizeValue = 'medium', isResizable = false, rows = 7, ...props }: Props, ref) => {
    const inputWrapClasses = clsx('flex items-center gap-2 overflow-hidden rounded border', {
      'border-border-uiBorder01': !props.isError,
      'border-support-supportError': props.isError && !props.disabled,
      'hover:border-hover-hoverInput': !props.disabled && !props.isError,
      'hover:focus-within:border-active-activeInput': !props.isError,
      'focus-within:border-active-activeInput': !props.isError,
      'bg-disabled-disabled02 border-disabled-disabled02': props.disabled,
    });

    const inputClasses = clsx(
      'flex-1 pl-2 pr-3 outline-0 placeholder:text-text-textPlaceholder disabled:text-text-text03',
      {
        [`${typography.label.label2regular} pt-1.5 pb-2`]: sizeValue === 'medium',
        [`${typography.label.label1regular} py-2.5`]: sizeValue === 'large',
        'text-text-text01': !props.isError,
        'text-support-supportError': props.isError,
        'resize-none': !isResizable,
      },
    );

    return (
      <div className={inputWrapClasses}>
        <textarea
          ref={ref}
          className={inputClasses}
          onChange={props.onChange}
          rows={rows}
          {...props}
          style={{ lineHeight: '171%' }}
        />
        {props.onClickClearButton && props.value && props.value.length !== 0 && !props.disabled && (
          <IconButton variant="text" icon="close" size="small" isNoPadding onClick={props.onClickClearButton} />
        )}
      </div>
    );
  },
);
TextArea.displayName = 'TextArea';
