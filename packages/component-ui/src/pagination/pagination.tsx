import { IconButton } from '../icon-button';

import { PaginationButton } from './pagination-button';
import { PaginationContext } from './pagination-context';

const startPageNo = 1;

type Props = {
  /** 現在のページ番号 */
  current: number;
  /** トータルのページ数 */
  total: number;
  /** 現在のページ番号を中心としたときの、左右のページボタン数 */
  sideNumPagesToShow?: number;
  /** ボタンが押されたときのイベントハンドラ */
  onClick?: (value: number) => void;
};

export function Pagination({ current, total, sideNumPagesToShow = 3, onClick }: Props) {
  const pageNumberList = (() => {
    let center = Math.max(current, startPageNo + 1);
    center = Math.min(center, total - 1);

    const start = Math.max(center - sideNumPagesToShow, startPageNo + 1);
    const end = Math.min(center + sideNumPagesToShow, total - 1);

    const offsetStart = center + sideNumPagesToShow >= total ? total - center - sideNumPagesToShow : 0;
    const offsetEnd = center <= sideNumPagesToShow ? sideNumPagesToShow - center + 1 : 0;

    const result: Array<number> = [];
    for (let i = start + offsetStart; i <= end + offsetEnd; i++) {
      result.push(i);
    }
    return result;
  })();

  const handleClickDot = (type: 'left' | 'right') => {
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

  const classes = 'flex gap-2';

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
            <IconButton variant="text" icon="more" size="medium" onClick={() => handleClickDot('left')} />
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
            <IconButton variant="text" icon="more" size="medium" onClick={() => handleClickDot('right')} />
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
