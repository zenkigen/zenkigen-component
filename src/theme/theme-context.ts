import { createContext } from 'react';

import { createTheme } from './create-theme';
import type { CreateTheme } from './create-theme';

export const ThemeContext = createContext<CreateTheme>(createTheme());
