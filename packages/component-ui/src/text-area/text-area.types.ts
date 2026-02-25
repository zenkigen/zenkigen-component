import type { CSSProperties, TextareaHTMLAttributes } from 'react';

export type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> & {
  size?: 'medium' | 'large';
  value: string;
  height?: CSSProperties['height'];
  isError?: boolean;
} & ({ variant?: 'outline'; className?: never } | { variant: 'text'; className?: string }) &
  (
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
