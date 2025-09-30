import type { tokens } from '@zenkigen-inc/component-config/src/tokens/tokens';

// Zenkigenトークンのキー名
type UserColorToken = keyof typeof tokens.user;
type TextColorToken = keyof typeof tokens.tokens.text;
type LinkColorToken = keyof typeof tokens.tokens.link;
type BackgroundColorToken = keyof typeof tokens.tokens.background;
type BorderColorToken = keyof typeof tokens.tokens.border;
type IconColorToken = keyof typeof tokens.tokens.icon;
type InteractiveColorToken = keyof typeof tokens.tokens.interactive;
type FieldColorToken = keyof typeof tokens.tokens.field;
type FocusColorToken = keyof typeof tokens.tokens.focus;
type HoverColorToken = keyof typeof tokens.tokens.hover;
type ActiveColorToken = keyof typeof tokens.tokens.active;
type SelectedColorToken = keyof typeof tokens.tokens.selected;
type DisabledColorToken = keyof typeof tokens.tokens.disabled;
type SupportColorToken = keyof typeof tokens.tokens.support;

// ベースカラーのステップ
type BlueColorStep = keyof typeof tokens.colors.blue;
type GrayColorStep = keyof typeof tokens.colors.gray;
type RedColorStep = keyof typeof tokens.colors.red;
type YellowColorStep = keyof typeof tokens.colors.yellow;
type GreenColorStep = keyof typeof tokens.colors.green;
type PurpleColorStep = keyof typeof tokens.colors.purple;
type BlueGreenColorStep = keyof typeof tokens.colors.blueGreen;

// ベースカラーのトークン名（色名-ステップ）
type BaseColorToken =
  | `blue-${BlueColorStep}`
  | `gray-${GrayColorStep}`
  | `red-${RedColorStep}`
  | `yellow-${YellowColorStep}`
  | `green-${GreenColorStep}`
  | `purple-${PurpleColorStep}`
  | `blueGreen-${BlueGreenColorStep}`
  | 'black'
  | 'white';

// Tailwind標準色の定義
const _tailwindColors = {
  slate: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  gray: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  zinc: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  neutral: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  stone: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  red: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  orange: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  amber: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  yellow: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  lime: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  green: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  emerald: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  teal: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  cyan: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  sky: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  blue: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  indigo: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  violet: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  purple: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  fuchsia: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  pink: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  rose: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
} as const;

// Tailwind標準色の型生成
type TailwindColorName = keyof typeof _tailwindColors;
type TailwindColorShade = (typeof _tailwindColors)[TailwindColorName][number];
type TailwindColorToken = `${TailwindColorName}-${TailwindColorShade}` | 'transparent' | 'current' | 'inherit';

// 全カラートークン（プレフィックスなし）
export type ColorToken =
  | UserColorToken
  | TextColorToken
  | LinkColorToken
  | BackgroundColorToken
  | BorderColorToken
  | IconColorToken
  | InteractiveColorToken
  | FieldColorToken
  | FocusColorToken
  | HoverColorToken
  | ActiveColorToken
  | SelectedColorToken
  | DisabledColorToken
  | SupportColorToken
  | BaseColorToken
  | TailwindColorToken;
