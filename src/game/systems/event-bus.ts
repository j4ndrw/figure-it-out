import { eventBus } from "@/tools/event-bus";
import { World } from "../world";

export const sync = new (class {
  scene(scene: Phaser.Scene) {
    eventBus.publish({ event: "current-scene-ready", message: scene });
    return this;
  }
  meta(scene: Phaser.Scene) {
    eventBus.publish({ event: "sync-meta", message: scene });
    return this;
  }
  world(world: World) {
    eventBus.publish({ event: "update-world", message: world });
    return this;
  }
})();
