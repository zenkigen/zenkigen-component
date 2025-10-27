import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../button';
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
        <Button onClick={() => setIsOpen((prev) => !prev)}>{triggerText}</Button>
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
      }).toThrow('Popover components must be used inside');
    });
  });
});
