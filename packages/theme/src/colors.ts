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

export const tagColors = {
  supportError: 'text-text-textOnColor bg-support-supportError',
  supportSuccess: 'text-text-textOnColor bg-support-supportSuccess',
  supportWarning: 'text-text-textOnColor bg-support-supportWarning',
  supportDanger: 'text-text-textOnColor bg-support-supportDanger',
  userRed: 'text-text-textOnColor bg-user-red',
  userPink: 'text-text-textOnColor bg-user-pink',
  userPurple: 'text-text-textOnColor bg-user-purple',
  userTurquoise: 'text-text-textOnColor bg-user-turquoise',
  userRoyalBlue: 'text-text-textOnColor bg-user-royalBlue',
  userBlue: 'text-text-textOnColor bg-user-blue',
  userAquamarine: 'text-text-textOnColor bg-user-aquamarine',
  userYellowGreen: 'text-text-textOnColor bg-user-yellowGreen',
  userYellow: 'text-text-textOnColor bg-user-yellow',
  userOrange: 'text-text-textOnColor bg-user-orange',
  default: 'text-text-textOnColor bg-support-supportInfo',
  gray: 'text-text-text02 bg-gray-gray10',
} as const;

export const tagLightColors = {
  supportError: 'text-text-text01 bg-support-supportErrorLight',
  supportSuccess: 'text-text-text01 bg-support-supportSuccessLight',
  supportWarning: 'text-text-text01 bg-support-supportWarningLight',
  supportDanger: 'text-text-text01 bg-support-supportDangerLight',
  userRed: 'text-text-text01 bg-user-redLight',
  userPink: 'text-text-text01 bg-user-pinkLight',
  userPurple: 'text-text-text01 bg-user-purpleLight',
  userTurquoise: 'text-text-text01 bg-user-turquoiseLight',
  userRoyalBlue: 'text-text-text01 bg-user-royalBlueLight',
  userBlue: 'text-text-text01 bg-user-blueLight',
  userAquamarine: 'text-text-text01 bg-user-aquamarineLight',
  userYellowGreen: 'text-text-text01 bg-user-yellowGreenLight',
  userYellow: 'text-text-text01 bg-user-yellowLight',
  userOrange: 'text-text-text01 bg-user-orangeLight',
  default: 'text-text-text01 bg-support-supportInfoLight',
  gray: 'text-text-text01 bg-gray-gray10',
} as const;
