import { useState } from 'react';

import { Meta } from '@storybook/react';

import { Modal } from '.';

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;

export function Base() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setIsOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <Modal isOpen onClose={() => setIsOpen(false)} headerElement={<Modal.Header />} footerElement={<Modal.Footer />}>
        Modal
      </Modal>
    </div>
  );
}

export function WidthNoBorder() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setIsOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <Modal
        isOpen
        onClose={() => setIsOpen(false)}
        headerElement={<Modal.Header isNoBorder />}
        footerElement={<Modal.Footer isNoBorder />}
      >
        Modal
      </Modal>
    </div>
  );
}
