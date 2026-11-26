import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Search } from './search';

describe('Search', () => {
  describe('基本機能', () => {
    it('value とプレースホルダーが input に反映される', () => {
      render(<Search value="山田" placeholder="名前で検索" onChange={vi.fn()} />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveValue('山田');
      expect(input).toHaveAttribute('placeholder', '名前で検索');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('入力すると onChange が呼ばれる', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Search value="" onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'a');

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('Enter で onSubmit が呼ばれる', async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn((e: { preventDefault: () => void }) => e.preventDefault());
      render(<Search value="山田" onChange={vi.fn()} onSubmit={handleSubmit} />);

      await user.type(screen.getByRole('textbox'), '{Enter}');

      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('ref は外側の div を指す', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Search ref={ref} value="" onChange={vi.fn()} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.querySelector('input')).toBe(screen.getByRole('textbox'));
    });
  });

  describe('クリアボタン', () => {
    it('onClickClearButton と値があるときだけ表示され、押すとハンドラが呼ばれる', async () => {
      const user = userEvent.setup();
      const handleClear = vi.fn();
      const { rerender } = render(<Search value="" onChange={vi.fn()} onClickClearButton={handleClear} />);

      expect(screen.queryByRole('button')).not.toBeInTheDocument();

      rerender(<Search value="山田" onChange={vi.fn()} onClickClearButton={handleClear} />);
      await user.click(screen.getByRole('button'));

      expect(handleClear).toHaveBeenCalledTimes(1);
    });

    it('onClickClearButton がなければ値があっても表示されない', () => {
      render(<Search value="山田" onChange={vi.fn()} />);

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('input への属性の受け渡し', () => {
    it('autoComplete が input に付く', () => {
      render(<Search value="" onChange={vi.fn()} autoComplete="off" />);

      expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'off');
    });

    it('autoComplete を指定しなければ autocomplete 属性は付かない', () => {
      render(<Search value="" onChange={vi.fn()} />);

      expect(screen.getByRole('textbox')).not.toHaveAttribute('autocomplete');
    });

    it('name / id / aria-label / aria-describedby が input に付く', () => {
      render(
        <>
          <Search
            value=""
            onChange={vi.fn()}
            name="keyword"
            id="member-search"
            aria-label="メンバーを検索"
            aria-describedby="search-help"
          />
          <p id="search-help">名前またはメールアドレスで検索できます</p>
        </>,
      );
      const input = screen.getByRole('textbox', { name: 'メンバーを検索' });

      expect(input).toHaveAttribute('name', 'keyword');
      expect(input).toHaveAttribute('id', 'member-search');
      expect(input).toHaveAccessibleDescription('名前またはメールアドレスで検索できます');
    });

    it('<label htmlFor> で input にラベルを関連付けられる', () => {
      render(
        <>
          <label htmlFor="member-search">メンバー検索</label>
          <Search value="" onChange={vi.fn()} id="member-search" />
        </>,
      );

      expect(screen.getByRole('textbox', { name: 'メンバー検索' })).toBeInTheDocument();
    });

    it('onKeyDown / onFocus / onBlur が input で呼ばれる', async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      render(
        <Search value="" onChange={vi.fn()} onKeyDown={handleKeyDown} onFocus={handleFocus} onBlur={handleBlur} />,
      );

      await user.click(screen.getByRole('textbox'));
      await user.keyboard('a');
      await user.tab();

      expect(handleFocus).toHaveBeenCalledTimes(1);
      expect(handleKeyDown).toHaveBeenCalled();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('width は input ではなく外枠の幅に使われる', () => {
      render(<Search value="" onChange={vi.fn()} width="320px" />);
      const input = screen.getByRole('textbox');

      expect(input).not.toHaveAttribute('width');
      expect(input.parentElement).toHaveStyle({ width: '320px' });
    });

    it('className を渡しても input には付かず、既定のクラスのままになる', () => {
      // 型では受け取らないが、実行時に渡されても上書きされることを確認する
      const extraProps = { className: 'custom-class' } as Record<string, unknown>;
      render(<Search value="" onChange={vi.fn()} {...extraProps} />);
      const input = screen.getByRole('textbox');

      expect(input).not.toHaveClass('custom-class');
      expect(input).toHaveClass('typography-label14regular');
    });

    it('type は常に text になる', () => {
      // 型では受け取らないが、実行時に渡されても上書きされることを確認する
      const extraProps = { type: 'password' } as Record<string, unknown>;
      render(<Search value="" onChange={vi.fn()} {...extraProps} />);

      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });
  });
});
