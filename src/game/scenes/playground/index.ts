import { YOU_DIED_AUDIO_KEY } from "@/game/constants";
import { Controls } from "@/game/entities/controls";
import { Platform } from "@/game/entities/platform";
import { Player } from "@/game/entities/player";
import { createControls } from "@/game/systems/controls";
import { sync } from "@/game/systems/event-bus";
import { createPlatforms } from "@/game/systems/platform";
import {
  applyGravity,
  createPlayer,
  handleMovement,
} from "@/game/systems/player";
import { createScene } from "@/tools/scene";
import { Scene, GameObjects } from "phaser";

const SCENE_NAME = "Playground";

export class Playground extends Scene {
  player: Player<GameObjects.Rectangle>;
  platforms: Platform<GameObjects.Rectangle>[] = [];
  controls: Controls<"left" | "right" | "jump">;

  youDiedSound:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound
    | null;

  constructor() {
    super(SCENE_NAME);
  }

  create() {
    this.youDiedSound = this.sound.add(YOU_DIED_AUDIO_KEY);
    this.youDiedSound.on("complete", () => {
      this.youDiedSound?.destroy();
      this.youDiedSound = null;
    });

    this.player = createPlayer(this);
    this.controls = createControls(this);
    this.platforms = createPlatforms(this);
    sync.scene(this);
  }

  update(_time: number, delta: number): void {
    applyGravity(this);
    handleMovement(this, delta);

    sync.meta(this).world({ player: this.player });
  }
}

export const playground = createScene({ scene: Playground, name: SCENE_NAME });
