import type { CSSProperties, PropsWithChildren } from 'react';

import { CornerBox } from '../corner-box';
import { Popup } from '../popup';

const LIMIT_WIDTH = 320;
const LIMIT_HEIGHT = 184;

type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

type Props = {
  position: Corner;
  isShow: boolean;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  maxWidth?: CSSProperties['maxWidth'];
  onClose?: () => void;
};

export function CornerDialog({
  children,
  position,
  isShow,
  width = 480,
  height,
  maxWidth = 'calc(100vw - 40px)',
  onClose,
}: PropsWithChildren<Props>) {
  const renderWidth = typeof width === 'number' ? Math.max(width, LIMIT_WIDTH) : width;
  const renderHeight = typeof height === 'number' ? Math.max(height, LIMIT_HEIGHT) : height;

  return (
    <CornerBox position={position} isShow={isShow}>
      <Popup width={renderWidth} height={renderHeight} maxWidth={maxWidth} onClose={onClose}>
        {children}
      </Popup>
    </CornerBox>
  );
}

CornerDialog.Body = Popup.Body;
CornerDialog.Header = Popup.Header;
CornerDialog.Footer = Popup.Footer;
