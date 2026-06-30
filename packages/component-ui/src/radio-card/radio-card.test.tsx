import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { RadioCard } from '.';

type ControlledProps = {
  initialValue?: string;
  isError?: boolean;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
};

function ControlledRadioCard({ initialValue = '', isError, isDisabled, onChange }: ControlledProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <RadioCard
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange?.(next);
      }}
      aria-label="プラン選択"
      isError={isError}
      isDisabled={isDisabled}
    >
      <RadioCard.Group>
        <RadioCard.Item value="a" label="ラベルA" description="説明A" />
        <RadioCard.Item value="b" label="ラベルB" />
      </RadioCard.Group>
      {isError === true ? <RadioCard.ErrorMessage>いずれかを選択してください</RadioCard.ErrorMessage> : null}
    </RadioCard>
  );
}

describe('RadioCard', () => {
  describe('レンダリング', () => {
    it('ラベルが表示されること', () => {
      render(<ControlledRadioCard />);
      expect(screen.getByText('ラベルA')).toBeInTheDocument();
      expect(screen.getByText('ラベルB')).toBeInTheDocument();
    });

    it('description prop が表示されること', () => {
      render(<ControlledRadioCard />);
      expect(screen.getByText('説明A')).toBeInTheDocument();
    });

    it('radio がレンダリングされること', () => {
      render(<ControlledRadioCard />);
      expect(screen.getAllByRole('radio')).toHaveLength(2);
    });

    it('radiogroup がレンダリングされること', () => {
      render(<ControlledRadioCard />);
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('options.map() で生成した Item 群が描画されること', () => {
      const options = [
        { value: 'x', label: 'X' },
        { value: 'y', label: 'Y' },
        { value: 'z', label: 'Z' },
      ];
      render(
        <RadioCard value="x" onChange={vi.fn()} aria-label="グループ">
          <RadioCard.Group>
            {options.map((option) => (
              <RadioCard.Item key={option.value} value={option.value} label={option.label} />
            ))}
          </RadioCard.Group>
        </RadioCard>,
      );
      expect(screen.getAllByRole('radio')).toHaveLength(3);
    });

    it('RadioCard 外で RadioCard.Group を使うと throw すること', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      expect(() =>
        render(
          <RadioCard.Group>
            <RadioCard.Item value="a" label="A" />
          </RadioCard.Group>,
        ),
      ).toThrow();
      spy.mockRestore();
    });

    it('RadioCard 外で RadioCard.Item を使うと throw すること', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      expect(() => render(<RadioCard.Item value="a" label="A" />)).toThrow();
      spy.mockRestore();
    });

    it('RadioCard 外で RadioCard.ErrorMessage を使うと throw すること', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      expect(() => render(<RadioCard.ErrorMessage>エラー</RadioCard.ErrorMessage>)).toThrow();
      spy.mockRestore();
    });
  });

  describe('プロパティ反映', () => {
    it('value と一致する Item が checked になること', () => {
      render(<ControlledRadioCard initialValue="a" />);
      expect(screen.getByRole('radio', { name: 'ラベルA' })).toBeChecked();
      expect(screen.getByRole('radio', { name: 'ラベルB' })).not.toBeChecked();
    });

    it('全 input に同じ name が配布されること', () => {
      render(<ControlledRadioCard />);
      const radios = screen.getAllByRole('radio');
      const name = radios[0]?.getAttribute('name');
      expect(name).not.toBeNull();
      radios.forEach((radio) => {
        expect(radio).toHaveAttribute('name', name as string);
      });
    });

    it('name を明示指定するとその値が配布されること', () => {
      render(
        <RadioCard value="a" onChange={vi.fn()} name="my-group" aria-label="グループ">
          <RadioCard.Group>
            <RadioCard.Item value="a" label="A" />
            <RadioCard.Item value="b" label="B" />
          </RadioCard.Group>
        </RadioCard>,
      );
      screen.getAllByRole('radio').forEach((radio) => {
        expect(radio).toHaveAttribute('name', 'my-group');
      });
    });

    it('description を持つ input の aria-describedby が説明文の id を指すこと', () => {
      render(<ControlledRadioCard />);
      const radio = screen.getByRole('radio', { name: 'ラベルA' });
      const describedby = radio.getAttribute('aria-describedby');
      expect(describedby).not.toBeNull();
      expect(document.getElementById(describedby as string)).toHaveTextContent('説明A');
    });

    it('description は accessible name に含まれないこと', () => {
      render(<ControlledRadioCard />);
      // 名前がちょうど「ラベルA」であることで、説明文が名前に混入していないことを保証
      expect(screen.getByRole('radio', { name: 'ラベルA' })).toBeInTheDocument();
    });
  });

  describe('エラー（グループ帰属）', () => {
    it('isError で各 input が aria-invalid になること', () => {
      render(<ControlledRadioCard isError />);
      screen.getAllByRole('radio').forEach((radio) => {
        expect(radio).toHaveAttribute('aria-invalid', 'true');
      });
    });

    it('RadioCard.ErrorMessage がグループ下に1つ表示されること', () => {
      render(<ControlledRadioCard isError />);
      expect(screen.getByText('いずれかを選択してください')).toBeInTheDocument();
    });

    it('radiogroup の aria-describedby が ErrorMessage の id を指すこと', () => {
      render(<ControlledRadioCard isError />);
      const group = screen.getByRole('radiogroup');
      const describedby = group.getAttribute('aria-describedby');
      expect(describedby).not.toBeNull();
      expect(document.getElementById(describedby as string)).toHaveTextContent('いずれかを選択してください');
    });

    it('エラー時にカードがエラー枠（border-supportError）になること', () => {
      const { container } = render(<ControlledRadioCard isError />);
      expect(container.querySelectorAll('.border-supportError').length).toBeGreaterThan(0);
    });
  });

  describe('選択', () => {
    it('カードクリックで onChange が value 付きで呼ばれること', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ControlledRadioCard onChange={handleChange} />);

      await user.click(screen.getByRole('radio', { name: 'ラベルB' }));
      expect(handleChange).toHaveBeenCalledWith('b');
    });

    it('クリックで選択が切り替わること（controlled）', async () => {
      const user = userEvent.setup();
      render(<ControlledRadioCard initialValue="a" />);

      expect(screen.getByRole('radio', { name: 'ラベルA' })).toBeChecked();
      await user.click(screen.getByRole('radio', { name: 'ラベルB' }));
      expect(screen.getByRole('radio', { name: 'ラベルB' })).toBeChecked();
      expect(screen.getByRole('radio', { name: 'ラベルA' })).not.toBeChecked();
    });
  });

  describe('disabled', () => {
    it('グループ全体が無効化されること', () => {
      render(<ControlledRadioCard isDisabled />);
      screen.getAllByRole('radio').forEach((radio) => {
        expect(radio).toBeDisabled();
      });
    });

    it('Item 個別の isDisabled が反映されること', () => {
      render(
        <RadioCard value="a" onChange={vi.fn()} aria-label="グループ">
          <RadioCard.Group>
            <RadioCard.Item value="a" label="A" />
            <RadioCard.Item value="b" label="B" isDisabled />
          </RadioCard.Group>
        </RadioCard>,
      );
      expect(screen.getByRole('radio', { name: 'A' })).not.toBeDisabled();
      expect(screen.getByRole('radio', { name: 'B' })).toBeDisabled();
    });

    it('無効時はクリックしても onChange が呼ばれないこと', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ControlledRadioCard isDisabled onChange={handleChange} />);

      await user.click(screen.getByRole('radio', { name: 'ラベルB' }));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('アクセシビリティ', () => {
    it('radiogroup に aria-label が設定されること', () => {
      render(<ControlledRadioCard />);
      expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'プラン選択');
    });

    it('主ラベルが input の accessible name になること', () => {
      render(<ControlledRadioCard />);
      expect(screen.getByRole('radio', { name: 'ラベルA' })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: 'ラベルB' })).toBeInTheDocument();
    });
  });

  describe('ホバー（input オーバーレイ対応）', () => {
    it('通常カードに group-hover のカード背景 hover スタイルが付与されること', () => {
      // input を全面オーバーレイする構造のため、hover は card ルートの group-hover で表現する。
      // 素の hover: だとカードが pointer-events-none で発火しない（退行防止）。
      const { container } = render(<ControlledRadioCard />);
      expect(container.querySelectorAll('.group-hover\\:bg-hoverUi02')).toHaveLength(2);
    });

    it('未選択カードの丸に group-hover のグレーインジケータが付与されること', () => {
      const { container } = render(<ControlledRadioCard initialValue="a" />);
      // a は選択済み（インジケータ無し）、b は未選択（インジケータ有り）→ 1個
      expect(container.querySelectorAll('.group-hover\\:bg-hoverUi')).toHaveLength(1);
    });

    it('disabled 時は hover スタイル（カード背景・丸インジケータ）が付与されないこと', () => {
      const { container } = render(<ControlledRadioCard isDisabled />);
      expect(container.querySelectorAll('.group-hover\\:bg-hoverUi02')).toHaveLength(0);
      expect(container.querySelectorAll('.group-hover\\:bg-hoverUi')).toHaveLength(0);
    });
  });

  describe('エラー時の丸（ボーダー・ドット）', () => {
    it('エラー時、丸のボーダーが supportError になること', () => {
      const { container } = render(<ControlledRadioCard isError />);
      // 丸（box）に border-supportError が付与される
      expect(container.querySelectorAll('.border-supportError').length).toBeGreaterThan(0);
    });

    it('エラー＋選択時、中央ドットが supportError で着色されること', () => {
      const { container } = render(<ControlledRadioCard initialValue="a" isError />);
      expect(container.querySelectorAll('.bg-supportError').length).toBeGreaterThan(0);
    });

    it('通常選択時の中央ドットは activeSelectedUi（青）であること', () => {
      const { container } = render(<ControlledRadioCard initialValue="a" />);
      expect(container.querySelectorAll('.bg-activeSelectedUi').length).toBeGreaterThan(0);
      expect(container.querySelectorAll('.bg-supportError')).toHaveLength(0);
    });
  });
});
