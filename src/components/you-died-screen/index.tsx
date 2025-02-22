import { Backdrop } from "@/design-system/backdrop";
import { YouDiedSubText, YouDiedText, YouDiedTextWrapper } from "./styled";
import { useGameStore } from "@/store";
import { transition } from "./utils";

export const YouDiedScreen = () => {
  const { world } = useGameStore();
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
