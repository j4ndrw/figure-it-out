import { GameObjects } from "phaser";

export type Player<T extends GameObjects.Shape> = {
  gameObject: T,
  speed: number;
  jump: {
    currentHeight: number;
    maxHeight: number;
    shouldExecute: boolean;
  }
}

export const player = <T extends GameObjects.Shape>(player: Player<T>) => player;
