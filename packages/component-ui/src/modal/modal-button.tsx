import { useContext } from 'react';

import { Button } from '../button';

import { ModalContext } from './modal-context';

type Props = React.ComponentProps<typeof Button>;

export function ModalButton({ ...props }: Props) {
  const { width, widthLimit } = useContext(ModalContext);
  return (
    <Button {...props} width={width < widthLimit ? 132 : 'auto'}/>
  );
}
