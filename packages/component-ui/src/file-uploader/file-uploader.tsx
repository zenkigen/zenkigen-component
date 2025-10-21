import { clsx } from 'clsx';
import type { ChangeEvent, DragEvent, Ref } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';

import { Button } from '../button';
import { Icon } from '../icon';
import { IconButton } from '../icon-button';

type Size = 'small' | 'medium' | 'large';
type Variant = 'button' | 'dropzone';

type FileUploaderProps = {
  /** コンポーネントのバリエーション */
  variant?: Variant;
  /** サイズ（button variantのみ） */
  size?: Size;
  /** 許可するファイル形式（MIMEタイプ） */
  accept?: string;
  /** 最大ファイルサイズ（バイト単位） */
  maxSize?: number;
  /** 無効化状態 */
  isDisabled?: boolean;
  /** エラー状態 */
  isError?: boolean;
  /** ファイル選択時のコールバック */
  onFileSelect?: (file: File | null) => void;
  /** エラー時のコールバック */
  onError?: (error: string) => void;
};

export type FileUploaderRef = {
  /** ファイル選択状態をリセット */
  reset: () => void;
  /** ファイル選択ダイアログを開く */
  openFileDialog: () => void;
};

export const FileUploader = forwardRef<FileUploaderRef, FileUploaderProps>(
  (
    {
      variant = 'button',
      size = 'medium',
      accept,
      maxSize,
      isDisabled = false,
      isError = false,
      onFileSelect,
      onError,
    },
    ref: Ref<FileUploaderRef>,
  ) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = useCallback(
      (file: File): boolean => {
        // ファイルサイズチェック
        if (maxSize != null && maxSize > 0 && file.size > maxSize) {
          onError?.(`ファイルサイズが制限（${Math.round(maxSize / 1024 / 1024)}MB）を超えています`);

          return false;
        }

        // ファイル形式チェック
        if (accept != null && accept.length > 0 && !accept.split(',').some((type) => file.type.match(type.trim()))) {
          onError?.('対応していないファイル形式です');

          return false;
        }

        return true;
      },
      [accept, maxSize, onError],
    );

    const handleFileSelect = useCallback(
      (file: File | null) => {
        if (file && !validateFile(file)) {
          return;
        }

        setSelectedFile(file);
        onFileSelect?.(file);
      },
      [validateFile, onFileSelect],
    );

    const handleFileInputChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        handleFileSelect(file);
      },
      [handleFileSelect],
    );

    const handleDragOver = useCallback(
      (event: DragEvent) => {
        event.preventDefault();
        if (!isDisabled) {
          setIsDragOver(true);
        }
      },
      [isDisabled],
    );

    const handleDragLeave = useCallback((event: DragEvent) => {
      event.preventDefault();
      setIsDragOver(false);
    }, []);

    const handleDrop = useCallback(
      (event: DragEvent) => {
        event.preventDefault();
        setIsDragOver(false);

        if (isDisabled) return;

        const file = event.dataTransfer.files[0];
        if (file != null) {
          handleFileSelect(file);
        }
      },
      [isDisabled, handleFileSelect],
    );

    const handleButtonClick = useCallback(() => {
      if (!isDisabled) {
        fileInputRef.current?.click();
      }
    }, [isDisabled]);

    const handleClear = useCallback(() => {
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onFileSelect?.(null);
    }, [onFileSelect]);

    // useImperativeHandleでリセット機能を公開
    useImperativeHandle(
      ref,
      () => ({
        reset: handleClear,
        openFileDialog: handleButtonClick,
      }),
      [handleClear, handleButtonClick],
    );

    const dropzoneClasses = clsx(
      'flex cursor-pointer flex-col items-center justify-center gap-4 rounded border border-dashed px-6 py-4 text-center transition-colors',
      {
        'border-uiBorder02 bg-white text-text01 hover:border-hoverInput': !isError && !isDisabled && !isDragOver,
        'border-activeInput bg-activeInput/5': !isError && !isDisabled && isDragOver,
        'border-supportError bg-white ': isError && !isDisabled,
        'border-disabled01 bg-disabled02 text-textPlaceholder cursor-not-allowed': isDisabled,
      },
    );

    if (variant === 'button') {
      return (
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <Button
              size={size}
              variant={isError ? 'fillDanger' : 'outline'}
              isDisabled={isDisabled}
              width="100%"
              onClick={handleButtonClick}
              before={<Icon name="upload" size="small" />}
            >
              <span className="truncate">
                {selectedFile ? `ファイルを選択 ${selectedFile.name}` : 'ファイルを選択'}
              </span>
            </Button>
          </div>
          {selectedFile && !isDisabled && (
            <div className="shrink-0">
              <IconButton variant="text" icon="close" size="small" onClick={handleClear} />
            </div>
          )}
          <input ref={fileInputRef} type="file" accept={accept} onChange={handleFileInputChange} className="hidden" />
        </div>
      );
    }

    return (
      <div
        className={dropzoneClasses}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        {isError && (
          <div className="flex select-none flex-col gap-1 bg-uiBackgroundError text-supportDanger">
            <div>ファイルサイズが大き過ぎます。</div>
            <div>ファイル形式が正しくありません。</div>
          </div>
        )}
        <Icon name="upload" size="large" color={isDisabled ? 'icon03' : 'icon01'} />
        {!selectedFile && (
          <div className="flex flex-col gap-1">
            <div className="typography-body13regular select-none">
              {!isError ? (
                <>
                  ここにファイルをドロップしてください。
                  <br />
                  または、<span className={clsx(!isDisabled ? 'text-link01' : '')}>ファイルを選択</span>してください。
                </>
              ) : (
                <>再度ファイルをアップロードしてください。</>
              )}
            </div>
          </div>
        )}
        {!selectedFile && (
          <div className="flex flex-col gap-1">
            <div className="typography-label11regular text-text02">対応形式</div>
            <div className="typography-body12regular text-text01">csv, pdf</div>
            <div className="typography-label11regular text-text02">サイズ</div>
            <div className="typography-body12regular text-text01">50MB以下</div>
          </div>
        )}
        {selectedFile && (
          <div className="mt-2 flex flex-col items-center gap-1">
            <span>ファイル名</span>
            <div className="flex items-center gap-2">
              <span className="typography-label14regular">{selectedFile.name}</span>
              {!isDisabled && (
                <IconButton
                  variant="text"
                  icon="close"
                  size="small"
                  onClick={() => {
                    handleClear();
                  }}
                />
              )}
            </div>
          </div>
        )}
        <input ref={fileInputRef} type="file" accept={accept} onChange={handleFileInputChange} className="hidden" />
      </div>
    );
  },
);

FileUploader.displayName = 'FileUploader';
