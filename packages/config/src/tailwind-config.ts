import { tokens } from './tokens/tokens';

module.exports = {
  theme: {
    extend: {
      colors: {
        ...tokens.user,
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
