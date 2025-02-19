import common from "./vite.config.common";
import { mergeConfig, defineConfig } from "vite";

export default mergeConfig(
  common,
  defineConfig({
    build: {
      rollupOptions: { output: { manualChunks: { phaser: ["phaser"] } } },
      minify: "terser",
      terserOptions: {
        compress: { passes: 2 },
        mangle: true,
        format: { comments: false },
      },
    },
  }),
);

