import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef, useCallback, useMemo, useState } from 'react';

import type { TextInputInternalProps } from './text-input.types';
import { TextInputCompoundContext } from './text-input-context';
import { TextInputError } from './text-input-error';
import { TextInputErrors } from './text-input-errors';
import { TextInputInput } from './text-input-input';
import { TextInputMessage } from './text-input-message';
import { TextInputMessages } from './text-input-messages';
import { LegacyTextInput } from './text-input-renderer';

export type { TextInputProps } from './text-input.types';

type TextInputRootProps = TextInputInternalProps & {
  children?: ReactNode;
};

type TextInputComponent = ForwardRefExoticComponent<TextInputRootProps & RefAttributes<HTMLInputElement>> & {
  Input: typeof TextInputInput;
  Messages: typeof TextInputMessages;
  Message: typeof TextInputMessage;
  Errors: typeof TextInputErrors;
  Error: typeof TextInputError;
};

let hasLegacyUsageWarned = false;

const TextInputWithCompound = forwardRef<HTMLInputElement, TextInputRootProps>((props, ref) => {
  const { children, ...rest } = props;
  const [messageIds, setMessageIds] = useState<string[]>([]);
  const [errorIds, setErrorIds] = useState<string[]>([]);

  const registerMessageId = useCallback((id: string) => {
    setMessageIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const unregisterMessageId = useCallback((id: string) => {
    setMessageIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const registerErrorId = useCallback((id: string) => {
    setErrorIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const unregisterErrorId = useCallback((id: string) => {
    setErrorIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const contextValue = useMemo(
    () => ({
      inputProps: rest,
      forwardedRef: ref,
      messageIds,
      errorIds,
      registerMessageId,
      unregisterMessageId,
      registerErrorId,
      unregisterErrorId,
    }),
    [rest, ref, messageIds, errorIds, registerMessageId, unregisterMessageId, registerErrorId, unregisterErrorId],
  );

  if (children == null) {
    if (process.env.NODE_ENV !== 'production' && !hasLegacyUsageWarned) {
      hasLegacyUsageWarned = true;
      // eslint-disable-next-line no-console
      console.warn(
        '[TextInput] props 直接指定による旧APIは将来的に廃止予定である。新しいコンポジションAPI (TextInput.Input など) への移行を検討すること。',
      );
    }

    return <LegacyTextInput ref={ref} {...rest} />;
  }

  return (
    <TextInputCompoundContext.Provider value={contextValue}>
      <div className="flex flex-col gap-2">{children}</div>
    </TextInputCompoundContext.Provider>
  );
}) as TextInputComponent;

TextInputWithCompound.Input = TextInputInput;
TextInputWithCompound.Messages = TextInputMessages;
TextInputWithCompound.Message = TextInputMessage;
TextInputWithCompound.Errors = TextInputErrors;
TextInputWithCompound.Error = TextInputError;
TextInputWithCompound.displayName = 'TextInput';

export const TextInput = TextInputWithCompound;
