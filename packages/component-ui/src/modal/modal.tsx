import { CSSProperties, MutableRefObject, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { ModalBody } from './modal-body';
import { ModalContext } from './modal-context';
import { ModalFooter } from './modal-footer';
import { ModalHeader } from './modal-header';

const LIMIT_WIDTH = 320;
const LIMIT_HEIGHT = 184;

type Props = {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  isOpen: boolean;
  onClose?: () => void;
  portalTargetRef?: MutableRefObject<HTMLElement | null>;
};

export function Modal({ children, width = 480, height, isOpen, onClose, portalTargetRef }: PropsWithChildren<Props>) {
  const [isMounted, setIsMounted] = useState(false);

  const renderWidth = typeof width === 'number' ? Math.max(width, LIMIT_WIDTH) : width;
  const renderHeight = typeof height === 'number' ? Math.max(height, LIMIT_HEIGHT) : height;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted && isOpen
    ? createPortal(
        <ModalContext.Provider value={{ onClose }}>
          <div className="fixed left-0 top-0 z-overlay flex size-full items-center justify-center bg-backgroundOverlayBlack py-4">
            <div
              className="grid max-h-full min-h-[120px] grid-rows-[max-content_1fr_max-content] flex-col rounded-lg bg-uiBackground01 shadow-modalShadow"
              style={{ width: renderWidth, height: renderHeight }}
            >
              {children}
            </div>
          </div>
        </ModalContext.Provider>,
        portalTargetRef?.current != null ? portalTargetRef.current : document.body,
      )
    : null;
}

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
