import { Playground } from "@/game/scenes/playground";
import { player } from "../entities/player";
import { theme } from "@/design-system";
import { config } from "../config";
import { dynamic, withPhysics } from "../tools";

export const createPlayer = (scene: Playground) =>
  player({
    state: "alive",
    gameObject: withPhysics(
      scene,
      scene.add
        .rectangle(
          scene.physics.world.bounds.width / 2,
          scene.physics.world.bounds.height,
          20,
          20,
          theme.game.player.fill.color.fromHex(),
        )
        .setOrigin(0.5, 0.5),
    )
      .configureBody((body) =>
        body.setCollideWorldBounds(true).setGravityY(config.gravity),
      )
      .on("destroy", () => {
        scene.player.state = "dead";
        if (!scene.youDiedSound?.isPlaying) scene.youDiedSound?.play();
      }),
    speed: 20,
    jump: { power: 600, durationMs: 100 },
  });

export const applyGravity = ({ player: { gameObject } }: Playground) =>
  dynamic(gameObject).map((body) => body.setGravityY(config.gravity));

export const handleMovement = (
  { player: { gameObject, jump, speed }, controls }: Playground,
  delta: number,
) => {
  const move = (sign: 1 | -1 = 1) =>
    dynamic(gameObject).map((body) => {
      const dx = sign * speed * delta;
      return body.setVelocityX(dx);
    });

  const stopMoving = () =>
    dynamic(gameObject).map((body) => body.setVelocityX(0));

  const executeJump = () =>
    dynamic(gameObject).map((body) => {
      if (!body.onFloor()) return;
      return body.setVelocityY(-jump.power);
    });

  controls.left.handle(() => move(-1), { off: stopMoving });
  controls.right.handle(() => move(1), { off: stopMoving });
  controls.jump.handle(executeJump);
};

export const handlePlayerDeath = ({ player: { gameObject } }: Playground) =>
  gameObject.destroy(true);
