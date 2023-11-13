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
    'relative',
    'flex',
    'z-0',
    'py-2',
    'leading-[24px]',
    'before:h-px',
    'before:absolute',
    'before:left-0',
    'before:right-0',
    'before:bottom-0',
    'hover:text-text-text01',
    'disabled:text-disabled-disabled01',
    'disabled:pointer-events-none',
    {
      ['typography-label2regular']: !props.isSelected,
      ['text-interactive-interactive02 hover:before:bg-border-uiBorder02Dark']: !props.isSelected,
      ['typography-label2bold']: props.isSelected,
      ['before:bg-interactive-interactive01 hover:before:bg-interactive-interactive01 pointer-events-none']:
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
