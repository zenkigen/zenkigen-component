import { FloatingPortal } from '@floating-ui/react';
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

type NestedAppProps = {
  isBothInitiallyOpen?: boolean;
};

/** 外側 Modal の中から内側 Modal を開くアプリ（モーダル on モーダル） */
const NestedApp = ({ isBothInitiallyOpen = false }: NestedAppProps) => {
  const [isOuterOpen, setIsOuterOpen] = useState(isBothInitiallyOpen);
  const [isInnerOpen, setIsInnerOpen] = useState(isBothInitiallyOpen);

  return (
    <div>
      <button type="button" onClick={() => setIsOuterOpen(true)}>
        外側を開く
      </button>
      <Modal isOpen={isOuterOpen} onClose={() => setIsOuterOpen(false)}>
        <Modal.Header>外側</Modal.Header>
        <Modal.Body>
          <button type="button" onClick={() => setIsInnerOpen(true)}>
            内側を開く
          </button>
          <button type="button" onClick={() => setIsOuterOpen(false)}>
            外側を閉じる
          </button>
        </Modal.Body>
      </Modal>
      <Modal isOpen={isInnerOpen} onClose={() => setIsInnerOpen(false)}>
        <Modal.Header>内側</Modal.Header>
        <Modal.Body>
          <button type="button" onClick={() => setIsInnerOpen(false)}>
            内側を閉じる
          </button>
        </Modal.Body>
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

/** 隠された（aria-hidden の）dialog も含めて名前で取得し、その overlay を返す */
const getOverlay = (name: string) => {
  const overlay = screen.getByRole('dialog', { name, hidden: true }).parentElement;
  if (overlay == null) {
    throw new Error('overlay が見つかりません');
  }

  return overlay;
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
    it('開いたときにダイアログ本体へフォーカスが移り、Tab で先頭のフォーカス可能要素（閉じるボタン）へ進むこと', async () => {
      const user = userEvent.setup();
      render(<TestApp />);

      await user.click(screen.getByRole('button', { name: '開く' }));
      await waitFor(() => expect(document.activeElement).toBe(getDialog()));

      await user.tab();

      await waitFor(() => expect(document.activeElement).toBe(getCloseButton()));
    });

    it('Modal.Header の内容がダイアログのアクセシブルネームになること', async () => {
      render(<TestApp isInitiallyOpen />);

      expect(await screen.findByRole('dialog', { name: 'タイトル' })).toBeInTheDocument();
    });

    it('Modal.Header がない場合は aria-labelledby が付かないこと', () => {
      render(
        <Modal isOpen>
          <Modal.Body>content</Modal.Body>
        </Modal>,
      );

      expect(getDialog()).not.toHaveAttribute('aria-labelledby');
    });

    it('末尾の要素で Tab を押すと先頭の要素へループすること', async () => {
      const user = userEvent.setup();
      render(<TestApp isInitiallyOpen />);
      await waitFor(() => expect(document.activeElement).toBe(getDialog()));

      screen.getByRole('button', { name: '保存する' }).focus();
      await user.tab();

      await waitFor(() => expect(document.activeElement).toBe(getCloseButton()));
    });

    it('先頭の要素で Shift+Tab を押すと末尾の要素へループすること', async () => {
      const user = userEvent.setup();
      render(<TestApp isInitiallyOpen />);
      await waitFor(() => expect(document.activeElement).toBe(getDialog()));

      getCloseButton().focus();
      await user.tab({ shift: true });

      await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('button', { name: '保存する' })));
    });

    it('閉じたときに、開く前にフォーカスがあった要素へフォーカスが戻ること', async () => {
      const user = userEvent.setup();
      render(<TestApp />);
      const opener = screen.getByRole('button', { name: '開く' });

      await user.click(opener);
      await waitFor(() => expect(document.activeElement).toBe(getDialog()));

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
      await waitFor(() => expect(document.activeElement).toBe(getDialog()));

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

      it('Modal より前から存在する背面のポータルの器（[data-floating-ui-portal]）は隠されること', async () => {
        // 背面で開いたままの Popover 等の器。除外すると z-popover が overlay より上のため背面の操作が残ってしまう
        const backgroundPortal = appendElementWithAttribute('data-floating-ui-portal');
        const { container } = render(<TestApp isInitiallyOpen />);

        await waitFor(() => expect(container).toHaveAttribute('aria-hidden', 'true'));
        expect(backgroundPortal).toHaveAttribute('aria-hidden', 'true');
      });

      it('Modal の中のコンポーネントが作るポータルの器は隠されないこと', async () => {
        // Popover / DatePicker / Combobox は閉じていても FloatingPortal の器を body 直下に作る。
        // Modal の DOM より後に作られるため、除外しないと Modal 内で開いたときに中身が隠された祖先の配下に入り操作できなくなる
        const { container } = render(
          <Modal isOpen>
            <Modal.Body>
              <FloatingPortal>
                <span>ポータルの中身</span>
              </FloatingPortal>
            </Modal.Body>
          </Modal>,
        );

        await waitFor(() => expect(container).toHaveAttribute('aria-hidden', 'true'));
        const portal = screen.getByText('ポータルの中身').closest('[data-floating-ui-portal]');
        expect(portal).not.toBeNull();
        expect(portal).not.toHaveAttribute('aria-hidden');
      });

      it(`${TOP_LAYER_ATTRIBUTE} を持つ要素（Toast のコンテナ等）は、Modal より前から存在していても隠されないこと`, async () => {
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

    describe('複数の Modal', () => {
      it('順番に開くと、内側が開いている間だけ外側が隠され、内側を閉じると「内側を開く」ボタンへ戻ること', async () => {
        const user = userEvent.setup();
        render(<NestedApp />);

        await user.click(screen.getByRole('button', { name: '外側を開く' }));
        await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('dialog', { name: '外側' })));
        await user.click(screen.getByRole('button', { name: '内側を開く' }));
        await waitFor(() => expect(getOverlay('外側')).toHaveAttribute('aria-hidden', 'true'));
        expect(getOverlay('内側')).not.toHaveAttribute('aria-hidden');

        await user.click(screen.getByRole('button', { name: '内側を閉じる' }));

        await waitFor(() => expect(getOverlay('外側')).not.toHaveAttribute('aria-hidden'));
        await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('button', { name: '内側を開く' })));
      });

      it('同時に開いた場合、DOM 上で後ろの Modal が前面として扱われ、前の Modal だけが隠されること', async () => {
        // 互いを隠し合うと前面の Modal まで inert になり、操作不能（Escape も効かない）になる
        render(<NestedApp isBothInitiallyOpen />);

        await waitFor(() => expect(getOverlay('外側')).toHaveAttribute('aria-hidden', 'true'));
        expect(getOverlay('内側')).not.toHaveAttribute('aria-hidden');
        await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('dialog', { name: '内側' })));
      });

      it('内側→外側の順に閉じると、最初に開いた要素へフォーカスが戻ること', async () => {
        // floating-ui の共有の履歴スタックに任せると、外側を閉じたときに unmount 済みの「内側を開く」を選んで復帰に失敗する
        const user = userEvent.setup();
        render(<NestedApp />);
        const opener = screen.getByRole('button', { name: '外側を開く' });

        await user.click(opener);
        await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('dialog', { name: '外側' })));
        await user.click(screen.getByRole('button', { name: '内側を開く' }));
        await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('dialog', { name: '内側' })));
        await user.click(screen.getByRole('button', { name: '内側を閉じる' }));
        await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('button', { name: '内側を開く' })));

        await user.click(screen.getByRole('button', { name: '外側を閉じる' }));

        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
        await waitFor(() => expect(document.activeElement).toBe(opener));
      });
    });
  });
});
