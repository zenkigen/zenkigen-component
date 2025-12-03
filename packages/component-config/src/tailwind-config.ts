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

export const tailwindConfig = {
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
  safelist: [
    // buttonColors の全クラスを明示的にリストアップ
    'border-interactive01',
    'bg-interactive01',
    'text-textOnColor',
    'fill-textOnColor',
    'hover:bg-hover01',
    'hover:border-hover01',
    'active:bg-active01',
    'active:border-active01',
    'disabled:bg-disabled01',
    'disabled:border-disabled01',
    'bg-selectedUi',
    'text-interactive01',
    'fill-interactive01',
    'border-supportDanger',
    'bg-supportDanger',
    'hover:bg-hoverDanger',
    'hover:border-hoverDanger',
    'active:bg-activeDanger',
    'active:border-activeDanger',
    'bg-supportDangerLight',
    'text-supportDanger',
    'border-uiBorder02',
    'bg-uiBackground01',
    'text-interactive02',
    'fill-interactive02',
    'hover:bg-hover02',
    'active:bg-active02',
    'disabled:border-uiBorder01',
    'disabled:text-disabled01',
    'disabled:fill-disabled01',
    'border-transparent',
    'hover:border-hover02',
    'active:border-active02',
    'disabled:text-disabled01',
    'disabled:fill-disabled01',
    'active:bg-red-red20',
    // tagColors
    'text-textOnColor',
    'bg-supportError',
    'bg-supportSuccess',
    'bg-supportWarning',
    'bg-supportDanger',
    'bg-user-red',
    'bg-user-pink',
    'bg-user-purple',
    'bg-user-turquoise',
    'bg-user-royalBlue',
    'bg-user-blue',
    'bg-user-aquamarine',
    'bg-user-yellowGreen',
    'bg-user-yellow',
    'bg-user-orange',
    'bg-supportInfo',
    'text-text01',
    'bg-supportErrorLight',
    'bg-supportSuccessLight',
    'bg-supportWarningLight',
    'bg-supportDangerLight',
    'bg-user-redLight',
    'bg-user-pinkLight',
    'bg-user-purpleLight',
    'bg-user-turquoiseLight',
    'bg-user-royalBlueLight',
    'bg-user-blueLight',
    'bg-user-aquamarineLight',
    'bg-user-yellowGreenLight',
    'bg-user-yellowLight',
    'bg-user-orangeLight',
    'bg-supportInfoLight',
    // selectColors
    'border-uiBorder02',
    'bg-uiBackground01',
    'text-interactive02',
    'fill-interactive02',
    'hover:bg-hover02',
    'active:bg-active02',
    'disabled:border-uiBorder01',
    'disabled:text-disabled01',
    'disabled:fill-disabled01',
    'border-interactive01',
    'bg-selectedUi',
    'text-interactive01',
    'fill-interactive01',
    'border-transparent',
    'border-supportError',
    'bg-uiBackgroundError',
    'text-supportError',
    'fill-supportError',
    // iconColors
    'fill-icon01',
    'fill-icon02',
    'fill-icon03',
    'fill-iconOnColor',
    // userColors (Avatar用)
    'bg-user-red',
    'bg-user-pink',
    'bg-user-purple',
    'bg-user-turquoise',
    'bg-user-royalBlue',
    'bg-user-blue',
    'bg-user-aquamarine',
    'bg-user-yellowGreen',
    'bg-user-yellow',
    'bg-user-orange',
  ],
  plugins: [
    plugin(({ addUtilities, addComponents }) => {
      addUtilities({
        '.field-sizing-content': {
          fieldSizing: 'content',
        },
      });
      addComponents(
        Object.entries(typography).reduce(
          (acc, [, innerObj]) => (
            Object.entries(innerObj).forEach(
              ([innerKey, value]) => (acc[`.typography-${innerKey}`] = { [`@apply ${value}`]: {} }),
            ),
            acc
          ),
          // eslint-disable-next-line @typescript-eslint/no-empty-object-type
          {} as Record<string, Record<string, {}>>,
        ),
      );
    }),
  ],
};
