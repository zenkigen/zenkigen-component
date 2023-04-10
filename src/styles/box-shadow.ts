export const boxShadow = {
  neutral: `0 1px 4px 0 rgba(0, 0, 0, .2)`,
  floating: `0 1px 8px 0 rgba(0, 0, 0, .2)`,
  dialog: `0 10px 40px 0 rgba(0, 0, 0, .2)`,
  hover: `0 8px 12px 0 rgba(0, 0, 0, .3)`,
} as const satisfies {
  [key: string]: string;
};
