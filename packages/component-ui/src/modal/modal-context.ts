import { createContext } from 'react';

type ModalReturnType = {
  onClose?: () => void;
  /** Modal.Header のタイトル要素に付与する id。dialog の aria-labelledby から参照する */
  titleId?: string;
  /** Modal.Header のマウント状態を Modal へ通知する（Header があるときだけ aria-labelledby を付与するため） */
  setHasTitle?: (hasTitle: boolean) => void;
};

export const ModalContext = createContext<ModalReturnType>({
  onClose: () => null,
});
