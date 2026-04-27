import { renderHook } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import type { RefObject } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { useOutsideClick } from './use-outside-click';

describe('useOutsideClick', () => {
  const createRef = (element: HTMLElement): RefObject<HTMLElement> => ({
    current: element,
  });

  it('ref外部のクリックでhandlerが呼ばれること', () => {
    const handler = vi.fn();
    const container = document.createElement('div');
    document.body.appendChild(container);

    renderHook(() => useOutsideClick(createRef(container), handler));

    fireEvent.click(document.body);

    expect(handler).toHaveBeenCalledTimes(1);

    document.body.removeChild(container);
  });

  it('ref内部のクリックでhandlerが呼ばれないこと', () => {
    const handler = vi.fn();
    const container = document.createElement('div');
    const child = document.createElement('button');
    container.appendChild(child);
    document.body.appendChild(container);

    renderHook(() => useOutsideClick(createRef(container), handler));

    fireEvent.click(child);

    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(container);
  });

  it('ref要素自体のクリックでhandlerが呼ばれないこと', () => {
    const handler = vi.fn();
    const container = document.createElement('div');
    document.body.appendChild(container);

    renderHook(() => useOutsideClick(createRef(container), handler));

    fireEvent.click(container);

    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(container);
  });

  it('DOMから切り離されたノードのクリックでhandlerが呼ばれないこと', () => {
    const handler = vi.fn();
    const container = document.createElement('div');
    document.body.appendChild(container);

    renderHook(() => useOutsideClick(createRef(container), handler));

    const detachedNode = document.createElement('button');
    document.body.appendChild(detachedNode);
    document.body.removeChild(detachedNode);

    fireEvent.click(detachedNode);

    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(container);
  });

  it('enabledがfalseのときhandlerが呼ばれないこと', () => {
    const handler = vi.fn();
    const container = document.createElement('div');
    document.body.appendChild(container);

    renderHook(() => useOutsideClick(createRef(container), handler, false));

    fireEvent.click(document.body);

    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(container);
  });

  it('enabledがtrueに変わるとhandlerが呼ばれるようになること', () => {
    const handler = vi.fn();
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { rerender } = renderHook(({ enabled }) => useOutsideClick(createRef(container), handler, enabled), {
      initialProps: { enabled: false },
    });

    fireEvent.click(document.body);
    expect(handler).not.toHaveBeenCalled();

    rerender({ enabled: true });

    fireEvent.click(document.body);
    expect(handler).toHaveBeenCalledTimes(1);

    document.body.removeChild(container);
  });

  it('ref.currentがnullのときhandlerが呼ばれないこと', () => {
    const handler = vi.fn();
    const ref: RefObject<HTMLElement | null> = { current: null };

    renderHook(() => useOutsideClick(ref, handler));

    fireEvent.click(document.body);

    expect(handler).not.toHaveBeenCalled();
  });

  it('アンマウント時にイベントリスナーが解除されること', () => {
    const handler = vi.fn();
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { unmount } = renderHook(() => useOutsideClick(createRef(container), handler));

    unmount();

    fireEvent.click(document.body);

    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(container);
  });
});
