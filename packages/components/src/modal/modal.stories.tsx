import { useState } from 'react';

import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';

import { Modal } from '.';

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;

export function Base() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <Modal
        isOpen
        setIsOpen={setIsOpen}
        widthVariant="narrow"
        headerElement={<Modal.Header>タイトル</Modal.Header>}
        buttonTabElement={
          <Modal.ButtonTab
            primaryButtonLabel="保存する"
            secondaryButtonLabel="キャンセル"
            onClickPrimaryButton={action('保存する')}
            onClickSecondaryButton={action('キャンセル')}
          />
        }
      >
        <div className="flex h-20 w-full items-center justify-center">Content</div>
      </Modal>
    </div>
  );
}

export function WithTabs() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('tab1');
  const tabItems = [
    { id: 'tab1', label: 'タブラベル1' },
    { id: 'tab2', label: 'タブラベル2' },
    { id: 'tab3', label: 'タブラベル3' },
  ];
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <Modal
        isOpen
        setIsOpen={setIsOpen}
        widthVariant="narrow"
        headerElement={<Modal.Header isNoBorder>タイトル</Modal.Header>}
        tabElement={<Modal.Tab tabItems={tabItems} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />}
        buttonTabElement={
          <Modal.ButtonTab
            primaryButtonLabel="保存する"
            secondaryButtonLabel="キャンセル"
            onClickPrimaryButton={action('保存する')}
            onClickSecondaryButton={action('キャンセル')}
          />
        }
      >
        <div className="flex h-20 w-full items-center justify-center">
          {selectedTab === 'tab1' && <div>Content 1</div>}
          {selectedTab === 'tab2' && <div>Content 2</div>}
          {selectedTab === 'tab3' && <div>Content 3</div>}
        </div>
      </Modal>
    </div>
  );
}

export function WithoutButton() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <Modal isOpen setIsOpen={setIsOpen} widthVariant="narrow" headerElement={<Modal.Header>タイトル</Modal.Header>}>
        <div className="flex h-20 w-full items-center justify-center">Content</div>
      </Modal>
    </div>
  );
}

export function Danger() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <Modal
        isOpen
        setIsOpen={setIsOpen}
        widthVariant="narrow"
        headerElement={
          <Modal.Header isNoBorder isNoCloseButton>
            タイトル
          </Modal.Header>
        }
        buttonTabElement={
          <Modal.ButtonTab
            primaryButtonLabel="削除する"
            secondaryButtonLabel="キャンセル"
            onClickPrimaryButton={action('削除する')}
            onClickSecondaryButton={action('キャンセル')}
            isNoBorder
            isDanger
          />
        }
      >
        <div className="flex h-16 w-full items-center justify-center">Content</div>
      </Modal>
    </div>
  );
}
