import { MutableRefObject, ReactElement, ReactNode } from 'react';

import clsx from 'clsx';
import { createPortal } from 'react-dom';

import { ModalContext } from './modal-context';
import { ModalFooter } from './modal-footer';
import { ModalHeader } from './modal-header';
import { WidthVariant } from './type';

type Props = {
  children?: ReactNode;
  widthVariant?: WidthVariant;
  isOpen: boolean;
  onClose: () => void;
  portalTargetRef?: MutableRefObject<HTMLElement | null>;
  headerElement?: ReactElement;
  footerElement?: ReactElement;
};

export function Modal({
  children,
  widthVariant,
  isOpen,
  onClose,
  portalTargetRef,
  headerElement,
  footerElement,
}: Props) {
  const wrapperClasses = clsx(
    'flex',
    'items-center',
    'justify-center',
    'z-overlay',
    'bg-background-backgroundOverlayBlack',
    'fixed left-0 top-0',
    'h-full w-full',
  );
  const modalBaseClasses = clsx('flex', 'flex-col', 'w-[480px]', 'bg-background-uiBackground01', 'rounded-lg');
  const contentClasses = clsx('flex', 'items-center', 'justify-center');

  return createPortal(
    isOpen && (
      <ModalContext.Provider value={{ onClose, widthVariant }}>
        <div className={wrapperClasses}>
          <div className={modalBaseClasses}>
            {headerElement}
            <div className={contentClasses}>{children}</div>
            {footerElement}
          </div>
        </div>
      </ModalContext.Provider>
    ),
    !portalTargetRef || portalTargetRef?.current === null ? document.body : portalTargetRef.current,
  );
}

Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
