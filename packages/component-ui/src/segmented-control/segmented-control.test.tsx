import { fireEvent, render, screen } from '@testing-library/react';
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
      <SegmentedControl.Item key="1" id="option1" label="Option 1" />,
      <SegmentedControl.Item key="2" id="option2" label="Option 2" />,
      <SegmentedControl.Item key="3" id="option3" label="Option 3" />,
    ],
  };

  it('クリックでその Item が選択状態になること', () => {
    const onChange = vi.fn();
    render(<SegmentedControl {...defaultProps} value="option1" onChange={onChange} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Option 2' }));
    expect(onChange).toHaveBeenCalledWith('option2');
  });

  it('Item の isDisabled が true 場合は、その Itemはクリックできないこと', () => {
    const onChange = vi.fn();
    const disabledProps = {
      children: [
        <SegmentedControl.Item key="1" id="option1" label="Option 1" />,
        <SegmentedControl.Item key="2" id="option2" label="Option 2" isDisabled />,
        <SegmentedControl.Item key="3" id="option3" label="Option 3" />,
      ],
    };
    render(<SegmentedControl {...disabledProps} value="option1" onChange={onChange} />);
    const disabledOption = screen.getByRole('tab', { name: 'Option 2' });
    expect(disabledOption).toBeDisabled();
    fireEvent.click(disabledOption);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('SegmentedControl の isDisabled が true の場合は、すべての Item はクリックできないこと', () => {
    const onChange = vi.fn();
    render(<SegmentedControl {...defaultProps} value="option1" onChange={onChange} isDisabled />);
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

  it('Tabキーで現在選択中のItemにフォーカスする', async () => {
    const user = await import('@testing-library/user-event').then((m) => m.default);
    render(<SegmentedControl {...defaultProps} value="option2" onChange={() => {}} />);
    // 最初にdocument.bodyにフォーカスを当てる
    (document.activeElement as HTMLElement)?.blur();
    // Tabキーを押す
    await user.tab();
    // Option 2がフォーカスされていること
    expect(screen.getByRole('tab', { name: 'Option 2' })).toHaveFocus();
  });
});
