import { fireEvent } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  HOVER_IGNORE_DURATION_AFTER_SCROLL_MS,
  isJustAfterScrollOf,
  resetScrollTimeRecordsForTest,
  subscribeScrollTime,
} from './scroll-time-tracker';

/**
 * 次の構造を document.body に作る。
 * scrollContainer（トリガーを含むスクロール領域）
 *   └ trigger
 *       └ triggerChild（トリガーの内側にある要素）
 * unrelated（トリガーを含まないスクロール領域）
 */
const mountedElements: HTMLElement[] = [];

const setupElements = () => {
  const scrollContainer = document.createElement('div');
  const trigger = document.createElement('div');
  const triggerChild = document.createElement('div');
  const unrelated = document.createElement('div');

  trigger.appendChild(triggerChild);
  scrollContainer.appendChild(trigger);
  document.body.appendChild(scrollContainer);
  document.body.appendChild(unrelated);
  mountedElements.push(scrollContainer, unrelated);

  return { scrollContainer, trigger, triggerChild, unrelated };
};

// window に登録された、スクロールの時刻を記録する listener だけを数える
const countTrackerScrollCalls = (spy: { mock: { calls: unknown[][] } }) =>
  spy.mock.calls.filter((call) => call[0] === 'scroll').length;

describe('scroll-time-tracker', () => {
  let now = 1000;
  const unsubscribes: Array<() => void> = [];

  const subscribe = () => {
    const unsubscribe = subscribeScrollTime();
    unsubscribes.push(unsubscribe);

    return unsubscribe;
  };

  beforeEach(() => {
    now = 1000;
    vi.spyOn(performance, 'now').mockImplementation(() => now);
  });

  afterEach(() => {
    // すべての購読をやめる。購読をやめても記録は残るので、テスト同士で混ざらないように消す
    unsubscribes.splice(0).forEach((unsubscribe) => unsubscribe());
    resetScrollTimeRecordsForTest();
    mountedElements.splice(0).forEach((element) => element.remove());
    vi.restoreAllMocks();
  });

  describe('isJustAfterScrollOf', () => {
    it('どこもスクロールされていなければ false を返す', () => {
      subscribe();
      const { trigger } = setupElements();

      expect(isJustAfterScrollOf(trigger)).toBe(false);
    });

    it.each([
      { label: 'ページ（window）', getTarget: () => window },
      { label: 'document', getTarget: () => document },
    ])('$label がスクロールされた直後は true を返す', ({ getTarget }) => {
      subscribe();
      const { trigger } = setupElements();

      fireEvent.scroll(getTarget());

      expect(isJustAfterScrollOf(trigger)).toBe(true);
    });

    it('トリガーを含むスクロール領域（祖先の要素）がスクロールされた直後は true を返す', () => {
      subscribe();
      const { scrollContainer, trigger } = setupElements();

      fireEvent.scroll(scrollContainer);

      expect(isJustAfterScrollOf(trigger)).toBe(true);
    });

    it('トリガー自身がスクロールされた直後は true を返す', () => {
      subscribe();
      const { trigger } = setupElements();

      fireEvent.scroll(trigger);

      expect(isJustAfterScrollOf(trigger)).toBe(true);
    });

    it('トリガーを含まない領域がスクロールされた直後は false を返す', () => {
      subscribe();
      const { trigger, unrelated } = setupElements();

      fireEvent.scroll(unrelated);

      expect(isJustAfterScrollOf(trigger)).toBe(false);
    });

    it('トリガーの内側にある要素がスクロールされた直後は false を返す', () => {
      subscribe();
      const { trigger, triggerChild } = setupElements();

      fireEvent.scroll(triggerChild);

      expect(isJustAfterScrollOf(trigger)).toBe(false);
    });

    it(`スクロールから ${HOVER_IGNORE_DURATION_AFTER_SCROLL_MS}ms 経つと false を返す`, () => {
      subscribe();
      const { scrollContainer, trigger } = setupElements();

      fireEvent.scroll(scrollContainer);

      now += HOVER_IGNORE_DURATION_AFTER_SCROLL_MS - 1;
      expect(isJustAfterScrollOf(trigger)).toBe(true);

      now += 1;
      expect(isJustAfterScrollOf(trigger)).toBe(false);
    });

    it('トリガーを含まない領域のスクロールが、トリガーを含む領域のスクロールの記録を上書きしない', () => {
      subscribe();
      const { scrollContainer, trigger, unrelated } = setupElements();

      fireEvent.scroll(scrollContainer);
      now += 100;
      fireEvent.scroll(unrelated);

      expect(isJustAfterScrollOf(trigger)).toBe(true);
    });

    it('スクロールし続けている間は true を返し続ける', () => {
      subscribe();
      const { scrollContainer, trigger } = setupElements();

      for (let index = 0; index < 5; index += 1) {
        fireEvent.scroll(scrollContainer);
        now += HOVER_IGNORE_DURATION_AFTER_SCROLL_MS - 1;
        expect(isJustAfterScrollOf(trigger)).toBe(true);
      }
    });

    it('購読していない間のスクロールは記録しない', () => {
      const { scrollContainer, trigger } = setupElements();

      fireEvent.scroll(scrollContainer);
      subscribe();

      expect(isJustAfterScrollOf(trigger)).toBe(false);
    });

    // 一覧の行がまとめて入れ替わると、Tooltip がいったんすべてアンマウントされてから新しい行がマウントされる。
    // そこで記録を消すと、スクロールの直後なのに新しい行へのホバーを無視できなくなる
    it('すべての購読をやめても、それまでの記録は残る', () => {
      const unsubscribe = subscribe();
      const { trigger } = setupElements();

      fireEvent.scroll(window);
      unsubscribe();
      subscribe();

      expect(isJustAfterScrollOf(trigger)).toBe(true);
    });
  });

  describe('subscribeScrollTime', () => {
    it('何個購読しても window に登録する listener は 1 つで、すべてやめると解除する', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const unsubscribeFirst = subscribe();
      const unsubscribeSecond = subscribe();
      const unsubscribeThird = subscribe();
      expect(countTrackerScrollCalls(addEventListenerSpy)).toBe(1);
      expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), {
        capture: true,
        passive: true,
      });

      unsubscribeFirst();
      unsubscribeSecond();
      expect(countTrackerScrollCalls(removeEventListenerSpy)).toBe(0);

      unsubscribeThird();
      expect(countTrackerScrollCalls(removeEventListenerSpy)).toBe(1);
    });

    it('同じ購読を 2 回やめても、ほかの購読の listener を解除しない', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const unsubscribeFirst = subscribe();
      subscribe();

      unsubscribeFirst();
      unsubscribeFirst();

      expect(countTrackerScrollCalls(removeEventListenerSpy)).toBe(0);
    });

    it('すべてやめたあとにまた購読すると、listener を登録し直す', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

      const unsubscribe = subscribe();
      unsubscribe();
      subscribe();

      expect(countTrackerScrollCalls(addEventListenerSpy)).toBe(2);
    });
  });
});
