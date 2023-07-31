import { createContext } from 'react';

type UseDropdownReturnType = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled: boolean;
  targetDimensions: {
    width: number;
    height: number;
  };
  variant: 'text' | 'outline';
};

export const DropdownContext = createContext<UseDropdownReturnType>({
  isVisible: false,
  setIsVisible: () => false,
  isDisabled: false,
  targetDimensions: { width: 0, height: 0 },
  variant: 'outline',
});
