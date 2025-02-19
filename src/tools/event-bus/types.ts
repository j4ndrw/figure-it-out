// Constrain EventMap type to extend Record<string, (...args: any[]) => void>

export type EventMap = {
  "current-scene-ready": Phaser.Scene;
};
