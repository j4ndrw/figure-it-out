import { GameObjects } from "phaser";

export type Player<T extends GameObjects.GameObject> = {
  gameObject: T,
  speed: number;
  jump: {
    power: number;
    durationMs: number;
    interval?: NodeJS.Timeout | undefined;
  };
  state: 'dead' | 'alive';
}

export const player = <T extends GameObjects.Shape>(player: Player<T>) => player;
