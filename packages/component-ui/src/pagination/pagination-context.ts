import { createContext } from 'react';

type PaginationContextType = {
  current: number;
};

export const PaginationContext = createContext<PaginationContextType>({
  current: 0,
});
