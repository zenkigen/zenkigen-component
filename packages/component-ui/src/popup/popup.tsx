import type { CSSProperties, PropsWithChildren } from 'react';

import { PopupBody } from './popup-body';
import { PopupContext } from './popup-context';
import { PopupFooter } from './popup-footer';
import { PopupHeader } from './popup-header';

const LIMIT_WIDTH = 320;
const LIMIT_HEIGHT = 184;

type Props = {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  maxWidth?: CSSProperties['maxWidth'];
  onClose?: () => void;
};

export function Popup({
  children,
  width = 480,
  height,
  maxWidth = 'calc(100vw - 40px)',
  onClose,
}: PropsWithChildren<Props>) {
  const renderWidth = typeof width === 'number' ? Math.max(width, LIMIT_WIDTH) : width;
  const renderHeight = typeof height === 'number' ? Math.max(height, LIMIT_HEIGHT) : height;

  return (
    <PopupContext.Provider value={{ onClose }}>
      <div
        className="grid max-h-full grid-rows-[max-content_1fr_max-content] flex-col rounded-lg bg-uiBackground01 shadow-modalShadow"
        style={{ width: renderWidth, height: renderHeight, maxWidth }}
      >
        {children}
      </div>
    </PopupContext.Provider>
  );
}

Popup.Body = PopupBody;
Popup.Header = PopupHeader;
Popup.Footer = PopupFooter;
