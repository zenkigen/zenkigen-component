import { useContext } from 'react';

import { Button } from '../button';

import { PaginationContext } from './pagination-context';

type Props = {
  pageNumber: number;
} & {
  onClick?: (value: number) => void;
};

export function PaginationButton({ pageNumber, onClick }: Props) {
  const { current } = useContext(PaginationContext);

  return (
    <Button variant={pageNumber === current ? 'outline' : 'text'} onClick={() => onClick && onClick(pageNumber)}>
      {pageNumber}
    </Button>
  );
}
