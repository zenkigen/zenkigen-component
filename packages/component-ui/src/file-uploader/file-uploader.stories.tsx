import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { Button } from '../button';
import type { FileUploadError } from './file-uploader';
import { FileUploader } from './file-uploader';

const meta: Meta<typeof FileUploader> = {
  title: 'Components/FileUploader',
  component: FileUploader,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['button', 'dropzone'],
      description: 'コンポーネントのバリエーション',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      if: { arg: 'variant', eq: 'button' },
      description: 'サイズ（`button` variantのみ有効）',
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: '無効化状態',
    },
    accept: {
      control: { type: 'text' },
      description: '許可するファイル形式（拡張子またはMIMEタイプ。例：.csv,.pdf,image/*）',
    },
    maxSize: {
      control: { type: 'number' },
      description: '最大ファイルサイズ（バイト単位）',
    },
    onSelect: {
      description: 'ファイル選択時のコールバック',
    },
    onError: {
      description: 'エラー発生時のコールバック',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

const WithExternalResetControlComponent = ({
  variant = 'button',
  size = 'medium',
  accept = '.pdf',
  maxSize = 1 * 1024 * 1024,
  isDisabled = false,
}: {
  variant?: 'button' | 'dropzone';
  size?: 'small' | 'medium' | 'large';
  accept?: string;
  maxSize?: number;
  isDisabled?: boolean;
}) => {
  const fileUploaderRef = useRef<{ reset: () => void }>(null);
  const [errors, setErrors] = useState<FileUploadError[]>([]);

  const handleReset = () => {
    fileUploaderRef.current?.reset();
    setErrors([]);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-start gap-8">
        <FileUploader
          ref={fileUploaderRef}
          variant={variant}
          {...(variant === 'button' && size && { size: size as 'small' | 'medium' | 'large' })}
          accept={accept}
          maxSize={maxSize}
          isDisabled={isDisabled}
          onSelect={(file) => {
            // eslint-disable-next-line no-console
            console.log('Selected file:', file);
          }}
          onError={(errors) => {
            setErrors(errors);
          }}
        />
        <div className="flex w-full flex-col items-center justify-start gap-2">
          <Button variant="outline" onClick={handleReset}>
            リセット
          </Button>
          {errors.length > 0 && (
            <>
              <ul className="typography-label12regular flex w-full flex-col items-start justify-start gap-1 text-supportError">
                {errors.map((error) => (
                  <li key={error.type}>
                    {error.message}({error.type})
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    variant: 'button',
    size: 'medium',
    isDisabled: false,
  },
  parameters: {
    layout: 'centered',
  },
};

export const ButtonVariants: Story = {
  render: () => (
    <div className="flex size-full h-screen items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-4">
        <FileUploader variant="button" size="small" />
        <FileUploader variant="button" size="medium" />
        <FileUploader variant="button" size="large" />
      </div>
    </div>
  ),
};

export const ButtonStates: Story = {
  render: () => (
    <div className="flex size-full h-screen items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-4">
        <FileUploader variant="button" />
        <FileUploader variant="button" isDisabled />
      </div>
    </div>
  ),
};

export const Dropzone: Story = {
  parameters: {
    layout: 'centered',
  },
  render: () => <FileUploader variant="dropzone" />,
};

export const WithExternalResetControl: Story = {
  args: {
    variant: 'button',
    size: 'medium',
    isDisabled: false,
  },
  parameters: {
    layout: 'centered',
  },
  render: (args) => <WithExternalResetControlComponent {...args} />,
};

export const LayoutExamples: Story = {
  render: () => (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex">
        <FileUploader variant="button" />
      </div>
      <div className="w-[360px]">
        <FileUploader variant="button" />
      </div>
      <div className="w-full">
        <FileUploader variant="button" />
      </div>
      <div className="flex">
        <FileUploader variant="dropzone" />
      </div>
      <div className="w-[360px]">
        <FileUploader variant="dropzone" />
      </div>
      <div className="grid h-[600px] w-full">
        <FileUploader variant="dropzone" />
      </div>
    </div>
  ),
};
