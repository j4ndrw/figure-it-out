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
    family: "Cormorant, serif",
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
    box: { border: { color: "#FFFFFF" } },
    player: { fill: { color: "#FFFFFF" } },
    platform: {
      deadly: { fill: { color: "#BB2A25" } },
      fill: { color: "#FFD97D" },
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
  youDiedScreen: {
    backdrop: {
      zIndex: 100,
    },
    text: {
      color: "#660900"
    },
    transition: {
      curve: 'cubic-bezier(.21,2.1,.73,.6)',
      duration: '2.5s',
    }
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
} as const;

export type Theme = typeof theme;
