import { clsx } from 'clsx';
import type { CSSProperties, TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  size?: 'medium' | 'large';
  value: string;
  height?: CSSProperties['height'];
  isResizable?: boolean;
  isError?: boolean;
};

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ size = 'medium', isResizable = false, isError = false, disabled = false, ...props }: Props, ref) => {
    const classes = clsx(
      'w-full rounded border outline-0 placeholder:text-textPlaceholder disabled:text-textPlaceholder',
      {
        'border-supportError': isError && !disabled,
        'hover:border-hoverInput': !disabled && !isError,
        'border-uiBorder02 hover:focus-within:border-activeInput focus-within:border-activeInput text-text01': !isError,
        'bg-disabled02 border-disabled01': disabled,
        ['typography-body1regular px-2 pt-1.5 pb-2']: size === 'medium',
        ['text-4 leading-normal px-3.5 py-2.5']: size === 'large',
        'text-supportError': isError,
        'resize-none': !isResizable,
      },
    );

    return (
      <div className="flex">
        <textarea ref={ref} className={classes} {...props} disabled={disabled} style={{ height: props.height }} />
      </div>
    );
  },
);
TextArea.displayName = 'TextArea';
