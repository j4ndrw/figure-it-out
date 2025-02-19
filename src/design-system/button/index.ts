import styled from "@emotion/styled";
import { theme } from "..";

export const PrimaryButton = styled.button`
    background: ${theme.colors.primary};
    color: #FFFFFF;
    padding: ${theme.button.padding};
    border-radius: ${theme.button.borderRadius};
    border: ${theme.button.border} ${theme.colors.borderPrimary};
    &:hover {
      background: ${theme.colors.primary}80;
    }
`;

export const SecondaryButton = styled.button`
    background: ${theme.colors.secondary};
    color: #FFFFFF;
    padding: ${theme.button.padding};
    border-radius: ${theme.button.borderRadius};
    border: ${theme.button.border} ${theme.colors.borderSecondary};
    &:hover {
      background: ${theme.colors.secondary}80;
    }
`;
