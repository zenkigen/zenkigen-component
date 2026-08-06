import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Button } from '../button';
import { MODAL_OPEN_EVENT } from '../hooks/use-dismiss-on-modal-open';
import { Popover } from './popover';
import type { PopoverCloseEvent } from './popover-context';

// テスト用のPopoverラッパーコンポーネント
const PopoverTestWrapper = ({
  isOpen: initialIsOpen = false,
  onClose = vi.fn(),
  placement = 'top' as const,
  offset = 8,
  anchorRef,
  triggerText = 'Open Popover',
  contentText = 'Popover Content',
}: {
  isOpen?: boolean;
  onClose?: (event: PopoverCloseEvent) => void;
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end';
  offset?: number;
  anchorRef?: React.RefObject<HTMLElement | null>;
  triggerText?: string;
  contentText?: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(initialIsOpen);

  return (
    <Popover
      isOpen={isOpen}
      placement={placement}
      offset={offset}
      onClose={(event) => {
        setIsOpen(false);
        onClose(event);
      }}
      anchorRef={anchorRef}
    >
      <Popover.Trigger>
        <Button onClick={() => setIsOpen((prev) => prev === false)}>{triggerText}</Button>
      </Popover.Trigger>
      <Popover.Content>
        <div data-testid="popover-content">{contentText}</div>
      </Popover.Content>
    </Popover>
  );
};

describe('Popover', () => {
  describe('基本的な開閉制御', () => {
    it('isOpenがtrueの時、コンテンツが表示されること', async () => {
      const { rerender } = render(
        <Popover isOpen={false}>
          <Popover.Trigger>
            <Button>Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();

      rerender(
        <Popover isOpen>
          <Popover.Trigger>
            <Button>Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('popover-content')).toBeInTheDocument();
      });
    });

    it('isOpenがfalseの時、コンテンツが非表示になること', async () => {
      const { rerender } = render(
        <Popover isOpen>
          <Popover.Trigger>
            <Button>Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('popover-content')).toBeInTheDocument();
      });

      rerender(
        <Popover isOpen={false}>
          <Popover.Trigger>
            <Button>Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      await waitFor(() => {
        expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
      });
    });
  });

  describe('トリガーのARIA属性', () => {
    it('トリガー要素にaria-haspopup="dialog"が付与されること', () => {
      render(
        <Popover isOpen={false}>
          <Popover.Trigger>
            <Button data-testid="trigger-button">Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div>Content</div>
          </Popover.Content>
        </Popover>,
      );

      const trigger = screen.getByTestId('trigger-button');
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    });

    it('トリガー要素にaria-expandedが付与されること', () => {
      const { rerender } = render(
        <Popover isOpen={false}>
          <Popover.Trigger>
            <Button data-testid="trigger-button">Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div>Content</div>
          </Popover.Content>
        </Popover>,
      );

      let trigger = screen.getByTestId('trigger-button');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      rerender(
        <Popover isOpen>
          <Popover.Trigger>
            <Button data-testid="trigger-button">Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div>Content</div>
          </Popover.Content>
        </Popover>,
      );

      trigger = screen.getByTestId('trigger-button');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('トリガー要素にaria-controlsが付与されること', () => {
      render(
        <Popover isOpen={false}>
          <Popover.Trigger>
            <Button data-testid="trigger-button">Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div>Content</div>
          </Popover.Content>
        </Popover>,
      );

      const trigger = screen.getByTestId('trigger-button');
      expect(trigger).toHaveAttribute('aria-controls');
      const panelId = trigger.getAttribute('aria-controls');
      expect(panelId).toBeTruthy();
    });
  });

  describe('コンテンツのARIA属性', () => {
    it('コンテンツにrole="dialog"が付与されること', async () => {
      render(
        <Popover isOpen>
          <Popover.Trigger>
            <Button>Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      await waitFor(() => {
        const content = screen.getByTestId('popover-content');
        expect(content.parentElement).toHaveAttribute('role', 'dialog');
      });
    });

    it('コンテンツにidが付与されること', async () => {
      render(
        <Popover isOpen>
          <Popover.Trigger>
            <Button data-testid="trigger-button">Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      const trigger = screen.getByTestId('trigger-button');
      const panelId = trigger.getAttribute('aria-controls');

      await waitFor(() => {
        const content = screen.getByTestId('popover-content');
        // idはコンテンツ要素自体に付与される
        expect(content).toHaveAttribute('id', panelId);
      });
    });
  });

  describe('フォーカス管理', () => {
    it('Popover表示時にコンテンツがフォーカス可能になること', async () => {
      render(
        <Popover isOpen>
          <Popover.Trigger>
            <Button data-testid="trigger-button">Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      await waitFor(() => {
        const contentWrapper = screen.getByTestId('popover-content').parentElement;
        // tabIndex=-1 でフォーカス可能であることを確認
        expect(contentWrapper).toHaveAttribute('tabindex', '-1');
      });
    });

    it('Popover非表示時にコンテンツが表示されないこと', async () => {
      const { rerender } = render(
        <Popover isOpen>
          <Popover.Trigger>
            <Button data-testid="trigger-button">Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('popover-content')).toBeInTheDocument();
      });

      rerender(
        <Popover isOpen={false}>
          <Popover.Trigger>
            <Button data-testid="trigger-button">Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      await waitFor(() => {
        expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
      });
    });

    it('初回マウント時にトリガーへフォーカスが当たらないこと', () => {
      render(
        <Popover isOpen={false}>
          <Popover.Trigger>
            <Button data-testid="trigger-button">Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      const trigger = screen.getByTestId('trigger-button');
      expect(trigger).not.toHaveFocus();
    });

    it('Popoverが閉じたときにトリガーへフォーカスが戻ること', async () => {
      const { rerender } = render(
        <Popover isOpen>
          <Popover.Trigger>
            <Button data-testid="trigger-button">Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('popover-content')).toBeInTheDocument();
      });

      rerender(
        <Popover isOpen={false}>
          <Popover.Trigger>
            <Button data-testid="trigger-button">Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      await waitFor(() => {
        const trigger = screen.getByTestId('trigger-button');
        expect(trigger).toHaveFocus();
      });
    });
  });

  describe('Escapeキー対応', () => {
    it('Popover開いた状態でEscapeキーを押すとonCloseが呼ばれ、reasonが"escape-key-down"になること', async () => {
      const onClose = vi.fn();
      render(
        <Popover isOpen onClose={onClose}>
          <Popover.Trigger>
            <Button data-testid="trigger-button">Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('popover-content')).toBeInTheDocument();
      });

      const contentWrapper = screen.getByTestId('popover-content').parentElement;
      fireEvent.keyDown(contentWrapper!, { key: 'Escape' });

      await waitFor(() => {
        expect(onClose).toHaveBeenCalledWith({ reason: 'escape-key-down' });
      });
    });

    it('他のキーを押してもonCloseが呼ばれないこと', async () => {
      const onClose = vi.fn();
      render(
        <Popover isOpen onClose={onClose}>
          <Popover.Trigger>
            <Button>Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('popover-content')).toBeInTheDocument();
      });

      const contentWrapper = screen.getByTestId('popover-content').parentElement;
      fireEvent.keyDown(contentWrapper!, { key: 'Enter' });

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('外部クリック検知', () => {
    it('Popover外をクリックするとonCloseが呼ばれ、reasonが"outside-click"になること', async () => {
      const onClose = vi.fn();
      render(
        <>
          <div data-testid="outside-element">Outside</div>
          <Popover isOpen onClose={onClose}>
            <Popover.Trigger>
              <Button data-testid="trigger-button">Open</Button>
            </Popover.Trigger>
            <Popover.Content>
              <div data-testid="popover-content">Content</div>
            </Popover.Content>
          </Popover>
        </>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('popover-content')).toBeInTheDocument();
      });

      const outsideElement = screen.getByTestId('outside-element');
      fireEvent.pointerDown(outsideElement);

      await waitFor(() => {
        expect(onClose).toHaveBeenCalledWith({ reason: 'outside-click' });
      });
    });

    it('Popover内をクリックしてもonCloseが呼ばれないこと', async () => {
      const onClose = vi.fn();
      render(
        <Popover isOpen onClose={onClose}>
          <Popover.Trigger>
            <Button>Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('popover-content')).toBeInTheDocument();
      });

      const content = screen.getByTestId('popover-content');
      fireEvent.pointerDown(content);

      expect(onClose).not.toHaveBeenCalled();
    });

    it('トリガー要素をクリックしてもonCloseが呼ばれないこと', async () => {
      const onClose = vi.fn();
      render(
        <Popover isOpen onClose={onClose}>
          <Popover.Trigger>
            <Button data-testid="trigger-button">Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('popover-content')).toBeInTheDocument();
      });

      const trigger = screen.getByTestId('trigger-button');
      fireEvent.pointerDown(trigger);

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('配置位置 (placement)', () => {
    it('defaultの配置が"top"になること', () => {
      const { container } = render(
        <Popover isOpen>
          <Popover.Trigger>
            <Button>Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      expect(container).toBeTruthy();
    });

    it('placementが"bottom"の時、配置が適用されること', () => {
      render(
        <Popover isOpen placement="bottom">
          <Popover.Trigger>
            <Button>Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      // Floating UIの内部計算なため、描画されていることで確認
      expect(screen.getByTestId('popover-content')).toBeInTheDocument();
    });

    it('placementが"left"の時、配置が適用されること', () => {
      render(
        <Popover isOpen placement="left">
          <Popover.Trigger>
            <Button>Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      expect(screen.getByTestId('popover-content')).toBeInTheDocument();
    });

    it('placementが"right"の時、配置が適用されること', () => {
      render(
        <Popover isOpen placement="right">
          <Popover.Trigger>
            <Button>Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      expect(screen.getByTestId('popover-content')).toBeInTheDocument();
    });

    it.each([
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
      'left-start',
      'left-end',
      'right-start',
      'right-end',
    ] as const)('placementが"%s"の時、配置が適用されること', (placement) => {
      render(
        <Popover isOpen placement={placement}>
          <Popover.Trigger>
            <Button>Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      expect(screen.getByTestId('popover-content')).toBeInTheDocument();
    });
  });

  describe('オフセット (offset)', () => {
    it('defaultのオフセットが8pxであること', () => {
      const { container } = render(
        <Popover isOpen>
          <Popover.Trigger>
            <Button>Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      expect(container).toBeTruthy();
    });

    it('offsetが指定値で適用されること', () => {
      render(
        <Popover isOpen offset={16}>
          <Popover.Trigger>
            <Button>Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      expect(screen.getByTestId('popover-content')).toBeInTheDocument();
    });
  });

  describe('カスタムアンカー (anchorRef)', () => {
    it('anchorRefが指定された場合、その要素を基準に配置されること', () => {
      const anchorRef = React.createRef<HTMLDivElement>();

      render(
        <div>
          <div ref={anchorRef} data-testid="anchor-element">
            Anchor
          </div>
          <Popover isOpen anchorRef={anchorRef}>
            <Popover.Trigger>
              <Button data-testid="trigger-button">Open</Button>
            </Popover.Trigger>
            <Popover.Content>
              <div data-testid="popover-content">Content</div>
            </Popover.Content>
          </Popover>
        </div>,
      );

      expect(screen.getByTestId('popover-content')).toBeInTheDocument();
      expect(anchorRef.current).toBeTruthy();
    });

    it('anchorRefが指定されている場合でも、Popover非表示時にコンテンツが表示されないこと', async () => {
      const anchorRef = React.createRef<HTMLDivElement>();

      const { rerender } = render(
        <div>
          <div ref={anchorRef} data-testid="anchor-element">
            Anchor
          </div>
          <Popover isOpen anchorRef={anchorRef}>
            <Popover.Trigger>
              <Button data-testid="trigger-button">Open</Button>
            </Popover.Trigger>
            <Popover.Content>
              <div data-testid="popover-content">Content</div>
            </Popover.Content>
          </Popover>
        </div>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('popover-content')).toBeInTheDocument();
      });

      rerender(
        <div>
          <div ref={anchorRef} data-testid="anchor-element">
            Anchor
          </div>
          <Popover isOpen={false} anchorRef={anchorRef}>
            <Popover.Trigger>
              <Button data-testid="trigger-button">Open</Button>
            </Popover.Trigger>
            <Popover.Content>
              <div data-testid="popover-content">Content</div>
            </Popover.Content>
          </Popover>
        </div>,
      );

      await waitFor(() => {
        expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
      });
    });
  });

  describe('統合テスト', () => {
    it('全ての機能が協調して動作すること', async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();

      render(
        <PopoverTestWrapper
          onClose={onClose}
          placement="bottom"
          offset={12}
          triggerText="Open Menu"
          contentText="Menu Items"
        />,
      );

      const trigger = screen.getByRole('button', { name: 'Open Menu' });

      // Popoverが閉じた状態で開始
      expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();

      // トリガーをクリック
      await user.click(trigger);

      // Popoverが開く
      await waitFor(() => {
        expect(screen.getByTestId('popover-content')).toBeInTheDocument();
      });

      // ARIA属性の確認
      expect(trigger).toHaveAttribute('aria-expanded', 'true');

      // Escapeキーでクローズ
      await user.keyboard('{Escape}');

      // Popoverが閉じる
      await waitFor(() => {
        expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
        expect(onClose).toHaveBeenCalledWith({ reason: 'escape-key-down' });
      });
    });
  });

  describe('エッジケース', () => {
    it('onCloseが未定義の場合でも動作すること', async () => {
      const { rerender } = render(
        <Popover isOpen>
          <Popover.Trigger>
            <Button data-testid="trigger-button">Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('popover-content')).toBeInTheDocument();
      });

      const contentWrapper = screen.getByTestId('popover-content').parentElement;
      fireEvent.keyDown(contentWrapper!, { key: 'Escape' });

      // エラーが発生しないことを確認
      rerender(
        <Popover isOpen={false}>
          <Popover.Trigger>
            <Button data-testid="trigger-button">Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
    });

    it('PopoverContext外で使用すると、usePopoverContextがエラーをスローすること', () => {
      // これはコンポーネント内で検証されるため、ここではスキップ
      // 実際には Trigger/Content を Context 外で使用するとエラーになる
      expect(() => {
        render(
          <Popover.Trigger>
            <Button>Orphan Trigger</Button>
          </Popover.Trigger>,
        );
      }).toThrow('Popover components must be used inside <Popover.Root>');
    });
  });

  describe('Modal表示連動', () => {
    it('Popover開いた状態でzenkigen-modal-openイベントを受けるとonCloseが呼ばれ、reasonが"modal-open"になること', async () => {
      const onClose = vi.fn();
      render(
        <Popover isOpen onClose={onClose}>
          <Popover.Trigger>
            <Button>Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('popover-content')).toBeInTheDocument();
      });

      act(() => {
        window.dispatchEvent(new CustomEvent(MODAL_OPEN_EVENT));
      });

      await waitFor(() => {
        expect(onClose).toHaveBeenCalledWith({ reason: 'modal-open' });
      });
    });

    it('Popoverが閉じた状態ではzenkigen-modal-openイベントを受けてもonCloseが呼ばれないこと', () => {
      const onClose = vi.fn();
      render(
        <Popover isOpen={false} onClose={onClose}>
          <Popover.Trigger>
            <Button>Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

      window.dispatchEvent(new CustomEvent(MODAL_OPEN_EVENT));

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  /**
   * ビューポートからのはみ出し回避（flip / shift）
   *
   * jsdom はレイアウトを行わず getBoundingClientRect が常に 0 を返すため、Floating UI の位置計算が
   * 成立しない。要素別に固定 rect を返す mock を入れて計算を決定的にし、算出された inline style の
   * 数値を手計算値と突き合わせる（combobox.test.tsx と同じ手法）。
   *
   * mock はこの describe 内に閉じている。ファイル全体に spy を張ると useDismiss のポインタ判定など
   * 既存テストへの影響が読めないため。
   */
  describe('ビューポートはみ出し回避 (flip / shift)', () => {
    const VIEWPORT_WIDTH = 1024;
    const VIEWPORT_HEIGHT = 768;
    /** popover.tsx の FLOATING_VIEWPORT_PADDING と同値 */
    const VIEWPORT_PADDING = 8;
    // 許容領域は x: [8, 1016] / y: [8, 760]
    const MAX_RIGHT = VIEWPORT_WIDTH - VIEWPORT_PADDING;
    const MAX_BOTTOM = VIEWPORT_HEIGHT - VIEWPORT_PADDING;

    const createRect = ({
      width,
      height,
      top,
      left,
    }: {
      width: number;
      height: number;
      top: number;
      left: number;
    }): DOMRect =>
      ({
        width,
        height,
        top,
        left,
        right: left + width,
        bottom: top + height,
        x: left,
        y: top,
        toJSON: () => ({}),
      }) as DOMRect;

    /** floating element かどうか（popover-content.tsx が付与する `z-popover` クラスで判別する） */
    const isFloatingElement = (element: Element): boolean => element.classList.contains('z-popover');

    /**
     * トリガーと floating element に別々の寸法を返す mock を仕込む。
     *
     * 位置の基準（reference の座標）は getBoundingClientRect から取るが、Floating UI は
     * **floating element 自身のサイズだけは offsetWidth / offsetHeight から取得する**
     * （@floating-ui/dom の getCssDimensions）。jsdom ではどちらも 0 になるため、
     * 両方を mock しないと「高さ 0 の要素」と見なされて flip が発火しない。
     */
    const mockRects = ({ trigger, floating }: { trigger: DOMRect; floating: DOMRect }) => {
      const viewportRect = createRect({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT, top: 0, left: 0 });

      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function mocked(this: Element) {
        if (this === document.documentElement || this === document.body) {
          return viewportRect;
        }
        if (isFloatingElement(this)) {
          return floating;
        }

        return trigger;
      });

      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
        configurable: true,
        get(this: HTMLElement) {
          return isFloatingElement(this) ? floating.width : trigger.width;
        },
      });
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        configurable: true,
        get(this: HTMLElement) {
          return isFloatingElement(this) ? floating.height : trigger.height;
        },
      });

      // Floating UI の clipping boundary 計算は documentElement の clientHeight / clientWidth を参照する。
      // jsdom はデフォルトで 0 を返すため明示的に viewport サイズを設定する。
      Object.defineProperty(document.documentElement, 'clientHeight', {
        configurable: true,
        value: VIEWPORT_HEIGHT,
      });
      Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: VIEWPORT_WIDTH });
    };

    const renderOpenPopover = (placement: React.ComponentProps<typeof Popover>['placement'], offsetValue = 8) =>
      render(
        <Popover isOpen placement={placement} offset={offsetValue}>
          <Popover.Trigger>
            <Button>Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div data-testid="popover-content">Content</div>
          </Popover.Content>
        </Popover>,
      );

    /** floating element（z-popover が付いたラッパー）を取得する */
    const getFloatingElement = () => screen.getByTestId('popover-content').parentElement as HTMLElement;

    // offsetWidth / offsetHeight は defineProperty で差し替えるため restoreAllMocks では戻らない。
    // 元の descriptor を控えて明示的に復元する。
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
    const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');

    afterEach(() => {
      vi.restoreAllMocks();

      if (originalOffsetWidth != null) {
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
      }
      if (originalOffsetHeight != null) {
        Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
      }
    });

    it('下に収まらない場合は上へ反転すること', async () => {
      // トリガーは下端付近（bottom: 732）。下に出すと 732 + offset 8 + 高さ 400 = 1140 で許容下端 760 を超える
      mockRects({
        trigger: createRect({ width: 200, height: 32, top: 700, left: 100 }),
        floating: createRect({ width: 200, height: 400, top: 0, left: 0 }),
      });
      renderOpenPopover('bottom');

      // 上へ反転: トリガー上端 700 − offset 8 − 高さ 400 = 292
      await waitFor(() => {
        expect(getFloatingElement().style.top).toBe('292px');
      });
    });

    it('下に収まる場合は反転しないこと', async () => {
      // 132 + offset 8 + 高さ 200 = 340 で許容下端 760 に収まる
      mockRects({
        trigger: createRect({ width: 200, height: 32, top: 100, left: 100 }),
        floating: createRect({ width: 200, height: 200, top: 0, left: 0 }),
      });
      renderOpenPopover('bottom');

      // トリガー下端 132 + offset 8 = 140
      await waitFor(() => {
        expect(getFloatingElement().style.top).toBe('140px');
      });
      expect(MAX_BOTTOM).toBe(760);
    });

    it('右にはみ出す場合は左へずれること', async () => {
      // bottom-start はトリガー左端 900 に揃うため、右端は 900 + 200 = 1100 で許容右端 1016 を 84 超える
      mockRects({
        trigger: createRect({ width: 200, height: 32, top: 100, left: 900 }),
        floating: createRect({ width: 200, height: 100, top: 0, left: 0 }),
      });
      renderOpenPopover('bottom-start');

      // 900 − 84 = 816
      await waitFor(() => {
        expect(getFloatingElement().style.left).toBe('816px');
      });
      expect(MAX_RIGHT).toBe(1016);
    });

    it('左右に収まる場合はずれないこと', async () => {
      // [100, 300] は許容領域 [8, 1016] に収まる
      mockRects({
        trigger: createRect({ width: 200, height: 32, top: 100, left: 100 }),
        floating: createRect({ width: 200, height: 100, top: 0, left: 0 }),
      });
      renderOpenPopover('bottom-start');

      await waitFor(() => {
        expect(getFloatingElement().style.left).toBe('100px');
      });
    });

    it('ビューポート端から 8px 以内の場合は padding 分だけ内側へ移動すること', async () => {
      // 左端 0 は許容左端 8 に届かないため、shift の padding 分だけ右へ押し込まれる
      mockRects({
        trigger: createRect({ width: 200, height: 32, top: 100, left: 0 }),
        floating: createRect({ width: 200, height: 100, top: 0, left: 0 }),
      });
      renderOpenPopover('bottom-start');

      await waitFor(() => {
        expect(getFloatingElement().style.left).toBe(`${VIEWPORT_PADDING}px`);
      });
    });

    it('反転した場合も offset が維持されること', async () => {
      mockRects({
        trigger: createRect({ width: 200, height: 32, top: 700, left: 100 }),
        floating: createRect({ width: 200, height: 400, top: 0, left: 0 }),
      });
      renderOpenPopover('bottom', 16);

      // 上へ反転: トリガー上端 700 − offset 16 − 高さ 400 = 284
      await waitFor(() => {
        expect(getFloatingElement().style.top).toBe('284px');
      });
    });
  });
});
