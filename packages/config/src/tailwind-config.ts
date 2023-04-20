import { tokens } from './tokens/tokens';

module.exports = {
  theme: {
    colors: {
      ...tokens.user,
      ...tokens.tokens,
      ...tokens.colors,
    },
    fontSize: tokens.fontSize,
    lineHeight: tokens.lineHeights,
  },
  plugins: [],
};
