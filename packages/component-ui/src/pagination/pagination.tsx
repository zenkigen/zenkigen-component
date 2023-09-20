import { useMemo } from 'react';

import clsx from 'clsx';

import { IconButton } from '../icon-button';

import { PaginationButton } from './pagination-button';
import { PaginationContext } from './pagination-context';

const startPageNo = 1;

type Props = {
  count: number;
  current: number;
  total: number;
  onClick?: (value: number) => void;
};

export function Pagination({ count, current, total, onClick }: Props) {
  const pageNumberList = useMemo(() => {
    let center = Math.max(current, startPageNo + 1);
    center = Math.min(center, total - 1);

    const half = Math.floor(count / 2);

    const start = Math.max(center - half, startPageNo + 1);
    const end = Math.min(center + half, total - 1);

    const offsetStart = center + half >= total ? total - center - half : 0;
    const offsetEnd = center <= half ? half - center + 1 : 0;

    const result: Array<number> = [];
    for (let i = start + offsetStart; i <= end + offsetEnd; i++) {
      result.push(i);
    }
    return result;
  }, [count, current, total]);

  const handleDot = (type: 'left' | 'right') => {
    if (!pageNumberList) return;
    if (!pageNumberList.length) return;
    if (type === 'left') {
      const pageNum = pageNumberList[0];
      pageNum && onClick && onClick(pageNum - 1);
    } else {
      const pageNum = pageNumberList[pageNumberList.length - 1];
      pageNum && onClick && onClick(pageNum + 1);
    }
  };

  const classes = clsx('flex', 'gap-2');

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
        <li>
          <PaginationButton onClick={() => onClick && onClick(startPageNo)} pageNumber={startPageNo} />
        </li>
        {pageNumberList && pageNumberList.length !== 0 && pageNumberList[0] !== 2 && (
          <li>
            <IconButton variant="text" icon="more" size="medium" onClick={() => handleDot('left')} />
          </li>
        )}
        {pageNumberList &&
          pageNumberList.map((pageNo: number, index: number) => (
            <li key={index}>
              <PaginationButton onClick={() => onClick && onClick(pageNo)} pageNumber={pageNo} />
            </li>
          ))}
        {pageNumberList && pageNumberList.length !== 0 && pageNumberList[pageNumberList.length - 1] !== total - 1 && (
          <li>
            <IconButton variant="text" icon="more" size="medium" onClick={() => handleDot('right')} />
          </li>
        )}
        <li>
          <PaginationButton onClick={() => onClick && onClick(total)} pageNumber={total} />
        </li>
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
