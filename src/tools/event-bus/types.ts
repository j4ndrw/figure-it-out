/* eslint-disable @typescript-eslint/no-empty-object-type */
// TECH-DEBT(j4ndrw): Constrain EventMap type to extend Record<string, (...args: any[]) => void>

import { World } from "@/game/world";

export type EventMap = {
  "current-scene-ready": Phaser.Scene;
  "sync-meta": Phaser.Scene;
  "update-world": World;
  "reset-world": {};
};
