import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { IconButton } from '../icon-button';

import { PaginationButton } from './pagination-button';
import { PaginationContext } from './pagination-context';

const startPageNo = 1;

type Props = {
  current: number;
  total: number;
} & {
  onClick?: (value: number) => void;
};

export function Pagination({ total, current, onClick }: Props) {
  const classes = clsx('flex', 'gap-2');

  const [pageNumberList, setPageNumberList] = useState<Array<number>>([]);

  const computePaginationList = (count: number, maxPageNumber: number, currentPageNumber: number) => {
    const halfWindowSize = Math.floor(count / 2);
    let startPage = currentPageNumber - halfWindowSize;
    let endPage = currentPageNumber + halfWindowSize;

    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }
    if (endPage > maxPageNumber) {
      startPage -= endPage - maxPageNumber;
      endPage = maxPageNumber;
    }

    const pageList: Array<number> = [];
    for (let i = startPage; i <= endPage; i++) {
      pageList.push(i);
    }
    return pageList;
  };

  useEffect(() => {
    const pageNumberList = computePaginationList(7, total, current);
    setPageNumberList(pageNumberList);
  }, [current, total]);

  return (
    <PaginationContext.Provider
      value={{
        current,
      }}
    >
      <ul className={classes}>
        <li>
          <IconButton
            isDisabled={current === startPageNo}
            variant="text"
            icon="angle-left"
            size="medium"
            onClick={() => onClick && onClick(current - 1)}
          />
        </li>
        {pageNumberList &&
          pageNumberList.map((pageNo: number, index: number) => (
            <li key={index}>
              <PaginationButton onClick={() => onClick && onClick(pageNo)} pageNumber={pageNo} />
            </li>
          ))}
        <li>
          <IconButton
            isDisabled={current === total}
            variant="text"
            icon="angle-right"
            size="medium"
            onClick={() => onClick && onClick(current + 1)}
          />
        </li>
      </ul>
    </PaginationContext.Provider>
  );
}
