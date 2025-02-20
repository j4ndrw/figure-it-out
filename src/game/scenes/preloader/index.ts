import { Scene } from "phaser";
import { playground } from "../playground";
import { createScene } from "@/tools/scene";

const SCENE_NAME = 'Preloader';

class Preloader extends Scene {
  constructor() {
    super(SCENE_NAME);
  }

  init() {
    // Things that should load before the main scenes load
  }

  create() {
    this.scene.start(playground.name);
  }
}

export const preloader = createScene({ scene: Preloader, name: SCENE_NAME });
