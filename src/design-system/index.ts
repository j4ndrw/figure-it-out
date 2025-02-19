export const theme = {
  colors: {
    primary: "#23CE6B",
    borderPrimary: "#0C4624",
    secondary: "#A846A0",
    borderSecondary: "#481E44",
    background: "#F6F8FF",
    text: "#272D2D",
  },
  fonts: {
    body: "Comic Sans MS, cursive, sans-serif",
  },
  button: {
      padding: "0.5rem 1rem",
      borderRadius: "16px",
      border: "0.75px solid",
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
} as const;

export type Theme = typeof theme;
