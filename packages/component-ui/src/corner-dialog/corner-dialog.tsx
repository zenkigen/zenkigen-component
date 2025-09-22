import type { CSSProperties, PropsWithChildren } from 'react';

import { CornerBox } from '../corner-box';
import { Dialog } from '../dialog';

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
      <Dialog width={renderWidth} height={renderHeight} maxWidth={maxWidth} onClose={onClose}>
        {children}
      </Dialog>
    </CornerBox>
  );
}

CornerDialog.Body = Dialog.Body;
CornerDialog.Header = Dialog.Header;
CornerDialog.Footer = Dialog.Footer;
