import { CSSProperties, MutableRefObject, ReactElement, ReactNode } from 'react';

import clsx from 'clsx';
import { createPortal } from 'react-dom';

import { ModalButtonTab } from './modal-button-tab';
import { ModalContext } from './modal-context';
import { ModalHeader } from './modal-header';
import { ModalTab } from './modal-tab';

type Props = {
  children?: ReactNode;
  size?: 'small' | 'medium' | 'large' | 'x-large';
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
  size = 'medium',
  height,
  isOpen,
  setIsOpen,
  portalTargetRef,
  headerElement,
  tabElement,
  buttonTabElement,
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
  const modalBaseClasses = clsx(
    'flex',
    'shrink-0',
    'flex-col',
    'bg-background-uiBackground01',
    'rounded-lg',
    'shadow-modalShadow',
    {
      'w-[320px]': size === 'small',
      'w-[480px]': size === 'medium',
      'w-[640px]': size === 'large',
      'w-[720px]': size === 'x-large',
    },
  );
  const contentClasses = clsx('flex', 'items-center', 'justify-center', 'overflow-y-auto');

  return createPortal(
    isOpen && (
      <ModalContext.Provider value={{ size, setIsOpen }}>
        <div className={wrapperClasses}>
          <div className={modalBaseClasses} style={{ height }}>
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
