import type { ForwardedRef } from 'react';
import { createContext, useContext } from 'react';

import type { TextInputInternalProps } from './text-input.types';

export type TextInputContextValue = {
  inputProps: TextInputInternalProps;
  forwardedRef: ForwardedRef<HTMLInputElement>;
};

export const TextInputCompoundContext = createContext<TextInputContextValue | null>(null);

export const useTextInputCompoundContext = (componentName: string): TextInputContextValue => {
  const context = useContext(TextInputCompoundContext);

  if (context == null) {
    throw new Error(`${componentName} を使用するには TextInput の子要素として配置する必要がある。`);
  }

  return context;
};
