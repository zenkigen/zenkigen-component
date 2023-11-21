import { createContext } from 'react';

type ModalReturnType = {
  onClose: () => void;
};

export const ModalContext = createContext<ModalReturnType>({
  onClose: () => null,
});
