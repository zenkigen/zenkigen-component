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
    base: 'border border-interactive01 bg-interactive01 text-textOnColor fill-textOnColor',
    hover: 'hover:bg-hover01 hover:border-hover01',
    active: 'active:bg-active01 active:border-active01',
    disabled: 'disabled:bg-disabled01 disabled:border-disabled01',
    selected: 'border border-transparent bg-selectedUi text-interactive01 fill-interactive01',
  },
  fillDanger: {
    base: 'border border-supportDanger bg-supportDanger text-textOnColor fill-textOnColor',
    hover: 'hover:bg-hoverDanger hover:border-hoverDanger',
    active: 'active:bg-activeDanger active:border-activeDanger',
    disabled: 'disabled:bg-disabled01 disabled:border-disabled01',
    selected: 'border border-transparent bg-supportDangerLight text-supportDanger fill-supportDanger',
  },
  outline: {
    base: 'border border-uiBorder02 bg-uiBackground01 text-interactive02 fill-interactive02',
    hover: 'hover:bg-hover02',
    active: 'active:bg-active02',
    disabled: 'disabled:border-uiBorder01 disabled:text-disabled01 disabled:fill-disabled01',
    selected: 'border border-interactive01 bg-selectedUi text-interactive01 fill-interactive01',
  },
  outlineDanger: {
    base: 'border border-supportDanger bg-uiBackground01 text-supportDanger fill-supportDanger',
    hover: 'hover:bg-uiBackgroundError',
    active: 'active:bg-red-red20',
    disabled: 'disabled:border-uiBorder01 disabled:text-disabled01 disabled:fill-disabled01',
    selected: 'border border-interactive01 bg-selectedUi text-interactive01 fill-interactive01',
  },
  text: {
    base: 'border border-transparent text-interactive02 fill-interactive02',
    hover: 'hover:bg-hover02 hover:border-hover02',
    active: 'active:bg-active02 active:border-active02',
    disabled: 'disabled:text-disabled01 disabled:fill-disabled01',
    selected: 'border border-transparent bg-selectedUi text-interactive01 fill-interactive01',
  },
} as const;

export const selectColors = {
  outline: buttonColors.outline,
  text: buttonColors.text,
  outlineError: {
    base: 'border border-supportError bg-uiBackground01 text-supportError fill-supportError',
    hover: 'hover:bg-hoverUiError',
    active: 'active:bg-activeUiError',
    disabled: 'disabled:border-uiBorder01 disabled:text-disabled01 disabled:fill-disabled01',
    selected: 'border border-interactive01 bg-selectedUi text-interactive01 fill-interactive01',
  },
  textError: {
    base: 'border border-transparent bg-uiBackground01 text-supportError fill-supportError',
    hover: 'hover:bg-hoverUiError',
    active: 'active:bg-activeUiError',
    disabled: 'disabled:text-disabled01 disabled:fill-disabled01',
    selected: 'border border-transparent bg-selectedUi text-interactive01 fill-interactive01',
  },
} as const;

export const iconColors = {
  icon01: 'fill-icon01',
  icon02: 'fill-icon02',
  icon03: 'fill-icon03',
  iconOnColor: 'fill-iconOnColor',
} as const;

export const tagColors = {
  supportError: 'text-textOnColor bg-supportError',
  supportSuccess: 'text-textOnColor bg-supportSuccess',
  supportWarning: 'text-textOnColor bg-supportWarning',
  supportDanger: 'text-textOnColor bg-supportDanger',
  userRed: 'text-textOnColor bg-user-red',
  userPink: 'text-textOnColor bg-user-pink',
  userPurple: 'text-textOnColor bg-user-purple',
  userTurquoise: 'text-textOnColor bg-user-turquoise',
  userRoyalBlue: 'text-textOnColor bg-user-royalBlue',
  userBlue: 'text-textOnColor bg-user-blue',
  userAquamarine: 'text-textOnColor bg-user-aquamarine',
  userYellowGreen: 'text-textOnColor bg-user-yellowGreen',
  userYellow: 'text-textOnColor bg-user-yellow',
  userOrange: 'text-textOnColor bg-user-orange',
  default: 'text-textOnColor bg-supportInfo',
  gray: 'text-text02 bg-gray-gray10',
} as const;

export const tagLightColors = {
  supportError: 'text-text01 bg-supportErrorLight',
  supportSuccess: 'text-text01 bg-supportSuccessLight',
  supportWarning: 'text-text01 bg-supportWarningLight',
  supportDanger: 'text-text01 bg-supportDangerLight',
  userRed: 'text-text01 bg-user-redLight',
  userPink: 'text-text01 bg-user-pinkLight',
  userPurple: 'text-text01 bg-user-purpleLight',
  userTurquoise: 'text-text01 bg-user-turquoiseLight',
  userRoyalBlue: 'text-text01 bg-user-royalBlueLight',
  userBlue: 'text-text01 bg-user-blueLight',
  userAquamarine: 'text-text01 bg-user-aquamarineLight',
  userYellowGreen: 'text-text01 bg-user-yellowGreenLight',
  userYellow: 'text-text01 bg-user-yellowLight',
  userOrange: 'text-text01 bg-user-orangeLight',
  default: 'text-text01 bg-supportInfoLight',
  gray: 'text-text01 bg-gray-gray10',
} as const;
