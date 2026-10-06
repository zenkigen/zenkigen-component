import type { InputHTMLAttributes, ReactNode, Ref } from 'react';

export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'className'> & {
  size?: 'medium' | 'large' | 'x-large';
  variant?: 'outline' | 'text';
  value: string;
  isError?: boolean;
  onClickClearButton?: () => void;
};

/** @internal TextInput で内部利用する props（after を含む） */
export type TextInputInternalProps = TextInputProps & {
  /** 入力欄の末尾に表示する要素。例: アイコンやテキスト（内部実装用） */
  after?: ReactNode;
  /**
   * 入力欄の先頭に表示する要素（内部実装用）。
   * 指定時のみ input を折り返し可能なコンテナで包み、その先頭に描画する。未指定時の DOM は変わらない。
   */
  before?: ReactNode;
  /** 枠線を持つ外側 div への ref（内部実装用）。フローティング要素の位置基準に使う */
  frameRef?: Ref<HTMLDivElement>;
};
