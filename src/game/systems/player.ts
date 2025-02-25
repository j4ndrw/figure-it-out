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
  dynamic(gameObject).match(
    (body) => body.setGravityY(config.gravity),
    (err) => {
      console.warn("Cannot apply gravity to player. Reason:", err.message);
    },
  );

export const handleMovement = (
  { player: { gameObject, jump, speed }, controls }: Playground,
  delta: number,
) => {
  const move = (sign: 1 | -1 = 1) =>
    dynamic(gameObject).match(
      (body) => {
        const dx = sign * speed * delta;
        return body.setVelocityX(dx);
      },
      (err) => {
        console.warn("Cannot move player. Reason:", err.message);
      },
    );

  const stopMoving = () =>
    dynamic(gameObject).match(
      (body) => body.setVelocityX(0),
      (err) => {
        console.warn("Cannot stop moving player. Reason:", err.message);
      },
    );

  const executeJump = () =>
    dynamic(gameObject).match(
      (body) => {
        if (!body.onFloor()) return;
        return body.setVelocityY(-jump.power);
      },
      (err) => {
        console.warn("Cannot make player jump. Reason:", err.message);
      },
    );

  controls.left.handle(() => move(-1), { off: stopMoving });
  controls.right.handle(() => move(1), { off: stopMoving });
  controls.jump.handle(executeJump);
};

export const handlePlayerDeath = ({ player: { gameObject } }: Playground) =>
  gameObject.destroy(true);
