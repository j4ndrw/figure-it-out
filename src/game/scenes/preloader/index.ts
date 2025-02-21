import { Scene } from "phaser";
import { playground } from "../playground";
import { createScene } from "@/tools/scene";
import { eventBus } from "@/tools/event-bus";
import { world } from "@/game/world";

const SCENE_NAME = 'Preloader';

class Preloader extends Scene {
  constructor() {
    super(SCENE_NAME);
  }

  init() {
    eventBus.publish({
      event: 'update-world',
      message: world(),
    })
  }

  create() {
    this.scene.start(playground.name);
  }
}

export const preloader = createScene({ scene: Preloader, name: SCENE_NAME });
