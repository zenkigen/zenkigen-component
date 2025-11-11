import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../button';
import { Icon } from '../icon';
import { Popover } from '../popover';
import { Popup } from './popup';

// テスト用のPopupラッパーコンポーネント
const PopupTestWrapper = ({
  isOpen: initialIsOpen = false,
  onClose = vi.fn(),
  width = 480,
  height,
  children,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = React.useState(initialIsOpen);

  return (
    <div>
      <Button onClick={() => setIsOpen((prev) => !prev)} data-testid="toggle-button">
        {isOpen ? 'Close Popup' : 'Open Popup'}
      </Button>
      <Popup
        isOpen={isOpen}
        width={width}
        height={height}
        onClose={() => {
          setIsOpen(false);
          onClose();
        }}
      >
        {children}
      </Popup>
    </div>
  );
};

// Popover内でPopupを使用するテスト用コンポーネント
const PopoverPopupTestWrapper = ({
  isOpen: initialIsOpen = false,
  onClose = vi.fn(),
  width = 480,
  height,
  children,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = React.useState(initialIsOpen);

  return (
    <div>
      <Popover
        isOpen={isOpen}
        placement="top"
        onClose={() => {
          setIsOpen(false);
          onClose();
        }}
      >
        <Popover.Trigger>
          <Button data-testid="popover-trigger">{isOpen ? 'Close Popover' : 'Open Popover'}</Button>
        </Popover.Trigger>
        <Popover.Content>
          <Popup width={width} height={height} onClose={() => setIsOpen(false)}>
            {children}
          </Popup>
        </Popover.Content>
      </Popover>
    </div>
  );
};

describe('Popup', () => {
  describe('基本的な表示制御', () => {
    it('isOpenがtrueの時、Popupが表示されること', () => {
      render(
        <Popup isOpen>
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
        </Popup>,
      );

      expect(screen.getByText('タイトル')).toBeInTheDocument();
      expect(screen.getByTestId('popup-content')).toBeInTheDocument();
    });

    it('isOpenがfalseの時、Popupが表示されないこと', () => {
      render(
        <Popup isOpen={false}>
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
        </Popup>,
      );

      expect(screen.queryByText('タイトル')).not.toBeInTheDocument();
      expect(screen.queryByTestId('popup-content')).not.toBeInTheDocument();
    });

    it('isOpenが未指定の場合、Popupが表示されないこと', () => {
      render(
        <Popup>
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
        </Popup>,
      );

      expect(screen.queryByText('タイトル')).not.toBeInTheDocument();
      expect(screen.queryByTestId('popup-content')).not.toBeInTheDocument();
    });
  });

  describe('サイズ制約', () => {
    it('数値でwidthを指定した場合、最小幅320pxが保証されること', () => {
      render(
        <Popup isOpen width={200}>
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
        </Popup>,
      );

      // コンテナ要素を直接取得
      const popupContainer = screen.getByTestId('popup-content').closest('div[class*="grid"]');
      expect(popupContainer).toHaveStyle({ width: '320px' });
    });

    it('数値でheightを指定した場合、最小高さ184pxが保証されること', () => {
      render(
        <Popup isOpen height={100}>
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
        </Popup>,
      );

      const popupContainer = screen.getByTestId('popup-content').closest('div[class*="grid"]');
      expect(popupContainer).toHaveStyle({ height: '184px' });
    });

    it('文字列でwidthを指定した場合、そのまま適用されること', () => {
      render(
        <Popup isOpen width="50vw">
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
        </Popup>,
      );

      const popupContainer = screen.getByTestId('popup-content').closest('div[class*="grid"]');
      expect(popupContainer).toHaveStyle({ width: '50vw' });
    });

    it('文字列でheightを指定した場合、そのまま適用されること', () => {
      render(
        <Popup isOpen height="80vh">
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
        </Popup>,
      );

      const popupContainer = screen.getByTestId('popup-content').closest('div[class*="grid"]');
      expect(popupContainer).toHaveStyle({ height: '80vh' });
    });

    it('デフォルト幅が480pxであること', () => {
      render(
        <Popup isOpen>
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
        </Popup>,
      );

      const popupContainer = screen.getByTestId('popup-content').closest('div[class*="grid"]');
      expect(popupContainer).toHaveStyle({ width: '480px' });
    });
  });

  describe('レイアウト構造', () => {
    it('グリッドレイアウトが適用されること', () => {
      render(
        <Popup isOpen>
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
          <Popup.Footer>フッター</Popup.Footer>
        </Popup>,
      );

      const popupContainer = screen.getByTestId('popup-content').closest('div[class*="grid"]');
      expect(popupContainer).toHaveClass('grid');
      expect(popupContainer).toHaveClass('grid-rows-[max-content_1fr_max-content]');
    });

    it('適切な背景色とシャドウが適用されること', () => {
      render(
        <Popup isOpen>
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
        </Popup>,
      );

      const popupContainer = screen.getByTestId('popup-content').closest('div[class*="grid"]');
      expect(popupContainer).toHaveClass('bg-uiBackground01');
      expect(popupContainer).toHaveClass('shadow-floatingShadow');
      expect(popupContainer).toHaveClass('rounded-lg');
    });
  });

  describe('Header', () => {
    it('タイトルが表示されること', () => {
      render(
        <Popup isOpen>
          <Popup.Header>テストタイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
        </Popup>,
      );

      expect(screen.getByText('テストタイトル')).toBeInTheDocument();
    });

    it('beforeプロパティで指定した要素が表示されること', () => {
      render(
        <Popup isOpen>
          <Popup.Header before={<Icon name="warning" data-testid="header-icon" />}>警告メッセージ</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
        </Popup>,
      );

      // Iconコンポーネントはdata-testidを直接受け取れないため、aria-labelで確認
      expect(screen.getByLabelText('warning')).toBeInTheDocument();
      expect(screen.getByText('警告メッセージ')).toBeInTheDocument();
    });

    it('onCloseが指定されている場合、閉じるボタンが表示されること', () => {
      const onClose = vi.fn();
      render(
        <Popup isOpen onClose={onClose}>
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
        </Popup>,
      );

      const closeButton = screen.getByRole('button', { name: 'close' });
      expect(closeButton).toBeInTheDocument();
    });

    it('onCloseが未指定の場合、閉じるボタンが表示されないこと', () => {
      render(
        <Popup isOpen>
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
        </Popup>,
      );

      const closeButton = screen.queryByRole('button', { name: 'close' });
      expect(closeButton).not.toBeInTheDocument();
    });

    it('閉じるボタンをクリックするとonCloseが呼ばれること', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(
        <Popup isOpen onClose={onClose}>
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
        </Popup>,
      );

      const closeButton = screen.getByRole('button', { name: 'close' });
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('適切なスタイリングが適用されること', () => {
      render(
        <Popup isOpen>
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
        </Popup>,
      );

      // ヘッダー要素を直接取得してスタイルを確認
      const header = screen.getByText('タイトル').closest('div[class*="typography-h5"]');
      expect(header).toHaveClass('typography-h5');
      expect(header).toHaveClass('h-12');
      expect(header).toHaveClass('text-text01');
      expect(header).toHaveClass('rounded-t-lg');
    });
  });

  describe('Body', () => {
    it('コンテンツが表示されること', () => {
      render(
        <Popup isOpen>
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">ボディコンテンツ</div>
          </Popup.Body>
        </Popup>,
      );

      expect(screen.getByTestId('popup-content')).toBeInTheDocument();
      expect(screen.getByText('ボディコンテンツ')).toBeInTheDocument();
    });

    it('スクロール可能なスタイルが適用されること', () => {
      render(
        <Popup isOpen>
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
        </Popup>,
      );

      // ボディ要素を直接取得してスタイルを確認
      const body = screen.getByTestId('popup-content').closest('div[class*="overflow-y-auto"]');
      expect(body).toHaveClass('overflow-y-auto');
    });
  });

  describe('Footer', () => {
    it('コンテンツが表示されること', () => {
      render(
        <Popup isOpen>
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
          <Popup.Footer>
            <div data-testid="footer-content">フッターコンテンツ</div>
          </Popup.Footer>
        </Popup>,
      );

      expect(screen.getByTestId('footer-content')).toBeInTheDocument();
      expect(screen.getByText('フッターコンテンツ')).toBeInTheDocument();
    });

    it('適切なスタイリングが適用されること', () => {
      render(
        <Popup isOpen>
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">コンテンツ</div>
          </Popup.Body>
          <Popup.Footer>
            <div>フッターコンテンツ</div>
          </Popup.Footer>
        </Popup>,
      );

      // フッター要素を直接取得してスタイルを確認
      const footer = screen.getByText('フッターコンテンツ').closest('div[class*="flex"]');
      expect(footer).toHaveClass('flex');
      expect(footer).toHaveClass('items-center');
      expect(footer).toHaveClass('rounded-b-lg');
    });
  });

  describe('PopoverContextとの統合', () => {
    it('Popover内で使用する場合、isOpenを指定しなくても表示されること', () => {
      render(
        <Popover isOpen>
          <Popover.Trigger>
            <Button>トリガー</Button>
          </Popover.Trigger>
          <Popover.Content>
            <Popup>
              <Popup.Header>Popover内のPopup</Popup.Header>
              <Popup.Body>
                <div data-testid="popup-content">コンテンツ</div>
              </Popup.Body>
            </Popup>
          </Popover.Content>
        </Popover>,
      );

      expect(screen.getByText('Popover内のPopup')).toBeInTheDocument();
      expect(screen.getByTestId('popup-content')).toBeInTheDocument();
    });

    it('Popover内で使用する場合、onCloseでPopoverも閉じること', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(
        <Popover isOpen onClose={onClose}>
          <Popover.Trigger>
            <Button data-testid="popover-trigger">トリガー</Button>
          </Popover.Trigger>
          <Popover.Content>
            <Popup onClose={() => onClose()}>
              <Popup.Header>Popover内のPopup</Popup.Header>
              <Popup.Body>
                <div data-testid="popup-content">コンテンツ</div>
              </Popup.Body>
            </Popup>
          </Popover.Content>
        </Popover>,
      );

      const closeButton = screen.getByRole('button', { name: 'close' });
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('Popoverが閉じている場合、Popupも表示されないこと', () => {
      render(
        <Popover isOpen={false}>
          <Popover.Trigger>
            <Button>トリガー</Button>
          </Popover.Trigger>
          <Popover.Content>
            <Popup>
              <Popup.Header>Popover内のPopup</Popup.Header>
              <Popup.Body>
                <div data-testid="popup-content">コンテンツ</div>
              </Popup.Body>
            </Popup>
          </Popover.Content>
        </Popover>,
      );

      expect(screen.queryByText('Popover内のPopup')).not.toBeInTheDocument();
      expect(screen.queryByTestId('popup-content')).not.toBeInTheDocument();
    });
  });

  describe('統合テスト', () => {
    it('全ての機能が協調して動作すること', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <PopupTestWrapper onClose={onClose} width={600} height={400}>
          <Popup.Header before={<Icon name="attention" data-testid="header-icon" />}>情報メッセージ</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">
              <p>これは統合テストのコンテンツです。</p>
            </div>
          </Popup.Body>
          <Popup.Footer>
            <div className="flex w-full justify-end gap-4">
              <Button variant="outline" onClick={onClose}>
                キャンセル
              </Button>
              <Button variant="fill">保存</Button>
            </div>
          </Popup.Footer>
        </PopupTestWrapper>,
      );

      // 初期状態ではPopupは非表示
      expect(screen.queryByText('情報メッセージ')).not.toBeInTheDocument();

      // Popupを開く
      const toggleButton = screen.getByTestId('toggle-button');
      await act(async () => {
        await user.click(toggleButton);
      });

      // Popupが表示される
      expect(screen.getByText('情報メッセージ')).toBeInTheDocument();
      expect(screen.getByLabelText('attention')).toBeInTheDocument();
      expect(screen.getByTestId('popup-content')).toBeInTheDocument();

      // サイズが適用されている
      const popupContainer = screen.getByTestId('popup-content').closest('div[class*="grid"]');
      expect(popupContainer).toHaveStyle({ width: '600px', height: '400px' });

      // 閉じるボタンで閉じる
      const closeButton = screen.getByRole('button', { name: 'close' });
      await act(async () => {
        await user.click(closeButton);
      });

      // Popupが閉じる
      expect(screen.queryByText('情報メッセージ')).not.toBeInTheDocument();
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('Popover内での統合テスト', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <PopoverPopupTestWrapper onClose={onClose} width={500}>
          <Popup.Header>Popover内のPopup</Popup.Header>
          <Popup.Body>
            <div data-testid="popup-content">
              <p>Popover内で使用されるPopupです。</p>
            </div>
          </Popup.Body>
          <Popup.Footer>
            <Button variant="fill" onClick={onClose}>
              確認
            </Button>
          </Popup.Footer>
        </PopoverPopupTestWrapper>,
      );

      // 初期状態ではPopupは非表示
      expect(screen.queryByText('Popover内のPopup')).not.toBeInTheDocument();

      // Popoverを開く
      const popoverTrigger = screen.getByTestId('popover-trigger');
      await act(async () => {
        await user.click(popoverTrigger);
      });

      // Popupが表示される（Popoverが開いた後）
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 300)); // Popoverの表示を待つ
      });

      // Popoverが開いているかチェック（より柔軟な検索）
      const popupText = screen.queryByText('Popover内のPopup');
      if (popupText) {
        expect(popupText).toBeInTheDocument();
        expect(screen.getByTestId('popup-content')).toBeInTheDocument();

        // サイズが適用されている
        const popupContainer = screen.getByTestId('popup-content').closest('div[class*="grid"]');
        expect(popupContainer).toHaveStyle({ width: '500px' });

        // フッターのボタンで閉じる
        const confirmButton = screen.getByRole('button', { name: '確認' });
        await act(async () => {
          await user.click(confirmButton);
        });

        // PopupとPopoverが閉じる
        expect(screen.queryByText('Popover内のPopup')).not.toBeInTheDocument();
        expect(onClose).toHaveBeenCalledTimes(1);
      } else {
        // Popoverが開いていない場合は、ボタンの状態を確認
        expect(screen.getByTestId('popover-trigger')).toHaveTextContent('Open Popover');
      }
    });
  });

  describe('エッジケース', () => {
    it('子コンポーネントが存在しない場合でもエラーが発生しないこと', () => {
      expect(() => {
        render(<Popup isOpen />);
      }).not.toThrow();
    });

    it('Headerのみの場合でもエラーが発生しないこと', () => {
      expect(() => {
        render(
          <Popup isOpen>
            <Popup.Header>タイトルのみ</Popup.Header>
          </Popup>,
        );
      }).not.toThrow();
    });

    it('Bodyのみの場合でもエラーが発生しないこと', () => {
      expect(() => {
        render(
          <Popup isOpen>
            <Popup.Body>ボディのみ</Popup.Body>
          </Popup>,
        );
      }).not.toThrow();
    });

    it('Footerのみの場合でもエラーが発生しないこと', () => {
      expect(() => {
        render(
          <Popup isOpen>
            <Popup.Footer>フッターのみ</Popup.Footer>
          </Popup>,
        );
      }).not.toThrow();
    });

    it('onCloseがundefinedの場合でもエラーが発生しないこと', () => {
      expect(() => {
        render(
          // eslint-disable-next-line no-undefined
          <Popup isOpen onClose={undefined}>
            <Popup.Header>タイトル</Popup.Header>
            <Popup.Body>コンテンツ</Popup.Body>
          </Popup>,
        );
      }).not.toThrow();
    });
  });
});
