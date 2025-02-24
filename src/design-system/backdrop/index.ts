import styled from "@emotion/styled";
import { theme } from "..";

export const Backdrop = styled.div<{ visible: boolean; transition?: string }>`
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  opacity: ${({ visible }) => (visible ? "1" : "0")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: ${({ visible }) => (visible ? theme.youDiedScreen.backdrop : -1)};
  transition: ${({ transition }) => {
    if (transition) return transition;
    return "none";
  }}
`;
