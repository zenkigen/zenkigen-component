import { typography } from '@zenkigen-inc/component-theme';
import plugin from 'tailwindcss/plugin';

import { tokens } from './tokens/tokens';

const {
  tokens: {
    text,
    link,
    border,
    background,
    icon,
    interactive,
    field,
    focus,
    hover,
    active,
    selected,
    disabled,
    support,
  },
  colors,
} = tokens;

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: "Arial, 'Noto Sans JP', sans-serif",
      },
      colors: {
        user: tokens.user,
        ...text,
        ...link,
        ...border,
        ...background,
        ...icon,
        ...interactive,
        ...field,
        ...focus,
        ...hover,
        ...active,
        ...selected,
        ...disabled,
        ...support,
        ...colors,
      },
      fontSize: tokens.fontSize,
      lineHeight: tokens.lineHeights,
      borderRadius: {
        button: '.25rem',
      },
      boxShadow: {
        modalShadow: tokens.shadow.modalShadow,
        floatingShadow: tokens.shadow.floatingShadow,
        layoutShadow: tokens.shadow.layoutShadow,
      },
      keyframes: {
        'circular-small-move': {
          '0%': {
            strokeDasharray: '1px, 100px',
            strokeDashoffset: '0px',
            transform: 'rotate(0deg)',
          },
          '50%': {
            strokeDasharray: '50px, 100px',
            strokeDashoffset: '-8px',
          },
          '100%': {
            strokeDasharray: '50px, 100px',
            strokeDashoffset: '-64px',
            transform: 'rotate(360deg)',
          },
        },
        'circular-medium-move': {
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
        'circular-large-move': {
          '0%': {
            strokeDasharray: '1px, 400px',
            strokeDashoffset: '0px',
            transform: 'rotate(0deg)',
          },
          '50%': {
            strokeDasharray: '200px, 400px',
            strokeDashoffset: '-30px',
          },
          '100%': {
            strokeDasharray: '200px, 400px',
            strokeDashoffset: '-250px',
            transform: 'rotate(360deg)',
          },
        },
        'toast-in': {
          from: {
            opacity: 0,
            transform: 'translate3d(-10%, 0, 0)',
          },
          to: {
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
          },
        },
        'toast-out': {
          from: {
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
          },
          to: {
            opacity: 0,
            transform: 'translate3d(-50%, 0, 0)',
          },
        },
      },
      animation: {
        'circular-small-move': 'circular-small-move 1.4s ease-in-out infinite',
        'circular-medium-move': 'circular-medium-move 1.4s ease-in-out infinite',
        'circular-large-move': 'circular-large-move 1.4s ease-in-out infinite',
        'toast-in': 'toast-in 0.25s cubic-bezier(.11, .57, .14, 1)',
        'toast-out': 'toast-out 0.25s cubic-bezier(0, .14, .75, 1)',
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
  plugins: [
    plugin(({ addComponents }) => {
      addComponents(
        Object.entries(typography).reduce(
          (acc, [, innerObj]) => (
            Object.entries(innerObj).forEach(
              ([innerKey, value]) => (acc[`.typography-${innerKey}`] = { [`@apply ${value}`]: {} }),
            ),
            acc
          ),
          // eslint-disable-next-line @typescript-eslint/ban-types
          {} as Record<string, Record<string, {}>>,
        ),
      );
    }),
  ],
};
