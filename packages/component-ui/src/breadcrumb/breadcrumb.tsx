import type { ReactNode } from 'react';

import { BreadcrumbItem } from './breadcrumb-item';

type BreadcrumbProps = {
  /** パンくずとして表示する要素。通常は複数の Breadcrumb.Item を渡す。 */
  children: ReactNode;
};

export function Breadcrumb({ children }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb">
      <ul className="typography-label14regular flex flex-wrap gap-2 whitespace-nowrap text-text01">{children}</ul>
    </nav>
  );
}

Breadcrumb.Item = BreadcrumbItem;
