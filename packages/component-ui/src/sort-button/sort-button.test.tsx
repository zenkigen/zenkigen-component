import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { SortButton } from './sort-button';

describe('SortButton', () => {
  describe('基本機能', () => {
    it('正常にレンダリングされること', () => {
      render(<SortButton label="テストラベル" sortOrder={null} aria-label="テストボタン" data-testid="sort-button" />);
      const button = screen.getByTestId('sort-button');
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
    });

    it('labelが正しく表示されること', () => {
      render(<SortButton label="項目名" sortOrder={null} aria-label="項目名でソート" data-testid="sort-button" />);
      const button = screen.getByTestId('sort-button');
      expect(button).toHaveTextContent('項目名');
    });

    it('onClickイベントが正しく動作すること', () => {
      const handleClick = vi.fn();
      render(
        <SortButton
          label="テストラベル"
          sortOrder={null}
          onClick={handleClick}
          aria-label="テストボタン"
          data-testid="sort-button"
        />,
      );
      const button = screen.getByTestId('sort-button');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('onClickが未指定の場合でもエラーが発生しないこと', () => {
      render(<SortButton label="テストラベル" sortOrder={null} aria-label="テストボタン" data-testid="sort-button" />);
      const button = screen.getByTestId('sort-button');
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it('aria-labelが正しく設定されること', () => {
      render(<SortButton label="項目名" sortOrder={null} aria-label="項目名でソート" data-testid="sort-button" />);
      const button = screen.getByTestId('sort-button');
      expect(button).toHaveAttribute('aria-label', '項目名でソート');
    });

    it('type="button"が設定されること', () => {
      render(<SortButton label="テストラベル" sortOrder={null} aria-label="テストボタン" data-testid="sort-button" />);
      const button = screen.getByTestId('sort-button');
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('サイズバリエーション', () => {
    it('x-smallサイズのスタイルが適用されること', () => {
      render(
        <SortButton
          label="テストラベル"
          size="x-small"
          sortOrder={null}
          aria-label="テストボタン"
          data-testid="sort-button"
        />,
      );
      const button = screen.getByTestId('sort-button');
      const wrapper = button.parentElement as HTMLElement;

      expect(wrapper.className).toMatch(/h-6/);
      expect(button.className).toMatch(/px-2/);
      expect(button.querySelector('div')).toHaveClass('typography-label12regular');
    });

    it('smallサイズのスタイルが適用されること', () => {
      render(
        <SortButton
          label="テストラベル"
          size="small"
          sortOrder={null}
          aria-label="テストボタン"
          data-testid="sort-button"
        />,
      );
      const button = screen.getByTestId('sort-button');
      const wrapper = button.parentElement as HTMLElement;

      expect(wrapper.className).toMatch(/h-6/);
      expect(button.className).toMatch(/px-2/);
      expect(button.querySelector('div')).toHaveClass('typography-label14regular');
    });

    it('mediumサイズ（デフォルト）のスタイルが適用されること', () => {
      render(<SortButton label="テストラベル" sortOrder={null} aria-label="テストボタン" data-testid="sort-button" />);
      const button = screen.getByTestId('sort-button');
      const wrapper = button.parentElement as HTMLElement;

      expect(wrapper.className).toMatch(/h-8/);
      expect(button.className).toMatch(/px-4/);
      expect(button.querySelector('div')).toHaveClass('typography-label14regular');
    });

    it('largeサイズのスタイルが適用されること', () => {
      render(
        <SortButton
          label="テストラベル"
          size="large"
          sortOrder={null}
          aria-label="テストボタン"
          data-testid="sort-button"
        />,
      );
      const button = screen.getByTestId('sort-button');
      const wrapper = button.parentElement as HTMLElement;

      expect(wrapper.className).toMatch(/h-10/);
      expect(button.className).toMatch(/px-4/);
      expect(button.querySelector('div')).toHaveClass('typography-label16regular');
    });
  });

  describe('ソート状態とアイコン表示', () => {
    it('sortOrder=nullの場合にangle-small-downアイコンが表示されること', () => {
      render(<SortButton label="テストラベル" sortOrder={null} aria-label="テストボタン" data-testid="sort-button" />);
      const button = screen.getByTestId('sort-button');
      const iconSvg = button.querySelector('span svg[aria-label="angleSmallDown"]');
      expect(iconSvg).toBeInTheDocument();
      // アイコンコンポーネントが存在することを確認
      expect(button.querySelector('span')).toHaveClass('inline-block', 'shrink-0');
    });

    it('sortOrder="ascend"の場合にarrow-upアイコンが表示されること', () => {
      render(
        <SortButton label="テストラベル" sortOrder="ascend" aria-label="テストボタン" data-testid="sort-button" />,
      );
      const button = screen.getByTestId('sort-button');
      const iconSvg = button.querySelector('span svg[aria-label="arrowUp"]');
      expect(iconSvg).toBeInTheDocument();
      // アイコンコンポーネントが存在することを確認
      expect(button.querySelector('span')).toHaveClass('inline-block', 'shrink-0');
    });

    it('sortOrder="descend"の場合にarrow-downアイコンが表示されること', () => {
      render(
        <SortButton label="テストラベル" sortOrder="descend" aria-label="テストボタン" data-testid="sort-button" />,
      );
      const button = screen.getByTestId('sort-button');
      const iconSvg = button.querySelector('span svg[aria-label="arrowDown"]');
      expect(iconSvg).toBeInTheDocument();
      // アイコンコンポーネントが存在することを確認
      expect(button.querySelector('span')).toHaveClass('inline-block', 'shrink-0');
    });

    it('sortOrder=nullの場合に通常状態のスタイルが適用されること', () => {
      render(<SortButton label="テストラベル" sortOrder={null} aria-label="テストボタン" data-testid="sort-button" />);
      const button = screen.getByTestId('sort-button');
      expect(button.className).toMatch(/text-interactive02/); // base color
    });

    it('sortOrder="ascend"の場合に選択状態のスタイルが適用されること', () => {
      render(
        <SortButton label="テストラベル" sortOrder="ascend" aria-label="テストボタン" data-testid="sort-button" />,
      );
      const button = screen.getByTestId('sort-button');
      expect(button.className).toMatch(/bg-selectedUi/); // selected style
    });

    it('sortOrder="descend"の場合に選択状態のスタイルが適用されること', () => {
      render(
        <SortButton label="テストラベル" sortOrder="descend" aria-label="テストボタン" data-testid="sort-button" />,
      );
      const button = screen.getByTestId('sort-button');
      expect(button.className).toMatch(/bg-selectedUi/); // selected style
    });

    it('アイコンが正しく切り替わること', () => {
      const { rerender } = render(
        <SortButton label="テストラベル" sortOrder={null} aria-label="テストボタン" data-testid="sort-button" />,
      );

      // 初期状態（null）でangle-small-downアイコンが表示
      let button = screen.getByTestId('sort-button');
      expect(button.querySelector('span svg[aria-label="angleSmallDown"]')).toBeInTheDocument();
      expect(button.querySelector('span svg[aria-label="arrowUp"]')).not.toBeInTheDocument();
      expect(button.querySelector('span svg[aria-label="arrowDown"]')).not.toBeInTheDocument();

      // ascendに変更してarrow-upアイコンが表示
      rerender(
        <SortButton label="テストラベル" sortOrder="ascend" aria-label="テストボタン" data-testid="sort-button" />,
      );
      button = screen.getByTestId('sort-button');
      expect(button.querySelector('span svg[aria-label="arrowUp"]')).toBeInTheDocument();
      expect(button.querySelector('span svg[aria-label="angleSmallDown"]')).not.toBeInTheDocument();
      expect(button.querySelector('span svg[aria-label="arrowDown"]')).not.toBeInTheDocument();

      // descendに変更してarrow-downアイコンが表示
      rerender(
        <SortButton label="テストラベル" sortOrder="descend" aria-label="テストボタン" data-testid="sort-button" />,
      );
      button = screen.getByTestId('sort-button');
      expect(button.querySelector('span svg[aria-label="arrowDown"]')).toBeInTheDocument();
      expect(button.querySelector('span svg[aria-label="angleSmallDown"]')).not.toBeInTheDocument();
      expect(button.querySelector('span svg[aria-label="arrowUp"]')).not.toBeInTheDocument();
    });
  });

  describe('無効状態', () => {
    it('isDisabled=trueの場合にボタンが無効になること', () => {
      render(
        <SortButton
          label="テストラベル"
          sortOrder={null}
          isDisabled
          aria-label="テストボタン"
          data-testid="sort-button"
        />,
      );
      const button = screen.getByTestId('sort-button');
      expect(button).toBeDisabled();
    });

    it('無効状態でonClickが呼ばれないこと', () => {
      const handleClick = vi.fn();
      render(
        <SortButton
          label="テストラベル"
          sortOrder={null}
          isDisabled
          onClick={handleClick}
          aria-label="テストボタン"
          data-testid="sort-button"
        />,
      );
      const button = screen.getByTestId('sort-button');
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('無効状態のスタイルが適用されること', () => {
      render(
        <SortButton
          label="テストラベル"
          sortOrder={null}
          isDisabled
          aria-label="テストボタン"
          data-testid="sort-button"
        />,
      );
      const button = screen.getByTestId('sort-button');
      const wrapper = button.parentElement as HTMLElement;

      expect(wrapper.className).toMatch(/cursor-not-allowed/);
      expect(button.className).toMatch(/pointer-events-none/);
    });

    it('aria-disabled属性が正しく設定されること', () => {
      render(
        <SortButton
          label="テストラベル"
          sortOrder={null}
          isDisabled
          aria-label="テストボタン"
          data-testid="sort-button"
        />,
      );
      const button = screen.getByTestId('sort-button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('無効状態でもソート状態に応じたアイコンが表示されること', () => {
      render(
        <SortButton
          label="テストラベル"
          sortOrder="ascend"
          isDisabled
          aria-label="テストボタン"
          data-testid="sort-button"
        />,
      );
      const button = screen.getByTestId('sort-button');
      const iconSvg = button.querySelector('span svg[aria-label="arrowUp"]');
      expect(iconSvg).toBeInTheDocument();
      // アイコンコンポーネントが存在することを確認
      expect(button.querySelector('span')).toHaveClass('inline-block', 'shrink-0');
    });
  });

  describe('アクセシビリティ', () => {
    it('Tabキーでボタンにフォーカスできること', async () => {
      const user = await import('@testing-library/user-event').then((m) => m.default);
      render(<SortButton label="テストラベル" sortOrder={null} aria-label="テストボタン" data-testid="sort-button" />);
      const button = screen.getByTestId('sort-button');
      (document.activeElement as HTMLElement)?.blur();
      await user.tab();
      expect(button).toHaveFocus();
    });

    it('無効状態ではフォーカスできないこと', async () => {
      const user = await import('@testing-library/user-event').then((m) => m.default);
      render(
        <SortButton
          label="テストラベル"
          sortOrder={null}
          isDisabled
          aria-label="テストボタン"
          data-testid="sort-button"
        />,
      );
      const button = screen.getByTestId('sort-button');
      (document.activeElement as HTMLElement)?.blur();
      await user.tab();
      expect(button).not.toHaveFocus();
    });

    it('Enterキーでボタンが動作すること', async () => {
      const user = await import('@testing-library/user-event').then((m) => m.default);
      const handleClick = vi.fn();
      render(
        <SortButton
          label="テストラベル"
          sortOrder={null}
          onClick={handleClick}
          aria-label="テストボタン"
          data-testid="sort-button"
        />,
      );
      const button = screen.getByTestId('sort-button');
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('Spaceキーでボタンが動作すること', async () => {
      const user = await import('@testing-library/user-event').then((m) => m.default);
      const handleClick = vi.fn();
      render(
        <SortButton
          label="テストラベル"
          sortOrder={null}
          onClick={handleClick}
          aria-label="テストボタン"
          data-testid="sort-button"
        />,
      );
      const button = screen.getByTestId('sort-button');
      button.focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('その他のプロパティ', () => {
    it('width指定が正しく適用されること', () => {
      render(
        <SortButton
          label="テストラベル"
          sortOrder={null}
          width="200px"
          aria-label="テストボタン"
          data-testid="sort-button"
        />,
      );
      const button = screen.getByTestId('sort-button');
      const wrapper = button.parentElement as HTMLElement;
      expect(wrapper.style.width).toBe('200px');
    });

    it('width指定が数値の場合も正しく適用されること', () => {
      render(
        <SortButton
          label="テストラベル"
          sortOrder={null}
          width={300}
          aria-label="テストボタン"
          data-testid="sort-button"
        />,
      );
      const button = screen.getByTestId('sort-button');
      const wrapper = button.parentElement as HTMLElement;
      expect(wrapper.style.width).toBe('300px');
    });

    it('HTMLButtonElement属性が正しく継承されること', () => {
      render(
        <SortButton
          label="テストラベル"
          sortOrder={null}
          aria-label="テストボタン"
          id="test-sort-button"
          title="ソートボタン"
          data-testid="sort-button"
        />,
      );
      const button = screen.getByTestId('sort-button');
      expect(button).toHaveAttribute('id', 'test-sort-button');
      expect(button).toHaveAttribute('title', 'ソートボタン');
    });

    it('アイコンのサイズがボタンサイズに応じて変わること', () => {
      const { rerender } = render(
        <SortButton
          label="テストラベル"
          size="large"
          sortOrder={null}
          aria-label="テストボタン"
          data-testid="sort-button"
        />,
      );

      // largeの場合はmediumアイコン
      let button = screen.getByTestId('sort-button');
      let iconSpan = button.querySelector('span');
      expect(iconSpan).toHaveClass('w-6', 'h-6'); // medium size

      // medium以下の場合はsmallアイコン
      rerender(
        <SortButton
          label="テストラベル"
          size="medium"
          sortOrder={null}
          aria-label="テストボタン"
          data-testid="sort-button"
        />,
      );

      button = screen.getByTestId('sort-button');
      iconSpan = button.querySelector('span');
      expect(iconSpan).toHaveClass('w-4', 'h-4'); // small size
    });
  });

  describe('レイアウト', () => {
    it('ラベルとアイコンが正しく配置されること', () => {
      render(<SortButton label="テストラベル" sortOrder={null} aria-label="テストボタン" data-testid="sort-button" />);
      const button = screen.getByTestId('sort-button');
      const labelDiv = button.querySelector('div:first-child');
      const iconDiv = button.querySelector('div:last-child');

      expect(labelDiv).toHaveTextContent('テストラベル');
      expect(labelDiv?.className).toMatch(/truncate/);
      expect(iconDiv?.className).toMatch(/ml-auto/);
      expect(iconDiv?.className).toMatch(/flex/);
      expect(iconDiv?.className).toMatch(/items-center/);
    });

    it('ラベルが長い場合にtruncateが適用されること', () => {
      render(
        <SortButton
          label="非常に長いラベル名で画面幅を超えてしまう可能性がある場合のテスト"
          sortOrder={null}
          aria-label="テストボタン"
          data-testid="sort-button"
        />,
      );
      const button = screen.getByTestId('sort-button');
      const labelDiv = button.querySelector('div:first-child');
      expect(labelDiv?.className).toMatch(/truncate/);
    });
  });
});
