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

  // bubbling 中に target が detach されるケース。
  // 実環境では「ref 内のトグル ボタン押下 → React 再レンダリングで子の svg が unmount」のように、
  // クリック処理中に target が DOM から切り離される。
  // composedPath にはイベント発火時点の祖先が保持されるので、それを使って内側/外側を判定する必要がある。
  describe('bubbling 中に target が DOM から切り離されるケース', () => {
    it('ref 内部の要素を target にした click が bubbling 中に detach されても、composedPath で内側判定され handler が呼ばれないこと', () => {
      const handler = vi.fn();
      const container = document.createElement('div');
      const button = document.createElement('button');
      const span = document.createElement('span');
      button.appendChild(span);
      container.appendChild(button);
      document.body.appendChild(container);

      renderHook(() => useOutsideClick(createRef(container), handler));

      // bubbling 中に target を detach する
      span.addEventListener('click', () => span.remove(), { once: true });
      span.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));

      expect(handler).not.toHaveBeenCalled();

      document.body.removeChild(container);
    });

    it('ref 外部の要素を target にした click が bubbling 中に detach されても、composedPath が ref を含まなければ handler が呼ばれること', () => {
      const handler = vi.fn();
      const container = document.createElement('div');
      const outsideWrapper = document.createElement('div');
      const span = document.createElement('span');
      outsideWrapper.appendChild(span);
      document.body.appendChild(container);
      document.body.appendChild(outsideWrapper);

      renderHook(() => useOutsideClick(createRef(container), handler));

      // bubbling 中に target を detach する
      span.addEventListener('click', () => span.remove(), { once: true });
      span.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));

      expect(handler).toHaveBeenCalledTimes(1);

      document.body.removeChild(container);
      document.body.removeChild(outsideWrapper);
    });
  });
});
