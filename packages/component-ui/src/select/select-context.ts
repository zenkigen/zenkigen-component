import { createContext } from 'react';

import type { SelectOption } from './type';

type UseSelectReturnType = {
  size?: 'x-small' | 'small' | 'medium' | 'large';
  placeholder?: string;
  selectedOption?: SelectOption | null;
  setIsOptionListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: (option: SelectOption | null) => void;
  isRemoving?: boolean;
  setIsRemoving: React.Dispatch<React.SetStateAction<boolean>>;
  variant?: 'text' | 'outline';
};

export const SelectContext = createContext<UseSelectReturnType>({
  size: 'medium',
  setIsOptionListOpen: () => false,
  isRemoving: false,
  setIsRemoving: () => false,
  variant: 'outline',
});
