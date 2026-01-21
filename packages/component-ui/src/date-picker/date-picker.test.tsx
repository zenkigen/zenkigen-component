import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

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
    it.each(['small', 'medium', 'large'] as const)('size=%s でレンダリングされること', (size) => {
      render(<DatePicker value={null} onChange={vi.fn()} size={size} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
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
