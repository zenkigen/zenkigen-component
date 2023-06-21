import { createContext } from 'react';

import { WidthVariant } from './type';

type ModalReturnType = {
  onClose: () => void;
  widthVariant?: WidthVariant;
};

export const ModalContext = createContext<ModalReturnType>({
  onClose: () => false,
  widthVariant: 'normal',
});
