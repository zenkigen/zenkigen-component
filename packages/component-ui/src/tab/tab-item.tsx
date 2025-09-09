import { clsx } from 'clsx';
import type { ReactNode } from 'react';

type Props = {
  id: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  children?: ReactNode;
  onClick: (id: string) => void;
};

export const TabItem = ({ isSelected = false, ...props }: Props) => {
  const classes = clsx(
    'relative z-0 flex justify-center py-2 leading-[24px] before:absolute before:inset-x-0 before:bottom-0 before:h-px hover:text-text01 disabled:pointer-events-none disabled:text-disabled01',
    {
      'typography-label14regular': !isSelected,
      'text-interactive02 hover:before:bg-uiBorder04': !isSelected,
      'typography-label14bold': isSelected,
      'before:bg-interactive01 hover:before:bg-interactive01 pointer-events-none': isSelected,
    },
  );

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      className={classes}
      disabled={props.isDisabled}
      onClick={() => props.onClick(props.id)}
    >
      {props.children}
    </button>
  );
};
