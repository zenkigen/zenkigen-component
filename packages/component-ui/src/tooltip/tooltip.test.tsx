import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Tooltip } from './tooltip';

describe('Tooltip', () => {
  afterEach(() => {
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
  });
});
