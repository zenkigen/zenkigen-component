import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MODAL_OPEN_EVENT } from '../hooks/use-dismiss-on-modal-open';
import { Dropdown } from './dropdown';

describe('Dropdown', () => {
  describe('Modal表示連動', () => {
    it('Modalが開かれたイベントを受けるとメニューが閉じること', async () => {
      render(
        <Dropdown label="メニュー">
          <Dropdown.Menu>
            <Dropdown.Item>項目1</Dropdown.Item>
            <Dropdown.Item>項目2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>,
      );

      // 開く（メニューの toggle ボタン）
      fireEvent.click(screen.getByRole('button', { name: /メニュー/ }));
      expect(screen.getByText('項目1')).toBeInTheDocument();

      act(() => {
        window.dispatchEvent(new CustomEvent(MODAL_OPEN_EVENT));
      });

      await waitFor(() => {
        expect(screen.queryByText('項目1')).not.toBeInTheDocument();
      });
    });
  });
});
