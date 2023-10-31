import { typography } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';
import { CSSProperties, forwardRef, TextareaHTMLAttributes } from 'react';

import { IconButton } from '../icon-button';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  sizeValue?: 'medium' | 'large';
  value: string;
  height?: CSSProperties['height'];
  isResizable?: boolean;
  isError?: boolean;
  onClickClearButton?: () => void;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ sizeValue = 'medium', isResizable = false, ...props }: Props, ref) => {
    const clearButtonClasses = clsx('absolute', {
      [`${typography.body.body2regular} right-2 pt-1.5`]: sizeValue === 'medium',
      [`${typography.body.body1regular} right-2 py-2.5`]: sizeValue === 'large',
    });

    const textareaClasses = clsx(
      'w-full overflow-hidden rounded border px-2 outline-0 placeholder:text-text-textPlaceholder disabled:text-text-text03',
      {
        'border-support-supportError': props.isError && !props.disabled,
        'hover:border-hover-hoverInput': !props.disabled && !props.isError,
        'border-border-uiBorder01 hover:focus-within:border-active-activeInput focus-within:border-active-activeInput text-text-text01':
          !props.isError,
        'bg-disabled-disabled02 border-disabled-disabled02': props.disabled,
        'pr-7': !props.disabled,
        [`${typography.body.body2regular} pt-1.5 pb-2 `]: sizeValue === 'medium',
        [`${typography.body.body1regular} py-2.5`]: sizeValue === 'large',
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
