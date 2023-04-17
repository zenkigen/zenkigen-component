import { tokens } from '../tokens';

export type CreateTheme = {
  spaceDimension: number;
  space: (space: number) => string;
} & typeof tokens;

export const createTheme = (theme: { space?: number } = {}): CreateTheme => {
  return {
    spaceDimension: theme.space || 4,
    space: (space: number) => `${(theme.space || 4) * space}px`,
    ...tokens,
  };
};
