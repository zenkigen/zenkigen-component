import { ReactNode } from 'react';

import { CreateTheme, ThemeContext } from '.';

type ThemeProviderProps = {
  theme: CreateTheme;
  children: ReactNode;
};

export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
