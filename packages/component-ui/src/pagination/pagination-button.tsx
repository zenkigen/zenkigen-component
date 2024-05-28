import { clsx } from 'clsx';
import { useContext } from 'react';

import { PaginationContext } from './pagination-context';

type Props = {
  page: number;
  onClick: (value: number) => void;
};

export function PaginationButton({ page, onClick }: Props) {
  const { currentPage } = useContext(PaginationContext);

  const buttonClasses = clsx(
    'flex h-8 min-w-8 items-center justify-center rounded fill-icon01 px-1',
    'typography-label2regular',
    'text-interactive02',
    'hover:bg-hover02',
    { 'border border-uiBorder02': page === currentPage },
    { 'border-transparent': page !== currentPage },
  );

  return (
    <button type="button" className={buttonClasses} onClick={() => onClick(page)}>
      {page}
    </button>
  );
}
