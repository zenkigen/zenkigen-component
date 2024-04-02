import type { IconName } from '@zenkigen-inc/component-icons';

export type SelectOption = {
  id: string;
  value: string;
  label: string;
  icon?: IconName;
  selectedIconPosition?: 'left' | 'right';
} & (
  | { icon: IconName; selectedIconPosition?: never | 'right' }
  | { icon?: never; selectedIconPosition?: 'left' | 'right' }
);
