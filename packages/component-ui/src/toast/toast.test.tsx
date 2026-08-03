import { act, fireEvent, render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Toast } from './toast';
import { ToastProvider, useToast } from './toast-provider';

vi.mock('../icon', () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`}>{name}</span>,
}));

/**
 * Toast は自動クローズのタイマーを持つため、このファイル全体で fake timers を使う。
 * その際 userEvent は使えない（React Testing Library の asyncWrapper が Vitest の fake timers を
 * 検知できず、マイクロタスクを流すための setTimeout が進まないまま await が解決しなくなるため）。
 * 単純なクリック検証のみのため、act でラップされる fireEvent を用いる。
 */

const CLOSE_TIME_MSEC = 5000;

type ToastProps = ComponentProps<typeof Toast>;
type AddToastArgs = Parameters<ReturnType<typeof useToast>['addToast']>[0];

const advanceToAutoClose = async () => {
  await act(async () => {
    vi.advanceTimersByTime(CLOSE_TIME_MSEC);
  });
};

/** jsdom は CSS アニメーションを実行しないため、フェードアウト完了を明示的に再現する */
const fireFadeOutEnd = (element: HTMLElement) => {
  const getComputedStyleSpy = vi
    .spyOn(window, 'getComputedStyle')
    .mockReturnValue({ opacity: '0' } as unknown as CSSStyleDeclaration);

  fireEvent.animationEnd(element);
  getComputedStyleSpy.mockRestore();
};

const renderToast = (props: Omit<Partial<ToastProps>, 'onClickClose'> = {}) => {
  const onClickClose = vi.fn();
  const { container, unmount } = render(
    <Toast onClickClose={onClickClose} {...props}>
      {props.children ?? 'テキスト'}
    </Toast>,
  );

  return { container, unmount, onClickClose, root: container.firstElementChild as HTMLElement };
};

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Toast', () => {
  describe('レンダリング', () => {
    it('children がタイトルとして表示されること', () => {
      renderToast({ children: '保存しました' });
      expect(screen.getByText('保存しました')).toBeInTheDocument();
    });

    it('description を渡すと説明文が表示されること', () => {
      renderToast({ description: '説明が入ります' });
      expect(screen.getByText('説明が入ります')).toBeInTheDocument();
    });

    it('description 未指定時は説明文の要素が描画されないこと', () => {
      const { root } = renderToast();
      expect(root.querySelectorAll('p')).toHaveLength(1);
    });

    it.each([
      ['success', 'icon-success-filled'],
      ['error', 'icon-attention'],
      ['warning', 'icon-warning'],
      ['information', 'icon-information-filled'],
    ] as const)('state が %s のとき %s が表示されること', (state, testId) => {
      renderToast({ state });
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('width が style に反映されること', () => {
      const { root } = renderToast({ width: 475 });
      expect(root).toHaveStyle({ width: '475px' });
    });
  });

  describe('閉じるボタン', () => {
    it('既定では閉じるボタンが表示されないこと', () => {
      renderToast();
      expect(screen.queryByRole('button', { name: '閉じる' })).not.toBeInTheDocument();
    });

    it('hasCloseButton=true で閉じるボタンが表示されること', () => {
      renderToast({ hasCloseButton: true });
      expect(screen.getByRole('button', { name: '閉じる' })).toBeInTheDocument();
    });

    it('閉じるボタンにアクセシブルネーム「閉じる」が付いていること', () => {
      renderToast({ hasCloseButton: true });
      expect(screen.getByRole('button', { name: '閉じる' })).toHaveAttribute('aria-label', '閉じる');
    });

    it('閉じるボタンをクリックすると onClickClose が呼ばれること', () => {
      const { onClickClose } = renderToast({ hasCloseButton: true });

      fireEvent.click(screen.getByRole('button', { name: '閉じる' }));

      expect(onClickClose).toHaveBeenCalledTimes(1);
    });

    it('isAutoClose=false かつ hasCloseButton 未指定でも閉じるボタンが表示されること', () => {
      renderToast({ isAutoClose: false });
      expect(screen.getByRole('button', { name: '閉じる' })).toBeInTheDocument();
    });

    it('isAutoClose=false のとき hasCloseButton=false を指定しても閉じるボタンが表示されること', () => {
      renderToast({ isAutoClose: false, hasCloseButton: false });
      expect(screen.getByRole('button', { name: '閉じる' })).toBeInTheDocument();
    });
  });

  describe('自動クローズ', () => {
    it('props 未指定でも 5 秒後に onClickClose が呼ばれること', async () => {
      const { onClickClose } = renderToast();

      expect(onClickClose).not.toHaveBeenCalled();
      await advanceToAutoClose();

      expect(onClickClose).toHaveBeenCalledTimes(1);
    });

    it('isAutoClose=false では 5 秒経過しても onClickClose が呼ばれないこと', async () => {
      const { onClickClose } = renderToast({ isAutoClose: false });

      await advanceToAutoClose();

      expect(onClickClose).not.toHaveBeenCalled();
    });

    it('アンマウント後はタイマーが発火しても onClickClose が呼ばれないこと', async () => {
      const { onClickClose, unmount } = renderToast();

      unmount();
      await advanceToAutoClose();

      expect(onClickClose).not.toHaveBeenCalled();
    });
  });

  describe('アニメーション', () => {
    it('isAnimation=true では 5 秒経過だけでは onClickClose が呼ばれないこと', async () => {
      const { onClickClose, root } = renderToast({ isAnimation: true });

      await advanceToAutoClose();

      expect(onClickClose).not.toHaveBeenCalled();
      expect(root.className).toMatch(/animate-toast-out/);
    });

    it('フェードアウト完了時に onClickClose が呼ばれること', async () => {
      const { onClickClose, root } = renderToast({ isAnimation: true });

      await advanceToAutoClose();
      fireFadeOutEnd(root);

      expect(onClickClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('スタイル', () => {
    it('枠線・角丸・背景のクラスが付与されていること', () => {
      const { root } = renderToast();

      expect(root.className).toMatch(/border-uiBorder01/);
      expect(root.className).toMatch(/rounded/);
      expect(root.className).toMatch(/bg-uiBackground01/);
    });

    it('error state ではタイトルが text-supportError になること', () => {
      renderToast({ state: 'error', children: 'エラーが発生しました' });
      expect(screen.getByText('エラーが発生しました').className).toMatch(/text-supportError/);
    });

    it('error state でも description は text-text01 のままであること', () => {
      renderToast({ state: 'error', description: '説明が入ります' });

      const descriptionElement = screen.getByText('説明が入ります');

      expect(descriptionElement.className).toMatch(/text-text01/);
      expect(descriptionElement.className).not.toMatch(/text-supportError/);
    });
  });
});

const AddToastButton = ({ args, label = 'トーストを表示' }: { args: AddToastArgs; label?: string }) => {
  const { addToast } = useToast();

  return (
    <button type="button" onClick={() => addToast(args)}>
      {label}
    </button>
  );
};

const renderProvider = (args: AddToastArgs, providerProps: { hasCloseButton?: boolean } = {}) => {
  render(
    <ToastProvider {...providerProps}>
      <AddToastButton args={args} />
    </ToastProvider>,
  );
};

const clickAddToast = (label = 'トーストを表示') => {
  fireEvent.click(screen.getByRole('button', { name: label }));
};

const getToastContainer = () => screen.getByRole('status');

describe('ToastProvider / useToast', () => {
  it('addToast({ message, state }) でトーストが表示されること', () => {
    renderProvider({ message: '保存しました', state: 'success' });

    clickAddToast();

    expect(screen.getByText('保存しました')).toBeInTheDocument();
  });

  it('addToast の description が表示されること', () => {
    renderProvider({ message: '保存しました', state: 'success', description: '説明が入ります' });

    clickAddToast();

    expect(screen.getByText('説明が入ります')).toBeInTheDocument();
  });

  it('既定では閉じるボタンが表示されないこと', () => {
    renderProvider({ message: '保存しました', state: 'success' });

    clickAddToast();

    expect(screen.queryByRole('button', { name: '閉じる' })).not.toBeInTheDocument();
  });

  it('ToastProvider の hasCloseButton がトーストの既定になること', () => {
    renderProvider({ message: '保存しました', state: 'success' }, { hasCloseButton: true });

    clickAddToast();

    expect(screen.getByRole('button', { name: '閉じる' })).toBeInTheDocument();
  });

  it('addToast の hasCloseButton が ToastProvider の設定を上書きすること', () => {
    renderProvider({ message: '保存しました', state: 'success', hasCloseButton: false }, { hasCloseButton: true });

    clickAddToast();

    expect(screen.queryByRole('button', { name: '閉じる' })).not.toBeInTheDocument();
  });

  it('ToastProvider が既定でも addToast の hasCloseButton=true で閉じるボタンが表示されること', () => {
    renderProvider({ message: '保存しました', state: 'success', hasCloseButton: true });

    clickAddToast();

    expect(screen.getByRole('button', { name: '閉じる' })).toBeInTheDocument();
  });

  it('既定では 5 秒後にトーストがフェードアウトを開始すること', async () => {
    renderProvider({ message: '保存しました', state: 'success' });

    clickAddToast();
    await advanceToAutoClose();

    expect(getToastContainer().firstElementChild?.className).toMatch(/animate-toast-out/);
  });

  it('addToast の isAutoClose=false でトーストが自動で消えないこと', async () => {
    renderProvider({ message: '保存しました', state: 'success', isAutoClose: false });

    clickAddToast();
    await advanceToAutoClose();

    expect(screen.getByText('保存しました')).toBeInTheDocument();
    expect(getToastContainer().firstElementChild?.className).not.toMatch(/animate-toast-out/);
  });

  it('addToast の isAutoClose=false のとき閉じるボタンが必ず表示されること', () => {
    renderProvider({ message: '保存しました', state: 'success', isAutoClose: false });

    clickAddToast();

    expect(screen.getByRole('button', { name: '閉じる' })).toBeInTheDocument();
  });

  it('ポータルコンテナに role="status" / aria-live="polite" が付与されていること', () => {
    renderProvider({ message: '保存しました', state: 'success' });

    expect(getToastContainer()).toHaveAttribute('aria-live', 'polite');
  });

  it('閉じるボタンクリックでトーストが DOM から取り除かれること', () => {
    renderProvider({ message: '保存しました', state: 'success' }, { hasCloseButton: true });

    clickAddToast();

    const toastElement = getToastContainer().firstElementChild as HTMLElement;

    fireEvent.click(screen.getByRole('button', { name: '閉じる' }));
    fireFadeOutEnd(toastElement);

    expect(screen.queryByText('保存しました')).not.toBeInTheDocument();
  });

  it('複数トーストが追加順に積み上がること', () => {
    let idSeed = 0;
    vi.spyOn(Math, 'random').mockImplementation(() => {
      idSeed += 1;

      return idSeed / 100000;
    });

    render(
      <ToastProvider>
        <AddToastButton args={{ message: '1 件目', state: 'information' }} label="1 件目を表示" />
        <AddToastButton args={{ message: '2 件目', state: 'information' }} label="2 件目を表示" />
      </ToastProvider>,
    );

    clickAddToast('1 件目を表示');
    clickAddToast('2 件目を表示');

    const messages = Array.from(getToastContainer().children).map((element) => element.textContent);

    expect(messages).toHaveLength(2);
    expect(messages[0]).toContain('1 件目');
    expect(messages[1]).toContain('2 件目');
  });
});
