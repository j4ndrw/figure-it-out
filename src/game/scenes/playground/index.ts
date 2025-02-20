import { theme } from "@/design-system";
import { eventBus } from "@/tools/event-bus";
import { createScene } from "@/tools/scene";
import { Scene } from "phaser";

const SCENE_NAME = "Playground";

class Playground extends Scene {
  constructor() {
    super(SCENE_NAME);
  }

  create() {
    this.add.text(0, 0, "Hello World!", {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontSize: theme.fonts.size.body.fromPixel() * 8,
    });
    eventBus.publish({ event: "current-scene-ready", message: this });
  }
}

export const playground = createScene({ scene: Playground, name: SCENE_NAME });
