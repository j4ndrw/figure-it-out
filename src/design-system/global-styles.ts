import { css } from "@emotion/react";
import { theme } from ".";

const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body, #root {
    font-family: ${theme.fonts.body};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text}
    line-height: 1.6;
    overflow: hidden;
  }
`;

export default globalStyles;
