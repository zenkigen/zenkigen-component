import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef, useState } from 'react';

import { IconButton } from '../icon-button';
import { TextInput } from '../text-input';

type Props = Omit<ComponentPropsWithoutRef<typeof TextInput>, 'type' | 'onClickClearButton'>;

export const PasswordInput = forwardRef<HTMLInputElement, Props>(({ disabled = false, ...props }: Props, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handlePasswordVisibilityToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const passwordToggleButton = (
    <IconButton
      variant="text"
      icon={isPasswordVisible === true ? 'visibility-off' : 'visibility'}
      size="small"
      onClick={handlePasswordVisibilityToggle}
      isDisabled={disabled}
      aria-label={isPasswordVisible === true ? 'パスワードを非表示にする' : 'パスワードを表示する'}
    />
  );

  return (
    <TextInput
      ref={ref}
      type={isPasswordVisible === true ? 'text' : 'password'}
      disabled={disabled}
      {...props}
      {...({ after: passwordToggleButton } as Record<string, unknown>)}
    />
  );
});
PasswordInput.displayName = 'PasswordInput';
