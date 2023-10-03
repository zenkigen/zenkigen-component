import { createContext } from 'react';

type PaginationContextType = {
  /** 現在のページ番号 */
  current: number;
};

export const PaginationContext = createContext<PaginationContextType>({
  current: 0,
});
