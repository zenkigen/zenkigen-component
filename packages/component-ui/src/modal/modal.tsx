import type { CSSProperties, MutableRefObject, PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { MODAL_OPEN_EVENT } from '../hooks/use-dismiss-on-modal-open';
import { BodyScrollLock } from './body-scroll-lock';
import { ModalBody } from './modal-body';
import { ModalContext } from './modal-context';
import { ModalFooter } from './modal-footer';
import { ModalHeader } from './modal-header';

const LIMIT_WIDTH = 320;
const LIMIT_HEIGHT = 184;

type Props = {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  maxWidth?: CSSProperties['maxWidth'];
  isOpen: boolean;
  onClose?: () => void;
  portalTargetRef?: MutableRefObject<HTMLElement | null>;
};

export function Modal({
  children,
  width = 480,
  height,
  maxWidth = 'calc(100vw - 40px)',
  isOpen,
  onClose,
  portalTargetRef,
}: PropsWithChildren<Props>) {
  const [isMounted, setIsMounted] = useState(false);

  const renderWidth = typeof width === 'number' ? Math.max(width, LIMIT_WIDTH) : width;
  const renderHeight = typeof height === 'number' ? Math.max(height, LIMIT_HEIGHT) : height;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Modal が表示された瞬間に、外側で開いている floating UI（Select / Dropdown / Popover 等）を閉じるためのイベント発行。
  // `isOpen` が false → true の遷移時だけでなく、初回マウント時に isOpen=true で渡された場合や、
  // Modal を unmount → 再 mount した場合の表示時にも発火する。
  // いずれも「Modal が新たに前面へ出てきた瞬間」なので、背景の floating UI を閉じる対象として正しい挙動。
  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new CustomEvent(MODAL_OPEN_EVENT));
    }
  }, [isOpen]);

  return isMounted && isOpen ? (
    <>
      <BodyScrollLock />
      {createPortal(
        <ModalContext.Provider value={{ onClose }}>
          <div className="fixed left-0 top-0 z-overlay flex size-full items-center justify-center bg-backgroundOverlayBlack py-4">
            <div
              role="dialog"
              aria-modal="true"
              className="grid max-h-full min-h-[120px] grid-rows-[max-content_1fr_max-content] flex-col rounded-lg bg-uiBackground01 shadow-modalShadow"
              style={{ width: renderWidth, height: renderHeight, maxWidth }}
            >
              {children}
            </div>
          </div>
        </ModalContext.Provider>,
        portalTargetRef?.current != null ? portalTargetRef.current : document.body,
      )}
    </>
  ) : null;
}

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
