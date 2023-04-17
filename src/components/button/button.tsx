import { ReactNode } from 'react';

import styled, { css } from 'styled-components';

import { useTheme } from '../../hooks';
import { CreateTheme } from '../../theme';

type Props = {
  disabled?: boolean;
  isAnchor?: boolean;
  children?: ReactNode;
};

export function Button({ disabled, isAnchor, children }: Props) {
  const theme = useTheme();

  if (isAnchor) {
    return <StyledAnchor theme={theme}>{children}</StyledAnchor>;
  } else {
    return (
      <StyledButton theme={theme} disabled={disabled}>
        {children}
      </StyledButton>
    );
  }
}

const baseStyles = (theme: CreateTheme) => css`
  ${theme.LabelLabel414pxRegular};
  color: ${theme.TokensTextTextOnColor};
  border-radius: 4px;
  padding: ${theme.space(3)} ${theme.space(5)};
  background-color: ${theme.TokensInteractiveInteractive01};
  cursor: pointer;

  &:hover {
    background-color: ${theme.TokensHoverHover01};
  }

  &:active {
    background-color: ${theme.TokensActiveActive01};
  }

  &:disabled {
    background-color: ${theme.TokensDisabledDisabled01};
    pointer-events: none;
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button<{ theme: CreateTheme }>`
  ${({ theme }) => baseStyles(theme)}
  border: none;
`;

const StyledAnchor = styled.a<{ theme: CreateTheme }>`
  ${({ theme }) => baseStyles(theme)}
  text-decoration: none;
`;
