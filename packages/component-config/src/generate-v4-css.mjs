/* eslint-disable no-console */
// tokens のビルド出力 (dist/index.mjs) と component-theme の typography から、
// Tailwind v4 用の CSS (@theme / @utility / @source inline) を dist/ に生成する。
// build スクリプトで tsup の後に実行される（dist/index.mjs と component-theme/dist の存在が前提）。
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { typography } from '@zenkigen-inc/component-theme';

import { tokens } from '../dist/index.mjs';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const distDir = join(scriptDir, '..', 'dist');

// ---- カラートークンの収集（v3 tailwind-config.ts の colors 構造を踏襲）----
const colorLines = [];
const colorNames = [];

const addColor = (name, value) => {
  colorLines.push(`  --color-${name}: ${value};`);
  colorNames.push(name);
};

// semantic tokens（tokens.tokens.<category>.<key>）→ フラット展開（bg-interactive01 等）
for (const category of Object.values(tokens.tokens)) {
  for (const [key, value] of Object.entries(category)) {
    addColor(key, value);
  }
}
// user.* → user-<key>（bg-user-red 等）
for (const [key, value] of Object.entries(tokens.user)) {
  addColor(`user-${key}`, value);
}
// primitives（tokens.colors）→ black/white はフラット、その他は <name>-<shadeKey>（bg-blue-blue50 等）
for (const [name, value] of Object.entries(tokens.colors)) {
  if (typeof value === 'string') {
    addColor(name, value);
  } else {
    for (const [shadeKey, hex] of Object.entries(value)) {
      addColor(`${name}-${shadeKey}`, hex);
    }
  }
}

// ---- fontSize / lineHeight / shadow ----
const textLines = Object.entries(tokens.fontSize).map(([k, v]) => `  --text-${k}: ${v}px;`);
const leadingLines = Object.entries(tokens.lineHeights).map(([k, v]) => `  --leading-${k}: ${v};`);
const shadowLines = Object.entries(tokens.shadow).map(([k, v]) => `  --shadow-${k}: ${v};`);

// ---- アニメーション（v3 tailwind-config.ts の keyframes / animation を踏襲）----
const animations = {
  'circular-small-move': 'circular-small-move 1.4s ease-in-out infinite',
  'circular-medium-move': 'circular-medium-move 1.4s ease-in-out infinite',
  'circular-large-move': 'circular-large-move 1.4s ease-in-out infinite',
  'toast-in': 'toast-in 0.25s cubic-bezier(.11, .57, .14, 1)',
  'toast-out': 'toast-out 0.25s cubic-bezier(0, .14, .75, 1)',
};
const animateLines = Object.entries(animations).map(([k, v]) => `  --animate-${k}: ${v};`);

const keyframesCss = `@keyframes circular-small-move {
  0% {
    stroke-dasharray: 1px, 100px;
    stroke-dashoffset: 0px;
    transform: rotate(0deg);
  }
  50% {
    stroke-dasharray: 50px, 100px;
    stroke-dashoffset: -8px;
  }
  100% {
    stroke-dasharray: 50px, 100px;
    stroke-dashoffset: -64px;
    transform: rotate(360deg);
  }
}
@keyframes circular-medium-move {
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0px;
    transform: rotate(0deg);
  }
  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
    transform: rotate(360deg);
  }
}
@keyframes circular-large-move {
  0% {
    stroke-dasharray: 1px, 400px;
    stroke-dashoffset: 0px;
    transform: rotate(0deg);
  }
  50% {
    stroke-dasharray: 200px, 400px;
    stroke-dashoffset: -30px;
  }
  100% {
    stroke-dasharray: 200px, 400px;
    stroke-dashoffset: -250px;
    transform: rotate(360deg);
  }
}
@keyframes toast-in {
  from {
    opacity: 0;
    transform: translate3d(-10%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes toast-out {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(-50%, 0, 0);
  }
}`;

// ---- z-index（v3 zIndex を踏襲。auto は v4 組込みのため除外）----
const zIndex = {
  hide: -1,
  base: 0,
  badge: 10,
  header: 100,
  dropdown: 300,
  overlay: 1000,
  modal: 1100,
  popover: 1150,
  preloader: 1200,
  toast: 1300,
  tooltip: 1400,
};
const zUtilities = Object.entries(zIndex)
  .map(([k, v]) => `@utility z-${k} {\n  z-index: ${v};\n}`)
  .join('\n');

// ---- typography（component-theme の typography 文字列を @apply）----
const typographyUtilities = Object.values(typography)
  .flatMap((group) => Object.entries(group))
  .map(([key, value]) => `@utility typography-${key} {\n  @apply ${value};\n}`)
  .join('\n');

// ---- fill-<ColorToken>（Icon が fill-${color} を動的生成するため @source inline で列挙）----
// 利用側ソースには現れないため、dist スキャンでは検出されない。配布 CSS 側で安全網を張る。
const fillInline = `@source inline("fill-{${colorNames.join(',')}}");`;

// ---- theme.css ----
const themeCss = `@theme {
  --font-sans: Arial, 'Noto Sans JP', sans-serif;

  --radius-button: 0.25rem;

${colorLines.join('\n')}

${textLines.join('\n')}

${leadingLines.join('\n')}

${shadowLines.join('\n')}

${animateLines.join('\n')}
}

${keyframesCss}
`;

// ---- utilities.css ----
const utilitiesCss = `${zUtilities}

@utility field-sizing-content {
  field-sizing: content;
}

${typographyUtilities}

${fillInline}
`;

// ---- index.css（エントリ）----
const indexCss = `@import './theme.css';\n@import './utilities.css';\n`;

writeFileSync(join(distDir, 'theme.css'), themeCss);
writeFileSync(join(distDir, 'utilities.css'), utilitiesCss);
writeFileSync(join(distDir, 'index.css'), indexCss);

console.log(
  `[generate-v4-css] dist/{theme,utilities,index}.css を生成（colors: ${colorNames.length}, typography: ${
    Object.values(typography).flatMap((g) => Object.keys(g)).length
  }）`,
);
