import { assertNotNullish } from "@/tools/assert";

export const createColliders = (
  scene: Phaser.Scene,
  body: Phaser.Types.Physics.Arcade.ArcadeColliderType,
  other: Phaser.Types.Physics.Arcade.ArcadeColliderType[],
  collideCallback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
) => other.map((o) => scene.physics.add.collider(body, o, collideCallback));

export const isColliding = <
  TBase extends {
    getBounds: <TGeometry>(output?: TGeometry) => TGeometry;
  },
  TIntersectionFn extends <TGameObject>(
    a: TGameObject,
    b: TGameObject,
  ) => TGameObject extends TBase ? boolean : never,
>(
  a: Parameters<TIntersectionFn>[0] | undefined,
  b: Parameters<TIntersectionFn>[0] | undefined,
  // @ts-expect-error I think it's ok if the type invariants don't match exactly.
  intersectionFn: TIntersectionFn = Phaser.Geom.Intersects.RectangleToRectangle,
): boolean => {
  assertNotNullish(
    a,
    "Could not determine collision - (first object passed as parameter)",
  );
  assertNotNullish(
    b,
    "Could not determine collision - (second object passed as parameter)",
  );
  return intersectionFn((a as TBase).getBounds(), (b as TBase).getBounds());
};
