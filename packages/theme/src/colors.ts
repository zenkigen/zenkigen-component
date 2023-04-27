export const userColors = [
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
] as const;

export const buttonColors = {
  fill: {
    base: 'border border-interactive-interactive01 bg-interactive-interactive01 text-text-textOnColor fill-text-textOnColor',
    hover: 'hover:bg-hover-hover01 hover:border-hover-hover01',
    active: 'active:bg-active-active01 active:border-active-active01',
    disabled: 'disabled:bg-disabled-disabled01 disabled:border-disabled-disabled01',
  },
  outline: {
    base: 'border border-border-uiBorder02 text-interactive-interactive02 fill-interactive-interactive02',
    hover: 'hover:bg-hover-hover02',
    active: 'active:bg-active-active02',
    disabled: 'disabled:border-border-uiBorder01 disabled:text-disabled-disabled01 disabled:fill-disabled-disabled01',
  },
  text: {
    base: 'border border-transparent text-interactive-interactive02 fill-interactive-interactive02',
    hover: 'hover:bg-hover-hover02 hover:border-hover-hover02',
    active: 'active:bg-active-active02 active:border-active-active02',
    disabled: 'disabled:text-disabled-disabled01 disabled:fill-disabled-disabled01',
  },
} as const;

export const focusVisible =
  'focus-visible:outline focus-visible:outline-1 focus-visible:outline-focus-focus focus-visible:outline-offset-[-1px]';

export const iconColors = {
  icon01: 'fill-icon-icon01',
  icon01Dark: 'fill-icon-icon01Dark',
  icon02: 'fill-icon-icon02',
  icon02Dark: 'fill-icon-icon02Dark',
  icon03: 'fill-icon-icon03',
  icon03Dark: 'fill-icon-icon03Dark',
  iconOnColor: 'fill-icon-iconOnColor',
  interactive01: 'fill-interactive-interactive01',
  disabled01: 'fill-disabled-disabled01',
} as const;
