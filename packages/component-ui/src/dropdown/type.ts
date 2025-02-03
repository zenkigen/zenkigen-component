import type { ReactNode } from 'react';

export type DropdownItemType = {
  id: string;
  content: ReactNode;
  color?: 'gray' | 'red';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export type DropdownVerticalPosition = 'top' | 'bottom';
export type DropdownHorizontalAlign = 'left' | 'center' | 'right';
