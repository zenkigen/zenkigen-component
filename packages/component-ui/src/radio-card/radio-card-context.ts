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
  /** エラーメッセージ要素の id（aria-describedby 連携用） */
  errorId: string;
  /** RadioCard.ErrorMessage が実在するか（宙吊り参照を防ぐ） */
  hasError: boolean;
  /** ErrorMessage が自身の存在を登録する */
  registerError: (present: boolean) => void;
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
