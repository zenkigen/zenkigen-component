import { useState } from 'react';

import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';

import { Modal } from '.';

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;

export function Base() {
  const [_, setIsOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <Modal
        isOpen
        setIsOpen={setIsOpen}
        size="medium"
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
        <div className="flex h-[200px] w-full items-center justify-center">Content</div>
      </Modal>
    </div>
  );
}

export function WithCheckbox() {
  const [_, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <Modal
        isOpen
        setIsOpen={setIsOpen}
        size="medium"
        headerElement={<Modal.Header>タイトル</Modal.Header>}
        buttonTabElement={
          <Modal.ButtonTab
            primaryButtonLabel="保存する"
            secondaryButtonLabel="キャンセル"
            onClickPrimaryButton={action('保存する')}
            onClickSecondaryButton={action('キャンセル')}
            isWithCheckbox
            checkboxLabel="ラベル"
            isChecked={isChecked}
            onChange={() => setIsChecked((prev) => !prev)}
          />
        }
      >
        <div className="flex h-[200px] w-full items-center justify-center">Content</div>
      </Modal>
    </div>
  );
}

export function WithSubButton() {
  const [_, setIsOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <Modal
        isOpen
        setIsOpen={setIsOpen}
        size="medium"
        headerElement={<Modal.Header>タイトル</Modal.Header>}
        buttonTabElement={
          <Modal.ButtonTab
            primaryButtonLabel="保存する"
            secondaryButtonLabel="キャンセル"
            onClickPrimaryButton={action('保存する')}
            onClickSecondaryButton={action('キャンセル')}
            subButtonLabel="ボタンラベル"
            onClickSubButton={action('サブボタンアクション')}
          />
        }
      >
        <div className="flex h-[200px] w-full items-center justify-center">Content</div>
      </Modal>
    </div>
  );
}

export function SizeSmall() {
  const [_, setIsOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <Modal
        isOpen
        setIsOpen={setIsOpen}
        size="small"
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
        <div className="flex h-[200px] w-full items-center justify-center">Content</div>
      </Modal>
    </div>
  );
}
export function SizeSmallWithCheckbox() {
  const [_, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <Modal
        isOpen
        setIsOpen={setIsOpen}
        size="small"
        headerElement={<Modal.Header>タイトル</Modal.Header>}
        buttonTabElement={
          <Modal.ButtonTab
            primaryButtonLabel="保存する"
            secondaryButtonLabel="キャンセル"
            onClickPrimaryButton={action('保存する')}
            onClickSecondaryButton={action('キャンセル')}
            isWithCheckbox
            checkboxLabel="ラベル"
            isChecked={isChecked}
            onChange={() => setIsChecked((prev) => !prev)}
          />
        }
      >
        <div className="flex h-[200px] w-full items-center justify-center">Content</div>
      </Modal>
    </div>
  );
}

export function SizeSmallWithSubButton() {
  const [_, setIsOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <Modal
        isOpen
        setIsOpen={setIsOpen}
        size="small"
        headerElement={<Modal.Header>タイトル</Modal.Header>}
        buttonTabElement={
          <Modal.ButtonTab
            primaryButtonLabel="保存する"
            secondaryButtonLabel="キャンセル"
            onClickPrimaryButton={action('保存する')}
            onClickSecondaryButton={action('キャンセル')}
            subButtonLabel="ボタンラベル"
            onClickSubButton={action('サブボタンアクション')}
          />
        }
      >
        <div className="flex h-[200px] w-full items-center justify-center">Content</div>
      </Modal>
    </div>
  );
}

export function FixedHeight() {
  const [_, setIsOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <Modal
        isOpen
        setIsOpen={setIsOpen}
        size="medium"
        height={500}
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
        <div className="flex h-[800px] w-full items-center justify-center">Content</div>
      </Modal>
    </div>
  );
}

export function WithTabs() {
  const [_, setIsOpen] = useState(false);
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
        size="medium"
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
        <div className="flex h-[200px] w-full items-center justify-center">
          {selectedTab === 'tab1' && <div>Content 1</div>}
          {selectedTab === 'tab2' && <div>Content 2</div>}
          {selectedTab === 'tab3' && <div>Content 3</div>}
        </div>
      </Modal>
    </div>
  );
}

export function WithoutButton() {
  const [_, setIsOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <Modal isOpen setIsOpen={setIsOpen} size="medium" headerElement={<Modal.Header>タイトル</Modal.Header>}>
        <div className="flex h-[200px] w-full items-center justify-center">Content</div>
      </Modal>
    </div>
  );
}

export function Danger() {
  const [_, setIsOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <Modal
        isOpen
        setIsOpen={setIsOpen}
        width={420}
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
