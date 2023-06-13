import { ReactNode } from 'react';

import { IconName } from '@zenkigen-component/icons';

export type DropdownItemType = {
  id: string;
  content: ReactNode;
  icon?: IconName;
  color?: 'gray' | 'red';
  onClick?: () => void;
};

export type DropdownVerticalPosition = 'top' | 'bottom';
export type DropdownHorizontalAlign = 'left' | 'center' | 'right';
