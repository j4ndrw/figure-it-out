import { Scene } from "phaser";
import { preloader } from "../preloader";
import { createScene } from "@/tools/scene";

const SCENE_NAME = "Boot";

class Boot extends Scene {
  constructor() {
    super(SCENE_NAME);
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
  }

  create() {
    this.scene.start(preloader.name);
  }
}

export const boot = createScene({ scene: Boot, name: SCENE_NAME });
