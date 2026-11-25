import { fireEvent, renderHook } from '@testing-library/react';
import type { RefObject } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useDismissOnScroll } from './use-dismiss-on-scroll';

type HookProps = {
  triggerRef: RefObject<Element | null>;
  dismiss: () => void;
  isEnabled: boolean;
};

const renderUseDismissOnScroll = (initialProps: HookProps) =>
  renderHook(({ triggerRef, dismiss, isEnabled }: HookProps) => useDismissOnScroll(triggerRef, dismiss, isEnabled), {
    initialProps,
  });

// window に capture で登録された scroll の listener だけを数える
const countScrollCaptureCalls = (spy: { mock: { calls: unknown[][] } }) =>
  spy.mock.calls.filter((call) => call[0] === 'scroll' && call[2] === true).length;

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

  return { scrollContainer, trigger, triggerChild, unrelated, triggerRef: { current: trigger } };
};

describe('useDismissOnScroll', () => {
  afterEach(() => {
    mountedElements.splice(0).forEach((element) => element.remove());
    vi.restoreAllMocks();
  });

  it('トリガーを含む要素がスクロールされるとdismissが呼ばれること', () => {
    const { scrollContainer, triggerRef } = setupElements();
    const dismiss = vi.fn();
    renderUseDismissOnScroll({ triggerRef, dismiss, isEnabled: true });

    fireEvent.scroll(scrollContainer);

    expect(dismiss).toHaveBeenCalledTimes(1);
  });

  it('windowがスクロールされるとdismissが呼ばれること', () => {
    const { triggerRef } = setupElements();
    const dismiss = vi.fn();
    renderUseDismissOnScroll({ triggerRef, dismiss, isEnabled: true });

    // target は window で Node ではないが、ページ全体を含むものとして扱う
    fireEvent.scroll(window);

    expect(dismiss).toHaveBeenCalledTimes(1);
  });

  it('documentがスクロールされるとdismissが呼ばれること', () => {
    const { triggerRef } = setupElements();
    const dismiss = vi.fn();
    renderUseDismissOnScroll({ triggerRef, dismiss, isEnabled: true });

    // 実際のブラウザでページ全体がスクロールしたときの target
    fireEvent.scroll(document);

    expect(dismiss).toHaveBeenCalledTimes(1);
  });

  it('トリガーを含まない要素がスクロールされてもdismissが呼ばれないこと', () => {
    const { unrelated, triggerRef } = setupElements();
    const dismiss = vi.fn();
    renderUseDismissOnScroll({ triggerRef, dismiss, isEnabled: true });

    fireEvent.scroll(unrelated);

    expect(dismiss).not.toHaveBeenCalled();
  });

  it('トリガーの内側にある要素がスクロールされてもdismissが呼ばれないこと', () => {
    const { triggerChild, triggerRef } = setupElements();
    const dismiss = vi.fn();
    renderUseDismissOnScroll({ triggerRef, dismiss, isEnabled: true });

    fireEvent.scroll(triggerChild);

    expect(dismiss).not.toHaveBeenCalled();
  });

  it('triggerRef.currentがnullのときはdismissが呼ばれないこと', () => {
    const { scrollContainer } = setupElements();
    const dismiss = vi.fn();
    renderUseDismissOnScroll({ triggerRef: { current: null }, dismiss, isEnabled: true });

    fireEvent.scroll(scrollContainer);
    fireEvent.scroll(window);

    expect(dismiss).not.toHaveBeenCalled();
  });

  it('isEnabledがfalseの間はscrollのlistenerを登録せず、スクロールされてもdismissが呼ばれないこと', () => {
    const { scrollContainer, triggerRef } = setupElements();
    const dismiss = vi.fn();
    const addSpy = vi.spyOn(window, 'addEventListener');

    renderUseDismissOnScroll({ triggerRef, dismiss, isEnabled: false });

    expect(countScrollCaptureCalls(addSpy)).toBe(0);

    fireEvent.scroll(scrollContainer);
    fireEvent.scroll(window);

    expect(dismiss).not.toHaveBeenCalled();
  });

  it('isEnabledがtrueからfalseに変わるとlistenerが解除されること', () => {
    const { scrollContainer, triggerRef } = setupElements();
    const dismiss = vi.fn();
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const { rerender } = renderUseDismissOnScroll({ triggerRef, dismiss, isEnabled: true });
    expect(countScrollCaptureCalls(removeSpy)).toBe(0);

    rerender({ triggerRef, dismiss, isEnabled: false });

    expect(countScrollCaptureCalls(removeSpy)).toBe(1);

    fireEvent.scroll(scrollContainer);

    expect(dismiss).not.toHaveBeenCalled();
  });

  it('アンマウント後にスクロールされてもdismissが呼ばれないこと', () => {
    const { scrollContainer, triggerRef } = setupElements();
    const dismiss = vi.fn();
    const { unmount } = renderUseDismissOnScroll({ triggerRef, dismiss, isEnabled: true });

    unmount();
    fireEvent.scroll(scrollContainer);
    fireEvent.scroll(window);

    expect(dismiss).not.toHaveBeenCalled();
  });

  it('dismissの参照が変わってもlistenerは再登録されず、最新のdismissが呼ばれること', () => {
    const { scrollContainer, triggerRef } = setupElements();
    const firstDismiss = vi.fn();
    const secondDismiss = vi.fn();
    const addSpy = vi.spyOn(window, 'addEventListener');

    const { rerender } = renderUseDismissOnScroll({ triggerRef, dismiss: firstDismiss, isEnabled: true });
    rerender({ triggerRef, dismiss: secondDismiss, isEnabled: true });

    expect(countScrollCaptureCalls(addSpy)).toBe(1);

    fireEvent.scroll(scrollContainer);

    expect(firstDismiss).not.toHaveBeenCalled();
    expect(secondDismiss).toHaveBeenCalledTimes(1);
  });
});
