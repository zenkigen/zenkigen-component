import { createContext } from 'react';

import type { SelectOption } from './type';

type UseSelectReturnType = {
  size?: 'x-small' | 'small' | 'medium' | 'large';
  placeholder?: string;
  selectedOption?: SelectOption | null;
  setIsOptionListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: (option: SelectOption | null) => void;
  variant?: 'text' | 'outline';
  floatingRefs?: {
    setReference: (node: HTMLElement | null) => void;
    setFloating: (node: HTMLElement | null) => void;
  };
  floatingStyles?: {
    position: 'absolute' | 'fixed';
    top: number;
    left: number;
  };
  isError?: boolean;
};

export const SelectContext = createContext<UseSelectReturnType>({
  size: 'medium',
  setIsOptionListOpen: () => false,
  variant: 'outline',
  isError: false,
});
