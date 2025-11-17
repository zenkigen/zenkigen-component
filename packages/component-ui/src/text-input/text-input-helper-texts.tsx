import type { HTMLAttributes } from 'react';
import { Children, forwardRef } from 'react';

export type TextInputHelperTextsProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'>;

export const TextInputHelperTexts = forwardRef<HTMLDivElement, TextInputHelperTextsProps>(
  ({ children, ...props }, ref) => {
    if (Children.count(children) === 0) {
      return null;
    }

    return (
      <div ref={ref} className="flex flex-col gap-1" {...props}>
        {children}
      </div>
    );
  },
);
TextInputHelperTexts.displayName = 'TextInput.HelperTexts';
