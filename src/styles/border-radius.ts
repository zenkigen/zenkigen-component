const gutterDimension = 4;

export const borderRadius = {
  half: `${gutterDimension / 2}px`,
  default: `${gutterDimension}px`,
  double: `${gutterDimension * 2}px`,
} as const satisfies {
  [key: string]: `${number}px`;
};
