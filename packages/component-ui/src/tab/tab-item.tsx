import type { IconName } from '@zenkigen-inc/component-icons';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

import { Icon } from '../icon';

type Props = {
  id: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  icon?: IconName;
  children?: ReactNode;
  onClick: (id: string) => void;
};

export const TabItem = ({ isSelected = false, isDisabled = false, icon, ...props }: Props) => {
  const classes = clsx(
    'group relative z-0 flex items-center justify-center gap-1 py-2 leading-[24px] before:absolute before:inset-x-0 before:bottom-0 before:h-[2px] hover:text-interactive01 disabled:pointer-events-none disabled:text-disabled01',
    {
      'typography-label14regular text-interactive02': !isSelected,
      'typography-label14bold text-interactive01': isSelected,
      'before:bg-interactive01 hover:before:bg-interactive01 pointer-events-none': isSelected,
    },
  );

  const iconWrapperClasses = clsx('flex shrink-0 items-center', {
    'fill-disabled01': isDisabled,
    'fill-interactive01': !isDisabled && isSelected,
    'fill-icon01 group-hover:fill-interactive01': !isDisabled && !isSelected,
  });

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      className={classes}
      disabled={isDisabled}
      onClick={() => props.onClick(props.id)}
    >
      {icon != null && (
        <span className={iconWrapperClasses}>
          <Icon name={icon} size="small" />
        </span>
      )}
      {props.children}
    </button>
  );
};
