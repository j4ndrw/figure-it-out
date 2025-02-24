import { v4 as uuidv4 } from "uuid";
import { theme } from "@/design-system";
import { chance, randomInt } from "../math/random";
import { Playground } from "../scenes/playground";
import { config } from "../config";
import { handlePlayerDeath } from "./player";
import { createColliders, isColliding } from "./physics";
import { withPhysics } from "../tools";
import { Platform } from "../entities/platform";

const createPlatform = <T extends Phaser.GameObjects.Shape>(
  scene: Playground,
  platforms: Platform<T>[],
  options: { shouldBeDeadly: boolean },
) => {
  const {
    physics: {
      world: { bounds },
    },
  } = scene;
  const width = chance(0.25) ? randomInt(10, 200) : randomInt(10, 25);
  const height = chance(0.25) ? randomInt(10, 200) : randomInt(10, 25);
  const x = randomInt(width / 2, bounds.width - width / 2);
  const y = randomInt(height / 2, bounds.height - height / 2);

  const gameObject = withPhysics(
    scene,
    scene.add.rectangle(
      x,
      y,
      width,
      height,
      options.shouldBeDeadly
        ? theme.game.platform.deadly.fill.color.fromHex()
        : theme.game.platform.fill.color.fromHex(),
    ),
    { isStatic: true },
  )
    .setOrigin(0.5, 0.5)
    .setStrokeStyle(options.shouldBeDeadly ? 0 : 1, "#FFFFFF".fromHex(), 1);

  const isCollidingWithPlayer = () =>
    isColliding(gameObject, scene.player.gameObject);

  const colliders = createColliders(
    scene,
    gameObject,
    platforms.map((p) => p.gameObject),
  ).concat(
    createColliders(scene, gameObject, [scene.player.gameObject], () => {
      if (!isCollidingWithPlayer()) return;
      if (!options.shouldBeDeadly) return;
      handlePlayerDeath(scene);
    }),
  );

  if (
    !isCollidingWithPlayer() &&
    !platforms.some((platform) => isColliding(platform.gameObject, gameObject))
  ) {
    return gameObject;
  }

  colliders.forEach((c) => c.destroy());
  gameObject.destroy(true);
  return undefined;
};

export const createPlatforms = (scene: Playground) => {
  const platformsToGenerate = randomInt(1, config.maxPlatforms);
  const platforms: Platform<Phaser.GameObjects.Rectangle>[] = [];

  for (let i = 0; i < platformsToGenerate; ++i) {
    const isDeadly = chance(0.25);

    let gameObject: Phaser.GameObjects.Rectangle | undefined = undefined;
    while (!gameObject) {
      gameObject = createPlatform(scene, platforms, {
        shouldBeDeadly: isDeadly,
      });
    }

    if (gameObject)
      platforms.push({ id: uuidv4(), gameObject, deadly: isDeadly });
  }
  return platforms;
};
