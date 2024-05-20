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
  let center = Math.max(currentPage, START_PAGE + 1);
  center = Math.min(center, totalPage - 1);

  const start = Math.max(center - sideNumPagesToShow, START_PAGE + 1);
  const end = Math.min(center + sideNumPagesToShow, totalPage - 1);
  const offsetStart = center + sideNumPagesToShow >= totalPage ? totalPage - center - sideNumPagesToShow : 0;
  const offsetEnd = center <= sideNumPagesToShow ? sideNumPagesToShow - center + 1 : 0;

  const pageList: Array<number> = [];
  for (let i = start + offsetStart; i <= end + offsetEnd; i++) {
    pageList.push(i);
  }

  const threeDotIconClasses = 'flex h-8 w-8 items-center justify-center gap-1 fill-icon01';

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
      }}
    >
      <ul className="flex gap-1">
        <li>
          <IconButton
            isDisabled={currentPage === START_PAGE}
            variant="text"
            icon="angle-left"
            size="medium"
            onClick={() => onClick(currentPage - 1)}
          />
        </li>
        <li>
          <PaginationButton onClick={() => onClick(START_PAGE)} page={START_PAGE} />
        </li>
        {pageList.length !== 0 && pageList[0] !== 2 && (
          <li className={threeDotIconClasses}>
            <Icon name="more" size="small" />
          </li>
        )}
        {pageList.map((page: number, index: number) => (
          <li key={index}>
            <PaginationButton onClick={() => onClick(page)} page={page} />
          </li>
        ))}
        {pageList.length !== 0 && pageList[pageList.length - 1] !== totalPage - 1 && (
          <li className={threeDotIconClasses}>
            <Icon name="more" size="small" />
          </li>
        )}
        <li>
          <PaginationButton onClick={() => onClick(totalPage)} page={totalPage} />
        </li>
        <li>
          <IconButton
            isDisabled={currentPage === totalPage}
            variant="text"
            icon="angle-right"
            size="medium"
            onClick={() => onClick(currentPage + 1)}
          />
        </li>
      </ul>
    </PaginationContext.Provider>
  );
}
