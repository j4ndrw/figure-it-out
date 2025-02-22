import { GameObjects } from "phaser";

export type Platform<T extends GameObjects.Shape> = {
  id: string;
  gameObject: T;
  deadly?: boolean;
  moving?: {
    x?: { from: number; to: number; speed: number; cycleMs: number };
    y?: { from: number; to: number; speed: number; cycleMs: number };
  };
};

export const platform = <T extends GameObjects.Shape>(platform: Platform<T>) =>
  platform;
