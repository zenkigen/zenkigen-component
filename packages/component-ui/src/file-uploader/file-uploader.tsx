import { clsx } from 'clsx';
import type { ChangeEvent, DragEvent, Ref } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';

import { Button } from '../button';
import { Icon } from '../icon';
import { IconButton } from '../icon-button';

type Size = 'small' | 'medium' | 'large';

export type FileUploadErrorType = 'SIZE_TOO_LARGE' | 'UNSUPPORTED_FORMAT';

export type FileUploadError = {
  type: FileUploadErrorType;
  message: string;
};

type BaseFileUploaderProps = {
  /** 許可するファイル形式（MIMEタイプ） */
  accept?: string;
  /** 最大ファイルサイズ（バイト単位） */
  maxSize?: number;
  /** 無効化状態 */
  isDisabled?: boolean;
  /** ファイル選択時のコールバック */
  onSelect?: (file: File | null) => void;
  /** エラー時のコールバック */
  onError?: (errors: FileUploadError[]) => void;
};

type ButtonFileUploaderProps = BaseFileUploaderProps & {
  /** コンポーネントのバリエーション */
  variant: 'button';
  /** サイズ */
  size?: Size;
};

type DropzoneFileUploaderProps = BaseFileUploaderProps & {
  /** コンポーネントのバリエーション */
  variant: 'dropzone';
};

type FileUploaderProps = ButtonFileUploaderProps | DropzoneFileUploaderProps;

export type FileUploaderRef = {
  /** ファイル選択状態をリセット */
  reset: () => void;
};

export const FileUploader = forwardRef<FileUploaderRef, FileUploaderProps>(
  ({ variant, accept, maxSize, isDisabled = false, onSelect, onError, ...rest }, ref: Ref<FileUploaderRef>) => {
    // variantがbuttonの時のみsizeを取得
    const size = variant === 'button' ? ((rest as ButtonFileUploaderProps).size ?? 'medium') : 'medium';
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [errors, setErrors] = useState<FileUploadError[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = useCallback(
      (file: File): boolean => {
        const errors: FileUploadError[] = [];

        // ファイルサイズチェック
        if (maxSize != null && maxSize > 0 && file.size > maxSize) {
          errors.push({
            type: 'SIZE_TOO_LARGE',
            message: `ファイルサイズが大き過ぎます。`,
          });
        }

        // ファイル形式チェック
        if (accept != null && accept.length > 0) {
          const acceptTypes = accept.split(',').map((t) => t.trim());

          // ファイルの拡張子を取得
          const fileName = file.name.toLowerCase();
          const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
          const fileMimeType = file.type;

          // acceptタイプのいずれかにマッチするかチェック
          const isAccepted = acceptTypes.some((acceptType) => {
            // 拡張子の場合（.jpeg など）
            if (acceptType.startsWith('.')) {
              return fileExtension === acceptType.toLowerCase();
            }
            // MIMEタイプの場合（image/jpeg など）
            if (acceptType.includes('/')) {
              // ワイルドカード対応（image/* など）
              if (acceptType.endsWith('/*')) {
                const mainType = acceptType.split('/')[0];

                return fileMimeType.startsWith(`${mainType}/`);
              }

              // 完全一致（image/jpeg など）
              return fileMimeType === acceptType;
            }

            // その他
            return false;
          });

          if (!isAccepted) {
            errors.push({ type: 'UNSUPPORTED_FORMAT', message: 'ファイル形式が正しくありません。' });
          }
        }

        if (errors.length > 0) {
          setErrors(errors);
          onError?.(errors);

          return false;
        }

        setErrors([]);

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
        onSelect?.(file);
      },
      [validateFile, onSelect],
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
      setErrors([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onSelect?.(null);
    }, [onSelect]);

    // useImperativeHandleでリセット機能を公開
    useImperativeHandle(
      ref,
      () => ({
        reset: handleClear,
      }),
      [handleClear],
    );

    const dropzoneClasses = clsx(
      'flex cursor-pointer flex-col items-center justify-center gap-4 rounded border border-dashed px-6 text-center transition-colors',
      selectedFile ? 'py-[52px]' : 'py-4',
      {
        'border-uiBorder02 bg-white text-text01 hover:border-hoverInput':
          !isDisabled && !isDragOver && errors.length === 0,
        'border-activeInput bg-activeInput/5': !isDisabled && isDragOver && errors.length === 0,
        'border-supportDanger bg-white': errors.length > 0 && !isDisabled,
        'border-disabled01 bg-disabled02 text-textPlaceholder cursor-not-allowed': isDisabled,
      },
    );

    // maxSize に基づくサイズ表示ラベル
    const maxSizeLabel = (() => {
      if (maxSize != null && maxSize > 0) {
        const KB = 1024;
        const MB = KB * 1024;
        const GB = MB * 1024;

        if (maxSize < MB) {
          return `${Math.round(maxSize / KB)}KB以下`;
        }
        if (maxSize < GB) {
          return `${Math.round(maxSize / MB)}MB以下`;
        }

        return `${Math.round(maxSize / GB)}GB以下`;
      }

      return '制限なし';
    })();

    // accept に基づく対応形式ラベル
    const acceptLabel = (() => {
      if (accept == null || accept.trim().length === 0) {
        return '制限なし';
      }

      const tokens = accept
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
      const normalized = tokens.map((token) => {
        if (token.startsWith('.')) {
          return token.slice(1);
        }
        const slashIndex = token.indexOf('/');
        if (slashIndex !== -1) {
          const type = token.slice(0, slashIndex);
          const subtype = token.slice(slashIndex + 1);

          return subtype === '*' ? `${type}/*` : subtype;
        }

        return token;
      });

      return normalized.join(', ');
    })();

    if (variant === 'button') {
      return (
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <Button
              size={size}
              variant={errors.length > 0 ? 'fillDanger' : 'outline'}
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
          {errors.length > 0 && (
            <div className="typography-label12regular shrink-0 text-supportError">
              {errors.map((error, index) => (
                <div key={index}>{error.message}</div>
              ))}
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
        {errors.length > 0 && (
          <div className="flex select-none flex-col gap-1 bg-uiBackgroundError text-supportDanger">
            {errors.length > 0 && errors.map((error, index) => <div key={index}>{error.message}</div>)}
          </div>
        )}
        <Icon name="download-document" size="large" color={isDisabled ? 'icon03' : 'icon01'} />
        {!selectedFile && (
          <div className="flex flex-col gap-1">
            <div className="typography-body13regular select-none">
              <>
                ここにファイルをドロップしてください。
                <br />
                または、<span className={clsx(!isDisabled ? 'text-link01' : '')}>ファイルを選択</span>してください。
              </>
            </div>
          </div>
        )}
        {!selectedFile && (
          <div className="flex flex-col gap-1">
            <div className={clsx('typography-label11regular', isDisabled ? 'text-textPlaceholder' : 'text-text02')}>
              対応形式
            </div>
            <div className={clsx('typography-body12regular', isDisabled ? 'text-textPlaceholder' : 'text-text01')}>
              {acceptLabel}
            </div>
            <div className={clsx('typography-label11regular', isDisabled ? 'text-textPlaceholder' : 'text-text02')}>
              サイズ
            </div>
            <div className={clsx('typography-body12regular', isDisabled ? 'text-textPlaceholder' : 'text-text01')}>
              {maxSizeLabel}
            </div>
          </div>
        )}
        {selectedFile && (
          <div className="mt-2 flex flex-col items-center gap-1">
            <span className="typography-label11regular text-text02">ファイル名</span>
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
