import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Radio } from '.';

describe('Radio', () => {
  describe('レンダリング', () => {
    it('ラベルが表示されること', () => {
      render(<Radio id="test" label="テストラベル" />);
      expect(screen.getByText('テストラベル')).toBeInTheDocument();
    });

    it('input 要素がレンダリングされること', () => {
      render(<Radio id="test" label="テスト" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });
  });

  describe('プロパティ反映', () => {
    it('isChecked が true の場合、checked 属性が設定されること', () => {
      render(<Radio id="test" label="テスト" isChecked />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('isDisabled が true の場合、disabled 属性が設定されること', () => {
      render(<Radio id="test" label="テスト" isDisabled />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('name 属性が設定されること', () => {
      render(<Radio id="test" label="テスト" name="radio-group" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'radio-group');
    });

    it('value 属性が設定されること', () => {
      render(<Radio id="test" label="テスト" value="option-a" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('value', 'option-a');
    });
  });

  describe('イベント', () => {
    it('クリック時に onChange が呼ばれること', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Radio id="test" label="テスト" onChange={handleChange} />);

      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('isDisabled が true の場合、onChange が呼ばれないこと', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Radio id="test" label="テスト" isDisabled onChange={handleChange} />);

      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('ラベルクリックで onChange が呼ばれること', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Radio id="test" label="テスト" onChange={handleChange} />);

      await user.click(screen.getByText('テスト'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('サイズ', () => {
    it('デフォルトでは medium サイズでレンダリングされること', () => {
      const { container } = render(<Radio id="test" label="テスト" />);
      const label = screen.getByText('テスト');
      expect(label).toHaveClass('typography-label14regular');
      expect(container.querySelector('.size-6')).toBeInTheDocument();
      expect(container.querySelector('.size-5')).toBeInTheDocument();
    });

    it('size="large" で大きいサイズでレンダリングされること', () => {
      const { container } = render(<Radio id="test" label="テスト" size="large" />);
      const label = screen.getByText('テスト');
      expect(label).toHaveClass('typography-label16regular');
      expect(container.querySelector('.size-8')).toBeInTheDocument();
      expect(container.querySelector('.size-7')).toBeInTheDocument();
    });

    it('size="large" でも isChecked が正しく反映されること', () => {
      render(<Radio id="test" label="テスト" size="large" isChecked />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('size="large" でも isDisabled が正しく反映されること', () => {
      render(<Radio id="test" label="テスト" size="large" isDisabled />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });
  });

  describe('アクセシビリティ', () => {
    it('label の htmlFor と input の id が一致すること', () => {
      render(<Radio id="radio-1" label="テスト" />);
      const label = screen.getByText('テスト');
      expect(label).toHaveAttribute('for', 'radio-1');
    });
  });
});
