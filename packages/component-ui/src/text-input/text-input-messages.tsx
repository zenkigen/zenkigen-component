import type { HTMLAttributes } from 'react';
import { Children, forwardRef } from 'react';

export type TextInputMessagesProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'>;

export const TextInputMessages = forwardRef<HTMLDivElement, TextInputMessagesProps>(({ children, ...props }, ref) => {
  if (Children.count(children) === 0) {
    return null;
  }

  return (
    <div ref={ref} className="flex flex-col gap-1" {...props}>
      {children}
    </div>
  );
});
TextInputMessages.displayName = 'TextInput.Messages';
