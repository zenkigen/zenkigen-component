import { typography } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';
import { CSSProperties, forwardRef, TextareaHTMLAttributes } from 'react';

import { IconButton } from '../icon-button';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: 'medium' | 'large';
  value: string;
  height?: CSSProperties['height'];
  isResizable?: boolean;
  isError?: boolean;
  onClickClearButton?: () => void;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ size = 'medium', isResizable = false, ...props }: Props, ref) => {
    const clearButtonClasses = clsx('absolute', {
      [`${typography.body.body2regular} right-3 pt-2`]: size === 'medium',
      [`${typography.body.body1regular} right-3 py-3.5`]: size === 'large',
    });

    const textareaClasses = clsx(
      'w-full rounded border outline-0 placeholder:text-text-textPlaceholder disabled:text-text-textPlaceholder',
      {
        'border-support-supportError': props.isError && !props.disabled,
        'hover:border-hover-hoverInput': !props.disabled && !props.isError,
        'border-border-uiBorder01 hover:focus-within:border-active-activeInput focus-within:border-active-activeInput text-text-text01':
          !props.isError,
        'bg-disabled-disabled02 border-disabled-disabled02': props.disabled,
        'px-2': size === 'medium',
        'px-3.5': size === 'large',
        'pr-8': size === 'medium' && props.onClickClearButton && !props.disabled,
        'pr-9': size === 'large' && props.onClickClearButton && !props.disabled,
        [`${typography.body.body2regular} pt-1.5 pb-2 `]: size === 'medium',
        [`${typography.body.body1regular} py-2.5`]: size === 'large',
        'text-support-supportError': props.isError,
        'resize-none': !isResizable,
      },
    );

    return (
      <div className="relative flex">
        <textarea
          ref={ref}
          className={textareaClasses}
          onChange={props.onChange}
          {...props}
          style={{ height: props.height }}
        />
        {props.onClickClearButton && props.value && props.value.length !== 0 && !props.disabled && (
          <div className={clearButtonClasses}>
            <IconButton variant="text" icon="close" size="small" isNoPadding onClick={props.onClickClearButton} />
          </div>
        )}
      </div>
    );
  },
);
TextArea.displayName = 'TextArea';
