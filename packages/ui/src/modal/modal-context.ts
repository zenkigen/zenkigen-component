import { createContext } from 'react';

type ModalReturnType = {
  size?: 'small' | 'medium' | 'large' | 'x-large';
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalReturnType>({
  size: 'medium',
  setIsOpen: () => false,
});
