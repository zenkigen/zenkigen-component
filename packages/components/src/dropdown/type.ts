import { IconName } from '@zenkigen-component/icons';

export type DropdownItemType = {
  id: string;
  label: string;
  icon?: IconName;
  color?: 'gray' | 'red';
  onClick?: () => void;
};

export type DropdownVerticalPosition = 'top' | 'bottom';
export type DropdownHorizontalAlign = 'left' | 'center' | 'right';
