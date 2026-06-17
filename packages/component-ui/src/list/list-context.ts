import { createContext, useContext } from 'react';

import type { ListSelectionIndicator, ListSize, ListVariant } from './list.types';

type ListContextValue = {
  size: ListSize;
  variant: ListVariant;
  selectionIndicator: ListSelectionIndicator;
};

const ListContext = createContext<ListContextValue | null>(null);

export const ListContextProvider = ListContext.Provider;

export function useListContext(componentName: string): ListContextValue {
  const ctx = useContext(ListContext);
  if (ctx === null) {
    throw new Error(`<${componentName}> must be used inside <List>`);
  }

  return ctx;
}
