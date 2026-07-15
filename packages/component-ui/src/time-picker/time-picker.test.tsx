import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import type { TimePickerProps } from './time-picker';
import { TimePicker } from './time-picker';
import type { TimeValue } from './time-picker-utils';
import { formatTime, generateHourOptions, generateMinuteOptions, isTimeInRange, parseTime } from './time-picker-utils';

/**
 * TimePicker テストについて
 *
 * テストの構成：
 * - ユーティリティ関数：候補生成 / parse・format / 範囲判定
 * - 基本レンダリング：時 Select・分 Select・":" セパレータ
 * - value 反映：完全 / 部分（片方のみ）/ 未選択
 * - イベント：各 Select 変更で新しい `{ hour, minute }` を返す
 * - pure controlled：中間状態からのリセット
 * - minuteStep / minTime / maxTime
 * - 状態：エラー・無効
 * - サイズ・アクセシビリティ
 */

const getHourTrigger = () => screen.getByRole('button', { name: '時' });
const getMinuteTrigger = () => screen.getByRole('button', { name: '分' });

// value を内部 state で保持する制御コンポーネント（pure controlled の挙動確認用）
const ControlledTimePicker = ({
  initialValue = { hour: null, minute: null },
  onChange,
  children,
  ...props
}: Omit<TimePickerProps, 'value' | 'onChange'> & {
  initialValue?: TimeValue;
  onChange?: (value: TimeValue) => void;
}) => {
  const [value, setValue] = useState<TimeValue>(initialValue);

  return (
    <TimePicker
      {...props}
      value={value}
      onChange={(next) => {
        onChange?.(next);
        setValue(next);
      }}
    >
      {children}
    </TimePicker>
  );
};

