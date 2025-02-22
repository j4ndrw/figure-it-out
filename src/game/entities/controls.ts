import { KEYS } from "@/game/constants";

type CreateControl = <T extends Phaser.Scene>(
  scene: T,
  ...keys: (keyof typeof KEYS)[]
) => { handle: (handler: () => void, off?: () => void) => void };

export type Controls<T extends string> = {
  [K in T]: ReturnType<CreateControl>;
};

export const controls = <T extends string>(controls: Controls<T>) => controls;
export const createControl: CreateControl = (scene, ...keys) => {
  const map = (k: string) => {
    switch (k) {
      case KEYS[" "]:
        return "SPACE";
      default:
        return k;
    }
  };
  const withKeyDownPrefix = (k: string) => `keydown-${map(k)}`;
  const withKeyUpPrefix = (k: string) => `keyup-${map(k)}`;

  let isHandlerSet = false;
  const defaultHandler = () => { };

  for (const key of keys)
    scene.input.keyboard?.on(withKeyDownPrefix(key), defaultHandler);

  let isKeyDown = false;
  let intervalId: NodeJS.Timeout;

  return {
    handle: (handler, off) => {
      if (isHandlerSet) return;
      isHandlerSet = true;

      for (const key of keys) {
        scene.input.keyboard?.off(withKeyDownPrefix(key), defaultHandler);
        scene.input.keyboard?.on(
          withKeyDownPrefix(key),
          (event: KeyboardEvent) => {
            if (event.isUpperCaseAlphaCharKey()) return;
            if (!isKeyDown) {
              isKeyDown = true;
              intervalId = setInterval(() => handler(), 0);
            }
          },
        );
        scene.input.keyboard?.on(
          withKeyUpPrefix(key),
          (event: KeyboardEvent) => {
            if (event.isUpperCaseAlphaCharKey()) return;
            off?.()
            isKeyDown = false;
            clearInterval(intervalId);
          },
        );
      }
    },
  };
};
