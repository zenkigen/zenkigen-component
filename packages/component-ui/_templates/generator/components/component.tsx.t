---
to: src/<%= component_name %>/<%= component_name %>.tsx
---
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export function <%= h.changeCase.pascal(component_name) %>({ children }: Props) {
  return <div>{children}</div>;
}
