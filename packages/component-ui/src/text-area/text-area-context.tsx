import type { ForwardedRef } from 'react';
import { createContext, useContext } from 'react';

export type TextAreaContextValue = {
  textAreaProps: {
    size: 'medium' | 'large';
    variant: 'outline' | 'text';
    isError: boolean;
  };
  forwardedRef: ForwardedRef<HTMLTextAreaElement>;
};

export const TextAreaCompoundContext = createContext<TextAreaContextValue | null>(null);

export const useTextAreaCompoundContext = (componentName: string): TextAreaContextValue => {
  const context = useContext(TextAreaCompoundContext);

  if (context == null) {
    throw new Error(`${componentName} を使用するには TextArea の子要素として配置する必要がある。`);
  }

  return context;
};
