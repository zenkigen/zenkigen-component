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
    it('outline の時に wrapper に border クラスが付く', () => {
      render(
        <List variant="outline" aria-label="テスト">
          <li id="x">item</li>
        </List>,
      );
      const wrapper = screen.getByRole('listbox').parentElement;
      expect(wrapper?.className).toMatch(/border/);
    });

    it('borderless の時に wrapper に border クラスが付かない', () => {
      render(
        <List variant="borderless" aria-label="テスト">
          <li id="x">item</li>
        </List>,
      );
      const wrapper = screen.getByRole('listbox').parentElement;
      expect(wrapper?.className).not.toMatch(/border-uiBorder01/);
    });
  });

  describe('レイアウト制御', () => {
    it('maxHeight / width を wrapper style に反映する', () => {
      render(
        <List maxHeight={200} width={300} aria-label="テスト">
          <li id="x">item</li>
        </List>,
      );
      const wrapper = screen.getByRole('listbox').parentElement;
      expect(wrapper).toHaveStyle({ maxHeight: '200px', width: '300px' });
    });
  });

  describe('2 層構造 (macOS bounce 対策)', () => {
    it('role=listbox の親が div で装飾クラスを持つ', () => {
      render(
        <List aria-label="テスト">
          <li id="x">item</li>
        </List>,
      );
      const wrapper = screen.getByRole('listbox').parentElement;
      expect(wrapper?.tagName).toBe('DIV');
      expect(wrapper?.className).toMatch(/bg-uiBackground01/);
      expect(wrapper?.className).toMatch(/overflow-hidden/);
      expect(wrapper?.className).toMatch(/rounded/);
      expect(wrapper?.className).toMatch(/shadow-floatingShadow/);
    });

    it('ul は scrollable class (overflow-y-auto / flex-1 / min-h-0) を持つ', () => {
      render(
        <List aria-label="テスト">
          <li id="x">item</li>
        </List>,
      );
      const list = screen.getByRole('listbox');
      expect(list.className).toMatch(/overflow-y-auto/);
      expect(list.className).toMatch(/flex-1/);
      expect(list.className).toMatch(/min-h-0/);
    });
  });

  describe('selectionIndicator', () => {
    const renderWithIndicator = (indicator: 'left' | 'right' | 'none', item: React.ReactNode) =>
      render(
        <List aria-label="テスト" selectionIndicator={indicator}>
          {item}
        </List>,
      );

    it('default (指定なし) はチェックマーク領域を描画しない', () => {
      render(
        <List aria-label="テスト">
          <ListOptionItem id="opt-1" isSelected>
            選択項目
          </ListOptionItem>
        </List>,
      );
      const option = screen.getByRole('option');
      expect(option.querySelector('[data-selection-indicator]')).toBeNull();
    });

    it("'none' 指定でもチェックマーク領域を描画しない", () => {
      renderWithIndicator(
        'none',
        <ListOptionItem id="opt-1" isSelected>
          選択項目
        </ListOptionItem>,
      );
      const option = screen.getByRole('option');
      expect(option.querySelector('[data-selection-indicator]')).toBeNull();
    });

    it("'left' + isSelected で children の前に check Icon が表示される", () => {
      renderWithIndicator(
        'left',
        <ListOptionItem id="opt-1" isSelected>
          選択項目
        </ListOptionItem>,
      );
      const option = screen.getByRole('option');
      const indicator = option.querySelector('[data-selection-indicator]');
      expect(indicator).not.toBeNull();
      expect(indicator).toHaveAttribute('aria-hidden', 'true');
      // children の前に配置 (firstChild は indicator)
      expect(option.firstElementChild).toBe(indicator);
      // Icon (svg) が内部に存在
      expect(indicator?.querySelector('svg')).not.toBeNull();
    });

    it("'left' + 非選択ではアイコン本体は描画されないが領域は確保される", () => {
      renderWithIndicator('left', <ListOptionItem id="opt-1">通常項目</ListOptionItem>);
      const option = screen.getByRole('option');
      const indicator = option.querySelector('[data-selection-indicator]');
      expect(indicator).not.toBeNull();
      expect(indicator?.querySelector('svg')).toBeNull();
      // 領域 16px (size-4)
      expect(indicator?.className).toMatch(/size-4/);
    });

    it("'right' + isSelected で children の後に check Icon が表示される", () => {
      renderWithIndicator(
        'right',
        <ListOptionItem id="opt-1" isSelected>
          選択項目
        </ListOptionItem>,
      );
      const option = screen.getByRole('option');
      const indicator = option.querySelector('[data-selection-indicator]');
      expect(indicator).not.toBeNull();
      // children の後ろに配置
      expect(option.lastElementChild).toBe(indicator);
    });

    it('isDisabled + isSelected でもチェックアイコン本体は非表示（領域は確保）', () => {
      renderWithIndicator(
        'left',
        <ListOptionItem id="opt-1" isSelected isDisabled>
          disabled selected
        </ListOptionItem>,
      );
      const option = screen.getByRole('option');
      const indicator = option.querySelector('[data-selection-indicator]');
      expect(indicator).not.toBeNull();
      expect(indicator?.querySelector('svg')).toBeNull();
    });
  });

  describe('forwardRef', () => {
    it('ref に ul 要素を渡す (公開 API 維持)', () => {
      const ref = { current: null as HTMLUListElement | null };
      render(
        <List ref={ref} aria-label="テスト">
          <li id="x">item</li>
        </List>,
      );
      expect(ref.current).toBeInstanceOf(HTMLUListElement);
    });

    it('containerRef に wrapper div 要素を渡す', () => {
      const containerRef = { current: null as HTMLDivElement | null };
      render(
        <List containerRef={containerRef} aria-label="テスト">
          <li id="x">item</li>
        </List>,
      );
      expect(containerRef.current).toBeInstanceOf(HTMLDivElement);
      expect(containerRef.current?.className).toMatch(/bg-uiBackground01/);
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
