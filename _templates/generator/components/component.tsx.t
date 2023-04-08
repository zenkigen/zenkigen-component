---
to: src/components/<%= component_name %>/<%= component_name %>.tsx
---
import { ReactNode } from 'react'

import styled from 'styled-components';

type Props = {
  children?: ReactNode
}

export const <%= h.changeCase.pascal(component_name) %> = ({ children }: Props) => {
  return <StyledWrapper>{children}</StyledWrapper>
}

const StyledWrapper = styled.div``
