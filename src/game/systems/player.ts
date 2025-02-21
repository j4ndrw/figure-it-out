import { Playground } from "@/game/scenes/playground";
import { player } from "../entities/player";
import { theme } from "@/design-system";
import { config } from "../config";
import { checkCollisionWithWorld } from "./physics";

export const createPlayer = (scene: Playground) => {
  scene.player = player({
    gameObject: scene.physics?.add.existing(
      scene.add.rectangle(
        50,
        50,
        20,
        20,
        theme.game.player.fill.color.fromHex(),
      ),
    ),
    speed: 0.15,
    jump: { power: 1.5, durationMs: 100,
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
  const move = (sign: 1 | -1 = 1) =>
    (scene.player.gameObject.x += sign * scene.player.speed * delta);

  const jump = () => {
    if (
      !checkCollisionWithWorld(scene, scene.player.gameObject.body?.asDynamic(), { skipTopCollision: true })
    )
      return;

    if (scene.player.jump.interval) return;

    scene.player.jump.interval = setInterval(() => {
      scene.player.gameObject.y -=
        scene.player.speed * scene.player.jump.power * delta;
    }, 0);

    setTimeout(() => {
      clearInterval(scene.player.jump.interval);
      scene.player.jump.interval = undefined;
    }, scene.player.jump.durationMs);
  };

  scene.controls.left.handle(() => move(-1));
  scene.controls.right.handle(() => move(1));
  scene.controls.jump.handle(jump);
};
