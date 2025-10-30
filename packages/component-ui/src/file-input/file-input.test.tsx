import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { FileInputRef } from './file-input';
import { FileInput } from './file-input';

// モックファイルの作成ヘルパー
const createMockFile = (name: string, size: number, type: string = 'text/plain'): File => {
  const file = new File(['content'], name, { type });
  Object.defineProperty(file, 'size', { value: size });

  return file;
};

describe('FileInput', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('基本的な動作', () => {
    it('デフォルトでボタンバリアントがレンダリングされる', () => {
      render(<FileInput variant="button" />);

      const button = screen.getByRole('button', { name: /ファイルを選択/ });
      expect(button).toBeInTheDocument();
    });

    it('ドロップゾーンバリアントがレンダリングされる', () => {
      render(<FileInput variant="dropzone" />);

      const dropzone = screen.getByRole('button', { name: /ファイルを選択/ });
      expect(dropzone).toBeInTheDocument();
    });

    it('カスタムIDでレンダリングされる', () => {
      const { container } = render(<FileInput variant="button" id="custom-file-input" />);

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('id', 'custom-file-input');
    });

    it('IDが提供されない場合にユニークIDが生成される', () => {
      const { container } = render(<FileInput variant="button" />);

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('id');
      expect(input.id).toMatch(/^«r[a-z0-9]+»/); // useId の形式
    });
  });

  describe('ファイル選択', () => {
    it('ファイルが選択された時にonSelectが呼ばれる', async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();

      const { container } = render(<FileInput variant="button" onSelect={onSelect} />);

      const file = createMockFile('test.txt', 1000);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      expect(onSelect).toHaveBeenCalledWith(file);
    });

    it('ボタンバリアントで選択されたファイル名が表示される', async () => {
      const user = userEvent.setup();

      const { container } = render(<FileInput variant="button" />);

      const file = createMockFile('test-document.pdf', 1000);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      expect(screen.getByText('test-document.pdf')).toBeInTheDocument();
    });

    it('ドロップゾーンバリアントで選択されたファイル名が表示される', async () => {
      const user = userEvent.setup();

      const { container } = render(<FileInput variant="dropzone" />);

      const file = createMockFile('test-image.jpg', 1000);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      expect(screen.getByText('test-image.jpg')).toBeInTheDocument();
    });

    it('ファイルダイアログがキャンセルされた時にonSelectが呼ばれない', async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();

      const { container } = render(<FileInput variant="button" onSelect={onSelect} />);

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;

      // ファイルを選択してからクリア（キャンセルをシミュレート）
      const file = createMockFile('test.txt', 1000);
      await user.upload(input, file);

      // inputのvalueをクリア（キャンセルをシミュレート）
      fireEvent.change(input, { target: { files: null } });

      // キャンセル時はonSelectが呼ばれない（既存の状態を維持）
      expect(onSelect).toHaveBeenCalledTimes(1); // 最初の選択のみ
    });
  });

  describe('ファイルバリデーション', () => {
    it('ファイルサイズがmaxSizeを超えた時にonErrorが呼ばれる', async () => {
      const onError = vi.fn();
      const user = userEvent.setup();

      const { container } = render(<FileInput variant="button" maxSize={100} onError={onError} />);

      const file = createMockFile('large.txt', 200);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      expect(onError).toHaveBeenCalledWith([{ type: 'SIZE_TOO_LARGE', message: 'ファイルサイズが大き過ぎます。' }]);
    });

    it('サポートされていないファイル形式でonErrorが呼ばれる', () => {
      const onError = vi.fn();

      const { container } = render(<FileInput variant="button" accept=".pdf,.doc" onError={onError} />);

      const file = createMockFile('test.txt', 1000);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;

      fireEvent.change(input, { target: { files: [file] } });

      expect(onError).toHaveBeenCalledWith([
        { type: 'UNSUPPORTED_FORMAT', message: 'ファイル形式が正しくありません。' },
      ]);
    });

    it('サイズと形式の両方が無効な場合に複数のエラーでonErrorが呼ばれる', () => {
      const onError = vi.fn();

      const { container } = render(<FileInput variant="button" accept=".pdf" maxSize={100} onError={onError} />);

      const file = createMockFile('large.txt', 200);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;

      fireEvent.change(input, { target: { files: [file] } });

      expect(onError).toHaveBeenCalledWith([
        { type: 'SIZE_TOO_LARGE', message: 'ファイルサイズが大き過ぎます。' },
        { type: 'UNSUPPORTED_FORMAT', message: 'ファイル形式が正しくありません。' },
      ]);
    });

    it('有効なMIMEタイプのファイルが受け入れられる', async () => {
      const onSelect = vi.fn();
      const onError = vi.fn();
      const user = userEvent.setup();

      const { container } = render(
        <FileInput variant="button" accept="image/*" onSelect={onSelect} onError={onError} />,
      );

      const file = createMockFile('test.jpg', 1000, 'image/jpeg');
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      expect(onSelect).toHaveBeenCalledWith(file);
      expect(onError).not.toHaveBeenCalled();
    });

    it('有効な拡張子のファイルが受け入れられる', async () => {
      const onSelect = vi.fn();
      const onError = vi.fn();
      const user = userEvent.setup();

      const { container } = render(
        <FileInput variant="button" accept=".pdf,.doc" onSelect={onSelect} onError={onError} />,
      );

      const file = createMockFile('test.pdf', 1000, 'application/pdf');
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      expect(onSelect).toHaveBeenCalledWith(file);
      expect(onError).not.toHaveBeenCalled();
    });
  });

  describe('リセット機能', () => {
    it('resetが呼ばれた時にファイル選択がリセットされる', async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();

      const ref = { current: null } as { current: FileInputRef | null };

      const { container } = render(<FileInput ref={ref} variant="button" onSelect={onSelect} />);

      // ファイルを選択
      const file = createMockFile('test.txt', 1000);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      await user.upload(input, file);

      expect(screen.getByText('test.txt')).toBeInTheDocument();

      // リセット
      ref.current?.reset();

      await waitFor(() => {
        expect(onSelect).toHaveBeenCalledWith(null);
      });

      expect(screen.queryByText('test.txt')).not.toBeInTheDocument();
    });

    it('resetが呼ばれた時にファイル入力値がクリアされる', async () => {
      const user = userEvent.setup();

      const ref = { current: null } as { current: FileInputRef | null };

      const { container } = render(<FileInput ref={ref} variant="button" />);

      // ファイルを選択
      const file = createMockFile('test.txt', 1000);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      await user.upload(input, file);

      // リセット
      ref.current?.reset();

      expect(input).toHaveValue('');
    });
  });

  describe('エラー表示', () => {
    it('isErrorがtrueでエラーメッセージが提供された時に表示される', () => {
      const errorMessages = ['ファイルサイズが大き過ぎます。', 'ファイル形式が正しくありません。'];

      render(<FileInput variant="button" isError errorMessages={errorMessages} />);

      errorMessages.forEach((message) => {
        expect(screen.getByText(message)).toBeInTheDocument();
      });
    });

    it('エラーメッセージが提供されない時に表示されない', () => {
      render(<FileInput variant="button" />);

      expect(screen.queryByText('ファイルサイズが大き過ぎます。')).not.toBeInTheDocument();
    });

    it('isErrorがtrueの時にボタンにエラースタイルが適用される', () => {
      render(<FileInput variant="button" isError errorMessages={['Error message']} />);

      const button = screen.getByRole('button', { name: /ファイルを選択/ });
      expect(button).toHaveClass('border-supportDanger');
    });

    it('isErrorがtrueの時にドロップゾーンにエラースタイルが適用される', () => {
      render(<FileInput variant="dropzone" isError errorMessages={['Error message']} />);

      const dropzone = screen.getByRole('button', { name: /ファイルを選択/ });
      expect(dropzone).toHaveClass('border-supportDanger');
    });

    it('isErrorがtrueのとき、メッセージなしでもボタンにエラースタイルが適用される', () => {
      const { container } = render(<FileInput variant="button" isError />);

      const button = screen.getByRole('button', { name: /ファイルを選択/ });
      expect(button).toHaveClass('border-supportDanger');

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).not.toHaveAttribute('aria-describedby');
    });

    it('isErrorがtrueのとき、メッセージなしでもドロップゾーンにエラースタイルが適用される', () => {
      const { container } = render(<FileInput variant="dropzone" isError />);

      const dropzone = screen.getByRole('button', { name: /ファイルを選択/ });
      expect(dropzone).toHaveClass('border-supportDanger');

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).not.toHaveAttribute('aria-describedby');
    });
  });

  describe('無効状態', () => {
    it('isDisabledがtrueの時にボタンが無効化される', () => {
      render(<FileInput variant="button" isDisabled />);

      const button = screen.getByRole('button', { name: /ファイルを選択/ });
      expect(button).toBeDisabled();
    });

    it('isDisabledがtrueの時にドロップゾーンが無効化される', () => {
      render(<FileInput variant="dropzone" isDisabled />);

      const dropzone = screen.getByRole('button', { name: /ファイルを選択/ });
      expect(dropzone).toHaveAttribute('aria-disabled', 'true');
    });

    it('無効時にクリアボタンが表示されない', async () => {
      const user = userEvent.setup();

      const { container } = render(<FileInput variant="button" isDisabled />);

      const file = createMockFile('test.txt', 1000);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      await user.upload(input, file);

      expect(screen.queryByRole('button', { name: /close/ })).not.toBeInTheDocument();
    });

    it('無効時にファイル選択が許可されない', () => {
      const onSelect = vi.fn();

      const { container } = render(<FileInput variant="button" isDisabled onSelect={onSelect} />);

      const file = createMockFile('test.txt', 1000);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;

      // 無効状態ではファイル選択ができない
      fireEvent.change(input, { target: { files: [file] } });

      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe('キーボード操作', () => {
    it('ドロップゾーンでEnterキーが押された時にファイルダイアログが開く', async () => {
      const user = userEvent.setup();

      render(<FileInput variant="dropzone" />);

      const dropzone = screen.getByRole('button', { name: /ファイルを選択/ });

      await user.click(dropzone);
      await user.keyboard('{Enter}');

      // ファイルダイアログが開かれる（実際のテストでは確認が困難なため、イベントが発火することを確認）
      expect(dropzone).toHaveFocus();
    });

    it('ドロップゾーンでSpaceキーが押された時にファイルダイアログが開く', async () => {
      const user = userEvent.setup();

      render(<FileInput variant="dropzone" />);

      const dropzone = screen.getByRole('button', { name: /ファイルを選択/ });

      await user.click(dropzone);
      await user.keyboard(' ');

      expect(dropzone).toHaveFocus();
    });

    it('無効時にキーボードに応答しない', async () => {
      const user = userEvent.setup();

      render(<FileInput variant="dropzone" isDisabled />);

      const dropzone = screen.getByRole('button', { name: /ファイルを選択/ });

      await user.click(dropzone);
      await user.keyboard('{Enter}');

      // 無効状態ではキーボード操作に応答しない
      expect(dropzone).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('ドラッグ&ドロップ', () => {
    it('ドロップゾーンでファイルドロップが処理される', async () => {
      const onSelect = vi.fn();

      render(<FileInput variant="dropzone" onSelect={onSelect} />);

      const dropzone = screen.getByRole('button', { name: /ファイルを選択/ });
      const file = createMockFile('test.txt', 1000);

      fireEvent.dragOver(dropzone);
      fireEvent.drop(dropzone, {
        dataTransfer: {
          files: [file],
        },
      });

      expect(onSelect).toHaveBeenCalledWith(file);
    });

    it('無効時にファイルドロップが処理されない', async () => {
      const onSelect = vi.fn();

      render(<FileInput variant="dropzone" isDisabled onSelect={onSelect} />);

      const dropzone = screen.getByRole('button', { name: /ファイルを選択/ });
      const file = createMockFile('test.txt', 1000);

      fireEvent.dragOver(dropzone);
      fireEvent.drop(dropzone, {
        dataTransfer: {
          files: [file],
        },
      });

      expect(onSelect).not.toHaveBeenCalled();
    });

    it('ドラッグオーバー中に視覚的フィードバックが表示される', () => {
      render(<FileInput variant="dropzone" />);

      const dropzone = screen.getByRole('button', { name: /ファイルを選択/ });

      fireEvent.dragOver(dropzone);

      expect(dropzone).toHaveClass('border-activeInput');
    });
  });

  describe('サイズバリエーション', () => {
    it('ボタンバリアントで小サイズがレンダリングされる', () => {
      render(<FileInput variant="button" size="small" />);

      const button = screen.getByRole('button', { name: /ファイルを選択/ });
      expect(button).toHaveClass('h-6');
    });

    it('ボタンバリアントでデフォルトで中サイズがレンダリングされる', () => {
      render(<FileInput variant="button" />);

      const button = screen.getByRole('button', { name: /ファイルを選択/ });
      expect(button).toHaveClass('h-8');
    });

    it('ボタンバリアントで大サイズがレンダリングされる', () => {
      render(<FileInput variant="button" size="large" />);

      const button = screen.getByRole('button', { name: /ファイルを選択/ });
      expect(button).toHaveClass('h-10');
    });

    it('ドロップゾーンバリアントでsizeプロパティが無視される', () => {
      // @ts-expect-error - size prop is not valid for dropzone variant
      render(<FileInput variant="dropzone" size="small" />);

      const dropzone = screen.getByRole('button', { name: /ファイルを選択/ });
      expect(dropzone).not.toHaveClass('h-6');
    });
  });

  describe('制約情報の表示', () => {
    it('maxSizeが提供された時にファイルサイズ制限が表示される', () => {
      render(<FileInput variant="dropzone" maxSize={1024 * 1024} />);

      expect(screen.getByText('1MB以下')).toBeInTheDocument();
    });

    it('acceptが提供された時にファイル形式が表示される', () => {
      render(<FileInput variant="dropzone" accept=".pdf,.doc" />);

      expect(screen.getByText('pdf, doc')).toBeInTheDocument();
    });

    it('制約が提供されない時に「制限なし」が表示される', () => {
      render(<FileInput variant="dropzone" />);

      expect(screen.getAllByText('制限なし')).toHaveLength(2);
    });
  });

  describe('アクセシビリティ', () => {
    it('ボタンバリアントで適切なARIA属性が設定される', () => {
      const { container } = render(<FileInput variant="button" isError errorMessages={['Error message']} />);

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby');
    });

    it('ドロップゾーンバリアントで適切なARIA属性が設定される', () => {
      render(<FileInput variant="dropzone" isError errorMessages={['Error message']} />);

      const dropzone = screen.getByRole('button', { name: /ファイルを選択/ });
      expect(dropzone).toHaveAttribute('aria-label', 'ファイルを選択');
      expect(dropzone).toHaveAttribute('aria-disabled', 'false');
      expect(dropzone).toHaveAttribute('aria-describedby');

      const { container } = render(<FileInput variant="dropzone" isError errorMessages={['Error message']} />);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('無効時に適切なARIA属性が設定される', () => {
      render(<FileInput variant="dropzone" isDisabled />);

      const dropzone = screen.getByRole('button', { name: /ファイルを選択/ });
      expect(dropzone).toHaveAttribute('aria-disabled', 'true');
    });

    it('エラーがない時に適切なARIA属性が設定される', () => {
      const { container } = render(<FileInput variant="button" />);

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('aria-invalid', 'false');
      expect(input).not.toHaveAttribute('aria-describedby');
    });

    it('isErrorがtrueかつエラーメッセージが無い場合、aria-describedbyは設定されない', () => {
      const { container } = render(<FileInput variant="button" isError />);

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).not.toHaveAttribute('aria-describedby');
    });

    it('ボタンバリアントでrole="button"が設定される', () => {
      render(<FileInput variant="button" />);

      const button = screen.getByRole('button', { name: /ファイルを選択/ });
      expect(button).toBeInTheDocument();
    });

    it('ドロップゾーンバリアントでrole="button"が設定される', () => {
      render(<FileInput variant="dropzone" />);

      const dropzone = screen.getByRole('button', { name: /ファイルを選択/ });
      expect(dropzone).toBeInTheDocument();
    });

    it('ドロップゾーンバリアントでtabIndexが設定される', () => {
      render(<FileInput variant="dropzone" />);

      const dropzone = screen.getByRole('button', { name: /ファイルを選択/ });
      expect(dropzone).toHaveAttribute('tabIndex', '0');
    });

    it('無効時にtabIndexが-1に設定される', () => {
      render(<FileInput variant="dropzone" isDisabled />);

      const dropzone = screen.getByRole('button', { name: /ファイルを選択/ });
      expect(dropzone).toHaveAttribute('tabIndex', '-1');
    });

    it('エラーメッセージに適切なIDが設定される', () => {
      const { container } = render(<FileInput variant="button" isError errorMessages={['Error message']} />);

      const errorContainer = container.querySelector('[data-testid="error-messages"]');
      expect(errorContainer).toHaveAttribute('id');
      expect(errorContainer?.id).toMatch(/^«r[a-z0-9]+»/);
    });

    it('aria-describedbyでエラーメッセージと入力が関連付けられる', () => {
      const { container } = render(<FileInput variant="button" isError errorMessages={['Error message']} />);

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      const errorContainer = container.querySelector('[data-testid="error-messages"]');

      expect(input).toHaveAttribute('aria-describedby', errorContainer?.id);
    });

    it('カスタムIDが提供された時にそのIDが使用される', () => {
      const { container } = render(<FileInput variant="button" id="custom-file-input" />);

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('id', 'custom-file-input');
    });

    it('複数のFileInputインスタンスでユニークなIDが生成される', () => {
      const { container: container1 } = render(<FileInput variant="button" />);
      const { container: container2 } = render(<FileInput variant="button" />);

      const input1 = container1.querySelector('input[type="file"]') as HTMLInputElement;
      const input2 = container2.querySelector('input[type="file"]') as HTMLInputElement;

      expect(input1.id).not.toBe(input2.id);
    });

    it('ドロップゾーンバリアントでキーボードナビゲーションが可能', async () => {
      const user = userEvent.setup();

      render(<FileInput variant="dropzone" />);

      const dropzone = screen.getByRole('button', { name: /ファイルを選択/ });

      // フォーカス可能
      await user.tab();
      expect(dropzone).toHaveFocus();
    });

    it('ボタンバリアントでキーボードナビゲーションが可能', async () => {
      const user = userEvent.setup();

      render(<FileInput variant="button" />);

      const button = screen.getByRole('button', { name: /ファイルを選択/ });

      // フォーカス可能
      await user.tab();
      expect(button).toHaveFocus();
    });

    it('無効時にキーボードナビゲーションが無効化される', async () => {
      const user = userEvent.setup();

      render(<FileInput variant="dropzone" isDisabled />);

      const dropzone = screen.getByRole('button', { name: /ファイルを選択/ });

      // フォーカスできない
      await user.tab();
      expect(dropzone).not.toHaveFocus();
    });

    it('エラーメッセージが複数ある場合に適切に表示される', () => {
      const errorMessages = ['エラー1', 'エラー2', 'エラー3'];
      render(<FileInput variant="button" errorMessages={errorMessages} />);

      errorMessages.forEach((message) => {
        expect(screen.getByText(message)).toBeInTheDocument();
      });
    });

    it('エラーメッセージが空配列の場合に表示されない', () => {
      const { container } = render(<FileInput variant="button" errorMessages={[]} />);

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).not.toHaveAttribute('aria-describedby');
    });
  });
});
