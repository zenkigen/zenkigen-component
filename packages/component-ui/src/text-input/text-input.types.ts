import type { InputHTMLAttributes, ReactNode } from 'react';

export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'className'> & {
  size?: 'medium' | 'large';
  variant?: 'outline' | 'text';
  value: string;
  isError?: boolean;
  onClickClearButton?: () => void;
};

/** @internal TextInput で内部利用する props（after を含む） */
export type TextInputInternalProps = TextInputProps & {
  /** 入力欄の末尾に表示する要素。例: アイコンやテキスト（内部実装用） */
  after?: ReactNode;
};
