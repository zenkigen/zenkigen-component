import tailwindConfig from '@zenkigen-inc/component-config';
import postcss from 'postcss';
import type { Config } from 'tailwindcss';
import tailwindcss from 'tailwindcss';
import { beforeAll, describe, expect, it } from 'vitest';

/**
 * fill-* ブリッジ（CSS 変数併出力）の回帰テスト
 *
 * component-config は core の fill plugin を無効化し、fill-* を「fill + --zen-icon-stroke」の
 * 2 宣言を出す utility として再定義している（stroke 系アイコンへの着色ブリッジ）。
 * このテストは preset の CSS 出力を実ビルドし、以下を担保する：
 * - fill-* のあらゆる形（プレーン / variant / 任意値 / opacity modifier）で 2 宣言が併出力されること
 * - .zen-stroke-icon / .zen-stroke-accent ルールが出力されること
 * - safelist によりコンテンツ未使用でも fill-* と stroke-width 上書きが出力されること
 */

// variant・任意値・modifier は safelist では展開されないため raw コンテンツで与える。
// プレーンな fill-* と zen-stroke-icon / stroke-width 上書きは safelist 経由の出力を検証する
const RAW_CONTENT =
  '<div class="hover:fill-icon01 group-hover:fill-supportError fill-[#12ab34] fill-red-red50/50"></div>';

const buildCss = async (): Promise<string> => {
  const result = await postcss([
    tailwindcss({
      presets: [tailwindConfig as unknown as Config],
      content: [{ raw: RAW_CONTENT }],
    } as Config),
  ]).process('@tailwind utilities;', { from: 'fill-bridge.virtual.css' });

  return result.css;
};

/** CSS 文字列から指定セレクタのルール本体（宣言部）を取り出す */
const ruleOf = (css: string, selector: string): string => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));

  return match?.[1] ?? '';
};

let css = '';

beforeAll(async () => {
  css = await buildCss();
}, 60_000);

describe('fill-* ブリッジ（CSS 出力）', () => {
  it('プレーンな fill-* に fill と --zen-icon-stroke が併出力されること（safelist 経由）', () => {
    const rule = ruleOf(css, '.fill-icon01');
    expect(rule).toContain('fill: #5c6366');
    expect(rule).toContain('--zen-icon-stroke: #5c6366');
  });

  it('variant 付き fill-* にも併出力されること', () => {
    const hoverRule = ruleOf(css, '.hover\\:fill-icon01:hover');
    expect(hoverRule).toContain('--zen-icon-stroke: #5c6366');

    const groupHoverRule = ruleOf(css, '.group:hover .group-hover\\:fill-supportError');
    expect(groupHoverRule).toContain('fill: #c6244d');
    expect(groupHoverRule).toContain('--zen-icon-stroke: #c6244d');
  });

  it('任意値の fill-[...] にも併出力されること', () => {
    const rule = ruleOf(css, '.fill-\\[\\#12ab34\\]');
    expect(rule).toContain('fill: #12ab34');
    expect(rule).toContain('--zen-icon-stroke: #12ab34');
  });

  it('opacity modifier 付き fill-*/N にも併出力されること', () => {
    const rule = ruleOf(css, '.fill-red-red50\\/50');
    expect(rule).toContain('fill: rgb(217 43 87 / 0.5)');
    expect(rule).toContain('--zen-icon-stroke: rgb(217 43 87 / 0.5)');
  });

  it('fill-none は --zen-icon-stroke: none になること（fill 系と同じ不可視挙動）', () => {
    const rule = ruleOf(css, '.fill-none');
    expect(rule).toContain('fill: none');
    expect(rule).toContain('--zen-icon-stroke: none');
  });

  it('.zen-stroke-icon ルールが出力されること（safelist 経由）', () => {
    const rule = ruleOf(css, '.zen-stroke-icon');
    expect(rule).toContain('stroke: var(--zen-icon-stroke, currentColor)');
  });

  it('.zen-stroke-icon .zen-stroke-accent ルールが fill: none と stroke 変数参照を持つこと', () => {
    const rule = ruleOf(css, '.zen-stroke-icon .zen-stroke-accent');
    expect(rule).toContain('fill: none');
    expect(rule).toContain('stroke: var(--zen-icon-stroke, currentColor)');
  });

  it('サイズ別 stroke-width 上書きが出力されること（safelist 経由）', () => {
    for (const width of ['2.5', '2.35', '2', '1.65', '1.4']) {
      const selector = `.\\[\\&_svg\\]\\:\\[stroke-width\\:${width.replace('.', '\\.')}\\] svg`;
      const rule = ruleOf(css, selector);
      expect(rule, `stroke-width:${width} の上書きルールが見つからない`).toContain(`stroke-width: ${width}`);
    }
  });
});
