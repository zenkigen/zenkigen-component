import { clsx } from 'clsx';
import type { CSSProperties, TextareaHTMLAttributes } from 'react';
import { forwardRef, useEffect, useRef } from 'react';

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
    const shouldSetFixedHeight = !autoHeight && typeof height !== 'undefined' && height !== null;

    const internalRef = useRef<HTMLTextAreaElement>(null);
    // refの統合
    const setRefs = (el: HTMLTextAreaElement) => {
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
      internalRef.current = el;
    };

    useEffect(() => {
      if (!internalRef.current) return;
      const textarea = internalRef.current;

      if (autoHeight) {
        textarea.style.minHeight = `${height}px`;
      }

      if (shouldSetFixedHeight) {
        textarea.style.height = `${height}px`;
      }
    }, [height, autoHeight, shouldSetFixedHeight]);

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
          ref={setRefs}
          className={classes}
          {...props}
          style={{
            ...{ maxHeight },
          }}
          value={value}
          disabled={disabled}
        />
      </div>
    );
  },
);
TextArea.displayName = 'TextArea';
