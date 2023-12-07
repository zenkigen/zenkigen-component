import clsx from 'clsx';

import { TooltipHorizontalAlign, TooltipSize, TooltipVerticalPosition } from './type';

type Props = {
  size: TooltipSize;
  verticalPosition: TooltipVerticalPosition;
  horizontalAlign: TooltipHorizontalAlign;
};

export const TailIcon = (props: Props) => {
  const tailClasses = clsx('absolute fill-background-uiBackgroundTooltip', {
    'rotate-180': props.verticalPosition === 'bottom',
    'rotate-0': props.verticalPosition !== 'bottom',
    '-top-1': props.verticalPosition === 'bottom' && props.size === 'small',
    '-top-2': props.verticalPosition === 'bottom' && props.size !== 'small',
    '-bottom-1': props.verticalPosition !== 'bottom' && props.size === 'small',
    '-bottom-2': props.verticalPosition !== 'bottom' && props.size !== 'small',
    'right-2': props.horizontalAlign === 'right' && props.size === 'small',
    'right-4': props.horizontalAlign === 'right' && props.size !== 'small',
    'left-2': props.horizontalAlign === 'left' && props.size === 'small',
    'left-4': props.horizontalAlign === 'left' && props.size !== 'small',
    'left-1/2 -translate-x-1': props.horizontalAlign === 'center' && props.size === 'small',
    'left-1/2 -translate-x-2': props.horizontalAlign === 'center' && props.size !== 'small',
  });

  if (props.size === 'small') {
    return (
      <svg className={tailClasses} width="8" height="4" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4L0 0H8L4 4Z" />
      </svg>
    );
  } else {
    return (
      <svg
        className={tailClasses}
        width="14"
        height="8"
        viewBox="0 0 14 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7 8L0 0H14L7 8Z" />
      </svg>
    );
  }
};
