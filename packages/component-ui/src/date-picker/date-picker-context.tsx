import { createContext, useContext } from 'react';

export type DatePickerSize = 'small' | 'medium' | 'large' | 'x-large';

export type DatePickerContextValue = {
  size: DatePickerSize;
  isError: boolean;
};

export const DatePickerCompoundContext = createContext<DatePickerContextValue | null>(null);

export const useDatePickerCompoundContext = (componentName: string): DatePickerContextValue => {
  const context = useContext(DatePickerCompoundContext);

  if (context == null) {
    throw new Error(`${componentName} を使用するには DatePicker の子要素として配置する必要がある。`);
  }

  return context;
};
