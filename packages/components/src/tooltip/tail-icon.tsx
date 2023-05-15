import clsx from 'clsx';

type Props = {
  size: 'small' | 'medium';
  verticalPosition: 'top' | 'bottom';
  horizontalAlign: 'left' | 'center' | 'right';
};

export const TailIcon = (props: Props) => {
  const tailClasses = clsx(
    'absolute',
    props.verticalPosition === 'bottom' ? 'rotate-180' : 'rotate-0',
    props.verticalPosition === 'bottom'
      ? props.size === 'small'
        ? '-top-1'
        : '-top-2'
      : props.size === 'small'
      ? '-bottom-1'
      : '-bottom-2',
    props.horizontalAlign === 'right'
      ? props.size === 'small'
        ? 'right-2'
        : 'right-4'
      : props.horizontalAlign === 'left'
      ? props.size === 'small'
        ? 'left-2'
        : 'left-4'
      : props.size === 'small'
      ? 'left-2/4 -translate-x-1'
      : 'left-2/4 -translate-x-2',
    'fill-background-uiBackgroundTooltip',
  );

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
