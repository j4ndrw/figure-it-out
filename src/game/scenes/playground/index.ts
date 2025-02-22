import { Controls } from "@/game/entities/controls";
import { Platform } from "@/game/entities/platform";
import { Player } from "@/game/entities/player";
import { createControls } from "@/game/systems/controls";
import { sync } from "@/game/systems/event-bus";
import { createPlatforms } from "@/game/systems/platform";
import {
  applyGravity,
  createPlayer,
  handleMovement,
} from "@/game/systems/player";
import { createScene } from "@/tools/scene";
import { Scene, GameObjects } from "phaser";

const SCENE_NAME = "Playground";

export class Playground extends Scene {
  player: Player<GameObjects.Rectangle>;
  platforms: Platform<GameObjects.Rectangle>[] = [];
  controls: Controls<"left" | "right" | "jump">;

  constructor() {
    super(SCENE_NAME);
  }

  create() {
    createPlayer(this);
    createControls(this);
    createPlatforms(this);
    sync.scene(this);
  }

  update(_time: number, delta: number): void {
    applyGravity(this);
    handleMovement(this, delta);

    sync.meta(this).world({ player: this.player });
  }
}

export const playground = createScene({ scene: Playground, name: SCENE_NAME });
