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
      ['small', ['w-4', 'h-4', '[&_svg]:[stroke-width:2.35]']],
      ['medium', ['w-6', 'h-6', '[&_svg]:[stroke-width:2]']],
      ['large', ['w-8', 'h-8', '[&_svg]:[stroke-width:1.65]']],
      ['x-large', ['w-10', 'h-10', '[&_svg]:[stroke-width:1.4]']],
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

  describe('stroke 系アイコン（lucide 由来）', () => {
    it('lucide 由来アイコンが stroke 属性と zen-stroke-icon class を持つこと', () => {
      render(<Icon name="close" />);
      const icon = screen.getByRole('img');
      expect(icon).toHaveClass('zen-stroke-icon');
      expect(icon).toHaveAttribute('fill', 'none');
      expect(icon).toHaveAttribute('stroke', 'currentColor');
      expect(icon).toHaveAttribute('stroke-width', '2');
      expect(icon).toHaveAttribute('stroke-linecap', 'round');
      expect(icon).toHaveAttribute('stroke-linejoin', 'round');
    });

    it('fill 系のまま維持されたアイコンは stroke 属性と zen-stroke-icon を持たないこと', () => {
      render(<Icon name="harutaka" />);
      const icon = screen.getByRole('img');
      expect(icon).not.toHaveClass('zen-stroke-icon');
      expect(icon).not.toHaveAttribute('stroke');
    });

    it('rect を含む lucide 由来アイコンが rect の寸法属性を保持すること', () => {
      // codegen の width / height 除去が root svg に限定されていることの回帰テスト。
      // 全要素から除去すると rect の寸法が消えて図形が描画されなくなる
      render(<Icon name="copy" />);
      const rect = screen.getByRole('img').querySelector('rect');
      expect(rect).toHaveAttribute('width', '14');
      expect(rect).toHaveAttribute('height', '14');
    });

    it.each([
      ['signal-low', 2],
      ['signal-off', 1],
      ['volume-off', 1],
    ] as const)('stroke 系 accent アイコン %s の accent path 数が取り込み定義と一致すること', (name, expectedCount) => {
      // lucide-import.json の accent（markPaths / addPaths）の path 数と突合する。
      // 存在確認だけでは複数 accent path の変換漏れを検出できないため件数で検証する
      render(<Icon name={name} accentColor="supportError" />);
      const icon = screen.getByRole('img');
      expect(icon.querySelectorAll('.zen-stroke-accent.fill-supportError')).toHaveLength(expectedCount);
    });

    it('accentColor 未指定でも accent path は zen-stroke-accent を持つこと（主色で描画される）', () => {
      render(<Icon name="signal-low" />);
      const icon = screen.getByRole('img');
      expect(icon.querySelectorAll('.zen-stroke-accent')).toHaveLength(2);
      expect(icon.querySelector('.fill-supportError')).toBeNull();
    });
  });
});
