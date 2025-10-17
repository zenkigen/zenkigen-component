import { createContext } from 'react';

type PopupReturnType = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  onClose?: () => void;
};

export const PopupContext = createContext<PopupReturnType>({
  isOpen: false,
  setOpen: () => null,
  onClose: () => null,
});
