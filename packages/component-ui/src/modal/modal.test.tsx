import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { MODAL_OPEN_EVENT } from '../hooks/use-dismiss-on-modal-open';
import { TOP_LAYER_ATTRIBUTE } from '../utils';
import { Modal } from './modal';

type TestAppProps = {
  isInitiallyOpen?: boolean;
  onClose?: () => void;
};

/** 背面のボタンと、Modal を開くボタンを持つ最小のアプリ */
const TestApp = ({ isInitiallyOpen = false, onClose }: TestAppProps) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        開く
      </button>
      <button type="button">背面のボタン</button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          onClose?.();
        }}
      >
        <Modal.Header>タイトル</Modal.Header>
        <Modal.Body>
          <button type="button">本文のボタン</button>
        </Modal.Body>
        <Modal.Footer>
          <button type="button">保存する</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const getDialog = () => screen.getByRole('dialog');

/** Modal.Header の閉じるボタン（IconButton）は accessible name を持たないため、dialog 内の先頭のボタンとして取得する */
const getCloseButton = () => {
  const [button] = within(getDialog()).getAllByRole('button');
  if (button == null) {
    throw new Error('閉じるボタンが見つかりません');
  }

  return button;
};

// BodyScrollLock の cleanup が呼ぶ window.scrollTo は jsdom 未実装で console.error が出るためスタブする
beforeAll(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe('Modal', () => {
  describe(`${MODAL_OPEN_EVENT} イベント発火`, () => {
    it('isOpenがfalse→trueに切り替わると一度だけ発火すること', () => {
      const handler = vi.fn();
      window.addEventListener(MODAL_OPEN_EVENT, handler);

      const { rerender } = render(<Modal isOpen={false}>content</Modal>);
      expect(handler).not.toHaveBeenCalled();

      rerender(<Modal isOpen>content</Modal>);
      expect(handler).toHaveBeenCalledTimes(1);

      window.removeEventListener(MODAL_OPEN_EVENT, handler);
    });

    it('isOpenを変えずに再レンダリングしても発火しないこと', () => {
      const handler = vi.fn();
      window.addEventListener(MODAL_OPEN_EVENT, handler);

      const { rerender } = render(<Modal isOpen>content</Modal>);
      expect(handler).toHaveBeenCalledTimes(1);

      rerender(<Modal isOpen>other content</Modal>);
      expect(handler).toHaveBeenCalledTimes(1);

      window.removeEventListener(MODAL_OPEN_EVENT, handler);
    });

    it('true→false→trueの遷移で都度発火すること', () => {
      const handler = vi.fn();
      window.addEventListener(MODAL_OPEN_EVENT, handler);

      const { rerender } = render(<Modal isOpen>content</Modal>);
      expect(handler).toHaveBeenCalledTimes(1);

      rerender(<Modal isOpen={false}>content</Modal>);
      expect(handler).toHaveBeenCalledTimes(1);

      rerender(<Modal isOpen>content</Modal>);
      expect(handler).toHaveBeenCalledTimes(2);

      window.removeEventListener(MODAL_OPEN_EVENT, handler);
    });
  });

  /**
   * jsdom は inert 非対応（HTMLElement.prototype に inert がない）のため、FloatingFocusManager は
   * 背面要素に aria-hidden="true" を付けるフォールバックで動作する。ここでは aria-hidden を観測し、
   * 実ブラウザでの inert の付与と Tab の流出防止は Storybook（Base / NestedModal / LayoutExample 等）の
   * 手動確認で担保する。
   */
  describe('フォーカストラップ', () => {
    it('開いたときに Modal 内の先頭のフォーカス可能要素（閉じるボタン）へフォーカスが移ること', async () => {
      const user = userEvent.setup();
      render(<TestApp />);

      await user.click(screen.getByRole('button', { name: '開く' }));

      await waitFor(() => expect(document.activeElement).toBe(getCloseButton()));
    });

    it('末尾の要素で Tab を押すと先頭の要素へループすること', async () => {
      const user = userEvent.setup();
      render(<TestApp isInitiallyOpen />);
      await waitFor(() => expect(document.activeElement).toBe(getCloseButton()));

      screen.getByRole('button', { name: '保存する' }).focus();
      await user.tab();

      await waitFor(() => expect(document.activeElement).toBe(getCloseButton()));
    });

    it('先頭の要素で Shift+Tab を押すと末尾の要素へループすること', async () => {
      const user = userEvent.setup();
      render(<TestApp isInitiallyOpen />);
      await waitFor(() => expect(document.activeElement).toBe(getCloseButton()));

      await user.tab({ shift: true });

      await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('button', { name: '保存する' })));
    });

    it('閉じたときに、開く前にフォーカスがあった要素へフォーカスが戻ること', async () => {
      const user = userEvent.setup();
      render(<TestApp />);
      const opener = screen.getByRole('button', { name: '開く' });

      await user.click(opener);
      await waitFor(() => expect(document.activeElement).toBe(getCloseButton()));

      await user.click(getCloseButton());

      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
      await waitFor(() => expect(document.activeElement).toBe(opener));
    });

    it('開いている間は背面の要素が隠され（jsdom では aria-hidden）、閉じると解除されること', async () => {
      const user = userEvent.setup();
      const { container } = render(<TestApp />);
      expect(container).not.toHaveAttribute('aria-hidden');

      await user.click(screen.getByRole('button', { name: '開く' }));
      await waitFor(() => expect(container).toHaveAttribute('aria-hidden', 'true'));

      await user.click(getCloseButton());
      await waitFor(() => expect(container).not.toHaveAttribute('aria-hidden'));
    });

    it('Escape キーを押しても onClose が呼ばれず、Modal が閉じないこと', async () => {
      // Escape で閉じる挙動は意図的に持たせていない（利用側には Escape で閉じてはいけないモーダルがあり、
      // ライブラリ側でデフォルト有効にすると破壊的変更になる）。useDismiss を安易に追加する変更への回帰防止。
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<TestApp isInitiallyOpen onClose={onClose} />);
      await waitFor(() => expect(document.activeElement).toBe(getCloseButton()));

      await user.keyboard('{Escape}');

      expect(onClose).not.toHaveBeenCalled();
      expect(getDialog()).toBeInTheDocument();
    });

    describe('隠す対象からの除外', () => {
      const appendElementWithAttribute = (attribute: string) => {
        const element = document.createElement('div');
        element.setAttribute(attribute, '');
        document.body.appendChild(element);

        return element;
      };

      afterEach(() => {
        document.body.removeAttribute(TOP_LAYER_ATTRIBUTE);
        document.querySelectorAll(`[data-floating-ui-portal],[${TOP_LAYER_ATTRIBUTE}]`).forEach((element) => {
          element.remove();
        });
      });

      it('floating-ui のポータルの器（[data-floating-ui-portal]）は隠されないこと', async () => {
        // Popover / DatePicker / Combobox は閉じていても FloatingPortal の器を body 直下に作る。
        // 除外しないと Modal 内で開いたときに中身が隠された祖先の配下に入り、操作できなくなる。
        const portal = appendElementWithAttribute('data-floating-ui-portal');
        const { container } = render(<TestApp isInitiallyOpen />);

        await waitFor(() => expect(container).toHaveAttribute('aria-hidden', 'true'));
        expect(portal).not.toHaveAttribute('aria-hidden');
      });

      it(`${TOP_LAYER_ATTRIBUTE} を持つ要素（Toast のコンテナ等）は隠されないこと`, async () => {
        const topLayer = appendElementWithAttribute(TOP_LAYER_ATTRIBUTE);
        const { container } = render(<TestApp isInitiallyOpen />);

        await waitFor(() => expect(container).toHaveAttribute('aria-hidden', 'true'));
        expect(topLayer).not.toHaveAttribute('aria-hidden');
      });

      it('document.body に除外用の属性が付いていても、背面の要素は隠されること', async () => {
        // body を除外対象に含めると floating-ui の走査が body で止まり、トラップが丸ごと無効化されるため防御的に弾いている
        document.body.setAttribute(TOP_LAYER_ATTRIBUTE, '');
        const { container } = render(<TestApp isInitiallyOpen />);

        await waitFor(() => expect(container).toHaveAttribute('aria-hidden', 'true'));
      });
    });
  });
});
