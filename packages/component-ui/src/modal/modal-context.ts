import { createContext } from 'react';

type ModalReturnType = {
  width: number;
  widthLimit: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalReturnType>({
  width: 480,
  widthLimit: 420,
  setIsOpen: () => false,
});
