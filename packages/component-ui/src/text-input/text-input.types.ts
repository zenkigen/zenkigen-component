import type { InputHTMLAttributes, ReactNode } from 'react';

/**
 * @deprecated TextInput はコンポジション API への移行を推奨するため、将来的に削除される予定です。
 */
export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: 'medium' | 'large';
  value: string;
  isError?: boolean;
  onClickClearButton?: () => void;
};

export type TextInputInternalProps = TextInputProps & {
  /** 入力欄の末尾に表示する要素。例: アイコンやテキスト（内部実装用） */
  after?: ReactNode;
};
