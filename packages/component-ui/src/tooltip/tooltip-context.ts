import { createContext } from 'react';

type UseTooltipReturnType = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isRemoving?: boolean;
  setIsRemoving: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TooltipContext = createContext<UseTooltipReturnType>({
  setIsVisible: () => false,
  isRemoving: false,
  setIsRemoving: () => false,
});
