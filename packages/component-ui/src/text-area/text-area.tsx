import { clsx } from 'clsx';
import { CSSProperties, forwardRef, TextareaHTMLAttributes } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  size?: 'medium' | 'large';
  value: string;
  height?: CSSProperties['height'];
  isResizable?: boolean;
  isError?: boolean;
};

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ size = 'medium', isResizable = false, isError, ...props }: Props, ref) => {
    const classes = clsx(
      'placeholder:text-textPlaceholder disabled:text-textPlaceholder w-full rounded border outline-0',
      {
        'border-supportError': isError && !props.disabled,
        'hover:border-hoverInput': !props.disabled && !isError,
        'border-uiBorder01 hover:focus-within:border-activeInput focus-within:border-activeInput text-text01': !isError,
        'bg-disabled02 border-disabled01': props.disabled,
        ['typography-body1regular px-2 pt-1.5 pb-2']: size === 'medium',
        ['text-4 px-3.5 py-2.5']: size === 'large',
        'text-supportError': isError,
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
