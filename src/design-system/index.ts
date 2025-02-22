export const theme = {
  colors: {
    primary: "#421891",
    borderPrimary: "#78757c",
    secondary: "#8562b6",
    borderSecondary: "#605c64",
    background: "#1d1923",
    text: "#FFFFFF",
  },
  fonts: {
    family: "Comic Sans MS, cursive, sans-serif",
    size: {
      body: "16px",
      heading: "24px",
      subheading: "20px",
    },
  },
  chatTextArea: {
    background: "#2e2933",
    border: "2px solid",
    borderRadius: "8px",
    focus: {
      outline: "1px solid",
    },
  },
  button: {
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    border: "1.5px solid",
  },
  game: {
    box: {
      border: {
        color: "#FFFFFF",
      },
    },
    player: {
      fill: {
        color: "#FFFFFF",
      },
    },
    platform: {
      fill: {
        color: "#F2EBCF",
      },
    },
    width: (options?: { withUnits: boolean }) => {
      const value = 1280;

      if (options?.withUnits) return `${value}px`;
      return value;
    },
    height: (options?: { withUnits: boolean }) => {
      const value = 720;

      if (options?.withUnits) return `${value}px`;
      return value;
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
} as const;

export type Theme = typeof theme;
