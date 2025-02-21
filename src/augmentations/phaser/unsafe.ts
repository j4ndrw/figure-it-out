/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Phaser {
    namespace Physics {
      namespace Arcade {
        interface Body {
          asDynamic: () => Phaser.Physics.Arcade.Body;
          asCollidable: () => Phaser.Types.Physics.Arcade.ArcadeColliderType;
        }
        interface StaticBody {
          asDynamic: () => Phaser.Physics.Arcade.Body;
          asCollidable: () => Phaser.Types.Physics.Arcade.ArcadeColliderType;
        }
      }
    }
    namespace MatterJS {
      interface BodyType {
        asDynamic: () => Phaser.Physics.Arcade.Body;
        asCollidable: () => Phaser.Types.Physics.Arcade.ArcadeColliderType;
      }
    }
  }
}

Phaser.Physics.Arcade.Body.prototype.asDynamic = function() {
  return this;
};

Phaser.Physics.Arcade.Body.prototype.asCollidable = function() {
  return this;
};

Phaser.Physics.Arcade.StaticBody.prototype.asDynamic = function() {
  return this as unknown as Phaser.Physics.Arcade.Body;
};

Phaser.Physics.Arcade.StaticBody.prototype.asCollidable = function() {
  return this as unknown as Phaser.Types.Physics.Arcade.ArcadeColliderType;
};

export { };
