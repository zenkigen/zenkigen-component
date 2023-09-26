import { CSSProperties, MutableRefObject, ReactElement, ReactNode } from 'react';

import { createPortal } from 'react-dom';

import { ModalButtonTab } from './modal-button-tab';
import { ModalContext } from './modal-context';
import { ModalHeader } from './modal-header';
import { ModalTab } from './modal-tab';

type Props = {
  children?: ReactNode;
  width: number;
  height?: CSSProperties['height'];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  portalTargetRef?: MutableRefObject<HTMLElement | null>;
  headerElement?: ReactElement;
  tabElement?: ReactElement;
  buttonTabElement?: ReactElement;
};

export function Modal({
  children,
  width = 480,
  height,
  isOpen,
  setIsOpen,
  portalTargetRef,
  headerElement,
  tabElement,
  buttonTabElement,
}: Props) {
  const wrapperClasses =
    'flex items-center justify-center z-overlay bg-background-backgroundOverlayBlack fixed left-0 top-0 h-full w-full';
  const modalBaseClasses = 'flex shrink-0 flex-col bg-background-uiBackground01 rounded-lg shadow-modalShadow';
  const contentClasses = 'flex items-center justify-center overflow-y-auto';

  return createPortal(
    isOpen && (
      <ModalContext.Provider value={{ width, setIsOpen }}>
        <div className={wrapperClasses}>
          <div className={modalBaseClasses} style={{ width, height }}>
            {headerElement}
            {tabElement}
            <div className={contentClasses}>{children}</div>
            {buttonTabElement}
          </div>
        </div>
      </ModalContext.Provider>
    ),
    !portalTargetRef || portalTargetRef?.current === null ? document.body : portalTargetRef.current,
  );
}

Modal.Header = ModalHeader;
Modal.Tab = ModalTab;
Modal.ButtonTab = ModalButtonTab;
