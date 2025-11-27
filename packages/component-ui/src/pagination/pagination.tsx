import { Icon } from '../icon';
import { IconButton } from '../icon-button';
import { PaginationButton } from './pagination-button';
import { PaginationContext } from './pagination-context';

const START_PAGE = 1;

type Props = {
  /** 現在のページ番号 */
  currentPage: number;
  /** トータルのページ数 */
  totalPage: number;
  /** 現在のページ番号を中心としたときの、左右のページボタン数 */
  sideNumPagesToShow?: number;
  /** ボタンが押されたときのイベントハンドラ */
  onClick: (value: number) => void;
};

export function Pagination({ currentPage, totalPage, sideNumPagesToShow = 3, onClick }: Props) {
  if (totalPage < START_PAGE) {
    return null;
  }

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
  const clampedCurrentPage = clamp(currentPage, START_PAGE, totalPage);
  const maxSideNumPagesToShow = Math.max(0, totalPage - 2);
  const side = clamp(sideNumPagesToShow, 0, maxSideNumPagesToShow);

  const minPage = START_PAGE + 1;
  const maxPage = totalPage - 1;
  const availablePagesCount = Math.max(0, maxPage - minPage + 1);
  const hasBothSides = clampedCurrentPage > START_PAGE && clampedCurrentPage < totalPage;
  const windowSize = Math.min(availablePagesCount, hasBothSides ? side * 2 + 1 : side * 2);

  let start = minPage;
  if (windowSize > 0) {
    if (hasBothSides) {
      start = Math.max(minPage, Math.min(clampedCurrentPage - side, maxPage - windowSize + 1));
    } else if (clampedCurrentPage === totalPage) {
      start = Math.max(minPage, maxPage - windowSize + 1);
    }
  }

  const end = windowSize === 0 ? minPage - 1 : Math.min(maxPage, start + windowSize - 1);

  const pageList: Array<number> = [];
  for (let i = start; i <= end; i++) {
    pageList.push(i);
  }

  const threeDotIconClasses = 'flex h-8 w-8 items-center justify-center gap-1 fill-icon01';
  const isFirstPage = clampedCurrentPage === START_PAGE;
  const isLastPage = clampedCurrentPage === totalPage;
  const firstPageInList = pageList.at(0) ?? null;
  const lastPageInList = pageList.at(-1) ?? null;
  const hasHeadEllipsis = firstPageInList !== null && firstPageInList > START_PAGE + 1;
  const hasTailEllipsis = lastPageInList !== null && lastPageInList < totalPage - 1;
  const hasLastPageButton = totalPage > START_PAGE;

  return (
    <PaginationContext.Provider
      value={{
        currentPage: clampedCurrentPage,
      }}
    >
      <ul className="flex gap-1">
        <li className="flex items-center">
          <IconButton
            isDisabled={isFirstPage}
            variant="text"
            icon="angle-left"
            size="small"
            onClick={() => onClick(Math.max(START_PAGE, clampedCurrentPage - 1))}
          />
        </li>
        <li>
          <PaginationButton onClick={() => onClick(START_PAGE)} page={START_PAGE} />
        </li>
        {hasHeadEllipsis && (
          <li className={threeDotIconClasses}>
            <Icon name="more" size="small" />
          </li>
        )}
        {pageList.map((page: number, index: number) => (
          <li key={index}>
            <PaginationButton onClick={() => onClick(page)} page={page} />
          </li>
        ))}
        {hasTailEllipsis && (
          <li className={threeDotIconClasses}>
            <Icon name="more" size="small" />
          </li>
        )}
        {hasLastPageButton && (
          <li>
            <PaginationButton onClick={() => onClick(totalPage)} page={totalPage} />
          </li>
        )}
        <li className="flex items-center">
          <IconButton
            isDisabled={isLastPage}
            variant="text"
            icon="angle-right"
            size="small"
            onClick={() => onClick(Math.min(totalPage, clampedCurrentPage + 1))}
          />
        </li>
      </ul>
    </PaginationContext.Provider>
  );
}
