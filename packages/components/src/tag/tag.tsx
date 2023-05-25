import { tagColorDefinitions, typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

import { DeleteIcon } from './delete-icon';
import { LightColor } from './light-colors';
import { TagColor } from './type';

type Props = {
  userId?: number;
  children?: string;
  color: TagColor | LightColor;
  size?: 'medium' | 'x-small' | 'small';
  onClick?: () => void;
  className?: string;
  onDelete?: () => void;
  isEditable?: boolean;
};

export function Tag({ children, color, size, onDelete, isEditable = false }: Props) {
  const wrapperClasses = clsx(
    'flex',
    'items-center',
    'justify-center',
    tagColorDefinitions[color].font,
    tagColorDefinitions[color].background,
    // 'py-0.5',
    // 'px-1',
    'rounded',
    {
      [`h-[18px] ${typography.label.label2regular}`]: !isEditable && size === 'medium',
      [`h-4 ${typography.label.label3regular}`]: !isEditable && size === 'x-small',
      [`h-[14px] ${typography.label.label4regular}`]: !isEditable && size === 'small',
      [`h-[22px] ${typography.label.label2regular}`]: isEditable && size === 'medium',
      // [`h-4 ${typography.label.label3regular}`]: isEditable && size === 'x-small',
      // [`h-[14px] ${typography.label.label4regular}`]: isEditable && size === 'small',
      'rounded-full': isEditable,
      'rounded-sm': !isEditable,
      'py-0.5 px-1': !isEditable,
      'py-1 px-2': isEditable,
      'hover:cursor-pointer': isEditable,
    },
  );

  return (
    <div className={wrapperClasses}>
      {children}
      {isEditable === true ? <DeleteIcon onClick={onDelete} color={color} /> : null}
    </div>
  );
}
