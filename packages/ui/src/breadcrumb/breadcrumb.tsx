import { ReactNode } from 'react';

import { typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

import { BreadcrumbItem } from './breadcrumb-item';

type Props = {
  children: ReactNode[];
};

export const Breadcrumb = ({ children }: Props) => {
  return (
    <nav aria-label="breadcrumb">
      <ul className={clsx(typography.label.label2regular, 'flex flex-wrap gap-2 whitespace-nowrap')}>
        {children.map((child, i) => {
          return (
            <BreadcrumbItem key={i} isLast={i === children.length - 1}>
              {child}
            </BreadcrumbItem>
          );
        })}
      </ul>
    </nav>
  );
};
