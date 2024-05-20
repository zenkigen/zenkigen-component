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
    'hover:bg-hover02',
    { 'border border-uiBorder02 text-text01': page === currentPage },
    { 'border-transparent text-interactive02': page !== currentPage },
  );

  return (
    <button type="button" className={buttonClasses} onClick={() => onClick(page)}>
      {page}
    </button>
  );
}
