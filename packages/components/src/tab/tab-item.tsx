import { ReactNode } from 'react';

import { typography } from '@zenkigen-component/theme';
import classNames from 'classnames';

type Props = {
  isSelected?: boolean;
  isDisabled?: boolean;
  children?: ReactNode;
  onClick?: () => void;
};

export const TabItem = (props: Props) => {
  const classes = classNames(
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
    'hover:before:bg-border-uiBorder02Dark',
    'disabled:text-disabled-disabled01',
    'disabled:pointer-events-none',
    {
      [`${typography.label.label2regular} text-interactive-interactive02`]: !props.isSelected,
      [`${typography.label.label2bold} before:bg-interactive-interactive01`]: props.isSelected,
    },
  );

  return (
    <button type="button" role="tab" aria-selected={props.isSelected} className={classes} disabled={props.isDisabled}>
      {props.children}
    </button>
  );
};
