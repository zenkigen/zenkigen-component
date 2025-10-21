import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';

import { Button } from '../button';
import { FileUploader } from './file-uploader';

const meta: Meta<typeof FileUploader> = {
  title: 'Components/FileUploader',
  component: FileUploader,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['button', 'dropzone'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    isDisabled: {
      control: { type: 'boolean' },
    },
    isError: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

const WithResetControlComponent = () => {
  const fileUploaderRef = useRef<{ reset: () => void; openFileDialog: () => void }>(null);

  const handleReset = () => {
    fileUploaderRef.current?.reset();
  };

  const handleOpenDialog = () => {
    fileUploaderRef.current?.openFileDialog();
  };

  return (
    <div className="flex w-full flex-col items-start justify-start gap-4">
      <FileUploader
        ref={fileUploaderRef}
        variant="button"
        onFileSelect={(file) => {
          // eslint-disable-next-line no-console
          console.log('Selected file:', file);
        }}
      />
      <div className="flex gap-2">
        <Button variant="text" onClick={handleOpenDialog}>
          ファイル選択ダイアログを開く
        </Button>
        <Button variant="text" onClick={handleReset}>
          リセット
        </Button>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => <WithResetControlComponent />,
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
        <FileUploader variant="button" isError />
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
        <FileUploader variant="dropzone" isError />
        <FileUploader variant="dropzone" isDisabled />
      </div>
    </div>
  ),
};

export const WithFileRestrictions: Story = {
  args: {
    variant: 'button',
    accept: '.csv,.pdf',
    maxSize: 50 * 1024 * 1024, // 50MB
    onError: (error: string) => {
      // eslint-disable-next-line no-alert
      alert(error);
    },
  },
};
