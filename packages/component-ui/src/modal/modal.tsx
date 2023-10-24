import { CSSProperties, MutableRefObject, ReactNode } from 'react';

import { createPortal } from 'react-dom';

import { ModalBody } from './modal-body';
import { ModalContext } from './modal-context';
import { ModalFooter } from './modal-footer';
import { ModalHeader } from './modal-header';

type Props = {
  children?: ReactNode;
  width: number;
  height?: CSSProperties['height'];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  portalTargetRef?: MutableRefObject<HTMLElement | null>;
};

export function Modal({ children, width = 480, height, isOpen, setIsOpen, portalTargetRef }: Props) {
  return createPortal(
    isOpen && (
      <ModalContext.Provider value={{ setIsOpen }}>
        <div className="fixed left-0 top-0 z-overlay flex h-full w-full items-center justify-center bg-background-backgroundOverlayBlack">
          <div className="flex shrink-0 flex-col rounded-lg bg-background-uiBackground01 shadow-modalShadow" style={{ width, height }}>
            {children}
          </div>
        </div>
      </ModalContext.Provider>
    ),
    !portalTargetRef || portalTargetRef?.current === null ? document.body : portalTargetRef.current,
  );
}

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
