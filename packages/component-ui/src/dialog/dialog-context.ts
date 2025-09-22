import { createContext } from 'react';

type DialogReturnType = {
  onClose?: () => void;
};

export const DialogContext = createContext<DialogReturnType>({
  onClose: () => null,
});
