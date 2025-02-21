export const checkCollisionWithWorld = (
  scene: Phaser.Scene,
  body: Phaser.Physics.Arcade.Body | undefined,
  options?: { skipTopCollision?: boolean },
) => {
  if (!body) return false;

  const bounds = scene.physics.world.bounds;

  const left = body.x - 1 < bounds.x;
  const right = body.x + body.width + 1 > bounds.x + bounds.width;
  const top = body.y - 1 < bounds.y;
  const bottom = body.y + body.height + 1 > bounds.y + bounds.height;

  if (options?.skipTopCollision) return bottom || left || right;
  return top || bottom || left || right;
};
