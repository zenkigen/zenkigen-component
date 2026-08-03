import { createContext, useContext } from 'react';

export type RadioCardContextValue = {
  /** 現在選択されている値（controlled） */
  value: string;
  /** 選択変更時のハンドラー */
  onChange: (value: string) => void;
  /** グループ内の input を束ねる name */
  name: string;
  /** グループ全体を無効化するか */
  isDisabled: boolean;
  /** グループ全体をエラー状態にするか */
  isError: boolean;
  /** radiogroup の aria-describedby に張るエラーメッセージ id 群（スペース区切り）。表示中の ErrorMessage が無ければ null */
  errorDescribedBy: string | null;
  /** radiogroup の aria-label */
  ariaLabel?: string;
  /** radiogroup の aria-labelledby */
  ariaLabelledby?: string;
};

export const RadioCardContext = createContext<RadioCardContextValue | null>(null);

export function useRadioCardContext(componentName: string): RadioCardContextValue {
  const context = useContext(RadioCardContext);
  if (context === null) {
    throw new Error(`<${componentName}> は <RadioCard> の内部で使用してください`);
  }

  return context;
}
