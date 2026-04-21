import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Divider } from './divider';

describe('Divider', () => {
  describe('レンダリング', () => {
    it('role="separator"でレンダリングされること', () => {
      render(<Divider />);
      const divider = screen.getByRole('separator');
      expect(divider).toBeInTheDocument();
    });

    it('hr要素としてレンダリングされること', () => {
      render(<Divider />);
      const divider = screen.getByRole('separator');
      expect(divider.tagName).toBe('HR');
    });
  });

  describe('スタイル', () => {
    it('デフォルトスタイルクラスが適用されること', () => {
      render(<Divider />);
      const divider = screen.getByRole('separator');
      expect(divider).toHaveClass('h-px', 'w-full', 'border-0', 'bg-uiBorder01');
    });
  });
});
