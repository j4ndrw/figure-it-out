import { Playground } from "@/game/scenes/playground";
import { player } from "../entities/player";
import { theme } from "@/design-system";
import { config } from "../config";

export const createPlayer = (scene: Playground) => {
  scene.player = player({
    gameObject: scene.physics?.add.existing(
      scene.add
        .rectangle(
          scene.physics.world.bounds.width / 2,
          scene.physics.world.bounds.height,
          20,
          20,
          theme.game.player.fill.color.fromHex(),
        )
        .setOrigin(0.5, 0.5),
    ),
    speed: 20,
    jump: {
      power: 600,
      durationMs: 100,
    },
  });

  scene.player.gameObject.body
    ?.asDynamic()
    .setCollideWorldBounds(true)
    .setGravityY(config.gravity);
};

export const applyGravity = (scene: Playground) =>
  scene.player.gameObject.body?.asDynamic().setGravityY(config.gravity);

export const handleMovement = (scene: Playground, delta: number) => {
  const move = (sign: 1 | -1 = 1) => {
    const dx = sign * scene.player.speed * delta;
    scene.player.gameObject.body?.asDynamic().setVelocityX(dx);
  };

  const stopMoving = () =>
    scene.player.gameObject.body?.asDynamic().setVelocityX(0);

  const jump = () => {
    if (scene.player.gameObject.body?.asDynamic().onFloor())
      scene.player.gameObject.body
        ?.asDynamic()
        .setVelocityY(-scene.player.jump.power);
  };

  scene.controls.left.handle(() => move(-1), stopMoving);
  scene.controls.right.handle(() => move(1), stopMoving);
  scene.controls.jump.handle(jump);
};
