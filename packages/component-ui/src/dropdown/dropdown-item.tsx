import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import type { MouseEvent, PropsWithChildren } from 'react';
import { useContext } from 'react';

import { DropdownContext } from './dropdown-context';

/** Dropdown.Item コンポーネントのプロパティ */
type Props = {
  /** 項目の配色。red は破壊的アクションに用いる。 */
  color?: 'gray' | 'red';
  /** 項目をクリックしたときに呼び出されるハンドラ。 */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export function DropdownItem({ children, color = 'gray', onClick }: PropsWithChildren<Props>) {
  const { setIsVisible } = useContext(DropdownContext);
  const handleClickItem = (event: MouseEvent<HTMLButtonElement>) => {
    setIsVisible(false);
    onClick?.(event);
  };
  const itemClasses = clsx(
    'typography-label14regular flex h-8 w-full items-center px-3 hover:bg-hover02 active:bg-active02',
    focusVisible.inset,
    {
      'bg-uiBackground01 fill-icon01 text-interactive02': color === 'gray',
      'fill-supportDanger text-supportDanger': color === 'red',
    },
  );

  return (
    <li className="flex w-full items-center">
      <button className={itemClasses} type="button" onClick={handleClickItem}>
        {children}
      </button>
    </li>
  );
}
