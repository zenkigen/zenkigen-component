import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';

import { Button } from '../button';
import { FileUploader } from './file-uploader';

const meta: Meta<typeof FileUploader> = {
  title: 'Components/FileUploader',
  component: FileUploader,
  parameters: {
    layout: 'centered',
  },
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
  accept,
  maxSize,
  isDisabled = false,
}: {
  variant?: 'button' | 'dropzone';
  size?: 'small' | 'medium' | 'large';
  accept?: string;
  maxSize?: number;
  isDisabled?: boolean;
}) => {
  const fileUploaderRef = useRef<{ reset: () => void }>(null);

  const handleReset = () => {
    fileUploaderRef.current?.reset();
  };

  return (
    <div className="flex w-full flex-col items-start justify-start gap-4">
      <FileUploader
        ref={fileUploaderRef}
        variant={variant as 'button' | 'dropzone'}
        {...(variant === 'button' && size && { size: size as 'small' | 'medium' | 'large' })}
        accept={accept}
        maxSize={maxSize}
        isDisabled={isDisabled}
        onSelect={(file) => {
          // eslint-disable-next-line no-console
          console.log('Selected file:', file);
        }}
      />
      <Button variant="text" onClick={handleReset}>
        リセット
      </Button>
    </div>
  );
};

export const Default: Story = {
  args: {
    variant: 'button',
    size: 'medium',
    isDisabled: false,
  },
};

export const WithExternalResetControl: Story = {
  args: {
    variant: 'button',
    size: 'medium',
    isDisabled: false,
  },
  render: (args) => (
    <div className="flex w-full max-w-md flex-col items-center justify-center gap-4">
      <WithExternalResetControlComponent {...args} />
    </div>
  ),
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
  render: () => (
    <div className="flex size-full h-screen items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-4">
        <FileUploader variant="dropzone" />
        <FileUploader variant="dropzone" isDisabled />
      </div>
    </div>
  ),
};
