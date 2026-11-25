import { afterEach, describe, expect, it, vi } from 'vitest';

import { resolveListMaxHeight } from './resolve-list-max-height';

describe('resolveListMaxHeight', () => {
  describe('画面内の空きを測れないとき', () => {
    it.each([[282], ['120px'], ['none'], ['50vh'], [0]])('上限 %s をそのまま返すこと', (limit) => {
      expect(resolveListMaxHeight(limit, null)).toBe(limit);
    });
  });

  describe('上限が数値のとき', () => {
    it('空きのほうが小さいときは空きの高さを返すこと', () => {
      expect(resolveListMaxHeight(282, 156)).toBe(156);
    });

    it('上限のほうが小さいときは上限を返すこと', () => {
      expect(resolveListMaxHeight(282, 624)).toBe(282);
    });

    it('上限が 0 のときは 0 を返すこと', () => {
      expect(resolveListMaxHeight(0, 624)).toBe(0);
    });
  });

  describe('上限が px の文字列のとき', () => {
    it('空きのほうが小さいときは空きの高さを数値で返すこと', () => {
      expect(resolveListMaxHeight('120px', 80)).toBe(80);
    });

    it('上限のほうが小さいときは上限を数値で返すこと', () => {
      expect(resolveListMaxHeight('120px', 624)).toBe(120);
    });

    it('小数の px も数値として扱うこと', () => {
      expect(resolveListMaxHeight('120.5px', 624)).toBe(120.5);
    });
  });

  describe('上限が "none" のとき', () => {
    it('空きの高さを返すこと', () => {
      expect(resolveListMaxHeight('none', 624)).toBe(624);
    });
  });

  describe('上限が px 以外の単位の文字列のとき', () => {
    it.each([
      ['50vh', 'min(50vh, 624px)'],
      ['20rem', 'min(20rem, 624px)'],
    ])('上限 %s は CSS の min() で空きの高さと組み合わせること', (limit, expected) => {
      expect(resolveListMaxHeight(limit, 624)).toBe(expected);
    });

    describe('min() と組み合わせられない値', () => {
      afterEach(() => {
        vi.unstubAllGlobals();
      });

      it.each([['max-content'], ['auto'], ['fit-content']])(
        'ブラウザが解釈できないと答えた上限 %s は、空きの高さだけを返すこと',
        (limit) => {
          const supports = vi.fn((_property: string, value: string) => !value.includes(limit));
          vi.stubGlobal('CSS', { supports });

          expect(resolveListMaxHeight(limit, 624)).toBe(624);
          expect(supports).toHaveBeenCalledWith('max-height', `min(${limit}, 624px)`);
        },
      );

      it('ブラウザが解釈できると答えた上限は、min() で組み合わせた値を返すこと', () => {
        vi.stubGlobal('CSS', { supports: () => true });

        expect(resolveListMaxHeight('50vh', 624)).toBe('min(50vh, 624px)');
      });

      // CSS 変数は中身を事前に判定できない（CSS.supports は var() を含む値に true を返す）。既知の制限
      it('CSS 変数はそのまま min() に入れること', () => {
        vi.stubGlobal('CSS', { supports: () => true });

        expect(resolveListMaxHeight('var(--list-height)', 624)).toBe('min(var(--list-height), 624px)');
      });

      it('CSS.supports が無い環境では、min() で組み合わせた値を返すこと', () => {
        vi.stubGlobal('CSS', {});

        expect(resolveListMaxHeight('auto', 624)).toBe('min(auto, 624px)');
      });
    });
  });
});
