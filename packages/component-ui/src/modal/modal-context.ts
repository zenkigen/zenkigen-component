import { createContext } from 'react';

type ModalReturnType = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalReturnType>({
  setIsOpen: () => false,
});
