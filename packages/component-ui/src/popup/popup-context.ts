import { createContext } from 'react';

type PopupReturnType = {
  onClose?: () => void;
};

export const PopupContext = createContext<PopupReturnType>({
  onClose: () => null,
});
