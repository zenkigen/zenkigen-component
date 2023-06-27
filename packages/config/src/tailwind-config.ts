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
      boxShadow: {
        modalShadow: tokens.shadow.modalShadow,
        floatingShadow: tokens.shadow.floatingShadow,
        layoutShadow: tokens.shadow.layoutShadow,
      },
      keyframes: {
        'circular-move': {
          '0%': {
            strokeDasharray: '1px, 200px',
            strokeDashoffset: '0px',
            transform: 'rotate(0deg)',
          },
          '50%': {
            strokeDasharray: '100px, 200px',
            strokeDashoffset: '-15px',
          },
          '100%': {
            strokeDasharray: '100px, 200px',
            strokeDashoffset: '-125px',
            transform: 'rotate(360deg)',
          },
        },
      },
      animation: {
        'circular-move': 'circular-move 1.4s ease-in-out infinite',
      },
      zIndex: {
        hide: -1,
        auto: 'auto',
        base: 0,
        badge: 10,
        header: 100,
        dropdown: 300,
        popover: 500,
        overlay: 1000,
        modal: 1100,
        preloader: 1200,
        toast: 1300,
        tooltip: 1400,
      },
    },
  },
  plugins: [],
};
