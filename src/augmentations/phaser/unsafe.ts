/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Phaser {
    namespace Physics {
      namespace Arcade {
        interface Body {
          /**
           * # WARNING
           * This is an augmentation built on top of the `Phaser.js` prototypes. Use with caution!
           */
          asDynamic: () => Phaser.Physics.Arcade.Body;
        }
        interface StaticBody {
          /**
           * # WARNING
           * This is an augmentation built on top of the `Phaser.js` prototypes. Use with caution!
           */
          asDynamic: () => Phaser.Physics.Arcade.Body;
        }
      }
    }
    namespace MatterJS {
      interface BodyType {
        /**
         * # WARNING
         * This is an augmentation built on top of the `Phaser.js` prototypes. Use with caution!
         */
        asDynamic: () => Phaser.Physics.Arcade.Body;
      }
    }
  }
}

Phaser.Physics.Arcade.Body.prototype.asDynamic = function() {
  return this;
};

Phaser.Physics.Arcade.StaticBody.prototype.asDynamic = function() {
  return this as unknown as Phaser.Physics.Arcade.Body;
};

export { };