describe('TimePicker', () => {
  describe('ユーティリティ関数', () => {
    describe('parseTime', () => {
      it('"HH:mm" を { hour, minute } へ変換すること', () => {
        expect(parseTime('09:30')).toEqual({ hour: 9, minute: 30 });
        expect(parseTime('0:5')).toEqual({ hour: 0, minute: 5 });
        expect(parseTime('23:59')).toEqual({ hour: 23, minute: 59 });
      });

      it('形式不正・範囲外は null を返すこと', () => {
        expect(parseTime('')).toBeNull();
        expect(parseTime('9-30')).toBeNull();
        expect(parseTime('24:00')).toBeNull();
        expect(parseTime('09:60')).toBeNull();
        expect(parseTime('aa:bb')).toBeNull();
      });
    });

    describe('formatTime', () => {
      it('両方揃っている場合のみ "HH:mm" を返すこと', () => {
        expect(formatTime({ hour: 9, minute: 30 })).toBe('09:30');
        expect(formatTime({ hour: 0, minute: 0 })).toBe('00:00');
      });

      it('片方でも null なら null を返すこと', () => {
        expect(formatTime({ hour: 9, minute: null })).toBeNull();
        expect(formatTime({ hour: null, minute: 30 })).toBeNull();
        expect(formatTime({ hour: null, minute: null })).toBeNull();
      });
    });

    describe('isTimeInRange', () => {
      it('inclusive で範囲内判定すること', () => {
        expect(isTimeInRange(9, 0, '09:00', '17:00')).toBe(true);
        expect(isTimeInRange(17, 0, '09:00', '17:00')).toBe(true);
        expect(isTimeInRange(8, 59, '09:00', '17:00')).toBe(false);
        expect(isTimeInRange(17, 1, '09:00', '17:00')).toBe(false);
      });
    });

    describe('generateHourOptions', () => {
      it('00〜23 の 24 候補を生成すること', () => {
        const options = generateHourOptions(15);
        expect(options).toHaveLength(24);
        expect(options[0]?.label).toBe('00');
        expect(options[23]?.label).toBe('23');
      });

      it('minTime の時より前の候補を除外すること', () => {
        const labels = generateHourOptions(15, '09:00').map((option) => option.label);
        expect(labels).not.toContain('08');
        expect(labels[0]).toBe('09');
      });

      it('maxTime の時より後の候補を除外すること', () => {
        const labels = generateHourOptions(15, null, '10:00').map((option) => option.label);
        expect(labels).not.toContain('11');
        expect(labels[labels.length - 1]).toBe('10');
      });

      it('minTime の分が minuteStep で到達できない時はデッドエンドの時を除外すること（例: minTime="09:45", minuteStep=30）', () => {
        // 9 時の分候補 00(09:00)/30(09:30) は両方 09:45 未満で除外され空になるため、9 時自体を候補から外す
        const labels = generateHourOptions(30, '09:45').map((option) => option.label);
        expect(labels).not.toContain('09');
        expect(labels[0]).toBe('10');
      });

      it('minTime の分が minuteStep で到達できる時はその時を候補に含めること（例: minTime="09:30", minuteStep=30）', () => {
        const labels = generateHourOptions(30, '09:30').map((option) => option.label);
        expect(labels).toContain('09');
        expect(labels[0]).toBe('09');
      });
    });

    describe('generateMinuteOptions（union の各刻み）', () => {
      it('30 刻みで [00, 30] を生成すること', () => {
        expect(generateMinuteOptions(30, null).map((option) => option.label)).toEqual(['00', '30']);
      });

      it('15 刻みで [00, 15, 30, 45] を生成すること', () => {
        expect(generateMinuteOptions(15, null).map((option) => option.label)).toEqual(['00', '15', '30', '45']);
      });

      it('5 刻みで 12 候補を生成すること', () => {
        expect(generateMinuteOptions(5, null)).toHaveLength(12);
      });

      it('1 刻みで 60 候補を生成すること', () => {
        expect(generateMinuteOptions(1, null)).toHaveLength(60);
      });

      it('selectedHour 指定時、minTime の範囲外の分を除外すること', () => {
        const labels = generateMinuteOptions(15, 9, '09:30').map((option) => option.label);
        expect(labels).toEqual(['30', '45']);
      });

      it('selectedHour が null の場合は範囲フィルタを行わないこと', () => {
        const labels = generateMinuteOptions(15, null, '09:30').map((option) => option.label);
        expect(labels).toEqual(['00', '15', '30', '45']);
      });
    });
  });

  describe('基本レンダリング', () => {
    it('時 Select・分 Select・":" セパレータが描画されること', () => {
      render(<TimePicker value={{ hour: null, minute: null }} onChange={vi.fn()} />);

      expect(getHourTrigger()).toBeInTheDocument();
      expect(getMinuteTrigger()).toBeInTheDocument();
      expect(screen.getByText(':')).toBeInTheDocument();
    });

    it('トリガーボタンに固定の aria-label（時・分）が付与されること', () => {
      render(<TimePicker value={{ hour: null, minute: null }} onChange={vi.fn()} />);

      expect(getHourTrigger()).toHaveAttribute('aria-label', '時');
      expect(getMinuteTrigger()).toHaveAttribute('aria-label', '分');
    });
  });

  describe('value 反映', () => {
    it('value={{hour:9,minute:30}} で時に 09・分に 30 が表示されること', () => {
      render(<TimePicker value={{ hour: 9, minute: 30 }} onChange={vi.fn()} />);

      expect(getHourTrigger()).toHaveTextContent('09');
      expect(getMinuteTrigger()).toHaveTextContent('30');
    });

    it('片方のみ選択（{hour:9,minute:null}）では時のみ表示され分はプレースホルダーになること', () => {
      render(<TimePicker value={{ hour: 9, minute: null }} onChange={vi.fn()} />);

      expect(getHourTrigger()).toHaveTextContent('09');
      expect(getMinuteTrigger()).toHaveTextContent('--');
    });

    it('未選択（{hour:null,minute:null}）では固定プレースホルダー -- が表示され 00 に化けないこと', () => {
      render(<TimePicker value={{ hour: null, minute: null }} onChange={vi.fn()} />);

      expect(getHourTrigger()).toHaveTextContent('--');
      expect(getMinuteTrigger()).toHaveTextContent('--');
      expect(getHourTrigger()).not.toHaveTextContent('00');
    });
  });

  describe('onChange', () => {
    it('時だけ選ぶと {hour:9,minute:null} を返すこと', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ControlledTimePicker onChange={handleChange} />);

      await user.click(getHourTrigger());
      const list = screen.getByRole('list');
      await user.click(within(list).getByText('09'));

      expect(handleChange).toHaveBeenCalledWith({ hour: 9, minute: null });
    });

    it('時が選択済みの状態で分を選ぶと {hour:9,minute:30} を返すこと', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ControlledTimePicker initialValue={{ hour: 9, minute: null }} onChange={handleChange} />);

      await user.click(getMinuteTrigger());
      const list = screen.getByRole('list');
      await user.click(within(list).getByText('30'));

      expect(handleChange).toHaveBeenCalledWith({ hour: 9, minute: 30 });
    });

    it('選択後にトリガーへ選択値が反映されること', async () => {
      const user = userEvent.setup();
      render(<ControlledTimePicker />);

      await user.click(getHourTrigger());
      await user.click(within(screen.getByRole('list')).getByText('09'));

      expect(getHourTrigger()).toHaveTextContent('09');
    });
  });

  describe('pure controlled（リセット）', () => {
    it('中間状態 {hour:9,minute:null} から {null,null} を渡すと両方プレースホルダーへ戻ること', () => {
      const { rerender } = render(<TimePicker value={{ hour: 9, minute: null }} onChange={vi.fn()} />);

      expect(getHourTrigger()).toHaveTextContent('09');

      rerender(<TimePicker value={{ hour: null, minute: null }} onChange={vi.fn()} />);

      expect(getHourTrigger()).toHaveTextContent('--');
      expect(getMinuteTrigger()).toHaveTextContent('--');
    });
  });

  describe('候補生成（コンポーネント経由）', () => {
    it('既定で時候補が 24 件生成されること', async () => {
      const user = userEvent.setup();
      render(<TimePicker value={{ hour: null, minute: null }} onChange={vi.fn()} />);

      await user.click(getHourTrigger());
      const list = screen.getByRole('list');
      expect(within(list).getAllByRole('button')).toHaveLength(24);
    });

    it('既定（minuteStep=15）で分候補が 00/15/30/45 になること', async () => {
      const user = userEvent.setup();
      render(<TimePicker value={{ hour: null, minute: null }} onChange={vi.fn()} />);

      await user.click(getMinuteTrigger());
      const list = screen.getByRole('list');
      expect(within(list).getByText('00')).toBeInTheDocument();
      expect(within(list).getByText('15')).toBeInTheDocument();
      expect(within(list).getByText('30')).toBeInTheDocument();
      expect(within(list).getByText('45')).toBeInTheDocument();
      expect(within(list).queryByText('10')).not.toBeInTheDocument();
    });

    it('minuteStep=30 で分候補が 00/30 のみになること', async () => {
      const user = userEvent.setup();
      render(<TimePicker value={{ hour: null, minute: null }} onChange={vi.fn()} minuteStep={30} />);

      await user.click(getMinuteTrigger());
      const list = screen.getByRole('list');
      expect(within(list).getAllByRole('button')).toHaveLength(2);
      expect(within(list).getByText('00')).toBeInTheDocument();
      expect(within(list).getByText('30')).toBeInTheDocument();
    });
  });

  describe('minTime / maxTime', () => {
    it('minTime="09:00" のとき時候補に 08 が出ないこと', async () => {
      const user = userEvent.setup();
      render(<TimePicker value={{ hour: null, minute: null }} onChange={vi.fn()} minTime="09:00" />);

      await user.click(getHourTrigger());
      const list = screen.getByRole('list');
      expect(within(list).queryByText('08')).not.toBeInTheDocument();
      expect(within(list).getByText('09')).toBeInTheDocument();
    });

    it('minTime の分が minuteStep で到達できない場合、その時（デッドエンド）が時候補に出ないこと', async () => {
      const user = userEvent.setup();
      // minTime="09:45" / minuteStep=30 では 9 時を選んでも分候補が空になるため、時候補は 10 時から始まる
      render(<TimePicker value={{ hour: null, minute: null }} onChange={vi.fn()} minTime="09:45" minuteStep={30} />);

      await user.click(getHourTrigger());
      const list = screen.getByRole('list');
      expect(within(list).queryByText('09')).not.toBeInTheDocument();
      expect(within(list).getByText('10')).toBeInTheDocument();
    });
  });

  describe('エラー状態とアクセシビリティ', () => {
    it('isError=true で ErrorMessage が表示され、両トリガーに aria-invalid が付与されること', () => {
      render(
        <TimePicker value={{ hour: null, minute: null }} onChange={vi.fn()} isError>
          <TimePicker.ErrorMessage>時刻を選択してください</TimePicker.ErrorMessage>
        </TimePicker>,
      );

      expect(screen.getByText('時刻を選択してください')).toBeInTheDocument();
      expect(getHourTrigger()).toHaveAttribute('aria-invalid', 'true');
      expect(getMinuteTrigger()).toHaveAttribute('aria-invalid', 'true');
    });

    it('ErrorMessage の id が両トリガーの aria-describedby に配線されること', () => {
      render(
        <TimePicker value={{ hour: null, minute: null }} onChange={vi.fn()} isError>
          <TimePicker.ErrorMessage id="time-error">時刻を選択してください</TimePicker.ErrorMessage>
        </TimePicker>,
      );

      expect(getHourTrigger()).toHaveAttribute('aria-describedby', 'time-error');
      expect(getMinuteTrigger()).toHaveAttribute('aria-describedby', 'time-error');
    });

    it('isError=false では ErrorMessage が表示されないこと', () => {
      render(
        <TimePicker value={{ hour: null, minute: null }} onChange={vi.fn()}>
          <TimePicker.ErrorMessage>時刻を選択してください</TimePicker.ErrorMessage>
        </TimePicker>,
      );

      expect(screen.queryByText('時刻を選択してください')).not.toBeInTheDocument();
    });

    it('エラー状態でも ":" セパレータはグレー（text-text02）のままであること', () => {
      render(<TimePicker value={{ hour: null, minute: null }} onChange={vi.fn()} isError />);

      const separator = screen.getByText(':');
      expect(separator.className).toMatch(/text-text02/);
      expect(separator.className).not.toMatch(/text-supportError/);
    });
  });

  describe('無効状態', () => {
    it('isDisabled=true で両トリガーが無効になり、候補リストが開かないこと', async () => {
      const user = userEvent.setup();
      render(<TimePicker value={{ hour: null, minute: null }} onChange={vi.fn()} isDisabled />);

      expect(getHourTrigger()).toBeDisabled();
      expect(getMinuteTrigger()).toBeDisabled();

      await user.click(getHourTrigger());
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  describe('サイズバリエーション', () => {
    it.each(['x-small', 'small', 'medium', 'large'] as const)('size=%s でレンダリングされること', (size) => {
      render(<TimePicker value={{ hour: null, minute: null }} onChange={vi.fn()} size={size} />);

      expect(getHourTrigger()).toBeInTheDocument();
      expect(getMinuteTrigger()).toBeInTheDocument();
    });

    it('size=x-small でセパレータが typography-label12regular になること', () => {
      render(<TimePicker value={{ hour: null, minute: null }} onChange={vi.fn()} size="x-small" />);

      expect(screen.getByText(':').className).toMatch(/typography-label12regular/);
    });

    it('size=large でセパレータが typography-label16regular になること', () => {
      render(<TimePicker value={{ hour: null, minute: null }} onChange={vi.fn()} size="large" />);

      expect(screen.getByText(':').className).toMatch(/typography-label16regular/);
    });
  });
});
