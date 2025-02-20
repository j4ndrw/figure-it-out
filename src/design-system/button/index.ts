import styled from "@emotion/styled";
import { theme } from "..";

const buttonStyles = `
  color: #ffffff;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const PrimaryButton = styled.button`
  ${buttonStyles};
  background: ${theme.colors.primary};
  padding: ${theme.button.padding};
  border-radius: ${theme.button.borderRadius};
  border: ${theme.button.border} ${theme.colors.borderPrimary};
  &:hover {
    background: ${theme.colors.primary}80;
  }
`;

export const SecondaryButton = styled.button`
  ${buttonStyles}
  background: ${theme.colors.secondary};
  padding: ${theme.button.padding};
  border-radius: ${theme.button.borderRadius};
  border: ${theme.button.border} ${theme.colors.borderSecondary};
  &:hover {
    background: ${theme.colors.secondary}80;
  }
`;
