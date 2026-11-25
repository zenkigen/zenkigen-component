import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { HOVER_IGNORE_DURATION_AFTER_SCROLL_MS, resetScrollTimeRecordsForTest } from './scroll-time-tracker';
import { Tooltip } from './tooltip';

// performance.now を、テストの中で手で進める時計に置き換える（実時間の待ちを入れずに、スクロールからの経過時間を作る）
const mockPerformanceNow = () => {
  let now = 1000;
  vi.spyOn(performance, 'now').mockImplementation(() => now);

  return {
    advance: (ms: number) => {
      now += ms;
    },
  };
};

describe('Tooltip', () => {
  afterEach(() => {
    // スクロールの時刻の記録は Tooltip がアンマウントされても残るので、テスト同士で混ざらないように消す
    resetScrollTimeRecordsForTest();
    vi.restoreAllMocks();
  });

  describe('レンダリング', () => {
    it('children が描画される', () => {
      render(
        <Tooltip content="tooltip-content">
          <button type="button">trigger</button>
        </Tooltip>,
      );

      expect(screen.getByRole('button', { name: 'trigger' })).toBeInTheDocument();
    });

    it('初期状態では content は描画されない', () => {
      render(
        <Tooltip content="tooltip-content">
          <button type="button">trigger</button>
        </Tooltip>,
      );

      expect(screen.queryByText('tooltip-content')).not.toBeInTheDocument();
    });
  });

  describe('ホバー表示', () => {
    it('ホバーすると content が表示される', async () => {
      const user = userEvent.setup();

      render(
        <Tooltip content="tooltip-content">
          <button type="button">trigger</button>
        </Tooltip>,
      );

      await user.hover(screen.getByRole('button', { name: 'trigger' }));

      expect(screen.getByText('tooltip-content')).toBeInTheDocument();
    });

    it('ホバー解除で content が非表示になる', async () => {
      const user = userEvent.setup();

      render(
        <Tooltip content="tooltip-content">
          <button type="button">trigger</button>
        </Tooltip>,
      );

      const trigger = screen.getByRole('button', { name: 'trigger' });
      await user.hover(trigger);
      expect(screen.getByText('tooltip-content')).toBeInTheDocument();

      await user.unhover(trigger);
      expect(screen.queryByText('tooltip-content')).not.toBeInTheDocument();
    });

    it('isDisabledHover が true のときホバーしても表示されない', async () => {
      const user = userEvent.setup();

      render(
        <Tooltip content="tooltip-content" isDisabledHover>
          <button type="button">trigger</button>
        </Tooltip>,
      );

      await user.hover(screen.getByRole('button', { name: 'trigger' }));

      expect(screen.queryByText('tooltip-content')).not.toBeInTheDocument();
    });
  });

  describe('portalTarget', () => {
    it('portalTarget 指定時、指定した要素配下に content が描画される', async () => {
      const user = userEvent.setup();
      const portalTarget = document.createElement('div');
      portalTarget.setAttribute('data-testid', 'portal-root');
      document.body.appendChild(portalTarget);

      render(
        <Tooltip content="tooltip-content" portalTarget={portalTarget}>
          <button type="button">trigger</button>
        </Tooltip>,
      );

      await user.hover(screen.getByRole('button', { name: 'trigger' }));

      const portalRoot = screen.getByTestId('portal-root');
      expect(portalRoot).toContainElement(screen.getByText('tooltip-content'));

      document.body.removeChild(portalTarget);
    });
  });

  describe('位置再計算', () => {
    it('ホバーのたびに getBoundingClientRect が呼ばれて位置が再計算される', async () => {
      const user = userEvent.setup();
      const getBoundingClientRectSpy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect');

      render(
        <Tooltip content="tooltip-content" portalTarget={document.body}>
          <button type="button">trigger</button>
        </Tooltip>,
      );

      const initialCallCount = getBoundingClientRectSpy.mock.calls.length;
      const trigger = screen.getByRole('button', { name: 'trigger' });

      await user.hover(trigger);
      const firstHoverCallCount = getBoundingClientRectSpy.mock.calls.length;
      expect(firstHoverCallCount).toBeGreaterThan(initialCallCount);

      await user.unhover(trigger);
      await user.hover(trigger);
      expect(getBoundingClientRectSpy.mock.calls.length).toBeGreaterThan(firstHoverCallCount);
    });

    it('スクロール後のホバーで最新の座標に基づいて位置が計算される', async () => {
      const user = userEvent.setup();

      const makeRect = (top: number): DOMRect =>
        ({
          top,
          bottom: top + 40,
          left: 0,
          right: 100,
          width: 100,
          height: 40,
          x: 0,
          y: top,
          toJSON: () => ({}),
        }) as DOMRect;

      const queue: DOMRect[] = [makeRect(100), makeRect(100), makeRect(20)];
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => {
        return queue.shift() ?? makeRect(20);
      });

      render(
        <Tooltip content="tooltip-content" portalTarget={document.body} verticalPosition="bottom">
          <button type="button">trigger</button>
        </Tooltip>,
      );

      const trigger = screen.getByRole('button', { name: 'trigger' });

      await user.hover(trigger);
      const firstTop = screen.getByText('tooltip-content').parentElement?.style.top;
      expect(firstTop).toBeDefined();

      await user.unhover(trigger);
      await user.hover(trigger);
      const secondTop = screen.getByText('tooltip-content').parentElement?.style.top;

      expect(secondTop).not.toEqual(firstTop);
    });

    it('表示中のリサイズで位置が追従する', async () => {
      const user = userEvent.setup();

      const makeRect = (top: number): DOMRect =>
        ({
          top,
          bottom: top + 40,
          left: 0,
          right: 100,
          width: 100,
          height: 40,
          x: 0,
          y: top,
          toJSON: () => ({}),
        }) as DOMRect;

      const queue: DOMRect[] = [makeRect(100), makeRect(100), makeRect(20)];
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => {
        return queue.shift() ?? makeRect(20);
      });

      render(
        <Tooltip content="tooltip-content" portalTarget={document.body} verticalPosition="bottom">
          <button type="button">trigger</button>
        </Tooltip>,
      );

      await user.hover(screen.getByRole('button', { name: 'trigger' }));
      const initialTop = screen.getByText('tooltip-content').parentElement?.style.top;

      await act(async () => {
        window.dispatchEvent(new Event('resize'));
      });

      const updatedTop = screen.getByText('tooltip-content').parentElement?.style.top;
      expect(updatedTop).not.toEqual(initialTop);
    });

    it('非表示時にスクロールしても再計算されない', async () => {
      const getBoundingClientRectSpy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect');

      render(
        <Tooltip content="tooltip-content" portalTarget={document.body}>
          <button type="button">trigger</button>
        </Tooltip>,
      );

      const callCountBeforeScroll = getBoundingClientRectSpy.mock.calls.length;

      await act(async () => {
        window.dispatchEvent(new Event('scroll'));
      });

      expect(getBoundingClientRectSpy.mock.calls.length).toBe(callCountBeforeScroll);
    });

    // スクロールでは位置を再計算しないと決めた。トリガーを含まない領域のスクロールに連動してトリガーが動く配置では、
    // 吹き出しは消えず、位置も追従しない（仕様書の注意を参照）
    it('表示中にトリガーを含まない領域がスクロールされても位置は再計算されない', async () => {
      const user = userEvent.setup();
      const getBoundingClientRectSpy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect');

      render(
        <div>
          <Tooltip content="tooltip-content" portalTarget={document.body}>
            <button type="button">trigger</button>
          </Tooltip>
          <div data-testid="outside-scroll-area" />
        </div>,
      );

      await user.hover(screen.getByRole('button', { name: 'trigger' }));
      const callCountBeforeScroll = getBoundingClientRectSpy.mock.calls.length;

      fireEvent.scroll(screen.getByTestId('outside-scroll-area'));

      expect(screen.getByText('tooltip-content')).toBeInTheDocument();
      expect(getBoundingClientRectSpy.mock.calls.length).toBe(callCountBeforeScroll);
    });
  });

  describe('スクロール連動', () => {
    const portalCases = [
      { label: 'portalTarget なし', portalProps: {} },
      { label: 'portalTarget あり', portalProps: { portalTarget: document.body } },
    ];

    it.each(portalCases)(
      'ページ（window）がスクロールされると content が非表示になる（$label）',
      async ({ portalProps }) => {
        const user = userEvent.setup();

        render(
          <Tooltip content="tooltip-content" {...portalProps}>
            <button type="button">trigger</button>
          </Tooltip>,
        );

        await user.hover(screen.getByRole('button', { name: 'trigger' }));
        expect(screen.getByText('tooltip-content')).toBeInTheDocument();

        fireEvent.scroll(window);

        expect(screen.queryByText('tooltip-content')).not.toBeInTheDocument();
      },
    );

    it.each(portalCases)(
      'トリガーを含むスクロール領域がスクロールされると content が非表示になる（$label）',
      async ({ portalProps }) => {
        const user = userEvent.setup();

        render(
          <div data-testid="scroll-container">
            <Tooltip content="tooltip-content" {...portalProps}>
              <button type="button">trigger</button>
            </Tooltip>
          </div>,
        );

        await user.hover(screen.getByRole('button', { name: 'trigger' }));
        expect(screen.getByText('tooltip-content')).toBeInTheDocument();

        fireEvent.scroll(screen.getByTestId('scroll-container'));

        expect(screen.queryByText('tooltip-content')).not.toBeInTheDocument();
      },
    );

    it('document がスクロールされると content が非表示になる', async () => {
      const user = userEvent.setup();

      render(
        <Tooltip content="tooltip-content">
          <button type="button">trigger</button>
        </Tooltip>,
      );

      await user.hover(screen.getByRole('button', { name: 'trigger' }));
      expect(screen.getByText('tooltip-content')).toBeInTheDocument();

      fireEvent.scroll(document);

      expect(screen.queryByText('tooltip-content')).not.toBeInTheDocument();
    });

    it('トリガーを含まない領域がスクロールされても content は表示されたままになる', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <Tooltip content="tooltip-content">
            <button type="button">trigger</button>
          </Tooltip>
          <div data-testid="outside-scroll-area" />
        </div>,
      );

      await user.hover(screen.getByRole('button', { name: 'trigger' }));

      fireEvent.scroll(screen.getByTestId('outside-scroll-area'));

      expect(screen.getByText('tooltip-content')).toBeInTheDocument();
    });

    it('トリガーの内側にある要素がスクロールされても content は表示されたままになる', async () => {
      const user = userEvent.setup();

      render(
        <Tooltip content="tooltip-content">
          <textarea aria-label="trigger-textarea" />
        </Tooltip>,
      );

      const textarea = screen.getByRole('textbox', { name: 'trigger-textarea' });
      await user.hover(textarea);
      expect(screen.getByText('tooltip-content')).toBeInTheDocument();

      fireEvent.scroll(textarea);

      expect(screen.getByText('tooltip-content')).toBeInTheDocument();
    });

    it.each(portalCases)(
      'content の内側がスクロールされても content は表示されたままになる（$label）',
      async ({ portalProps }) => {
        const user = userEvent.setup();

        render(
          <Tooltip content={<div data-testid="tooltip-inner">tooltip-content</div>} {...portalProps}>
            <button type="button">trigger</button>
          </Tooltip>,
        );

        await user.hover(screen.getByRole('button', { name: 'trigger' }));

        fireEvent.scroll(screen.getByTestId('tooltip-inner'));

        expect(screen.getByTestId('tooltip-inner')).toBeInTheDocument();
      },
    );

    // スクロールの直後のホバーは無視するため、乗せ直す前に時計を進める
    it('スクロールで非表示になったあと、マウスを外して乗せ直すと再び表示される', async () => {
      const user = userEvent.setup();
      const clock = mockPerformanceNow();

      render(
        <Tooltip content="tooltip-content">
          <button type="button">trigger</button>
        </Tooltip>,
      );

      const trigger = screen.getByRole('button', { name: 'trigger' });
      await user.hover(trigger);
      fireEvent.scroll(window);
      expect(screen.queryByText('tooltip-content')).not.toBeInTheDocument();

      clock.advance(HOVER_IGNORE_DURATION_AFTER_SCROLL_MS);
      await user.unhover(trigger);
      await user.hover(trigger);

      expect(screen.getByText('tooltip-content')).toBeInTheDocument();
    });

    // mouseover はトリガーの中の子要素をまたぐたびに届く。スクロールで消えたあとは、
    // トリガーの外へ出るまで再表示しない（スクロール中に出たり消えたりしないようにするため）。
    // user-event は子要素間の移動で relatedTarget を設定せず、React がラッパーの mouseleave を合成してしまうため、
    // ブラウザと同じ relatedTarget を指定して fireEvent で移動する。
    // スクロールの直後のホバーを無視する処理と区別するため、子要素へ移動する前に時計を進める
    it('スクロールで非表示になったあと、トリガーの中の別の子要素へ移動しても再表示されない', () => {
      const clock = mockPerformanceNow();
      render(
        <Tooltip content="tooltip-content">
          <button type="button">
            <span>icon</span>
            <span>label</span>
          </button>
        </Tooltip>,
      );

      const icon = screen.getByText('icon');
      const label = screen.getByText('label');

      fireEvent.mouseOver(icon, { relatedTarget: document.body });
      expect(screen.getByText('tooltip-content')).toBeInTheDocument();

      fireEvent.scroll(window);
      expect(screen.queryByText('tooltip-content')).not.toBeInTheDocument();

      clock.advance(HOVER_IGNORE_DURATION_AFTER_SCROLL_MS);
      fireEvent.mouseOut(icon, { relatedTarget: label });
      fireEvent.mouseOver(label, { relatedTarget: icon });
      expect(screen.queryByText('tooltip-content')).not.toBeInTheDocument();

      fireEvent.mouseOut(label, { relatedTarget: document.body });
      fireEvent.mouseOver(label, { relatedTarget: document.body });
      expect(screen.getByText('tooltip-content')).toBeInTheDocument();
    });

    // mouseleave は届かないことがある（マウスの下にあった吹き出しが取り除かれた場合など）。
    // その場合でも、マウスがトリガーの外から入ってきたときに印を外すので、次のホバーは無視されない
    it('スクロールで非表示になったあと mouseleave が届かなくても、外から入ってきたホバーで再び表示される', () => {
      const clock = mockPerformanceNow();
      render(
        <Tooltip content="tooltip-content">
          <button type="button">trigger</button>
        </Tooltip>,
      );

      const trigger = screen.getByRole('button', { name: 'trigger' });

      fireEvent.mouseOver(trigger, { relatedTarget: document.body });
      expect(screen.getByText('tooltip-content')).toBeInTheDocument();

      fireEvent.scroll(window);
      expect(screen.queryByText('tooltip-content')).not.toBeInTheDocument();

      // mouseleave（mouseOut）を発火させないまま、外から入り直す
      clock.advance(HOVER_IGNORE_DURATION_AFTER_SCROLL_MS);
      fireEvent.mouseOver(trigger, { relatedTarget: document.body });
      expect(screen.getByText('tooltip-content')).toBeInTheDocument();
    });

    it('非表示の間にスクロールされても content は表示されない', () => {
      render(
        <Tooltip content="tooltip-content">
          <button type="button">trigger</button>
        </Tooltip>,
      );

      fireEvent.scroll(window);

      expect(screen.queryByText('tooltip-content')).not.toBeInTheDocument();
    });

    // スクロール中は、行がマウスの下を通るたびに mouseover が届く。
    // トリガーを含む領域がスクロールされた直後のホバーは無視して、吹き出しが出たり消えたりしないようにする
    describe('スクロールの直後のホバー', () => {
      afterEach(() => {
        vi.useRealTimers();
      });

      const renderInScrollContainer = () =>
        render(
          <div>
            <div data-testid="scroll-container">
              <Tooltip content="tooltip-content">
                <button type="button">trigger</button>
              </Tooltip>
            </div>
            <div data-testid="outside-scroll-area" />
          </div>,
        );

      const scrollTargets = [
        { label: 'ページ（window）', scroll: () => fireEvent.scroll(window) },
        { label: 'document', scroll: () => fireEvent.scroll(document) },
        {
          label: 'トリガーを含むスクロール領域',
          scroll: () => fireEvent.scroll(screen.getByTestId('scroll-container')),
        },
      ];

      it.each(scrollTargets)('$label がスクロールされた直後のホバーでは表示されない', ({ scroll }) => {
        mockPerformanceNow();
        renderInScrollContainer();

        scroll();
        fireEvent.mouseOver(screen.getByRole('button', { name: 'trigger' }));

        expect(screen.queryByText('tooltip-content')).not.toBeInTheDocument();
      });

      it.each(scrollTargets)('$label がスクロールされてから 200ms 経ったあとのホバーでは表示される', ({ scroll }) => {
        const clock = mockPerformanceNow();
        renderInScrollContainer();
        const trigger = screen.getByRole('button', { name: 'trigger' });

        scroll();
        clock.advance(HOVER_IGNORE_DURATION_AFTER_SCROLL_MS - 1);
        fireEvent.mouseOver(trigger);
        expect(screen.queryByText('tooltip-content')).not.toBeInTheDocument();

        clock.advance(1);
        fireEvent.mouseOver(trigger);
        expect(screen.getByText('tooltip-content')).toBeInTheDocument();
      });

      it('止まっている画面でのホバーでは、すぐに表示される', () => {
        mockPerformanceNow();
        renderInScrollContainer();

        fireEvent.mouseOver(screen.getByRole('button', { name: 'trigger' }));

        expect(screen.getByText('tooltip-content')).toBeInTheDocument();
      });

      it('トリガーを含まない領域がスクロールされた直後のホバーでは表示される', () => {
        mockPerformanceNow();
        renderInScrollContainer();

        fireEvent.scroll(screen.getByTestId('outside-scroll-area'));
        fireEvent.mouseOver(screen.getByRole('button', { name: 'trigger' }));

        expect(screen.getByText('tooltip-content')).toBeInTheDocument();
      });

      it('トリガーを含まない領域のスクロールが、トリガーを含む領域のスクロールの記録を打ち消さない', () => {
        const clock = mockPerformanceNow();
        renderInScrollContainer();
        const trigger = screen.getByRole('button', { name: 'trigger' });

        fireEvent.scroll(screen.getByTestId('scroll-container'));
        clock.advance(100);
        fireEvent.scroll(screen.getByTestId('outside-scroll-area'));
        fireEvent.mouseOver(trigger);
        expect(screen.queryByText('tooltip-content')).not.toBeInTheDocument();

        // トリガーを含まない領域が直前にスクロールされていても、含む領域のスクロールから 200ms 経てば表示される
        clock.advance(HOVER_IGNORE_DURATION_AFTER_SCROLL_MS - 100);
        fireEvent.scroll(screen.getByTestId('outside-scroll-area'));
        fireEvent.mouseOver(trigger);
        expect(screen.getByText('tooltip-content')).toBeInTheDocument();
      });

      it('無視したホバーは、あとから表示に変わらない', () => {
        vi.useFakeTimers();
        const clock = mockPerformanceNow();
        renderInScrollContainer();

        fireEvent.scroll(window);
        fireEvent.mouseOver(screen.getByRole('button', { name: 'trigger' }));

        clock.advance(1000);
        act(() => {
          vi.advanceTimersByTime(1000);
        });

        expect(screen.queryByText('tooltip-content')).not.toBeInTheDocument();
      });

      it('Tooltip が複数あっても、スクロールの時刻を記録する listener は 1 つで、すべてアンマウントすると解除される', () => {
        const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
        // スクロールの時刻を記録する listener は、capture と passive をオブジェクトで指定して登録する
        // （表示中だけ登録する、消すための listener は capture を true で登録するため区別できる）
        const countTrackerScrollCalls = (spy: { mock: { calls: unknown[][] } }) =>
          spy.mock.calls.filter((call) => call[0] === 'scroll' && typeof call[2] === 'object').length;

        const { unmount } = render(
          <div>
            <Tooltip content="first">
              <button type="button">first</button>
            </Tooltip>
            <Tooltip content="second">
              <button type="button">second</button>
            </Tooltip>
            <Tooltip content="third">
              <button type="button">third</button>
            </Tooltip>
          </div>,
        );

        expect(countTrackerScrollCalls(addEventListenerSpy)).toBe(1);
        expect(countTrackerScrollCalls(removeEventListenerSpy)).toBe(0);

        unmount();

        expect(countTrackerScrollCalls(removeEventListenerSpy)).toBe(1);
      });
    });
  });
});
