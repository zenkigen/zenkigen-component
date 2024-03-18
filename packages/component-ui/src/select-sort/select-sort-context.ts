import { createContext } from 'react';

type UseSelectSortReturnType = {
  setIsOptionListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isRemoving?: boolean;
  setIsRemoving: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SelectSortContext = createContext<UseSelectSortReturnType>({
  setIsOptionListOpen: () => false,
  isRemoving: false,
  setIsRemoving: () => false,
});
