import { createContext, useContext } from 'react';

export type AvatarSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export type AvatarGroupContextValue = {
  size: AvatarSize;
};

export const AvatarGroupContext = createContext<AvatarGroupContextValue | null>(null);

export function useAvatarGroupSize(): AvatarSize | null {
  const context = useContext(AvatarGroupContext);

  return context?.size ?? null;
}
