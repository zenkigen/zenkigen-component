import type { CSSProperties, PropsWithChildren } from 'react';

import { DialogBody } from './dialog-body';
import { DialogContext } from './dialog-context';
import { DialogFooter } from './dialog-footer';
import { DialogHeader } from './dialog-header';

const LIMIT_WIDTH = 320;
const LIMIT_HEIGHT = 184;

type Props = {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  maxWidth?: CSSProperties['maxWidth'];
  onClose?: () => void;
};

export function Dialog({
  children,
  width = 480,
  height,
  maxWidth = 'calc(100vw - 40px)',
  onClose,
}: PropsWithChildren<Props>) {
  const renderWidth = typeof width === 'number' ? Math.max(width, LIMIT_WIDTH) : width;
  const renderHeight = typeof height === 'number' ? Math.max(height, LIMIT_HEIGHT) : height;

  return (
    <DialogContext.Provider value={{ onClose }}>
      <div
        className="grid max-h-full grid-rows-[max-content_1fr_max-content] flex-col rounded-lg bg-uiBackground01 shadow-modalShadow"
        style={{ width: renderWidth, height: renderHeight, maxWidth }}
      >
        {children}
      </div>
    </DialogContext.Provider>
  );
}

Dialog.Body = DialogBody;
Dialog.Header = DialogHeader;
Dialog.Footer = DialogFooter;
