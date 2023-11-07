import { typography } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';
import { CSSProperties, forwardRef, TextareaHTMLAttributes } from 'react';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: 'medium' | 'large';
  value: string;
  height?: CSSProperties['height'];
  isResizable?: boolean;
  isError?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ size = 'medium', isResizable = false, ...props }: Props, ref) => {
    const classes = clsx(
      'w-full rounded border outline-0 placeholder:text-text-textPlaceholder disabled:text-text-textPlaceholder',
      {
        'border-support-supportError': props.isError && !props.disabled,
        'hover:border-hover-hoverInput': !props.disabled && !props.isError,
        'border-border-uiBorder01 hover:focus-within:border-active-activeInput focus-within:border-active-activeInput text-text-text01':
          !props.isError,
        'bg-disabled-disabled02 border-disabled-disabled02': props.disabled,
        [`${typography.body.body1regular} px-2 pt-1.5 pb-2`]: size === 'medium',
        [`text-4 px-3.5 py-2.5 `]: size === 'large',
        'text-support-supportError': props.isError,
        'resize-none': !isResizable,
      },
    );

    return (
      <div className="flex">
        <textarea ref={ref} className={classes} {...props} style={{ height: props.height }} />
      </div>
    );
  },
);
TextArea.displayName = 'TextArea';
