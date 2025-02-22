import { Scene } from "phaser";
import { playground } from "../playground";
import { createScene } from "@/tools/scene";
import { eventBus } from "@/tools/event-bus";
import { world } from "@/game/world";
import { sync } from "@/game/systems/event-bus";

const SCENE_NAME = 'Preloader';

class Preloader extends Scene {
  constructor() {
    super(SCENE_NAME);
  }

  init() {
    sync.world(world());
  }

  create() {
    this.scene.start(playground.name);
  }
}

export const preloader = createScene({ scene: Preloader, name: SCENE_NAME });
