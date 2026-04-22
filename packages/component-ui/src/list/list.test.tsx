import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { List } from './list';
import { ListOptionItem } from './list-option-item';

/**
 * List / List.OptionItem テスト
 *
 * テストの構成：
 * - 基本レンダリング: ul / li の出力、children
 * - role / aria 属性: ARIA Combobox パターン準拠
 * - variant / size: outline / borderless と medium / large の class 切り替え
 * - 状態: isActive / isSelected / isDisabled / isError の組み合わせ
 * - イベント: onClick / onMouseEnter / onMouseDown.preventDefault
 * - 制約: List 外で OptionItem を使うとエラー
 */

describe('List', () => {
  describe('基本レンダリング', () => {
    it('children を ul の中に描画する', () => {
      render(
        <List aria-label="テスト">
          <li id="x">item</li>
        </List>,
      );
      const list = screen.getByRole('listbox');
      expect(list.tagName).toBe('UL');
      expect(list).toHaveTextContent('item');
    });

    it('role を指定できる（デフォルトは listbox）', () => {
      const { rerender } = render(
        <List aria-label="テスト">
          <li id="x">item</li>
        </List>,
      );
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      rerender(
        <List role="menu" aria-label="メニュー">
          <li id="x">item</li>
        </List>,
      );
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('id / aria-label / aria-labelledby を反映する', () => {
      render(
        <List id="my-list" aria-label="リスト" aria-labelledby="label-id">
          <li id="x">item</li>
        </List>,
      );
      const list = screen.getByRole('listbox');
      expect(list).toHaveAttribute('id', 'my-list');
      expect(list).toHaveAttribute('aria-label', 'リスト');
      expect(list).toHaveAttribute('aria-labelledby', 'label-id');
    });
  });

  describe('variant', () => {
    it('outline の時に border クラスが付く', () => {
      render(
        <List variant="outline" aria-label="テスト">
          <li id="x">item</li>
        </List>,
      );
      const list = screen.getByRole('listbox');
      expect(list.className).toMatch(/border/);
    });

    it('borderless の時に border クラスが付かない', () => {
      render(
        <List variant="borderless" aria-label="テスト">
          <li id="x">item</li>
        </List>,
      );
      const list = screen.getByRole('listbox');
      expect(list.className).not.toMatch(/border-uiBorder01/);
    });
  });

  describe('レイアウト制御', () => {
    it('maxHeight / width を style に反映する', () => {
      render(
        <List maxHeight={200} width={300} aria-label="テスト">
          <li id="x">item</li>
        </List>,
      );
      const list = screen.getByRole('listbox');
      expect(list).toHaveStyle({ maxHeight: '200px', width: '300px' });
    });
  });

  describe('forwardRef', () => {
    it('ref に ul 要素を渡す', () => {
      const ref = { current: null as HTMLUListElement | null };
      render(
        <List ref={ref} aria-label="テスト">
          <li id="x">item</li>
        </List>,
      );
      expect(ref.current).toBeInstanceOf(HTMLUListElement);
    });
  });
});

describe('List.OptionItem', () => {
  const renderInList = (children: React.ReactNode, listProps: Partial<React.ComponentProps<typeof List>> = {}) =>
    render(
      <List aria-label="テスト" {...listProps}>
        {children}
      </List>,
    );

  describe('基本レンダリング', () => {
    it('li + role=option で children を描画する', () => {
      renderInList(<ListOptionItem id="opt-1">テキスト</ListOptionItem>);
      const item = screen.getByRole('option');
      expect(item.tagName).toBe('LI');
      expect(item).toHaveTextContent('テキスト');
      expect(item).toHaveAttribute('id', 'opt-1');
    });

    it('aria-selected / aria-disabled を反映する（明示指定）', () => {
      renderInList(
        <ListOptionItem id="opt-1" aria-selected aria-disabled>
          item
        </ListOptionItem>,
      );
      const item = screen.getByRole('option');
      expect(item).toHaveAttribute('aria-selected', 'true');
      expect(item).toHaveAttribute('aria-disabled', 'true');
    });

    it('aria-selected / aria-disabled を isSelected / isDisabled から自動補完する', () => {
      renderInList(
        <ListOptionItem id="opt-1" isSelected isDisabled>
          item
        </ListOptionItem>,
      );
      const item = screen.getByRole('option');
      expect(item).toHaveAttribute('aria-selected', 'true');
      expect(item).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('size', () => {
    it.each([
      ['medium', /h-8/],
      ['large', /h-10/],
    ] as const)('size=%s で対応する高さ class が当たる', (size, pattern) => {
      renderInList(<ListOptionItem id="opt-1">item</ListOptionItem>, { size });
      const item = screen.getByRole('option');
      expect(item.className).toMatch(pattern);
    });
  });

  describe('状態別スタイル', () => {
    it('isDisabled で cursor-not-allowed が当たる', () => {
      renderInList(
        <ListOptionItem id="opt-1" isDisabled>
          item
        </ListOptionItem>,
      );
      expect(screen.getByRole('option').className).toMatch(/cursor-not-allowed/);
    });

    it('isSelected で bg-selectedUi が当たる', () => {
      renderInList(
        <ListOptionItem id="opt-1" isSelected>
          item
        </ListOptionItem>,
      );
      expect(screen.getByRole('option').className).toMatch(/bg-selectedUi/);
    });

    it('isSelected + isError で bg-uiBackgroundError が当たる', () => {
      renderInList(
        <ListOptionItem id="opt-1" isSelected isError>
          item
        </ListOptionItem>,
      );
      expect(screen.getByRole('option').className).toMatch(/bg-uiBackgroundError/);
    });

    it('isActive で bg-hover02 が当たる', () => {
      renderInList(
        <ListOptionItem id="opt-1" isActive>
          item
        </ListOptionItem>,
      );
      expect(screen.getByRole('option').className).toMatch(/bg-hover02/);
    });

    it('isActive で左 accent border (border-l-interactive03) が当たる', () => {
      renderInList(
        <ListOptionItem id="opt-1" isActive>
          item
        </ListOptionItem>,
      );
      expect(screen.getByRole('option').className).toMatch(/border-l-interactive03/);
    });

    it('isSelected + isActive で bg-selectedUi と border-l-interactive03 が同時に当たる', () => {
      renderInList(
        <ListOptionItem id="opt-1" isSelected isActive>
          item
        </ListOptionItem>,
      );
      const className = screen.getByRole('option').className;
      expect(className).toMatch(/bg-selectedUi/);
      expect(className).toMatch(/border-l-interactive03/);
    });

    it('非 active 時は border-l-transparent でレイアウト幅を維持する', () => {
      renderInList(<ListOptionItem id="opt-1">item</ListOptionItem>);
      expect(screen.getByRole('option').className).toMatch(/border-l-transparent/);
    });
  });

  describe('イベント', () => {
    it('onClick が呼ばれる', () => {
      const onClick = vi.fn();
      renderInList(
        <ListOptionItem id="opt-1" onClick={onClick}>
          item
        </ListOptionItem>,
      );
      fireEvent.click(screen.getByRole('option'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('isDisabled の時は onClick が呼ばれない', () => {
      const onClick = vi.fn();
      renderInList(
        <ListOptionItem id="opt-1" isDisabled onClick={onClick}>
          item
        </ListOptionItem>,
      );
      fireEvent.click(screen.getByRole('option'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('onMouseEnter が呼ばれる', () => {
      const onMouseEnter = vi.fn();
      renderInList(
        <ListOptionItem id="opt-1" onMouseEnter={onMouseEnter}>
          item
        </ListOptionItem>,
      );
      fireEvent.mouseEnter(screen.getByRole('option'));
      expect(onMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('isDisabled の時は onMouseEnter が呼ばれない', () => {
      const onMouseEnter = vi.fn();
      renderInList(
        <ListOptionItem id="opt-1" isDisabled onMouseEnter={onMouseEnter}>
          item
        </ListOptionItem>,
      );
      fireEvent.mouseEnter(screen.getByRole('option'));
      expect(onMouseEnter).not.toHaveBeenCalled();
    });

    it('onMouseDown で preventDefault が呼ばれる（input フォーカス維持）', () => {
      renderInList(<ListOptionItem id="opt-1">item</ListOptionItem>);
      const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      screen.getByRole('option').dispatchEvent(event);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('制約', () => {
    it('List の外で使うとエラーが投げられる', () => {
      // console.error を抑制（React のエラーログ）
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => null);
      expect(() => render(<ListOptionItem id="opt-1">item</ListOptionItem>)).toThrow(
        '<List.OptionItem> must be used inside <List>',
      );
      consoleError.mockRestore();
    });
  });

  describe('Compound アクセス', () => {
    it('List.OptionItem として呼び出せる', () => {
      render(
        <List aria-label="テスト">
          <List.OptionItem id="opt-1">item</List.OptionItem>
        </List>,
      );
      expect(screen.getByRole('option')).toHaveTextContent('item');
    });
  });
});
