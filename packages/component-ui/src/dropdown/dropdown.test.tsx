import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { MODAL_OPEN_EVENT } from '../hooks/use-dismiss-on-modal-open';
import { TOP_LAYER_ATTRIBUTE } from '../utils';
import { Dropdown } from './dropdown';

/** portalTargetRef の検証用。コンテナはトリガーと同じツリーに置く */
const DropdownWithPortalTarget = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Dropdown label="メニュー" portalTargetRef={containerRef}>
        <Dropdown.Menu>
          <Dropdown.Item>項目1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div data-testid="portal-container" ref={containerRef} />
    </div>
  );
};

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

  describe('フォーカス復帰', () => {
    it('項目をクリックするとメニューが閉じ、トリガーボタンにフォーカスが戻ること', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Dropdown label="メニュー">
          <Dropdown.Menu>
            <Dropdown.Item onClick={onClick}>項目1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>,
      );
      const trigger = screen.getByRole('button', { name: /メニュー/ });
      await user.click(trigger);

      await user.click(screen.getByRole('button', { name: '項目1' }));

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(screen.queryByText('項目1')).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
    });
  });

  describe('portalTargetRef', () => {
    it('ポータル先の中に除外用の属性を持つラッパーが描画され、コンテナ自身には付かないこと', () => {
      render(<DropdownWithPortalTarget />);
      const container = screen.getByTestId('portal-container');

      // ラッパーはメニューの開閉に関係なく常時マウントされる（Modal を開いた瞬間の除外判定に間に合わせるため）
      expect(container.querySelector(`[${TOP_LAYER_ATTRIBUTE}]`)).not.toBeNull();
      expect(container).not.toHaveAttribute(TOP_LAYER_ATTRIBUTE);
    });

    it('ポータル先にメニューが描画されること', () => {
      render(<DropdownWithPortalTarget />);

      fireEvent.click(screen.getByRole('button', { name: /メニュー/ }));

      expect(screen.getByTestId('portal-container')).toContainElement(screen.getByText('項目1'));
    });
  });

  describe('メニュー item の高さ', () => {
    it('largeサイズでは item の高さが h-10 になること', () => {
      render(
        <Dropdown label="メニュー" size="large">
          <Dropdown.Menu>
            <Dropdown.Item>項目1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>,
      );

      fireEvent.click(screen.getByRole('button', { name: /メニュー/ }));

      const itemButton = screen.getByText('項目1').closest('button');
      expect(itemButton).toHaveClass('h-10');
      expect(itemButton).not.toHaveClass('h-8');
    });

    it('mediumサイズ（デフォルト）では item の高さが h-8 になること', () => {
      render(
        <Dropdown label="メニュー">
          <Dropdown.Menu>
            <Dropdown.Item>項目1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>,
      );

      fireEvent.click(screen.getByRole('button', { name: /メニュー/ }));

      const itemButton = screen.getByText('項目1').closest('button');
      expect(itemButton).toHaveClass('h-8');
      expect(itemButton).not.toHaveClass('h-10');
    });

    it('smallサイズでは item の高さが h-8 のまま維持されること', () => {
      render(
        <Dropdown label="メニュー" size="small">
          <Dropdown.Menu>
            <Dropdown.Item>項目1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>,
      );

      fireEvent.click(screen.getByRole('button', { name: /メニュー/ }));

      const itemButton = screen.getByText('項目1').closest('button');
      expect(itemButton).toHaveClass('h-8');
      expect(itemButton).not.toHaveClass('h-10');
    });
  });
});
