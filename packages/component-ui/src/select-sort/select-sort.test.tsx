import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { MODAL_OPEN_EVENT } from '../hooks/use-dismiss-on-modal-open';
import { SelectSort } from './select-sort';

describe('SelectSort', () => {
  describe('Modal表示連動', () => {
    it('Modalが開かれたイベントを受けるとオプションリストが閉じること', async () => {
      render(<SelectSort label="氏名" sortOrder={null} />);

      // 開く
      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByRole('list')).toBeInTheDocument();

      act(() => {
        window.dispatchEvent(new CustomEvent(MODAL_OPEN_EVENT));
      });

      await waitFor(() => {
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
      });
    });
  });

  describe('リスト item の高さ', () => {
    it('largeサイズでは item の高さが h-10 になること', () => {
      render(<SelectSort label="氏名" sortOrder={null} size="large" />);

      fireEvent.click(screen.getByRole('button', { name: /氏名/ }));

      const itemButton = screen.getByText('昇順で並び替え').closest('button');
      expect(itemButton).toHaveClass('h-10');
      expect(itemButton).not.toHaveClass('h-8');
    });

    it('mediumサイズ（デフォルト）では item の高さが h-8 になること', () => {
      render(<SelectSort label="氏名" sortOrder={null} />);

      fireEvent.click(screen.getByRole('button', { name: /氏名/ }));

      const itemButton = screen.getByText('昇順で並び替え').closest('button');
      expect(itemButton).toHaveClass('h-8');
      expect(itemButton).not.toHaveClass('h-10');
    });

    it('smallサイズでは item の高さが h-8 のまま維持されること', () => {
      render(<SelectSort label="氏名" sortOrder={null} size="small" />);

      fireEvent.click(screen.getByRole('button', { name: /氏名/ }));

      const itemButton = screen.getByText('昇順で並び替え').closest('button');
      expect(itemButton).toHaveClass('h-8');
      expect(itemButton).not.toHaveClass('h-10');
    });

    it('largeサイズでは選択解除ボタンの高さが h-10 になること', () => {
      render(<SelectSort label="氏名" sortOrder="ascend" size="large" onClickDeselect={vi.fn()} />);

      fireEvent.click(screen.getByRole('button', { name: /氏名/ }));

      const deselectButton = screen.getByText('選択解除').closest('button');
      expect(deselectButton).toHaveClass('h-10');
      expect(deselectButton).not.toHaveClass('h-8');
    });

    it('mediumサイズでは選択解除ボタンの高さが h-8 のまま維持されること', () => {
      render(<SelectSort label="氏名" sortOrder="ascend" onClickDeselect={vi.fn()} />);

      fireEvent.click(screen.getByRole('button', { name: /氏名/ }));

      const deselectButton = screen.getByText('選択解除').closest('button');
      expect(deselectButton).toHaveClass('h-8');
      expect(deselectButton).not.toHaveClass('h-10');
    });
  });
});
