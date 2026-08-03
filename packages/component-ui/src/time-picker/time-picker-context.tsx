import { createContext, useContext } from 'react';

/** TimePicker（および内部の Select）のサイズ */
export type TimePickerSize = 'x-small' | 'small' | 'medium' | 'large';

export type TimePickerContextValue = {
  size: TimePickerSize;
  isError: boolean;
};

export const TimePickerCompoundContext = createContext<TimePickerContextValue | null>(null);

export const useTimePickerCompoundContext = (componentName: string): TimePickerContextValue => {
  const context = useContext(TimePickerCompoundContext);

  if (context == null) {
    throw new Error(`${componentName} を使用するには TimePicker の子要素として配置する必要がある。`);
  }

  return context;
};
