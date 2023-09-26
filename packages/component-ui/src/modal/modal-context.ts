import { createContext } from 'react';

type ModalReturnType = {
  width: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalReturnType>({
  width: 480,
  setIsOpen: () => false,
});
