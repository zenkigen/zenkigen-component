import { createContext } from 'react';

import { CreateTheme, createTheme } from '.';

export const ThemeContext = createContext<CreateTheme>(createTheme());
