import { GameObjects } from "phaser";
import { Player } from "../entities/player";

export type World = Partial<{
  player: Player<GameObjects.Shape>;
}>;

export const world = (world?: World) => world ?? {};
