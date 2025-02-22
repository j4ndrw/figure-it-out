import { Backdrop } from "@/design-system/backdrop";
import { YouDiedSubText, YouDiedText, YouDiedTextWrapper } from "./styled";
import { useGameStore } from "@/store";
import { transition } from "./utils";
import { useEffect } from "react";
import { Playground } from "@/game/scenes/playground";

export const YouDiedScreen = () => {
  const { world, meta } = useGameStore();

  const playerState = world.player?.state;
  const isPlayingYouDiedSound = (meta.scene as Playground)?.youDiedSound
    ?.isPlaying;

  useEffect(() => {
    if (playerState === "alive") return;
    if (!isPlayingYouDiedSound)
      (meta.scene as Playground)?.youDiedSound?.play();
  }, [playerState, isPlayingYouDiedSound]);

  return (
    <div>
      <YouDiedTextWrapper>
        <YouDiedText playerState={world.player?.state ?? "alive"}>
          YOU DIED
        </YouDiedText>
        <YouDiedSubText playerState={world.player?.state ?? "alive"}>
          Press Ctrl+R to play again!
        </YouDiedSubText>
      </YouDiedTextWrapper>
      <Backdrop
        visible={world.player?.state === "dead"}
        transition={transition("opacity", "visibility")}
      />
    </div>
  );
};
