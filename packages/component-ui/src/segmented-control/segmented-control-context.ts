import { createContext } from 'react';

export type SegmentedControlContextValue = {
  value?: string;
  onChange?: (value: string) => void;
  size: 'small' | 'medium';
  isDisabled: boolean;
  focusedValue: string | null;
  onFocusChange?: (value: string) => void;
  values: string[];
};

export const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null);
