const gutterDimension = 4 as const;

export function space(val: number) {
  return `${gutterDimension * val}px`;
}
