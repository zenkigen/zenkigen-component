import type { CSSProperties, TextareaHTMLAttributes } from 'react';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
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
