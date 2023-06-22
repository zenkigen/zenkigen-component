import { MutableRefObject, ReactElement, ReactNode } from 'react';

import clsx from 'clsx';
import { createPortal } from 'react-dom';

import { ModalContext } from './modal-context';
import { ModalFooter } from './modal-footer';
import { ModalHeader } from './modal-header';
import { ModalTab } from './modal-tab';

type Props = {
  children?: ReactNode;
  widthVariant?: 'narrow' | 'normal' | 'wide';
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  portalTargetRef?: MutableRefObject<HTMLElement | null>;
  headerElement?: ReactElement;
  tabElement?: ReactElement;
  footerElement?: ReactElement;
};

export function Modal({
  children,
  widthVariant = 'normal',
  isOpen,
  setIsOpen,
  portalTargetRef,
  headerElement,
  tabElement,
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
  const modalBaseClasses = clsx('flex', 'flex-col', 'bg-background-uiBackground01', 'rounded-lg', {
    'w-[480px]': widthVariant === 'narrow',
    'w-[640px]': widthVariant === 'normal',
    'w-[720px]': widthVariant === 'wide',
  });
  const contentClasses = clsx('flex', 'items-center', 'justify-center');

  return createPortal(
    isOpen && (
      <ModalContext.Provider value={{ setIsOpen }}>
        <div className={wrapperClasses}>
          <div className={modalBaseClasses}>
            {headerElement}
            {tabElement}
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
Modal.Tab = ModalTab;
Modal.Footer = ModalFooter;
