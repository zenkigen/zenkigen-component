import { ReactNode } from 'react';

import styled, { css } from 'styled-components';

import { space } from '../../helpers/space';

type Props = {
  disabled?: boolean;
  isAnchor?: boolean;
  children?: ReactNode;
};

export function Button({ disabled, isAnchor, children }: Props) {
  if (isAnchor) {
    return <StyledAnchor>{children}</StyledAnchor>;
  } else {
    return <StyledButton disabled={disabled}>{children}</StyledButton>;
  }
}

const baseStyles = css`
  ${({ theme }) => theme.LabelLabel414pxRegular};
  color: ${({ theme }) => theme.TokensTextTextOnColor};
  border-radius: 4px;
  padding: ${space(3)} ${space(5)};
  background-color: ${({ theme }) => theme.TokensInteractiveInteractive01};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.TokensHoverHover01};
  }

  &:active {
    background-color: ${({ theme }) => theme.TokensActiveActive01};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.TokensDisabledDisabled01};
    pointer-events: none;
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button`
  ${baseStyles}
  border: none;
`;

const StyledAnchor = styled.a`
  ${baseStyles}
  text-decoration: none;
`;
