import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider, Global } from "@emotion/react";
import { theme } from "./design-system/index.ts";
import globalStyles from "./design-system/global-styles.ts";

import './augmentations/string.ts';
import './augmentations/keyboard-event.ts';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
