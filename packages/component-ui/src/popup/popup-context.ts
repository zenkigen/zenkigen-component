import { createContext } from 'react';

type PopupReturnType = {
  isOpen: boolean;
  onClose?: () => void;
};

export const PopupContext = createContext<PopupReturnType>({
  isOpen: false,
  onClose: () => null,
});
