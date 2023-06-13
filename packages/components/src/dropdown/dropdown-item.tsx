import { focusVisible, typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

import type { DropdownItemType } from './type';

type Props = {
  item: DropdownItemType;
  onClickItem: () => void;
};

export function DropdownItem({ item, onClickItem }: Props) {
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
      'bg-background-uiBackground01 fill-icon-icon01 text-interactive-interactive02': item.color === 'gray',
      'fill-support-supportDanger text-support-supportDanger': item.color === 'red',
    },
  );

  return (
    <li className={listItemClasses} key={item.id} onClick={onClickItem}>
      <button className={itemClasses} type="button">
        <div>{item.content}</div>
      </button>
    </li>
  );
}
