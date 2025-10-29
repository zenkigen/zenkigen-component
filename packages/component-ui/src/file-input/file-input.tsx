import { clsx } from 'clsx';
import type { ChangeEvent, DragEvent, Ref } from 'react';
import { forwardRef, useCallback, useId, useImperativeHandle, useRef, useState } from 'react';

import { InternalButton } from '../button/button';
import { Icon } from '../icon';
import { IconButton } from '../icon-button';

type Size = 'small' | 'medium' | 'large';

// エラータイプ定数
const ERROR_TYPES = {
  SIZE_TOO_LARGE: 'SIZE_TOO_LARGE',
  UNSUPPORTED_FORMAT: 'UNSUPPORTED_FORMAT',
} as const;

export type FileInputErrorType = (typeof ERROR_TYPES)[keyof typeof ERROR_TYPES];

export type FileInputError = {
  type: FileInputErrorType;
  message: string;
};

// エラーメッセージ定数
const ERROR_MESSAGES = {
  SIZE_TOO_LARGE: 'ファイルサイズが大き過ぎます。',
  UNSUPPORTED_FORMAT: 'ファイル形式が正しくありません。',
} as const;

type BaseFileInputProps = {
  /** input要素のID（外部のlabel要素との連携用） */
  id?: string;
  /** 許可するファイル形式（MIMEタイプ） */
  accept?: string;
  /** 最大ファイルサイズ（バイト単位） */
  maxSize?: number;
  /** 無効化状態 */
  isDisabled?: boolean;
  /** ファイル選択時のコールバック */
  onSelect?: (file: File | null) => void;
  /** エラー時のコールバック */
  onError?: (errors: FileInputError[]) => void;
  /** エラーメッセージリスト */
  errorMessages?: string[];
};

type ButtonFileInputProps = BaseFileInputProps & {
  /** コンポーネントのバリエーション */
  variant: 'button';
  /** サイズ */
  size?: Size;
};

type DropzoneFileInputProps = BaseFileInputProps & {
  /** コンポーネントのバリエーション */
  variant: 'dropzone';
};

type FileInputProps = ButtonFileInputProps | DropzoneFileInputProps;

export type FileInputRef = {
  /** ファイル選択状態をリセット */
  reset: () => void;
};

export const FileInput = forwardRef<FileInputRef, FileInputProps>(
  (
    { id, variant, accept, maxSize, isDisabled = false, onSelect, onError, errorMessages, ...rest },
    ref: Ref<FileInputRef>,
  ) => {
    // variantがbuttonの時のみsizeを取得
    const size = variant === 'button' ? ((rest as ButtonFileInputProps).size ?? 'medium') : 'medium';
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const errorId = useId();
    const fallbackId = useId();
    const inputId = id ?? fallbackId;

    const validateFile = useCallback(
      (file: File): boolean => {
        const errors: FileInputError[] = [];

        // ファイルサイズチェック
        if (maxSize != null && maxSize > 0 && file.size > maxSize) {
          errors.push({
            type: ERROR_TYPES.SIZE_TOO_LARGE,
            message: ERROR_MESSAGES.SIZE_TOO_LARGE,
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
            errors.push({ type: ERROR_TYPES.UNSUPPORTED_FORMAT, message: ERROR_MESSAGES.UNSUPPORTED_FORMAT });
          }
        }

        if (errors.length > 0) {
          onError?.(errors);

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
        onSelect?.(file);
      },
      [validateFile, onSelect],
    );

    const handleFileInputChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        // 無効状態ではファイル選択を無視
        if (isDisabled) {
          return;
        }

        const files = event.target.files;
        // ユーザーがファイルダイアログでキャンセルした場合は、
        // 既存の選択状態を維持する（意図的な仕様）
        if (files == null || files.length === 0) {
          return;
        }
        const file = files[0];
        if (file != null) {
          handleFileSelect(file);
        }
      },
      [isDisabled, handleFileSelect],
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

    // エラーメッセージの表示判定
    const hasErrors = !isDisabled && errorMessages != null && errorMessages.length > 0;

    const dropzoneClasses = clsx(
      'flex flex-1 cursor-pointer flex-col items-center justify-center gap-4 rounded border border-dashed px-6 text-center hover:bg-hover02',
      selectedFile ? 'py-[52px]' : 'py-4',
      {
        'border-uiBorder03 bg-white text-text01': !isDisabled && !isDragOver && !hasErrors,
        'border-activeInput bg-activeInput/5': !isDisabled && isDragOver && !hasErrors,
        'border-supportDanger bg-white': hasErrors && !isDisabled,
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
          <div className={hasErrors ? 'flex-1' : 'min-w-0 flex-1'}>
            <InternalButton
              size={size}
              variant={hasErrors ? 'outlineDanger' : 'outline'}
              isDisabled={isDisabled}
              width="100%"
              onClick={handleButtonClick}
              before={<Icon name="upload" size="small" />}
              after={
                <>
                  {selectedFile ? (
                    <span className="typography-label12regular truncate text-text01">{selectedFile.name}</span>
                  ) : (
                    ''
                  )}
                </>
              }
            >
              <span className="truncate">ファイルを選択</span>
            </InternalButton>
          </div>
          {selectedFile && !isDisabled && (
            <div className="shrink-0">
              <IconButton variant="text" icon="close" size="small" onClick={handleClear} />
            </div>
          )}
          {hasErrors && (
            <div id={errorId} className="typography-label12regular text-supportError">
              {errorMessages.map((message, index) => (
                <div key={index} className="break-all">
                  {message}
                </div>
              ))}
            </div>
          )}
          <input
            id={inputId}
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileInputChange}
            className="hidden"
            aria-invalid={hasErrors}
            {...(hasErrors && { 'aria-describedby': errorId })}
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        <div
          className={dropzoneClasses}
          role="button"
          tabIndex={isDisabled ? -1 : 0}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleButtonClick}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
              e.preventDefault();
              handleButtonClick();
            }
          }}
          aria-label="ファイルを選択"
          aria-disabled={isDisabled}
          {...(hasErrors && { 'aria-describedby': errorId })}
        >
          <Icon name="upload-document" size="large" color={isDisabled ? 'icon03' : 'icon01'} />
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
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                )}
              </div>
            </div>
          )}
          <input
            id={inputId}
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileInputChange}
            className="hidden"
            aria-invalid={hasErrors}
            {...(hasErrors && { 'aria-describedby': errorId })}
          />
        </div>
        {hasErrors && (
          <div id={errorId} className="typography-body13regular flex flex-col text-supportDanger">
            {errorMessages.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </div>
        )}
      </div>
    );
  },
);

FileInput.displayName = 'FileInput';
