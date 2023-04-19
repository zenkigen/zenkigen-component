export const baseColors = {
  primary: '#0ea5e9',
  danger: '#ef4444',
} as const;

export type BaseColors = typeof baseColors;

export const buttonColors = {
  primary: {
    base: 'bg-sky-500',
    active: 'bg-sky-400',
    disabled: 'disabled:bg-gray-500',
    hovered: 'hover:bg-sky-300',
  },
  danger: {
    base: 'bg-red-500',
    active: 'bg-red-400',
    disabled: 'disabled:bg-gray-500',
    hovered: 'hover:bg-red-300',
  },
} as const;
export type ButtonColors = typeof buttonColors;
