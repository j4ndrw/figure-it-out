import { cast } from "@/tools/cast";
import { ok, err, Result } from "@/tools/result";

type DynamicGameObjectError =
  | { type: "NULLISH_GAME_OBJECT"; message: "Passed game object is nullish!" }
  | {
    type: "NULLISH_GAME_OBJECT_BODY";
    message: "Passed game object has a nullish body!";
  }
  | {
    type: "GAME_OBJECT_DOES_NOT_HAVE_PHYSICS_ATTACHED";
    message: "Passed game object body does not have physics related fields!";
  }
  | {
    type: "GAME_OBJECT_IS_STATIC";
    message: "Passed game object body is static and cannot be interpreted as dynamic!";
  };

export const dynamic = <T extends Phaser.GameObjects.GameObject>(
  gameObject: T | null | undefined,
): Result<Phaser.Physics.Arcade.Body, DynamicGameObjectError> => {
  if (!gameObject)
    return err({
      type: "NULLISH_GAME_OBJECT",
      message: "Passed game object is nullish!",
    } as DynamicGameObjectError);
  if (!gameObject.body)
    return err({
      type: "NULLISH_GAME_OBJECT_BODY",
      message: "Passed game object has a nullish body!",
    } as DynamicGameObjectError);
  if (!("physicsType" in gameObject.body))
    return err({
      type: "GAME_OBJECT_DOES_NOT_HAVE_PHYSICS_ATTACHED",
      message: "Passed game object body does not have physics related fields!",
    } as DynamicGameObjectError);
  if (
    cast<Phaser.Physics.Arcade.Body>(gameObject.body).physicsType !==
    Phaser.Physics.Arcade.DYNAMIC_BODY
  )
    return err({
      type: "GAME_OBJECT_IS_STATIC",
      message:
        "Passed game object body is static and cannot be interpreted as dynamic!",
    } as DynamicGameObjectError);

  return ok(cast<Phaser.Physics.Arcade.Body>(gameObject.body));
};

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
    ) =>
      dynamic(gameObjectWithPhysics).match({
        ok: (body) => {
          gameObjectWithPhysics.body = cb(body) as unknown as T["body"];
          return gameObjectWithPhysics;
        },
        err: (err) => {
          console.warn(
            "[PHYSICS - WARNING] Cannot configure game object body as it does not contain dynamic physics. Reason: ",
            err.message,
          );
        },
      }),
  });
  return gameObjectWithPhysics as T & {
    configureBody: (
      cb: (body: Phaser.Physics.Arcade.Body) => Phaser.Physics.Arcade.Body,
    ) => T;
  };
};
