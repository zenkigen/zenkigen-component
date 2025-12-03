import type { ComponentPropsWithoutRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef, useState } from 'react';

import { IconButton } from '../icon-button';
import type { TextInput } from '../text-input/text-input';
import { InternalTextInput } from '../text-input/text-input';
import { TextInputErrorMessage } from '../text-input/text-input-error-message';
import { TextInputHelperMessage } from '../text-input/text-input-helper-message';

type Props = Omit<ComponentPropsWithoutRef<typeof TextInput>, 'type' | 'onClickClearButton' | 'className'>;

type PasswordInputComponent = ForwardRefExoticComponent<Props & RefAttributes<HTMLInputElement>> & {
  HelperMessage: typeof TextInputHelperMessage;
  ErrorMessage: typeof TextInputErrorMessage;
};

const PasswordInputBase = forwardRef<HTMLInputElement, Props>(function PasswordInput(
  { disabled = false, children, ...props }: Props,
  ref,
) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { className: _className, ...textInputProps } = props as Props & { className?: string };

  const handlePasswordVisibilityToggle = () => {
    setIsPasswordVisible((prev) => !prev);
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
    <InternalTextInput
      ref={ref}
      type={isPasswordVisible === true ? 'text' : 'password'}
      disabled={disabled}
      after={passwordToggleButton}
      {...textInputProps}
    >
      {children}
    </InternalTextInput>
  );
});

const PasswordInput = Object.assign(PasswordInputBase, {
  HelperMessage: TextInputHelperMessage,
  ErrorMessage: TextInputErrorMessage,
  displayName: 'PasswordInput',
}) satisfies PasswordInputComponent;

export { PasswordInput };
