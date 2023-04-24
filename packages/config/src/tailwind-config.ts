import { tokens } from './tokens/tokens';

module.exports = {
  theme: {
    extend: {
      colors: {
        user: tokens.user,
        ...tokens.tokens,
        ...tokens.colors,
      },
      fontFamily: {
        helvetica: tokens.fontFamilies.helvetica,
      },
      fontSize: tokens.fontSize,
      lineHeight: tokens.lineHeights,
    },
  },
  plugins: [],
};
