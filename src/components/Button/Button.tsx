import { ReactNode } from 'react';

import { TokensInteractiveInteractive01 } from 'src/tokens/tokens';
import styled from 'styled-components';

type Props = {
  children?: ReactNode;
};

export const Button = ({ children }: Props) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

const StyledWrapper = styled.button`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.TokensInteractiveInteractive01};
`;

StyledWrapper.defaultProps = {
  theme: {
    TokensInteractiveInteractive01: TokensInteractiveInteractive01,
  },
};
