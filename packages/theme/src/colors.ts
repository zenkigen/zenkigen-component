export const buttonColors = {
  fill: {
    base: 'border border-interactive-interactive01 bg-interactive-interactive01 text-text-textOnColor',
    hover: 'hover:bg-hover-hover01 hover:border-hover-hover01',
    active: 'active:bg-active-active01 active:border-active-active01',
    focus: 'focus:bg-selected-selectedUi focus:border-selected-selectedUi focus:text-interactive-interactive01',
    disabled: 'disabled:bg-disabled-disabled01 disabled:border-disabled-disabled01',
  },
  outline: {
    base: 'border border-border-uiBorder02 text-interactive-interactive02',
    hover: 'hover:bg-hover-hoverUi',
    active: 'active:bg-active-active02',
    focus: 'focus:border-border-selectedUiBorder focus:bg-selected-selectedUi focus:text-interactive-interactive01',
    disabled: 'disabled:border-border-uiBorder01 disabled:text-disabled-disabled01',
  },
  text: {
    base: 'border border-transparent text-interactive-interactive02',
    hover: 'hover:bg-hover-hoverUi hover:border-hover-hoverUi',
    active: 'active:bg-active-active02 active:border-active-active02',
    focus: 'focus:bg-selected-selectedUi focus:border-selected-selectedUi focus:text-interactive-interactive01',
    disabled: 'disabled:text-disabled-disabled01',
  },
} as const;
