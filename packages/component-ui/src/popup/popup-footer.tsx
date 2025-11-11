import type { PropsWithChildren } from 'react';
import React from 'react';

export function PopupFooter({ children }: PropsWithChildren) {
  return <div className="flex w-full shrink-0 items-center rounded-b-lg px-6 py-3">{children}</div>;
}
