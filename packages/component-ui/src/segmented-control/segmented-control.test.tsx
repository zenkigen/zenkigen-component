import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

vi.stubGlobal('document', globalThis.document);

import { SegmentedControl } from './segmented-control';

vi.mock('./src/icon', () => ({
  Icon: ({ name, size }: { name: string; size: string }) => <span data-testid={`icon-${name}-${size}`}>{name}</span>,
}));

describe('SegmentedControl', () => {
  const defaultProps = {
    children: [
      <SegmentedControl.Item key="1" value="option1" label="Option 1" />,
      <SegmentedControl.Item key="2" value="option2" label="Option 2" />,
      <SegmentedControl.Item key="3" value="option3" label="Option 3" />,
    ],
  };

  it('Itemをクリックすると、そのItemが選択状態になる', () => {
    const onChange = vi.fn();
    render(<SegmentedControl {...defaultProps} value="option1" onChange={onChange} aria-label="" />);
    fireEvent.click(screen.getByRole('tab', { name: 'Option 2' }));
    expect(onChange).toHaveBeenCalledWith('option2');
  });

  it('ItemのisDisabledがtrueの場合、そのItemはクリックできない', () => {
    const onChange = vi.fn();
    const disabledProps = {
      children: [
        <SegmentedControl.Item key="1" value="option1" label="Option 1" />,
        <SegmentedControl.Item key="2" value="option2" label="Option 2" isDisabled />,
        <SegmentedControl.Item key="3" value="option3" label="Option 3" />,
      ],
    };
    render(<SegmentedControl {...disabledProps} value="option1" onChange={onChange} aria-label="" />);
    const disabledOption = screen.getByRole('tab', { name: 'Option 2' });
    expect(disabledOption).toBeDisabled();
    fireEvent.click(disabledOption);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('SegmentedControl全体のisDisabledがtrueの場合、すべてのItemがクリックできない', () => {
    const onChange = vi.fn();
    render(<SegmentedControl {...defaultProps} value="option1" onChange={onChange} aria-label="" isDisabled />);
    const option1 = screen.getByRole('tab', { name: 'Option 1' });
    const option2 = screen.getByRole('tab', { name: 'Option 2' });
    const option3 = screen.getByRole('tab', { name: 'Option 3' });
    expect(option1).toBeDisabled();
    expect(option2).toBeDisabled();
    expect(option3).toBeDisabled();
    fireEvent.click(option1);
    fireEvent.click(option2);
    fireEvent.click(option3);
    expect(onChange).not.toHaveBeenCalled();
  });

  // アクセシビリティー関連

  it('Tabキーで現在選択中のItemにフォーカスが移動する', async () => {
    const userEvent = await import('@testing-library/user-event').then((m) => m.default);
    const user = userEvent.setup();
    render(<SegmentedControl {...defaultProps} value="option2" onChange={() => {}} aria-label="" />);
    // 最初にdocument.bodyにフォーカスを当てる
    (document.activeElement as HTMLElement)?.blur();
    // Tabキーを押す
    await act(async () => {
      await user.tab();
    });
    // Option 2がフォーカスされていること
    await waitFor(() => expect(screen.getByRole('tab', { name: 'Option 2' })).toHaveFocus());
  });

  it('フォーカス時、左右の矢印キーで選択中のItemを変更できる', async () => {
    const userEvent = await import('@testing-library/user-event').then((m) => m.default);
    const user = userEvent.setup();
    const onChange = vi.fn();

    // valueをuseStateで管理するラッパー
    const Wrapper = () => {
      const [value, setValue] = React.useState('option1');

      return (
        <SegmentedControl
          {...defaultProps}
          value={value}
          aria-label=""
          onChange={(v) => {
            setValue(v);
            onChange(v);
          }}
        />
      );
    };

    render(<Wrapper />);
    (document.activeElement as HTMLElement)?.blur();
    await act(async () => {
      await user.tab();
    });
    expect(screen.getByRole('tab', { name: 'Option 1' })).toHaveFocus();

    // →キーでOption 2へ
    await act(async () => {
      await user.keyboard('{ArrowRight}');
    });
    await waitFor(() => expect(onChange).toHaveBeenNthCalledWith(1, 'option2'));

    // →キーでOption 3へ
    await act(async () => {
      await user.keyboard('{ArrowRight}');
    });
    await waitFor(() => expect(onChange).toHaveBeenNthCalledWith(2, 'option3'));

    // →キーでOption 1へ
    await act(async () => {
      await user.keyboard('{ArrowRight}');
    });
    await waitFor(() => expect(onChange).toHaveBeenNthCalledWith(3, 'option1'));

    // ←キーでOption 3へ戻る
    await act(async () => {
      await user.keyboard('{ArrowLeft}');
    });
    await waitFor(() => expect(onChange).toHaveBeenNthCalledWith(4, 'option3'));

    // ←キーでOption 2へ戻る
    await act(async () => {
      await user.keyboard('{ArrowLeft}');
    });
    await waitFor(() => expect(onChange).toHaveBeenNthCalledWith(5, 'option2'));
  });

  it('フォーカス時、上下の矢印キーで選択中のItemを変更できる', async () => {
    const userEvent = await import('@testing-library/user-event').then((m) => m.default);
    const user = userEvent.setup();
    const onChange = vi.fn();

    // valueをuseStateで管理するラッパー
    const Wrapper = () => {
      const [value, setValue] = React.useState('option1');

      return (
        <SegmentedControl
          {...defaultProps}
          value={value}
          aria-label=""
          onChange={(v) => {
            setValue(v);
            onChange(v);
          }}
        />
      );
    };

    render(<Wrapper />);
    (document.activeElement as HTMLElement)?.blur();
    await act(async () => {
      await user.tab();
    });
    await waitFor(() => expect(screen.getByRole('tab', { name: 'Option 1' })).toHaveFocus());

    // ↓キーでOption 2へ
    await act(async () => {
      await user.keyboard('{ArrowDown}');
    });
    await waitFor(() => expect(onChange).toHaveBeenNthCalledWith(1, 'option2'));

    // ↓キーでOption 3へ
    await act(async () => {
      await user.keyboard('{ArrowDown}');
    });
    await waitFor(() => expect(onChange).toHaveBeenNthCalledWith(2, 'option3'));

    // ↓キーでOption 1へ
    await act(async () => {
      await user.keyboard('{ArrowDown}');
    });
    await waitFor(() => expect(onChange).toHaveBeenNthCalledWith(3, 'option1'));

    // ↑キーでOption 3へ戻る
    await act(async () => {
      await user.keyboard('{ArrowUp}');
    });
    await waitFor(() => expect(onChange).toHaveBeenNthCalledWith(4, 'option3'));

    // ↑キーでOption 2へ戻る
    await act(async () => {
      await user.keyboard('{ArrowUp}');
    });
    await waitFor(() => expect(onChange).toHaveBeenNthCalledWith(5, 'option2'));
  });

  it('Homeキーを押すと最初のItemが選択される', async () => {
    const userEvent = await import('@testing-library/user-event').then((m) => m.default);
    const user = userEvent.setup();
    const onChange = vi.fn();

    // valueをuseStateで管理するラッパー
    const Wrapper = () => {
      const [value, setValue] = React.useState('option3');

      return (
        <SegmentedControl
          {...defaultProps}
          value={value}
          aria-label=""
          onChange={(v) => {
            setValue(v);
            onChange(v);
          }}
        />
      );
    };

    render(<Wrapper />);
    (document.activeElement as HTMLElement)?.blur();
    await act(async () => {
      await user.tab();
    });
    await waitFor(() => expect(screen.getByRole('tab', { name: 'Option 3' })).toHaveFocus());

    // HomeキーでOption 1へ
    await act(async () => {
      await user.keyboard('{Home}');
    });
    await waitFor(() => expect(onChange).toHaveBeenNthCalledWith(1, 'option1'));
  });

  it('Endキーを押すと最後のItemが選択される', async () => {
    const userEvent = await import('@testing-library/user-event').then((m) => m.default);
    const user = userEvent.setup();
    const onChange = vi.fn();

    // valueをuseStateで管理するラッパー
    const Wrapper = () => {
      const [value, setValue] = React.useState('option1');

      return (
        <SegmentedControl
          {...defaultProps}
          value={value}
          aria-label=""
          onChange={(v) => {
            setValue(v);
            onChange(v);
          }}
        />
      );
    };

    render(<Wrapper />);
    (document.activeElement as HTMLElement)?.blur();
    await act(async () => {
      await user.tab();
    });
    await waitFor(() => expect(screen.getByRole('tab', { name: 'Option 1' })).toHaveFocus());

    // EndキーでOption 3へ
    await act(async () => {
      await user.keyboard('{End}');
    });
    await waitFor(() => expect(onChange).toHaveBeenNthCalledWith(1, 'option3'));
  });
});
