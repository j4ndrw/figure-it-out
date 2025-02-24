import { controls, createControl } from "../entities/controls";
import { Playground } from "../scenes/playground";

export const createControls = (scene: Playground) =>
  controls({
    left: createControl(scene, "A"),
    right: createControl(scene, "D"),
    jump: createControl(scene, " ", "W"),
  });
