import { useContext } from 'react';

import { Button } from '../button';

import { PaginationContext } from './pagination-context';

type Props = {
  page: number;
} & {
  onClick: (value: number) => void;
};

export function PaginationButton({ page, onClick }: Props) {
  const { currentPage } = useContext(PaginationContext);

  return (
    <Button variant={page === currentPage ? 'outline' : 'text'} onClick={() => onClick(page)}>
      {page}
    </Button>
  );
}
