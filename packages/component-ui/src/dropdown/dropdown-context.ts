import type { MutableRefObject, RefObject } from 'react';
import { createContext } from 'react';

type UseDropdownReturnType = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled: boolean;
  portalTargetRef?: MutableRefObject<HTMLElement | null>;
  /** トリガーボタン。項目選択後にフォーカスを戻すために使う */
  triggerRef?: RefObject<HTMLButtonElement | null>;
  targetDimensions: {
    width: number;
    height: number;
  };
  variant: 'text' | 'outline';
  size: 'x-small' | 'small' | 'medium' | 'large';
};

export const DropdownContext = createContext<UseDropdownReturnType>({
  isVisible: false,
  setIsVisible: () => false,
  isDisabled: false,
  targetDimensions: { width: 0, height: 0 },
  variant: 'outline',
  size: 'medium',
});
