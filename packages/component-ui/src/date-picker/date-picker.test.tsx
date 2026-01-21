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
  it('value が null の場合、プレースホルダーが表示されること', () => {
    render(<DatePicker value={null} onChange={vi.fn()} />);

    expect(screen.getByRole('button')).toHaveTextContent('日付を選択');
  });

  it('value がある場合、yyyy年MM月dd日 形式で表示されること', () => {
    render(<DatePicker value={new Date('2026-01-01T00:00:00Z')} onChange={vi.fn()} timeZone="UTC" />);

    expect(screen.getByRole('button')).toHaveTextContent('2026年01月01日');
  });

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

  it('isDisabled=true の場合、Popover が開かないこと', async () => {
    const user = userEvent.setup();
    render(<DatePicker value={null} onChange={vi.fn()} isDisabled />);

    await user.click(screen.getByRole('button'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('Escape キーで Popover が閉じること', async () => {
    const user = userEvent.setup();
    render(<DatePicker value={null} onChange={vi.fn()} />);

    await openPopover(user);
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

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

  it('minDate/maxDate 範囲外の日付が無効化されること', async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        value={new Date('2026-01-12T00:00:00Z')}
        onChange={vi.fn()}
        timeZone="UTC"
        minDate={new Date('2026-01-10T00:00:00Z')}
        maxDate={new Date('2026-01-20T00:00:00Z')}
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
});
