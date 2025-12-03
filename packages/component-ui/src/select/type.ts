import type { IconName } from '@zenkigen-inc/component-icons';

export type SelectOption = {
  id: string;
  value: string;
  label: string;
  icon?: IconName;
};
