import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { Button } from '../button';
import { FileInput } from './file-input';

const meta: Meta<typeof FileInput> = {
  title: 'Components/FileInput',
  component: FileInput,
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
    isError: {
      control: { type: 'boolean' },
      description: 'エラー状態（メッセージなしでもエラースタイル適用）',
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
    errorMessages: {
      control: { type: 'object' },
      description: 'エラーメッセージリスト',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {
  args: {
    variant: 'button',
    size: 'medium',
    isDisabled: false,
    isError: false,
    errorMessages: [],
  },
  parameters: {
    layout: 'centered',
  },
};

export const ButtonVariants: Story = {
  render: () => (
    <div className="flex size-full h-screen items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <FileInput variant="button" size="small" />
        <FileInput variant="button" size="medium" />
        <FileInput variant="button" size="large" />
      </div>
    </div>
  ),
};

export const ButtonStates: Story = {
  render: () => (
    <div className="flex size-full h-screen items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-4">
        <FileInput variant="button" />
        <FileInput variant="button" isDisabled />
        <FileInput variant="button" isError />
      </div>
    </div>
  ),
};

export const DropzoneStates: Story = {
  render: () => (
    <div className="flex size-full h-screen items-center justify-center ">
      <div className="flex items-center justify-center gap-4">
        <FileInput variant="dropzone" />
        <FileInput variant="dropzone" isDisabled />
        <FileInput variant="dropzone" isError />
      </div>
    </div>
  ),
};

export const Error: Story = {
  args: {
    isError: true,
    errorMessages: ['ファイルサイズが大き過ぎます。', 'ファイル形式が正しくありません。'],
  },
  render: (args) => (
    <div className="flex size-full h-screen items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <FileInput variant="button" size="small" isError={args.isError} errorMessages={args.errorMessages} />
        <FileInput variant="button" size="medium" isError={args.isError} errorMessages={args.errorMessages} />
        <FileInput variant="button" size="large" isError={args.isError} errorMessages={args.errorMessages} />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <FileInput variant="dropzone" isError={args.isError} errorMessages={args.errorMessages} />
      </div>
    </div>
  ),
};

export const ErrorStateWithoutMessages: Story = {
  args: {
    isError: true,
  },
  render: (args) => (
    <div className="flex size-full h-screen items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <FileInput variant="button" size="small" isError={args.isError} />
        <FileInput variant="button" size="medium" isError={args.isError} />
        <FileInput variant="button" size="large" isError={args.isError} />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <FileInput variant="dropzone" isError={args.isError} />
      </div>
    </div>
  ),
};

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
  const fileInputRef = useRef<{ reset: () => void }>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleReset = () => {
    fileInputRef.current?.reset();
    setErrorMessages([]);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-start gap-10">
        <FileInput
          ref={fileInputRef}
          variant={variant}
          {...(variant === 'button' && size && { size: size as 'small' | 'medium' | 'large' })}
          accept={accept}
          maxSize={maxSize}
          isDisabled={isDisabled}
          isError={errorMessages.length > 0}
          errorMessages={errorMessages}
          onSelect={(file) => {
            // eslint-disable-next-line no-console
            console.log('Selected file:', file);
          }}
          onError={(errors) => {
            setErrorMessages(errors.map((error) => `${error.message}`));
          }}
        />
        <div className="flex w-full flex-col items-center justify-start gap-2">
          <Button variant="outline" onClick={handleReset}>
            リセット
          </Button>
        </div>
      </div>
    </div>
  );
};

export const WithExternalResetControl: Story = {
  args: {
    variant: 'button',
    size: 'medium',
    accept: '',
    isDisabled: false,
  },
  parameters: {
    layout: 'centered',
  },
  render: (args) => <WithExternalResetControlComponent {...args} />,
};

export const LayoutExamples: Story = {
  args: {
    errorMessages: [],
  },
  render: () => (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex">
        <FileInput variant="button" />
      </div>
      <div className="w-[280px]">
        <FileInput variant="button" />
      </div>
      <div className="w-full">
        <FileInput variant="button" />
      </div>
      <div className="flex">
        <FileInput variant="dropzone" />
      </div>
      <div className="w-[360px]">
        <FileInput variant="dropzone" />
      </div>
      <div className="grid h-[600px] w-full">
        <FileInput variant="dropzone" />
      </div>
    </div>
  ),
};

export const LayoutExamplesWithError: Story = {
  args: {
    isError: true,
    errorMessages: ['ファイルサイズが大き過ぎます。', 'ファイル形式が正しくありません。'],
  },
  render: (args) => (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex">
        <FileInput variant="button" isError={args.isError} errorMessages={args.errorMessages} />
      </div>
      <div className="w-[200px]">
        <FileInput variant="button" isError={args.isError} errorMessages={args.errorMessages} />
      </div>
      <div className="w-full">
        <FileInput variant="button" isError={args.isError} errorMessages={args.errorMessages} />
      </div>
      <div className="flex">
        <FileInput variant="dropzone" isError={args.isError} errorMessages={args.errorMessages} />
      </div>
      <div className="w-[200px]">
        <FileInput variant="dropzone" isError={args.isError} errorMessages={args.errorMessages} />
      </div>
      <div className="grid h-[600px] w-full">
        <FileInput variant="dropzone" isError={args.isError} errorMessages={args.errorMessages} />
      </div>
    </div>
  ),
};
