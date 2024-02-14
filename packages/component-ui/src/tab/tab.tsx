import type { ReactNode } from 'react';

import { TabItem } from './tab-item';

type Props = {
  children?: ReactNode;
};

export function Tab({ children }: Props) {
  return (
    <div
      role="tablist"
      className="relative flex gap-4 px-6 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-uiBorder01"
    >
      {children}
    </div>
  );
}

Tab.Item = TabItem;
