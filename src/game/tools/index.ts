import { assert, assertKeyInObject, assertNotNullish } from "@/tools/assert";
import { cast } from "@/tools/cast";

export const dynamic = <T extends Phaser.GameObjects.GameObject>(
  gameObject: T | null | undefined,
): Phaser.Physics.Arcade.Body => {
  assertNotNullish(gameObject, "Passed game object is nullish!");
  assertNotNullish(gameObject.body, "Passed game object has a nullish body!");
  assertKeyInObject(
    gameObject.body,
    "physicsType",
    "Passed game object body does not have physics related fields!",
  );
  assert(
    cast<Phaser.Physics.Arcade.Body>(gameObject.body).physicsType ===
    Phaser.Physics.Arcade.DYNAMIC_BODY,
    "Passed game object body is static and cannot be interpreted as dynamic!",
  );

  return cast<Phaser.Physics.Arcade.Body>(gameObject.body);
};

export const checkDynamic = <T extends Phaser.GameObjects.GameObject>(
  gameObject: T | null | undefined,
  onError?: (err: Error) => void,
) => {
  try {
    dynamic(gameObject);
    return true;
  } catch (err) {
    onError?.(err as Error);
    return false;
  }
};

// FIXME(j4ndrw): Maybe implement this in a way that doesn't suck?
export const withPhysics = <T extends Phaser.GameObjects.GameObject>(
  scene: Phaser.Scene,
  gameObject: T,
  options?: Partial<{ isStatic: boolean }>,
) => {
  const gameObjectWithPhysics = scene.physics.add.existing(
    gameObject,
    options?.isStatic,
  );
  Object.assign(gameObjectWithPhysics, {
    configureBody: (
      cb: (body: Phaser.Physics.Arcade.Body) => Phaser.Physics.Arcade.Body,
    ) => {
      if (!checkDynamic(gameObjectWithPhysics)) {
        console.warn(
          "[PHYSICS - WARNING] Cannot configure game object body as it does not contain dynamic physics",
        );
        return;
      }
      gameObjectWithPhysics.body = cb(
        dynamic(gameObjectWithPhysics),
      ) as unknown as T["body"];
      return gameObjectWithPhysics;
    },
  });
  return gameObjectWithPhysics as T & {
    configureBody: (
      cb: (body: Phaser.Physics.Arcade.Body) => Phaser.Physics.Arcade.Body,
    ) => T;
  };
};
