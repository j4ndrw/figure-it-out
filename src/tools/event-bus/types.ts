/* eslint-disable @typescript-eslint/no-empty-object-type */
// Constrain EventMap type to extend Record<string, (...args: any[]) => void>

import { World } from "@/game/world";

export type EventMap = {
  "current-scene-ready": Phaser.Scene;
  "sync-meta": Phaser.Scene;
  "update-world": World;
  "reset-world": {};
};
