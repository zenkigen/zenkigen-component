import clsx from 'clsx';

import { LightColor } from './light-colors';
import { TagColor } from './type';

type Props = {
  color?: TagColor | LightColor;
  onClick?: () => void;
};

export const DeleteIcon = ({ color }: Props) => {
  const deleteSvgClasses = clsx('h-[14px]', 'w-[14px]', 'ml-2', 'rounded-full', 'p-0.5', 'group', 'hover:bg-white');

  const deletePassClasses = clsx('p-1', {
    'fill-interactive-interactive02': color === 'Gray',
    'group-hover:fill-interactive-interactive02 fill-icon-iconOnColor': color !== 'Gray',
  });

  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={deleteSvgClasses}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.7745 4.21818C19.384 3.82765 18.7508 3.82765 18.3603 4.21818L11.9963 10.5821L5.6324 4.21818C5.24187 3.82765 4.60871 3.82765 4.21818 4.21818C3.82766 4.6087 3.82766 5.24187 4.21818 5.63239L10.5821 11.9964L4.21818 18.3603C3.82766 18.7508 3.82766 19.384 4.21818 19.7745C4.60871 20.1651 5.24187 20.165 5.6324 19.7745L11.9963 13.4106L18.3603 19.7745C18.7508 20.165 19.384 20.1651 19.7745 19.7745C20.165 19.384 20.165 18.7508 19.7745 18.3603L13.4106 11.9964L19.7745 5.63239C20.165 5.24187 20.165 4.6087 19.7745 4.21818Z"
        className={deletePassClasses}
      ></path>
    </svg>
  );
};
