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
    selected:
      'border border-transparent bg-selected-selectedUi text-interactive-interactive01 fill-interactive-interactive01',
  },
  outline: {
    base: 'border border-border-uiBorder02 text-interactive-interactive02 fill-interactive-interactive02',
    hover: 'hover:bg-hover-hover02',
    active: 'active:bg-active-active02',
    disabled: 'disabled:border-border-uiBorder01 disabled:text-disabled-disabled01 disabled:fill-disabled-disabled01',
    selected:
      'border border-interactive-interactive01 bg-selected-selectedUi text-interactive-interactive01 fill-interactive-interactive01',
  },
  text: {
    base: 'border border-transparent text-interactive-interactive02 fill-interactive-interactive02',
    hover: 'hover:bg-hover-hover02 hover:border-hover-hover02',
    active: 'active:bg-active-active02 active:border-active-active02',
    disabled: 'disabled:text-disabled-disabled01 disabled:fill-disabled-disabled01',
    selected:
      'border border-transparent bg-selected-selectedUi text-interactive-interactive01 fill-interactive-interactive01',
  },
} as const;

export const iconColors = {
  icon01: 'fill-icon-icon01',
  icon01Dark: 'fill-icon-icon01Dark',
  icon02: 'fill-icon-icon02',
  icon02Dark: 'fill-icon-icon02Dark',
  icon03: 'fill-icon-icon03',
  icon03Dark: 'fill-icon-icon03Dark',
  iconOnColor: 'fill-icon-iconOnColor',
} as const;

export const tagColorDefinitions = {
  SupportError: {
    font: 'text-text-textOnColor',
    background: 'bg-support-supportError',
    deleteIcon: 'fill-icon-iconOnColor',
  },
  SupportSuccess: {
    font: 'text-text-textOnColor',
    background: 'bg-support-supportSuccess',
    deleteIcon: 'fill-icon-iconOnColor',
  },
  SupportWarning: {
    font: 'text-text-textOnColor',
    background: 'bg-support-supportWarning',
    deleteIcon: 'fill-icon-iconOnColor',
  },
  SupportDanger: {
    font: 'text-text-textOnColor',
    background: 'bg-support-supportDanger',
    deleteIcon: 'fill-icon-iconOnColor',
  },
  SupportInfo: {
    font: 'text-text-textOnColor',
    background: 'bg-support-supportInfo',
    deleteIcon: 'fill-icon-iconOnColor',
  },
  UserRed: {
    font: 'text-text-textOnColor',
    background: 'bg-user-red',
    deleteIcon: 'fill-icon-iconOnColor',
  },
  UserPink: {
    font: 'text-text-textOnColor',
    background: 'bg-user-pink',
    deleteIcon: 'fill-icon-iconOnColor',
  },
  UserPurple: {
    font: 'text-text-textOnColor',
    background: 'bg-user-purple',
    deleteIcon: 'fill-icon-iconOnColor',
  },
  UserTurquoise: {
    font: 'text-text-textOnColor',
    background: 'bg-user-turquoise',
    deleteIcon: 'fill-icon-iconOnColor',
  },
  UserRoyalBlue: {
    font: 'text-text-textOnColor',
    background: 'bg-user-royalBlue',
    deleteIcon: 'fill-icon-iconOnColor',
  },
  UserBlue: {
    font: 'text-text-textOnColor',
    background: 'bg-user-blue',
    deleteIcon: 'fill-icon-iconOnColor',
  },
  UserAquamarine: {
    font: 'text-text-textOnColor',
    background: 'bg-user-aquamarine',
    deleteIcon: 'fill-icon-iconOnColor',
  },
  UserYellowGreen: {
    font: 'text-text-textOnColor',
    background: 'bg-user-yellowGreen',
    deleteIcon: 'fill-icon-iconOnColor',
  },
  UserYellow: {
    font: 'text-text-textOnColor',
    background: 'bg-user-yellow',
    deleteIcon: 'fill-icon-iconOnColor',
  },
  UserOrange: {
    font: 'text-text-textOnColor',
    background: 'bg-user-orange',
    deleteIcon: 'fill-icon-iconOnColor',
  },
  Gray: {
    font: 'text-text-text02',
    background: 'bg-gray-gray10',
    deleteIcon: 'fill-icon-iconOnColor',
  },
} as const;
