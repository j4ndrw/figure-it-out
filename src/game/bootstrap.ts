import { AUTO, Game } from "phaser";
import { GAME_CANVAS_ID, GAME_CONTAINER_ID } from "./constants";
import { theme } from "@/design-system";
import { boot } from "./scenes/boot";
import { preloader } from "./scenes/preloader";
import { playground } from "./scenes/playground";
import { eventBus } from "@/tools/event-bus";

const baseConfig: Phaser.Types.Core.GameConfig = {
  antialias: true,
  type: AUTO,
  width: theme.game.width(),
  height: theme.game.height(),
  parent: GAME_CONTAINER_ID,
  backgroundColor: theme.colors.background,
  scene: [boot.scene, preloader.scene, playground.scene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: true,
    },
  },
};

export const createGame = (
  config: Phaser.Types.Core.GameConfig = baseConfig,
) => {
  document.getElementById(GAME_CANVAS_ID)?.remove();
  const game = new Game({ ...baseConfig, ...config });
  game.canvas.id = GAME_CANVAS_ID;
  eventBus.publish({
    event: "reset-world",
    message: {},
  });
  return game;
};
