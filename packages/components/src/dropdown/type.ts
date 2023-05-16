import { IconName } from '@zenkigen-component/icons';

export type DropdownItemType = {
  id: string;
  label: string;
  icon?: IconName;
  color?: 'gray' | 'red';
  onClick: () => void;
};

export type VerticalPosition = 'top' | 'bottom';
export type HorizontalAlign = 'left' | 'center' | 'right';
