import { GameMeta } from "@/game/types";
import { Scene } from "phaser";

export const createScene = <TClass, TName extends string>(options: {
  scene: TClass;
  name: TName;
}) => {
  Object.assign(options, {
    retrieveFrom: <TScene extends Scene>(meta: GameMeta) =>
      meta.scene as TScene | null,
  });
  return options as typeof options & {
    retrieveFrom: <TScene extends Scene>(meta: GameMeta) => TScene;
  };
};
