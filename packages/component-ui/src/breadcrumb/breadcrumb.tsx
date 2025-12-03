import type { PropsWithChildren } from 'react';

import { BreadcrumbItem } from './breadcrumb-item';

export function Breadcrumb({ children }: PropsWithChildren) {
  return (
    <nav aria-label="breadcrumb">
      <ul className="typography-label14regular flex flex-wrap gap-2 whitespace-nowrap text-text01">{children}</ul>
    </nav>
  );
}

Breadcrumb.Item = BreadcrumbItem;
