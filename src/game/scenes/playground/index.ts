import { controls, Controls, createControl } from "@/game/entities/controls";
import { Player } from "@/game/entities/player";
import {
  applyGravity,
  createPlayer,
  handleMovement,
} from "@/game/systems/player";
import { eventBus } from "@/tools/event-bus";
import { createScene } from "@/tools/scene";
import { Scene, GameObjects } from "phaser";

const SCENE_NAME = "Playground";

export class Playground extends Scene {
  player: Player<GameObjects.Rectangle>;
  controls: Controls<"left" | "right" | "jump">;

  constructor() {
    super(SCENE_NAME);
  }

  create() {
    createPlayer(this);

    this.controls = controls({
      left: createControl(this, "A", "ArrowLeft"),
      right: createControl(this, "D", "ArrowRight"),
      jump: createControl(this, " ", "W"),
    });

    eventBus.publish({ event: "current-scene-ready", message: this });
  }

  update(_time: number, delta: number): void {
    applyGravity(this);
    handleMovement(this, delta);

    eventBus.publish({ event: "sync-meta", message: this });
    eventBus.publish({
      event: "update-world",
      message: { player: this.player },
    });
  }
}

export const playground = createScene({ scene: Playground, name: SCENE_NAME });
