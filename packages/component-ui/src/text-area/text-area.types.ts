import type { CSSProperties, TextareaHTMLAttributes } from 'react';

export type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> & {
  size?: 'medium' | 'large';
  variant?: 'outline' | 'text';
  value: string;
  height?: CSSProperties['height'];
  isError?: boolean;
  /**
   * @deprecated 外部から className を渡してスタイルを上書きすることは非推奨です。
   */
  className?: string;
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
