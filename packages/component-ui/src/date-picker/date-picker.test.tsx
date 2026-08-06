import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { MODAL_OPEN_EVENT } from '../hooks/use-dismiss-on-modal-open';
import { DatePicker } from './date-picker';

const openPopover = async (user: ReturnType<typeof userEvent.setup>) => {
  const trigger = screen.getByRole('button');
  await user.click(trigger);

  return screen.getByRole('dialog', { name: '日付選択' });
};

const findDayButton = (container: HTMLElement, label: string) => {
  const buttons = Array.from(container.querySelectorAll('button'));

  return buttons.find((button) => button.textContent === label) ?? null;
};

describe('DatePicker', () => {
  describe('基本レンダリング', () => {
    it('value が null の場合、デフォルトのプレースホルダーが表示されること', () => {
      render(<DatePicker value={null} onChange={vi.fn()} />);

      expect(screen.getByRole('button')).toHaveTextContent('日付を選択');
    });

    it('カスタム placeholder が表示されること', () => {
      render(<DatePicker value={null} onChange={vi.fn()} placeholder="日付を入力してください" />);

      expect(screen.getByRole('button')).toHaveTextContent('日付を入力してください');
    });
  });

  describe('サイズバリエーション', () => {
    it.each(['small', 'medium', 'large', 'x-large'] as const)('size=%s でレンダリングされること', (size) => {
      render(<DatePicker value={null} onChange={vi.fn()} size={size} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    /**
     * size ごとのカレンダー寸法
     *
     * x-large だけカレンダーが拡大される。既存 3 サイズは同一トークンを共有しているため、
     * 代表として medium を対照に置き、リファクタで既存の見た目が変わっていないことを検出する。
     */
    const calendarSizeCases = [
      {
        size: 'medium',
        rootFontSize: '12px',
        dayWidth: '30px',
        dayButtonWidth: '28px',
        navHeight: '30px',
        dayButtonFontSize: '12px',
        dayButtonSizeClass: 'size-full',
        monthLabelTypography: 'typography-label12bold',
        weekdaySizeClass: 'size-7',
        todayButtonSizeClass: 'h-8',
        clearButtonSizeClass: 'h-6',
        errorTypography: 'typography-label11regular',
      },
      {
        size: 'x-large',
        rootFontSize: '16px',
        dayWidth: '48px',
        dayButtonWidth: '40px',
        navHeight: '40px',
        dayButtonFontSize: '16px',
        dayButtonSizeClass: 'size-10',
        monthLabelTypography: 'typography-label16bold',
        weekdaySizeClass: 'size-10',
        todayButtonSizeClass: 'h-10',
        clearButtonSizeClass: 'h-10',
        errorTypography: 'typography-label12regular',
      },
    ] as const;

    describe.each(calendarSizeCases)('size=$size のカレンダー寸法', (expected) => {
      const renderAndOpen = async () => {
        const user = userEvent.setup();
        const { container } = render(<DatePicker value={null} onChange={vi.fn()} size={expected.size} />);
        const dialog = await openPopover(user);

        return { container, dialog };
      };

      it('DayPicker の CSS 変数とフォントサイズが適用されること', async () => {
        const { dialog } = await renderAndOpen();
        const root = dialog.querySelector<HTMLElement>('.rdp-root');

        expect(root).not.toBeNull();
        expect(root?.style.getPropertyValue('--rdp-day-width')).toBe(expected.dayWidth);
        expect(root?.style.getPropertyValue('--rdp-day-height')).toBe(expected.dayWidth);
        expect(root?.style.getPropertyValue('--rdp-day_button-width')).toBe(expected.dayButtonWidth);
        expect(root?.style.getPropertyValue('--rdp-day_button-height')).toBe(expected.dayButtonWidth);
        expect(root?.style.getPropertyValue('--rdp-nav-height')).toBe(expected.navHeight);
        expect(root?.style.fontSize).toBe(expected.rootFontSize);
      });

      it('日付ボタンのフォントサイズとサイズクラスが適用されること', async () => {
        const { dialog } = await renderAndOpen();
        const dayButton = findDayButton(dialog, '15');

        expect(dayButton).not.toBeNull();
        // .rdp-selected の font-size: large を打ち消すための inline 指定
        expect(dayButton?.style.fontSize).toBe(expected.dayButtonFontSize);
        expect(dayButton).toHaveClass(expected.dayButtonSizeClass);
      });

      it('月ラベルと曜日ヘッダーのサイズが適用されること', async () => {
        const { dialog } = await renderAndOpen();

        expect(dialog.querySelector(`.${expected.monthLabelTypography}`)).not.toBeNull();
        expect(dialog.querySelectorAll('th')[0]).toHaveClass(expected.weekdaySizeClass);
      });

      it('フッターのボタンサイズが適用されること', async () => {
        await renderAndOpen();

        expect(screen.getByRole('button', { name: '今日に戻る' })).toHaveClass(expected.todayButtonSizeClass);
        expect(screen.getByRole('button', { name: 'クリア' })).toHaveClass(expected.clearButtonSizeClass);
      });

      it('ErrorMessage の typography が適用されること', () => {
        render(
          <DatePicker value={null} onChange={vi.fn()} size={expected.size} isError>
            <DatePicker.ErrorMessage>エラーメッセージ</DatePicker.ErrorMessage>
          </DatePicker>,
        );

        expect(screen.getByText('エラーメッセージ')).toHaveClass(expected.errorTypography);
      });
    });

    it('size=x-large のトリガーアイコンが medium（24px）になること', () => {
      const { container } = render(<DatePicker value={null} onChange={vi.fn()} size="x-large" />);

      expect(container.querySelector('.w-6.h-6')).not.toBeNull();
    });

    it('size=medium のトリガーアイコンが small（16px）のままであること', () => {
      const { container } = render(<DatePicker value={null} onChange={vi.fn()} size="medium" />);

      expect(container.querySelector('.w-4.h-4')).not.toBeNull();
    });
  });

  describe('日付表示', () => {
    it('value がある場合、yyyy年MM月dd日 形式で表示されること（UTC）', () => {
      render(<DatePicker value={new Date('2026-01-01T00:00:00Z')} onChange={vi.fn()} timeZone="UTC" />);

      expect(screen.getByRole('button')).toHaveTextContent('2026年01月01日');
    });

    it('timeZone=Asia/Tokyo の場合、JST で日付が表示されること', () => {
      // UTC 2026-01-01 15:00:00 は JST 2026-01-02 00:00:00
      render(<DatePicker value={new Date('2026-01-01T15:00:00Z')} onChange={vi.fn()} timeZone="Asia/Tokyo" />);

      expect(screen.getByRole('button')).toHaveTextContent('2026年01月02日');
    });

    it('timeZone=Asia/Tokyo がデフォルトで適用されること', () => {
      // UTC 2026-01-01 15:00:00 は JST 2026-01-02 00:00:00
      render(<DatePicker value={new Date('2026-01-01T15:00:00Z')} onChange={vi.fn()} />);

      expect(screen.getByRole('button')).toHaveTextContent('2026年01月02日');
    });
  });

  describe('エラー状態とアクセシビリティ', () => {
    it('isError=true の場合、ErrorMessage が表示され aria-invalid が付与されること', () => {
      render(
        <DatePicker value={null} onChange={vi.fn()} isError>
          <DatePicker.ErrorMessage>エラー</DatePicker.ErrorMessage>
        </DatePicker>,
      );

      const trigger = screen.getByRole('button');
      expect(screen.getByText('エラー')).toBeInTheDocument();
      expect(trigger).toHaveAttribute('aria-invalid', 'true');
      expect(trigger.getAttribute('aria-describedby')).not.toBeNull();
    });

    it('ErrorMessage の id がトリガーの aria-describedby に設定されること', () => {
      render(
        <DatePicker value={null} onChange={vi.fn()} isError>
          <DatePicker.ErrorMessage id="custom-error-id">カスタムエラー</DatePicker.ErrorMessage>
        </DatePicker>,
      );

      const trigger = screen.getByRole('button');
      expect(trigger.getAttribute('aria-describedby')).toBe('custom-error-id');
    });

    it('複数の ErrorMessage がある場合、全ての id が aria-describedby に含まれること', () => {
      render(
        <DatePicker value={null} onChange={vi.fn()} isError>
          <DatePicker.ErrorMessage id="error-1">エラー1</DatePicker.ErrorMessage>
          <DatePicker.ErrorMessage id="error-2">エラー2</DatePicker.ErrorMessage>
        </DatePicker>,
      );

      const trigger = screen.getByRole('button');
      const describedBy = trigger.getAttribute('aria-describedby');
      expect(describedBy).toContain('error-1');
      expect(describedBy).toContain('error-2');
    });

    it('props の aria-describedby と ErrorMessage の id が結合されること', () => {
      render(
        <DatePicker value={null} onChange={vi.fn()} isError aria-describedby="external-hint">
          <DatePicker.ErrorMessage id="error-msg">エラー</DatePicker.ErrorMessage>
        </DatePicker>,
      );

      const trigger = screen.getByRole('button');
      const describedBy = trigger.getAttribute('aria-describedby');
      expect(describedBy).toContain('external-hint');
      expect(describedBy).toContain('error-msg');
    });
  });

  describe('無効状態', () => {
    it('isDisabled=true の場合、Popover が開かないこと', async () => {
      const user = userEvent.setup();
      render(<DatePicker value={null} onChange={vi.fn()} isDisabled />);

      await user.click(screen.getByRole('button'));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Popover 操作', () => {
    it('Escape キーで Popover が閉じること', async () => {
      const user = userEvent.setup();
      render(<DatePicker value={null} onChange={vi.fn()} />);

      await openPopover(user);
      await user.keyboard('{Escape}');

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('Modal が開かれたイベントを受けると Popover が閉じること', async () => {
      const user = userEvent.setup();
      render(<DatePicker value={null} onChange={vi.fn()} />);

      await openPopover(user);
      expect(screen.getByRole('dialog', { name: '日付選択' })).toBeInTheDocument();

      act(() => {
        window.dispatchEvent(new CustomEvent(MODAL_OPEN_EVENT));
      });

      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: '日付選択' })).not.toBeInTheDocument();
      });
    });
  });

  describe('日付選択', () => {
    it('日付選択で onChange が呼ばれ、Popover が閉じること', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<DatePicker value={new Date('2026-01-01T00:00:00Z')} onChange={handleChange} timeZone="UTC" />);

      const dialog = await openPopover(user);
      const dayButton = findDayButton(dialog, '15');

      expect(dayButton).not.toBeNull();
      if (!dayButton) {
        return;
      }

      await user.click(dayButton);

      expect(handleChange).toHaveBeenCalledTimes(1);
      const firstCall = handleChange.mock.calls[0];
      expect(firstCall).toBeDefined();
      const selected = firstCall![0];
      expect(selected?.toISOString()).toBe('2026-01-15T00:00:00.000Z');
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('同じ日付を再選択した場合、onChange が呼ばれずに Popover が閉じること', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<DatePicker value={new Date('2026-01-15T00:00:00Z')} onChange={handleChange} timeZone="UTC" />);

      const dialog = await openPopover(user);
      const dayButton = findDayButton(dialog, '15');

      expect(dayButton).not.toBeNull();
      if (!dayButton) {
        return;
      }

      await user.click(dayButton);

      expect(handleChange).not.toHaveBeenCalled();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('クリア操作で onChange(null) が呼ばれ、Popover が閉じること', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<DatePicker value={new Date('2026-01-12T00:00:00Z')} onChange={handleChange} timeZone="UTC" />);

      const dialog = await openPopover(user);
      const clearButton = findDayButton(dialog, 'クリア');

      expect(clearButton).not.toBeNull();
      if (!clearButton) {
        return;
      }

      await user.click(clearButton);

      expect(handleChange).toHaveBeenCalledWith(null);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('minDate/maxDate 制限', () => {
    it('minDate より前の日付が無効化されること', async () => {
      const user = userEvent.setup();
      render(
        <DatePicker
          value={new Date('2026-01-12T00:00:00Z')}
          onChange={vi.fn()}
          timeZone="UTC"
          minDate={new Date('2026-01-10T00:00:00Z')}
        />,
      );

      const dialog = await openPopover(user);
      const dayButton = findDayButton(dialog, '5');

      expect(dayButton).not.toBeNull();
      if (!dayButton) {
        return;
      }

      expect(dayButton).toBeDisabled();
    });

    it('maxDate より後の日付が無効化されること', async () => {
      const user = userEvent.setup();
      render(
        <DatePicker
          value={new Date('2026-01-12T00:00:00Z')}
          onChange={vi.fn()}
          timeZone="UTC"
          maxDate={new Date('2026-01-20T00:00:00Z')}
        />,
      );

      const dialog = await openPopover(user);
      const dayButton = findDayButton(dialog, '25');

      expect(dayButton).not.toBeNull();
      if (!dayButton) {
        return;
      }

      expect(dayButton).toBeDisabled();
    });

    it('minDate/maxDate 範囲内の日付は選択可能であること', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <DatePicker
          value={new Date('2026-01-12T00:00:00Z')}
          onChange={handleChange}
          timeZone="UTC"
          minDate={new Date('2026-01-10T00:00:00Z')}
          maxDate={new Date('2026-01-20T00:00:00Z')}
        />,
      );

      const dialog = await openPopover(user);
      const dayButton = findDayButton(dialog, '15');

      expect(dayButton).not.toBeNull();
      if (!dayButton) {
        return;
      }

      expect(dayButton).not.toBeDisabled();
      await user.click(dayButton);
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('月ナビゲーション', () => {
    it('前月ボタンで前の月に移動すること', async () => {
      const user = userEvent.setup();
      render(<DatePicker value={new Date('2026-02-15T00:00:00Z')} onChange={vi.fn()} timeZone="UTC" />);

      await openPopover(user);

      // 2026年02月が表示されている
      expect(screen.getByText('2026年02月')).toBeInTheDocument();

      // 前月ボタンをクリック
      const prevButton = screen.getByRole('button', { name: '前の月' });
      await user.click(prevButton);

      // 2026年01月に移動
      expect(screen.getByText('2026年01月')).toBeInTheDocument();
    });

    it('次月ボタンで次の月に移動すること', async () => {
      const user = userEvent.setup();
      render(<DatePicker value={new Date('2026-01-15T00:00:00Z')} onChange={vi.fn()} timeZone="UTC" />);

      await openPopover(user);

      // 2026年01月が表示されている
      expect(screen.getByText('2026年01月')).toBeInTheDocument();

      // 次月ボタンをクリック
      const nextButton = screen.getByRole('button', { name: '次の月' });
      await user.click(nextButton);

      // 2026年02月に移動
      expect(screen.getByText('2026年02月')).toBeInTheDocument();
    });
  });

  describe('今日に戻るボタン', () => {
    it('今日に戻るボタンで今日の月に移動すること', async () => {
      const user = userEvent.setup();
      // 遠い未来の日付を選択
      render(<DatePicker value={new Date('2030-06-15T00:00:00Z')} onChange={vi.fn()} timeZone="UTC" />);

      await openPopover(user);

      // 2030年06月が表示されている
      expect(screen.getByText('2030年06月')).toBeInTheDocument();

      // 今日に戻るボタンをクリック
      const todayButton = screen.getByRole('button', { name: '今日に戻る' });
      await user.click(todayButton);

      // 今日の月に移動（テスト実行時の月）
      const now = new Date();
      const expectedMonth = `${now.getFullYear()}年${String(now.getMonth() + 1).padStart(2, '0')}月`;
      expect(screen.getByText(expectedMonth)).toBeInTheDocument();
    });
  });

  describe('キーボードナビゲーション', () => {
    it('矢印キー（右）で次の日にフォーカスが移動すること', async () => {
      const user = userEvent.setup();
      render(<DatePicker value={new Date('2026-01-15T00:00:00Z')} onChange={vi.fn()} timeZone="UTC" />);

      const dialog = await openPopover(user);
      const day15 = findDayButton(dialog, '15');

      expect(day15).not.toBeNull();
      if (!day15) {
        return;
      }

      // 15日にフォーカス
      day15.focus();
      expect(document.activeElement).toBe(day15);

      // 右矢印キーで16日に移動
      await user.keyboard('{ArrowRight}');
      const day16 = findDayButton(dialog, '16');
      expect(document.activeElement).toBe(day16);
    });

    it('矢印キー（左）で前の日にフォーカスが移動すること', async () => {
      const user = userEvent.setup();
      render(<DatePicker value={new Date('2026-01-15T00:00:00Z')} onChange={vi.fn()} timeZone="UTC" />);

      const dialog = await openPopover(user);
      const day15 = findDayButton(dialog, '15');

      expect(day15).not.toBeNull();
      if (!day15) {
        return;
      }

      // 15日にフォーカス
      day15.focus();
      expect(document.activeElement).toBe(day15);

      // 左矢印キーで14日に移動
      await user.keyboard('{ArrowLeft}');
      const day14 = findDayButton(dialog, '14');
      expect(document.activeElement).toBe(day14);
    });

    it('矢印キー（下）で1週間後の日にフォーカスが移動すること', async () => {
      const user = userEvent.setup();
      render(<DatePicker value={new Date('2026-01-15T00:00:00Z')} onChange={vi.fn()} timeZone="UTC" />);

      const dialog = await openPopover(user);
      const day15 = findDayButton(dialog, '15');

      expect(day15).not.toBeNull();
      if (!day15) {
        return;
      }

      // 15日にフォーカス
      day15.focus();
      expect(document.activeElement).toBe(day15);

      // 下矢印キーで22日に移動（1週間後）
      await user.keyboard('{ArrowDown}');
      const day22 = findDayButton(dialog, '22');
      expect(document.activeElement).toBe(day22);
    });

    it('矢印キー（上）で1週間前の日にフォーカスが移動すること', async () => {
      const user = userEvent.setup();
      render(<DatePicker value={new Date('2026-01-15T00:00:00Z')} onChange={vi.fn()} timeZone="UTC" />);

      const dialog = await openPopover(user);
      const day15 = findDayButton(dialog, '15');

      expect(day15).not.toBeNull();
      if (!day15) {
        return;
      }

      // 15日にフォーカス
      day15.focus();
      expect(document.activeElement).toBe(day15);

      // 上矢印キーで8日に移動（1週間前）
      await user.keyboard('{ArrowUp}');
      const day8 = findDayButton(dialog, '8');
      expect(document.activeElement).toBe(day8);
    });

    it('Enter キーでフォーカス中の日付が選択されること', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<DatePicker value={new Date('2026-01-15T00:00:00Z')} onChange={handleChange} timeZone="UTC" />);

      const dialog = await openPopover(user);
      const day15 = findDayButton(dialog, '15');

      expect(day15).not.toBeNull();
      if (!day15) {
        return;
      }

      // 15日にフォーカスして右に移動
      day15.focus();
      await user.keyboard('{ArrowRight}');

      // Enter キーで16日を選択
      await user.keyboard('{Enter}');

      expect(handleChange).toHaveBeenCalledTimes(1);
      const firstCall = handleChange.mock.calls[0];
      expect(firstCall).toBeDefined();
      const selected = firstCall![0];
      expect(selected?.toISOString()).toBe('2026-01-16T00:00:00.000Z');
    });
  });

  describe('value 変更時の displayMonth 同期', () => {
    it('value が変更されると表示月が同期されること', async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <DatePicker value={new Date('2026-01-15T00:00:00Z')} onChange={vi.fn()} timeZone="UTC" />,
      );

      await openPopover(user);
      expect(screen.getByText('2026年01月')).toBeInTheDocument();

      // Popover を閉じる
      await user.keyboard('{Escape}');

      // value を変更
      rerender(<DatePicker value={new Date('2026-06-15T00:00:00Z')} onChange={vi.fn()} timeZone="UTC" />);

      // 再度開く
      await openPopover(user);

      // 新しい value の月（2026年06月）が表示される
      expect(screen.getByText('2026年06月')).toBeInTheDocument();
    });

    it('value が null になると今日の月が表示されること', async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <DatePicker value={new Date('2030-06-15T00:00:00Z')} onChange={vi.fn()} timeZone="UTC" />,
      );

      await openPopover(user);
      expect(screen.getByText('2030年06月')).toBeInTheDocument();

      // Popover を閉じる
      await user.keyboard('{Escape}');

      // value を null に変更
      rerender(<DatePicker value={null} onChange={vi.fn()} timeZone="UTC" />);

      // 再度開く
      await openPopover(user);

      // 今日の月が表示される
      const now = new Date();
      const expectedMonth = `${now.getFullYear()}年${String(now.getMonth() + 1).padStart(2, '0')}月`;
      expect(screen.getByText(expectedMonth)).toBeInTheDocument();
    });
  });
});
