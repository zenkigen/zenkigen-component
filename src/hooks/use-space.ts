import { useCallback } from 'react';

import { useTheme } from './use-theme';

export const useSpace = () => {
  const theme = useTheme();

  const space = useCallback(
    (space: number) => {
      return `${theme.spaceDimension * space}px`;
    },
    [theme.spaceDimension],
  );

  return space;
};
