import type { CSSProperties, RefObject } from 'react';
import { createContext } from 'react';

import type { SelectOption } from './type';

type UseSelectReturnType = {
  size?: 'x-small' | 'small' | 'medium' | 'large';
  /** 「選択解除」を表示するかどうか。Select 側で解決済みの値を受け取る */
  isDeselectVisible: boolean;
  selectedOption?: SelectOption | null;
  setIsOptionListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: (option: SelectOption | null) => void;
  variant?: 'text' | 'outline';
  isError?: boolean;
  floatingStyles?: CSSProperties;
  floatingRef?: RefObject<HTMLUListElement | null>;
};

export const SelectContext = createContext<UseSelectReturnType>({
  size: 'medium',
  isDeselectVisible: false,
  setIsOptionListOpen: () => false,
  variant: 'outline',
  isError: false,
});
