import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { MODAL_OPEN_EVENT } from '../hooks/use-dismiss-on-modal-open';
import { Modal } from './modal';

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
});
