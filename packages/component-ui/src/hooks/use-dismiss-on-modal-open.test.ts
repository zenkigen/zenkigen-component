import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { MODAL_OPEN_EVENT, useDismissOnModalOpen } from './use-dismiss-on-modal-open';

describe('useDismissOnModalOpen', () => {
  it('zenkigen-modal-open イベントが発火するとdismissが呼ばれること', () => {
    const dismiss = vi.fn();
    renderHook(() => useDismissOnModalOpen(dismiss));

    window.dispatchEvent(new CustomEvent(MODAL_OPEN_EVENT));

    expect(dismiss).toHaveBeenCalledTimes(1);
  });

  it('アンマウント後にイベントが発火してもdismissが呼ばれないこと', () => {
    const dismiss = vi.fn();
    const { unmount } = renderHook(() => useDismissOnModalOpen(dismiss));

    unmount();
    window.dispatchEvent(new CustomEvent(MODAL_OPEN_EVENT));

    expect(dismiss).not.toHaveBeenCalled();
  });

  it('dismissの参照が変わってもlistenerは再登録されず、最新のdismissが呼ばれること', () => {
    const firstDismiss = vi.fn();
    const secondDismiss = vi.fn();
    const addSpy = vi.spyOn(window, 'addEventListener');
    const initialAddCalls = addSpy.mock.calls.filter((call) => call[0] === MODAL_OPEN_EVENT).length;

    const { rerender } = renderHook(({ dismiss }) => useDismissOnModalOpen(dismiss), {
      initialProps: { dismiss: firstDismiss },
    });

    rerender({ dismiss: secondDismiss });

    const afterAddCalls = addSpy.mock.calls.filter((call) => call[0] === MODAL_OPEN_EVENT).length;
    expect(afterAddCalls - initialAddCalls).toBe(1);

    window.dispatchEvent(new CustomEvent(MODAL_OPEN_EVENT));

    expect(firstDismiss).not.toHaveBeenCalled();
    expect(secondDismiss).toHaveBeenCalledTimes(1);

    addSpy.mockRestore();
  });
});
