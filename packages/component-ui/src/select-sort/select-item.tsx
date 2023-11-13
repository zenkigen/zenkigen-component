import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { Icon } from '../icon';

type Props = {
  isSortKey: boolean;
  onClickItem: () => void;
};

export function SelectItem({ children, isSortKey, onClickItem }: PropsWithChildren<Props>) {
  const listItemClasses = clsx('flex w-full items-center');

  const itemClasses = clsx(
    'typography-label2regular flex h-8 w-full items-center px-3 hover:bg-hover-hover02 active:bg-active-active02',
    focusVisible.inset,
    {
      'bg-selected-selectedUi fill-interactive-interactive01 text-interactive-interactive01': isSortKey,
      'bg-background-uiBackground01 fill-icon-icon01 text-interactive-interactive02': !isSortKey,
    },
  );

  return (
    <li className={listItemClasses} onClick={onClickItem}>
      <button className={itemClasses} type="button">
        <span className="ml-1 mr-6">{children}</span>
        {isSortKey && (
          <div className="ml-auto flex items-center">
            <Icon name="check" size="small" />
          </div>
        )}
      </button>
    </li>
  );
}
