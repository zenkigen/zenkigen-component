import type { CSSProperties } from 'react';

const PX_VALUE_PATTERN = /^\s*(\d+(?:\.\d+)?|\.\d+)px\s*$/;

/**
 * max-height の値としてブラウザが解釈できるかを調べる。
 * CSS.supports が無い環境（テスト環境など）では判定できないため、解釈できるものとして扱う。
 */
const canUseAsMaxHeight = (value: string): boolean => {
  if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
    return true;
  }

  return CSS.supports('max-height', value);
};

/**
 * オプションリストの max-height を決める。
 *
 * - limit: optionListMaxHeight（未指定時は既定値）。上限として扱う
 * - availableHeight: 画面内でリストに使える高さ（px）。測れないときは null
 *
 * availableHeight が null のときは limit をそのまま返す。
 * 数値・px の文字列は小さいほうの数値、"none" は availableHeight、
 * それ以外の文字列（"50vh" など）は CSS の min() で両方を指定する。
 *
 * "max-content"・"auto" など、min() と組み合わせられない値は「上限なし」とみなし、availableHeight を返す。
 * CSS 変数（"var(--x)"）は、変数の中身を事前に判定できない。長さでない値に解決されると min() ごと無効になり、
 * 高さの制限は効かない（既知の制限）。
 */
export const resolveListMaxHeight = (
  limit: CSSProperties['height'],
  availableHeight: number | null,
): CSSProperties['height'] => {
  if (availableHeight == null) {
    return limit;
  }

  if (limit == null || limit === 'none') {
    return availableHeight;
  }

  if (typeof limit === 'number') {
    return Math.min(limit, availableHeight);
  }

  const pxMatch = PX_VALUE_PATTERN.exec(limit);
  const pxValue = pxMatch?.[1];
  if (pxValue != null) {
    return Math.min(Number(pxValue), availableHeight);
  }

  const combined = `min(${limit}, ${availableHeight}px)`;

  // "max-content"・"auto" などのキーワードは min() に入れると宣言ごと無効になり、高さの制限が一切効かなくなる。
  // ブラウザが min() との組み合わせを解釈できないと答えた値は「上限なし」とみなし、画面内の空きの高さだけを適用する
  if (!canUseAsMaxHeight(combined)) {
    return availableHeight;
  }

  return combined;
};
