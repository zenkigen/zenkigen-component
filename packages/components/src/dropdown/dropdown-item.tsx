import { MouseEvent, ReactNode, useContext } from 'react';

import { focusVisible, typography } from '@zenkigen/theme';
import clsx from 'clsx';

import { DropdownContext } from './dropdown-context';

type Props = {
  children: ReactNode;
  color?: 'gray' | 'red';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export function DropdownItem({ children, color = 'gray', onClick }: Props) {
  const { setIsVisible } = useContext(DropdownContext);
  const handleClickItem = (event: MouseEvent<HTMLButtonElement>) => {
    setIsVisible(false);
    onClick && onClick(event);
  };
  const listItemClasses = clsx('flex w-full items-center');
  const itemClasses = clsx(
    'flex',
    'items-center',
    'w-full',
    'h-8',
    'px-3',
    'hover:bg-hover-hover02',
    'active:bg-active-active02',
    focusVisible.inset,
    typography.label.label2regular,
    {
      'bg-background-uiBackground01 fill-icon-icon01 text-interactive-interactive02': color === 'gray',
      'fill-support-supportDanger text-support-supportDanger': color === 'red',
    },
  );

  return (
    <li className={listItemClasses}>
      <button className={itemClasses} type="button" onClick={handleClickItem}>
        {children}
      </button>
    </li>
  );
}
