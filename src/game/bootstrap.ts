import { AUTO, Game } from "phaser";
import { GAME_CONTAINER_ID } from "./constants";
import { theme } from "@/design-system";

const baseConfig: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: GAME_CONTAINER_ID,
  backgroundColor: theme.colors.background,
  scene: [],
};

export const createGame = (config: Phaser.Types.Core.GameConfig = baseConfig) =>
  new Game({ ...baseConfig, ...config });
