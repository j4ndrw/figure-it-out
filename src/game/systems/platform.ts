import { v4 as uuidv4 } from "uuid";
import { theme } from "@/design-system";
import { randomInt } from "../math/random";
import { Playground } from "../scenes/playground";
import { config } from "../config";

export const createPlatforms = (scene: Playground) => {
  const platformsToGenerate = randomInt(1, config.maxPlatforms); // Generate between 1 and 10 platforms

  for (let i = 0; i < platformsToGenerate; ++i) {
    const isStatic = randomInt(0, 100) < 75;
    let gameObject: Phaser.GameObjects.Rectangle | undefined = undefined;
    let attempts = 0;
    const maxAttempts = 10000; // Limit attempts to find a valid position

    while (!gameObject) {
      if (attempts >= maxAttempts) break;

      const width =
        randomInt(0, 100) > 75 ? randomInt(10, 200) : randomInt(10, 25);
      const height =
        randomInt(0, 100) > 75 ? randomInt(10, 200) : randomInt(10, 25);

      // Adjust x and y to ensure the platform fits within the bounds
      const x = randomInt(
        width / 2,
        scene.physics.world.bounds.width - width / 2,
      );
      const y = randomInt(
        height / 2,
        scene.physics.world.bounds.height - height / 2,
      );

      gameObject = scene.physics?.add
        .existing(
          scene.add.rectangle(
            x,
            y,
            width,
            height,
            theme.game.platform.fill.color.fromHex(),
          ),
          isStatic,
        )
        .setOrigin(0.5, 0.5)
        .setStrokeStyle(1, "#FFFFFF".fromHex(), 1);
      const colliders = scene.platforms
        .map((platform) =>
          scene.physics.add.collider(gameObject!, platform.gameObject),
        )
        .concat(
          scene.physics.add.collider(gameObject, scene.player.gameObject),
        );

      // Check for collisions with existing platforms
      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          gameObject.getBounds(),
          scene.player.gameObject.getBounds(),
        ) ||
        scene.platforms.some((platform) =>
          Phaser.Geom.Intersects.RectangleToRectangle(
            platform.gameObject.getBounds(),
            gameObject!.getBounds(),
          ),
        )
      ) {
        colliders.forEach((c) => c.destroy());
        gameObject.destroy(true);
        gameObject = undefined;
      }
      attempts++;
    }

    // Only add the platform if a valid position was found
    if (gameObject) {
      scene.platforms.push({
        id: uuidv4(),
        gameObject,
        deadly: randomInt(0, 100) > 75,
      });
    }
  }
};
