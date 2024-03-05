import type { MutableRefObject } from 'react';
import { createContext } from 'react';

type UseDropdownReturnType = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled: boolean;
  portalTargetRef?: MutableRefObject<HTMLElement | null>;
  targetDimensions: {
    width: number;
    height: number;
  };
  isRemoving?: boolean;
  setIsRemoving: React.Dispatch<React.SetStateAction<boolean>>;
  variant: 'text' | 'outline';
};

export const DropdownContext = createContext<UseDropdownReturnType>({
  isVisible: false,
  setIsVisible: () => false,
  isDisabled: false,
  targetDimensions: { width: 0, height: 0 },
  isRemoving: false,
  setIsRemoving: () => false,
  variant: 'outline',
});
