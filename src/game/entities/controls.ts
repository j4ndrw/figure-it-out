import { KEYS } from "@/game/constants";

type CreateControl = <T extends Phaser.Scene & { isFocused: boolean }>(
  scene: T,
  ...keys: (keyof typeof KEYS)[]
) => { handle: (handler: () => void, options ?: Partial<{off: () => void}>) => void };

export type Controls<T extends string> = {
  [K in T]: ReturnType<CreateControl>;
};

export const controls = <T extends string>(controls: Controls<T>) => controls;
export const createControl: CreateControl = (
  scene,
  ...keys
) => {
  const { input: { keyboard } } = scene;
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

  for (const key of keys) keyboard?.on(withKeyDownPrefix(key), defaultHandler);

  let isKeyDown = false;
  let intervalId: NodeJS.Timeout;

  return {
    handle: (handler, options) => {
      if (isHandlerSet) return;
      isHandlerSet = true;

      for (const key of keys) {
        keyboard?.off(withKeyDownPrefix(key), defaultHandler);
        keyboard?.on(withKeyDownPrefix(key), (event: KeyboardEvent) => {
          if (event.isUpperCaseAlphaCharKey()) return;
          if (!isKeyDown) {
            isKeyDown = true;
            intervalId = setInterval(() => {
              if (!scene.isFocused) return;
              handler();
            });
          }
        });
        keyboard?.on(withKeyUpPrefix(key), (event: KeyboardEvent) => {
          if (event.isUpperCaseAlphaCharKey()) return;
          options?.off?.();
          isKeyDown = false;
          clearInterval(intervalId);
        });
      }
    },
  };
};
