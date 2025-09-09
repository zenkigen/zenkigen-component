import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { Children } from 'react';

import { TabItem } from './tab-item';

type Props = {
  children?: ReactNode;
  layout?: 'auto' | 'equal';
};

export function Tab({ children, layout = 'auto' }: Props) {
  const childrenCount = Children.count(children);
  const containerStyle = layout === 'equal' ? { gridTemplateColumns: `repeat(${childrenCount}, minmax(0,1fr))` } : {};

  const containerClasses = clsx(
    'relative px-6 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-uiBorder01',
    {
      'flex gap-4': layout === 'auto',
      'grid gap-4': layout === 'equal',
    },
  );

  return (
    <div role="tablist" className={containerClasses} style={containerStyle}>
      {children}
    </div>
  );
}

Tab.Item = TabItem;
