import { clsx } from 'clsx';
import type { CSSProperties, TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  size?: 'medium' | 'large';
  value: string;
  height?: CSSProperties['height'];
  isError?: boolean;
} & (
    | {
        autoHeight: true;
        maxHeight?: CSSProperties['maxHeight'];
        isResizable?: never;
      }
    | {
        autoHeight?: false;
        maxHeight?: never;
        isResizable?: boolean;
      }
  );

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      size = 'medium',
      isResizable = false,
      autoHeight = false,
      maxHeight,
      isError = false,
      disabled = false,
      height,
      value,
      ...props
    }: Props,
    ref,
  ) => {
    const classes = clsx(
      'w-full rounded border outline-0 placeholder:text-textPlaceholder disabled:text-textPlaceholder',
      {
        'border-supportError': isError && !disabled,
        'hover:border-hoverInput': !disabled && !isError,
        'border-uiBorder02 hover:focus-within:border-activeInput focus-within:border-activeInput text-text01': !isError,
        'bg-disabled02 border-disabled01': disabled,
        'typography-body14regular px-2 pt-1.5 pb-2': size === 'medium',
        'text-4 leading-normal px-3.5 py-2.5': size === 'large',
        'field-sizing-content': autoHeight,
        'text-supportError': isError,
        'resize-none': !isResizable,
      },
    );

    return (
      <div className="flex">
        <textarea
          ref={ref}
          className={classes}
          {...props}
          style={{
            ...{ maxHeight },
            // 自動高さではない場合で、height 指定がある場合は設定する
            ...(!autoHeight && height !== null ? { height } : {}),
            // 自動高さの場合で、height が指定されている場合は、height を minHeight に設定する
            ...(autoHeight && height !== null ? { minHeight: height } : {}),
          }}
          value={value}
          disabled={disabled}
        />
      </div>
    );
  },
);
TextArea.displayName = 'TextArea';
