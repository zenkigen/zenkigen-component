import type { ComponentPropsWithoutRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef, useState } from 'react';

import { IconButton } from '../icon-button';
import { TextInput } from '../text-input';

type Props = Omit<ComponentPropsWithoutRef<typeof TextInput>, 'type' | 'onClickClearButton'>;

type PasswordInputComponent = ForwardRefExoticComponent<Props & RefAttributes<HTMLInputElement>> & {
  HelperTexts: typeof TextInput.HelperTexts;
  HelperText: typeof TextInput.HelperText;
  Errors: typeof TextInput.Errors;
  Error: typeof TextInput.Error;
};

const PasswordInput = forwardRef<HTMLInputElement, Props>(({ disabled = false, children, ...props }, ref) => {
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
      after={passwordToggleButton}
      {...props}
    >
      {children}
    </TextInput>
  );
}) as PasswordInputComponent;

PasswordInput.HelperTexts = TextInput.HelperTexts;
PasswordInput.HelperText = TextInput.HelperText;
PasswordInput.Errors = TextInput.Errors;
PasswordInput.Error = TextInput.Error;
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
