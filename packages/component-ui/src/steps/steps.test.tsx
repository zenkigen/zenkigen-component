import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Steps } from './steps';
import { StepsItem } from './steps-item';

vi.mock('../icon', () => ({
  Icon: ({ name, size, color }: { name: string; size: string; color?: string }) => (
    <span data-testid={`icon-${name}-${size}-${color ?? 'none'}`}>{name}</span>
  ),
}));

const labels = ['ステップ1', 'ステップ2', 'ステップ3', 'ステップ4'];

function renderSteps(
  props: Partial<Parameters<typeof Steps>[0]> = {},
  items = labels.map((label) => <Steps.Item key={label} label={label} />),
) {
  return render(
    <Steps aria-label="テスト" {...props}>
      {items}
    </Steps>,
  );
}

describe('Steps', () => {
  it('子 Steps.Item の数だけ listitem が描画される', () => {
    renderSteps({ currentStep: 1 });
    expect(screen.getAllByRole('listitem')).toHaveLength(labels.length);
  });

  it('currentStep より前のステップは completed 状態になりチェックアイコンが表示される', () => {
    renderSteps({ currentStep: 2 });
    const completedIcons = screen.getAllByTestId(/^icon-check-/);
    expect(completedIcons).toHaveLength(2);
  });

  it('currentStep のステップは aria-current="step" を持つ', () => {
    renderSteps({ currentStep: 1 });
    const items = screen.getAllByRole('listitem');
    expect(items[1]).toHaveAttribute('aria-current', 'step');
    expect(items[0]).not.toHaveAttribute('aria-current');
    expect(items[2]).not.toHaveAttribute('aria-current');
  });

  it('currentStep より後のステップは upcoming の sr-only ラベルを持つ', () => {
    renderSteps({ currentStep: 0 });
    const srOnlyTexts = Array.from(document.querySelectorAll('.sr-only')).map((el) => el.textContent);
    const upcomingCount = srOnlyTexts.filter((text) => text === '未着手: ').length;
    expect(upcomingCount).toBe(labels.length - 1);
  });

  it('initialCurrentStep のみを指定した場合に初期 current が反映される', () => {
    renderSteps({ initialCurrentStep: 2 });
    const items = screen.getAllByRole('listitem');
    expect(items[2]).toHaveAttribute('aria-current', 'step');
  });

  it('currentStep が items.length 以上の場合は全ステップが completed になる', () => {
    renderSteps({ currentStep: labels.length + 1 });
    const completedIcons = screen.getAllByTestId(/^icon-check-/);
    expect(completedIcons).toHaveLength(labels.length);
    const items = screen.getAllByRole('listitem');
    items.forEach((item) => {
      expect(item).not.toHaveAttribute('aria-current');
    });
  });

  it('currentStep が負値の場合は全ステップが upcoming になる', () => {
    renderSteps({ currentStep: -1 });
    expect(screen.queryAllByTestId(/^icon-check-/)).toHaveLength(0);
    const items = screen.getAllByRole('listitem');
    items.forEach((item) => {
      expect(item).not.toHaveAttribute('aria-current');
    });
  });

  it('variant="solid" の current ステップは border-interactive01 クラスを持つ', () => {
    renderSteps({ currentStep: 1, variant: 'solid' });
    const items = screen.getAllByRole('listitem');
    const circle = items[1]?.querySelector('span[aria-hidden="true"]');
    expect(circle?.className).toContain('border-interactive01');
  });

  it('variant="subtle" の completed ステップは bg-supportInfoLight クラスを持つ', () => {
    renderSteps({ currentStep: 2, variant: 'subtle' });
    const items = screen.getAllByRole('listitem');
    const circle = items[0]?.querySelector('span[aria-hidden="true"]');
    expect(circle?.className).toContain('bg-supportInfoLight');
  });

  it('orientation="horizontal" のときにルート ol は grid で item=max-content / separator=1fr を交互に並べる', () => {
    renderSteps({ currentStep: 0, orientation: 'horizontal' });
    const ol = screen.getByRole('list');
    expect(ol.className).toContain('grid');
    const style = ol.getAttribute('style') ?? '';
    const expected = Array.from({ length: labels.length }, (_unused, i) =>
      i === labels.length - 1 ? 'max-content' : 'max-content 1fr',
    ).join(' ');
    expect(style).toContain(expected);
  });

  it('orientation="vertical" のときにルート ol が flex-col クラスを持つ', () => {
    renderSteps({ currentStep: 0, orientation: 'vertical' });
    const ol = screen.getByRole('list');
    expect(ol.className).toContain('flex-col');
  });

  it('role="listitem" のノード数が Steps.Item の数と一致する (Separator は role="presentation")', () => {
    renderSteps({ currentStep: 0 });
    expect(screen.getAllByRole('listitem')).toHaveLength(labels.length);
  });

  it('orientation="horizontal" では ol 直下に separator li (presentation) が挿入される', () => {
    renderSteps({ currentStep: 0, orientation: 'horizontal' });
    const ol = screen.getByRole('list');
    const directLi = Array.from(ol.children).filter((el) => el.tagName === 'LI');
    expect(directLi).toHaveLength(2 * labels.length - 1);
  });

  it('aria-label を渡すとルート ol に反映される', () => {
    renderSteps({ currentStep: 0, 'aria-label': 'オンボーディング' });
    expect(screen.getByRole('list')).toHaveAttribute('aria-label', 'オンボーディング');
  });

  it('子要素が無いときは何も描画されない', () => {
    const { container } = render(
      <Steps aria-label="空">
        <></>
      </Steps>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('各ステップの状態ラベルが sr-only テキストとして存在する', () => {
    renderSteps({ currentStep: 1 });
    const srOnlyTexts = Array.from(document.querySelectorAll('.sr-only')).map((el) => el.textContent);
    expect(srOnlyTexts.some((text) => text === '完了: ')).toBe(true);
    expect(srOnlyTexts.some((text) => text === '現在のステップ: ')).toBe(true);
    expect(srOnlyTexts.some((text) => text === '未着手: ')).toBe(true);
  });

  it('Steps の外で Steps.Item 単体を描画すると throw する', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {
      // no-op
    });
    expect(() => render(<StepsItem label="単独" />)).toThrow(/Steps/);
    spy.mockRestore();
  });

  it('label に JSX(ReactNode)を渡せる', () => {
    render(
      <Steps aria-label="JSX label" currentStep={0}>
        <Steps.Item
          label={
            <>
              申込 <span data-testid="label-badge">必須</span>
            </>
          }
        />
        <Steps.Item label="完了" />
      </Steps>,
    );
    expect(screen.getByTestId('label-badge')).toHaveTextContent('必須');
  });

  it('各 listitem に一意な id 属性が付与される', () => {
    renderSteps({ currentStep: 0 });
    const items = screen.getAllByRole('listitem');
    const ids = items.map((item) => item.getAttribute('id'));
    ids.forEach((id) => expect(id).toBeTruthy());
    expect(new Set(ids).size).toBe(items.length);
  });
});
