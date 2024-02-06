import { CSSProperties, useCallback } from 'react';

import { TooltipHorizontalAlign, TooltipPosition, TooltipSize, TooltipVerticalPosition } from './type';

export const useTooltip = () => {
  const calculatePosition = useCallback(
    (args: {
      dimensions: DOMRect;
      maxWidth?: CSSProperties['width'];
      verticalPosition: TooltipVerticalPosition;
      horizontalAlign: TooltipHorizontalAlign;
      tooltipSize: TooltipSize;
    }) => {
      const result: TooltipPosition = {
        maxWidth: 'none',
        width: 'auto',
        left: '0px',
        top: '0px',
        bottom: '0px',
        translateX: '0',
        translateY: '0',
      };
      result.maxWidth = args.maxWidth ?? 'none';

      const offsetH = args.tooltipSize === 'small' ? 11 : 22;
      const targetHorizontalCenter = args.dimensions.right - (args.dimensions.right - args.dimensions.left) / 2;
      const targetLeft = args.dimensions.left;
      const targetRight = args.dimensions.right;
      const targetWidth = args.dimensions.width;

      switch (args.horizontalAlign) {
        case 'center':
          result.left = `${targetHorizontalCenter}px`;
          result.translateX = '-50%';
          break;
        case 'left':
          result.left = `${targetLeft - offsetH}px`;
          result.translateX = `${targetWidth / 2}px`;
          break;
        case 'right':
          result.left = `${targetRight + offsetH}px`;
          result.translateX = `-${targetWidth / 2}px`;
          break;
      }

      switch (args.verticalPosition) {
        case 'bottom':
          result.top = `${args.dimensions.top + args.dimensions.height + window.scrollY}px`;
          result.bottom = 'unset';
          break;
        case 'top':
          result.top = `${args.dimensions.top + window.scrollY}px`;
          result.bottom = 'unset';
          result.translateY = '-100%';
          break;
      }

      return result;
    },
    [],
  );

  return {
    calculatePosition,
  };
};
