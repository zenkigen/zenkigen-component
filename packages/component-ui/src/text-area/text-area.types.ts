import type { CSSProperties, TextareaHTMLAttributes } from 'react';

type TextAreaBaseProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className' | 'maxLength'> & {
  size?: 'medium' | 'large';
  value: string;
  height?: CSSProperties['height'];
  isError?: boolean;
  /**
   * @deprecated 外部から className を渡してスタイルを上書きすることは非推奨です。
   */
  className?: string;
};

type AutoHeightUnion =
  | {
      autoHeight: true;
      maxHeight?: CSSProperties['maxHeight'];
      isResizable?: never;
    }
  | {
      autoHeight?: false;
      maxHeight?: never;
      isResizable?: boolean;
    };

type CounterUnion =
  | {
      /** カウンターを非表示（デフォルト） */
      isCounterVisible?: false;
      counterMaxLength?: never;
      maxLength?: number;
    }
  | {
      /** カウンターを表示 + 超過を許容する上限（警告のみ） */
      isCounterVisible: true;
      counterMaxLength?: number;
      maxLength?: never;
    }
  | {
      /** カウンターを表示 + 入力を制限する上限（入力ブロック） */
      isCounterVisible: true;
      counterMaxLength?: never;
      maxLength?: number;
    };

export type TextAreaProps = TextAreaBaseProps & AutoHeightUnion & CounterUnion;
