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
      // TODO: tokens.jsonでShadow系トークンが定義されるまでの暫定的対応
      boxShadow: {
        menu: '0 0 10px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
