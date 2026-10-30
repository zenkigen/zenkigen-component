// tailwindcss v3 の内部ユーティリティには型定義が無いため、ここで宣言する。
// core の `fill` plugin と同一シグネチャで fill-* を再定義するために使用する。
declare module 'tailwindcss/lib/util/flattenColorPalette' {
  const flattenColorPalette: (colors: unknown) => Record<string, string>;
  export default flattenColorPalette;
}

declare module 'tailwindcss/lib/util/toColorValue' {
  const toColorValue: (value: unknown) => string;
  export default toColorValue;
}
