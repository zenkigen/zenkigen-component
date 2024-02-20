import clsx from 'clsx';
import {
  AnimationEvent,
  CSSProperties,
  MutableRefObject,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { useViewTransition } from '../view-transition/view-transition-provider';
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
  isAnimation?: boolean;
  onClose?: () => void;
  portalTargetRef?: MutableRefObject<HTMLElement | null>;
};

export function Modal({
  children,
  width = 480,
  height,
  isOpen,
  isAnimation = false,
  onClose,
  portalTargetRef,
}: PropsWithChildren<Props>) {
  const [isMounted, setIsMounted] = useState(false);

  const { state } = useViewTransition();
  const [isRemoving, setIsRemoving] = useState(false);

  const renderWidth = typeof width === 'number' ? Math.max(width, LIMIT_WIDTH) : width;
  const renderHeight = typeof height === 'number' ? Math.max(height, LIMIT_HEIGHT) : height;

  const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    if (window.getComputedStyle(e.currentTarget).opacity === '0') {
      onClose && onClose();
      setIsRemoving(false);
    }
  };

  const handleClose = useCallback(() => {
    if (isAnimation) {
      setIsRemoving(true);
    } else {
      onClose && onClose();
    }
  }, [isAnimation, onClose]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const wrapperClasses = clsx(
    'fixed left-0 top-0 z-overlay flex size-full items-center justify-center bg-backgroundOverlayBlack py-4',
    {
      [`animate-fade-in`]: isAnimation && !isRemoving,
      ['animate-fade-out opacity-0']: isAnimation && isRemoving,
    },
  );

  const mainClasses = clsx(
    'grid max-h-full min-h-[120px] grid-rows-[max-content_1fr_max-content] flex-col rounded-lg bg-uiBackground01 shadow-modalShadow',
    {
      [`animate-rise-up`]: isAnimation && !isRemoving,
      ['animate-rise-down opacity-0']: isAnimation && isRemoving,
    },
  );

  return isMounted && isOpen
    ? createPortal(
        <ModalContext.Provider value={{ onClose: handleClose }}>
          {
            <div
              className={wrapperClasses}
              onAnimationEnd={handleAnimationEnd}
              style={{
                ...(isAnimation
                  ? {
                      animationDuration: !isRemoving
                        ? `${state.list[0]?.value}ms`
                        : isRemoving
                          ? `${state.list[1]?.value}ms`
                          : '0',
                      animationTimingFunction: !isRemoving
                        ? `${state.list[0]?.option?.value}`
                        : isRemoving
                          ? `${state.list[1]?.option?.value}`
                          : '',
                    }
                  : {}),
              }}
            >
              <div
                className={mainClasses}
                style={{
                  width: renderWidth,
                  height: renderHeight,
                  ...(isAnimation
                    ? {
                        animationDuration: !isRemoving
                          ? `${state.list[2]?.value}ms`
                          : isRemoving
                            ? `${state.list[3]?.value}ms`
                            : '0',
                        // animationFillMode: 'backwards',
                        // animationDelay: !isRemoving ? `${state.list[0]?.value}ms` : '0',
                        animationTimingFunction: !isRemoving
                          ? `${state.list[2]?.option?.value}`
                          : isRemoving
                            ? `${state.list[3]?.option?.value}`
                            : '',
                      }
                    : {}),
                }}
              >
                {children}
              </div>
            </div>
          }
        </ModalContext.Provider>,
        portalTargetRef?.current != null ? portalTargetRef.current : document.body,
      )
    : null;
}

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
