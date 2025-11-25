import { fireEvent, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { TextInput } from './text-input';

describe('TextInput', () => {
  describe('基本機能', () => {
    it('正常にレンダリングされること', () => {
      render(<TextInput value="テスト" readOnly data-testid="text-input" />);
      const input = screen.getByTestId('text-input');

      expect(input).toBeInTheDocument();
      expect(input.tagName).toBe('INPUT');
    });

    it('valueプロパティが正しく表示されること', () => {
      render(<TextInput value="サンプル" readOnly data-testid="text-input" />);
      const input = screen.getByTestId('text-input') as HTMLInputElement;

      expect(input.value).toBe('サンプル');
    });

    it('onChangeイベントが正しく動作すること', () => {
      const handleChange = vi.fn();
      render(<TextInput value="" onChange={handleChange} data-testid="text-input" />);

      fireEvent.change(screen.getByTestId('text-input'), { target: { value: '変更後' } });
      expect(handleChange).toHaveBeenCalled();
    });

    it('placeholderが正しく表示されること', () => {
      render(<TextInput value="" readOnly placeholder="入力してください" data-testid="text-input" />);

      expect(screen.getByTestId('text-input')).toHaveAttribute('placeholder', '入力してください');
      expect(screen.getByTestId('text-input').className).toMatch(/placeholder:text-textPlaceholder/);
    });

    it('refが正しく転送されること', () => {
      const ref = createRef<HTMLInputElement>();
      render(<TextInput value="" readOnly ref={ref} data-testid="text-input" />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.tagName).toBe('INPUT');
    });
  });

  describe('サイズバリエーション', () => {
    it('medium（デフォルト）のスタイルが適用されること', () => {
      render(<TextInput value="" readOnly data-testid="text-input" />);
      const input = screen.getByTestId('text-input');

      expect(input.className).toMatch(/typography-label14regular/);
      expect(input.className).toMatch(/min-h-8/);
      expect(input.className).toMatch(/px-2/);
    });

    it('largeサイズのスタイルが適用されること', () => {
      render(<TextInput value="" size="large" readOnly data-testid="text-input" />);
      const input = screen.getByTestId('text-input');

      expect(input.className).toMatch(/typography-label16regular/);
      expect(input.className).toMatch(/min-h-10/);
      expect(input.className).toMatch(/px-3/);
    });
  });

  describe('状態管理', () => {
    it('通常状態のスタイルが適用されること', () => {
      render(<TextInput value="" readOnly data-testid="text-input" />);
      const input = screen.getByTestId('text-input');
      const wrapper = input.parentElement as HTMLElement;

      expect(wrapper.className).toMatch(/border-uiBorder02/);
      expect(wrapper.className).not.toMatch(/border-supportError/);
      expect(input.className).toMatch(/text-text01/);
    });

    it('エラー状態のスタイルが適用されること', () => {
      render(<TextInput value="" isError readOnly data-testid="text-input" />);
      const input = screen.getByTestId('text-input');
      const wrapper = input.parentElement as HTMLElement;

      expect(wrapper.className).toMatch(/border-supportError/);
      expect(wrapper.className).not.toMatch(/border-uiBorder02/);
      expect(input.className).toMatch(/text-supportError/);
    });

    it('無効状態のスタイルが適用されること', () => {
      render(<TextInput value="" disabled data-testid="text-input" />);
      const input = screen.getByTestId('text-input');
      const wrapper = input.parentElement as HTMLElement;

      expect(input).toBeDisabled();
      expect(wrapper.className).toMatch(/bg-disabled02/);
      expect(wrapper.className).toMatch(/border-disabled01/);
    });

    it('無効状態がエラー状態より優先されること', () => {
      render(<TextInput value="" isError disabled data-testid="text-input" />);
      const input = screen.getByTestId('text-input');
      const wrapper = input.parentElement as HTMLElement;

      expect(input).toBeDisabled();
      expect(wrapper.className).toMatch(/bg-disabled02/);
      expect(wrapper.className).toMatch(/border-disabled01/);
      expect(wrapper.className).not.toMatch(/border-supportError/);
    });
  });

  describe('クリアボタン', () => {
    const findClearButton = () =>
      screen.queryAllByRole('button').find((button) => button.querySelector('svg[aria-label="close"]') != null);

    it('値がありonClickClearButtonが指定されているときに表示されること', () => {
      render(<TextInput value="入力値" onChange={() => {}} onClickClearButton={() => {}} data-testid="text-input" />);

      expect(findClearButton()).toBeDefined();
    });

    it('クリアボタンをクリックするとonClickClearButtonが呼ばれること', () => {
      const handleClear = vi.fn();
      render(<TextInput value="abc" onChange={() => {}} onClickClearButton={handleClear} data-testid="text-input" />);

      const clearButton = findClearButton();
      expect(clearButton).toBeDefined();

      if (clearButton) {
        fireEvent.click(clearButton);
      }

      expect(handleClear).toHaveBeenCalled();
    });

    it('値が空のときはクリアボタンが表示されないこと', () => {
      render(<TextInput value="" onChange={() => {}} onClickClearButton={() => {}} data-testid="text-input" />);

      expect(findClearButton()).toBeUndefined();
    });

    it('disabledの場合はクリアボタンが表示されないこと', () => {
      render(
        <TextInput value="abc" disabled onChange={() => {}} onClickClearButton={() => {}} data-testid="text-input" />,
      );

      expect(findClearButton()).toBeUndefined();
    });

    it('disabledの場合はonClickClearButtonが呼ばれないこと', () => {
      const handleClear = vi.fn();
      render(<TextInput value="abc" disabled onChange={() => {}} onClickClearButton={handleClear} />);

      const clearButton = findClearButton();
      expect(clearButton).toBeUndefined();

      if (clearButton) {
        fireEvent.click(clearButton);
      }

      expect(handleClear).not.toHaveBeenCalled();
    });
  });

  describe('アクセシビリティ', () => {
    it('Tabキーでフォーカスできること', async () => {
      const user = await import('@testing-library/user-event').then((m) => m.default);
      render(<TextInput value="" readOnly data-testid="text-input" />);

      (document.activeElement as HTMLElement | null)?.blur();
      await user.tab();

      expect(screen.getByTestId('text-input')).toHaveFocus();
    });

    it('disabledの場合はフォーカスされないこと', async () => {
      const user = await import('@testing-library/user-event').then((m) => m.default);
      render(<TextInput value="" readOnly disabled data-testid="text-input" />);

      (document.activeElement as HTMLElement | null)?.blur();
      await user.tab();

      expect(screen.getByTestId('text-input')).not.toHaveFocus();
    });

    it('ref経由でfocus()できること', () => {
      const ref = createRef<HTMLInputElement>();
      render(<TextInput value="" readOnly ref={ref} data-testid="text-input" />);

      ref.current?.focus();
      expect(screen.getByTestId('text-input')).toHaveFocus();
    });
  });

  describe('HTML属性の伝搬', () => {
    it('type属性が反映されること', () => {
      render(<TextInput value="" type="number" readOnly data-testid="text-input" />);
      const input = screen.getByTestId('text-input');

      expect(input).toHaveAttribute('type', 'number');
    });

    it('name属性が反映されること', () => {
      render(<TextInput value="" name="username" readOnly data-testid="text-input" />);
      const input = screen.getByTestId('text-input');

      expect(input).toHaveAttribute('name', 'username');
    });

    it('maxLength属性が反映されること', () => {
      render(<TextInput value="" maxLength={10} readOnly data-testid="text-input" />);
      const input = screen.getByTestId('text-input');

      expect(input).toHaveAttribute('maxlength', '10');
    });
  });
});
