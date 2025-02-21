import { GameObjects } from "phaser";

export type Player<T extends GameObjects.Shape> = {
  gameObject: T,
  speed: number;
  jump: {
    power: number;
    durationMs: number;
    interval?: NodeJS.Timeout | undefined;
  }
}

export const player = <T extends GameObjects.Shape>(player: Player<T>) => player;
