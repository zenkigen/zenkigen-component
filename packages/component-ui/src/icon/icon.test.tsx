import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { Icon } from './icon';

/**
 * Icon テストについて
 *
 * テストの構成：
 * - 基本表示：レンダリング、aria-label
 * - サイズ：5 サイズの幅・高さと stroke-width 上書きクラス
 * - 色：color プロパティ、未指定時、className 併用
 * - 無効状態：isDisabled の優先
 * - アクセントカラー：accent 対応アイコン全件の accentClassName 反映
 *   （lucide 置き換え時に accent 付与漏れがあると accentColor が黙って無効化するため、全件を回帰網とする）
 */

/** accent 対応アイコン（SVG に class="accent" を持つ全件）。置き換え作業で減っていないことを担保する */
const ACCENT_ICON_NAMES = [
  'ai-agent',
  'calendar-attention',
  'calendar-check',
  'calendar-minus',
  'calendar-today',
  'mic',
  'signal-low',
  'signal-off',
  'volume-off',
] as const;

describe('Icon', () => {
  describe('基本表示', () => {
    it('正常にレンダリングされ、svg が表示されること', () => {
      render(<Icon name="add" />);
      const icon = screen.getByRole('img', { name: 'add' });
      expect(icon).toBeInTheDocument();
      expect(icon.tagName.toLowerCase()).toBe('svg');
    });

    it('ケバブケース名の aria-label はキャメルケース化された名前になること（既存の生成仕様）', () => {
      // codegen.cjs の属性変換 regex が aria-label の値まで変換する既知の挙動。
      // 生成物 diff ゼロを維持するため、この挙動をそのまま固定する
      render(<Icon name="angle-down" />);
      expect(screen.getByRole('img', { name: 'angleDown' })).toBeInTheDocument();
    });
  });

  describe('サイズ', () => {
    it.each([
      ['x-small', ['w-3', 'h-3', '[&_svg]:[stroke-width:2.5]']],
      ['small', ['w-4', 'h-4', '[&_svg]:[stroke-width:2.25]']],
      ['medium', ['w-6', 'h-6', '[&_svg]:[stroke-width:2]']],
      ['large', ['w-8', 'h-8', '[&_svg]:[stroke-width:1.75]']],
      ['x-large', ['w-10', 'h-10', '[&_svg]:[stroke-width:1.5]']],
    ] as const)('size="%s" の場合、幅・高さと stroke-width 上書きクラスが付与されること', (size, classes) => {
      render(<Icon name="add" size={size} />);
      const wrapper = screen.getByRole('img').parentElement;
      expect(wrapper).toHaveClass(...classes);
    });

    it('size 未指定の場合、medium のクラスが付与されること', () => {
      render(<Icon name="add" />);
      const wrapper = screen.getByRole('img').parentElement;
      expect(wrapper).toHaveClass('w-6', 'h-6', '[&_svg]:[stroke-width:2]');
    });
  });

  describe('色', () => {
    it('color を指定した場合、fill-* クラスが付与されること', () => {
      render(<Icon name="add" color="icon01" />);
      const wrapper = screen.getByRole('img').parentElement;
      expect(wrapper).toHaveClass('fill-icon01');
    });

    it('color 未指定の場合、fill-* クラスが付与されないこと', () => {
      render(<Icon name="add" />);
      const wrapper = screen.getByRole('img').parentElement;
      expect(wrapper?.className).not.toMatch(/fill-/);
    });

    it('className を併用できること', () => {
      render(<Icon name="add" color="icon01" className="mt-1" />);
      const wrapper = screen.getByRole('img').parentElement;
      expect(wrapper).toHaveClass('fill-icon01', 'mt-1');
    });
  });

  describe('無効状態', () => {
    it('isDisabled=true の場合、color より fill-disabled01 が優先されること', () => {
      render(<Icon name="add" color="icon01" isDisabled />);
      const wrapper = screen.getByRole('img').parentElement;
      expect(wrapper).toHaveClass('fill-disabled01');
      expect(wrapper).not.toHaveClass('fill-icon01');
    });
  });

  describe('アクセントカラー', () => {
    it.each(ACCENT_ICON_NAMES.map((name) => [name] as const))(
      'accent 対応アイコン %s が accentColor のクラスを accent 要素に反映すること',
      (name) => {
        render(<Icon name={name} accentColor="supportError" />);
        const icon = screen.getByRole('img');
        expect(icon.querySelector('.fill-supportError')).not.toBeNull();
      },
    );

    it('isDisabled=true の場合、accentColor が反映されないこと', () => {
      render(<Icon name="mic" accentColor="supportError" isDisabled />);
      const icon = screen.getByRole('img');
      expect(icon.querySelector('.fill-supportError')).toBeNull();
    });

    it('accent 要素を持たないアイコンでは accentColor を指定しても何も起きないこと', () => {
      render(<Icon name="add" accentColor="supportError" />);
      const icon = screen.getByRole('img');
      expect(icon.querySelector('.fill-supportError')).toBeNull();
    });
  });
});
