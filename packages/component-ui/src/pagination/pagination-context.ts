import { createContext } from 'react';

type PaginationContextType = {
  /** 現在のページ番号 */
  currentPage: number;
};

export const PaginationContext = createContext<PaginationContextType>({
  currentPage: 0,
});
