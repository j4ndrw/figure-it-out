import { GameObjects } from "phaser";

export type Platform<T extends GameObjects.Shape> = {
  id: string;
  gameObject: T;
  deadly?: boolean;
};

export const platform = <T extends GameObjects.Shape>(platform: Platform<T>) =>
  platform;
