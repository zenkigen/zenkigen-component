import type { CSSProperties, TextareaHTMLAttributes } from 'react';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /**
   * @deprecated 外部から className を渡してスタイルを上書きすることは非推奨です。
   */
  className?: string;
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
