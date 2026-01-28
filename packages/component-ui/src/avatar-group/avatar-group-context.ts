import { createContext, useContext } from 'react';

type AvatarSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export type AvatarGroupContextValue = {
  size: AvatarSize;
  total: number;
  max: number;
  isOverflow: boolean;
  remain: number;
};

export const AvatarGroupContext = createContext<AvatarGroupContextValue | null>(null);

export function useAvatarGroupContext() {
  const context = useContext(AvatarGroupContext);
  if (context === null) {
    throw new Error('AvatarGroup のサブコンポーネントは AvatarGroup 内で使用してください');
  }

  return context;
}

export function useAvatarGroupSize(): AvatarSize | null {
  const context = useContext(AvatarGroupContext);

  return context?.size ?? null;
}
