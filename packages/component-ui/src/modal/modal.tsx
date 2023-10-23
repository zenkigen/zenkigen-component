import { CSSProperties, MutableRefObject, ReactNode } from 'react';

import { createPortal } from 'react-dom';

import { ModalBody } from './modal-body';
import { ModalButton } from './modal-button';
import { ModalContext } from './modal-context';
import { ModalFooter } from './modal-footer';
import { ModalFooterGroup } from './modal-footer-group';
import { ModalHeader } from './modal-header';
import { ModalTab } from './modal-tab';

type Props = {
  children?: ReactNode;
  width: number;
  height?: CSSProperties['height'];
  isOpen: boolean;
  widthLimit?: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  portalTargetRef?: MutableRefObject<HTMLElement | null>;
};

export function Modal({
  children,
  width = 480,
  height,
  isOpen,
  widthLimit = 420,
  setIsOpen,
  portalTargetRef,
}: Props) {
  const wrapperClasses =
    'flex items-center justify-center z-overlay bg-background-backgroundOverlayBlack fixed left-0 top-0 h-full w-full';
  const modalBaseClasses = 'flex shrink-0 flex-col bg-background-uiBackground01 rounded-lg shadow-modalShadow';

  return createPortal(
    isOpen && (
      <ModalContext.Provider value={{ width, widthLimit, setIsOpen }}>
        <div className={wrapperClasses}>
          <div className={modalBaseClasses} style={{ width, height }}>
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
Modal.Tab = ModalTab;
Modal.FooterGroup = ModalFooterGroup
Modal.Button = ModalButton;
Modal.Footer = ModalFooter;

