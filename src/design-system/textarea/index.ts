import styled from "@emotion/styled";
import { theme } from "..";
import { withAttrs } from "../utils";

export const ChatTextArea = withAttrs(
  styled.textarea`
    resize: none;
    background: ${theme.chatTextArea.background};
    border: ${theme.chatTextArea.border} ${theme.colors.borderSecondary};
    border-radius: ${theme.chatTextArea.borderRadius};

    outline: none;
    appearance: none;

    color: ${theme.colors.text};
    font-size: ${theme.fonts.size.body};

    padding: 8px 8px 4px 8px;
    line-height: 1.25;
    min-width: 50vw;

    &:focus {
      outline: ${theme.chatTextArea.focus.outline} ${theme.colors.borderPrimary};
    }
  `,
  () => ({ rows: 1 }),
);
