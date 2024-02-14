import type { CSSProperties } from 'react';

export type TooltipSize = 'small' | 'medium';
export type TooltipVerticalPosition = 'top' | 'bottom';
export type TooltipHorizontalAlign = 'left' | 'center' | 'right';
export type TooltipPosition = {
  maxWidth: CSSProperties['width'];
  width: string;
  left: string;
  top: string;
  bottom: string;
  translateX: string;
  translateY: string;
};
