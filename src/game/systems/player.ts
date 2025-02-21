import { Playground } from "@/game/scenes/playground";
import { player } from "../entities/player";
import { theme } from "@/design-system";
import { config } from "../config";

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
    speed: 0.2,
    jump: {
      currentHeight: 0,
      maxHeight: 10,
      shouldExecute: false,
    }
  });

  scene.player.gameObject.body
    ?.asDynamic()
    .setBounce(0)
    .setCollideWorldBounds(true)
    .setGravityY(config.gravity);
};

export const applyGravityAfterJumpWearsOff = (
  scene: Playground,
  delta: number,
) => {
  if (scene.player.jump.currentHeight < scene.player.jump.maxHeight) return;

  scene.player.gameObject.y -= scene.player.speed * delta; // move the player up a bit more for smoothness
  scene.player.gameObject.body?.asDynamic().setGravity(config.gravity);

  const playerCollision = scene.player.gameObject.body?.asCollidable();
  if (playerCollision && scene.physics.world.collide(playerCollision)) {
    scene.player.jump.currentHeight = 0;
    scene.player.jump.shouldExecute = false;
  }
};

export const executeJump = (scene: Playground, delta: number) => {
  scene.player.gameObject.body?.asDynamic().setGravity(0);
  scene.player.gameObject.y -= scene.player.speed * delta;
  scene.player.jump.currentHeight += scene.player.speed * delta;
}

export const handleMovement = (scene: Playground, delta: number) => {
  const move = (sign: 1 | -1 = 1) =>
    (scene.player.gameObject.x += sign * scene.player.speed * delta);

  const jump = () => {
    if (scene.player.jump.currentHeight !== 0) return;
    scene.player.jump.shouldExecute = true;
  };

  scene.controls.left.handle(() => move(-1));
  scene.controls.right.handle(() => move(1));
  scene.controls.jump.handle(jump);
};
