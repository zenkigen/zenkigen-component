import { clsx } from 'clsx';
import { ReactNode } from 'react';

type Props = {
  id: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  children?: ReactNode;
  onClick: (id: string) => void;
};

export const TabItem = (props: Props) => {
  const classes = clsx(
    'relative z-0 flex py-2 leading-[24px] before:absolute before:inset-x-0 before:bottom-0 before:h-px hover:text-text-text01 disabled:pointer-events-none disabled:text-disabled-disabled01',
    {
      'typography-label2regular': !props.isSelected,
      'text-interactive-interactive02 hover:before:bg-border-uiBorder02Dark': !props.isSelected,
      'typography-label2bold': props.isSelected,
      'before:bg-interactive-interactive01 hover:before:bg-interactive-interactive01 pointer-events-none':
        props.isSelected,
    },
  );

  return (
    <button
      type="button"
      role="tab"
      aria-selected={props.isSelected}
      className={classes}
      disabled={props.isDisabled}
      onClick={() => props.onClick(props.id)}
    >
      {props.children}
    </button>
  );
};
