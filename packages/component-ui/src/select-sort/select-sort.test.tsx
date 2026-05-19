import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

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
});
