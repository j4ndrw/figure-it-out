import { useRef } from "react";
import { GameMeta } from "./game/types";
import { Game } from "./game";
import { GridWrapper, PromptInputWrapper } from "./styled";
import { PrimaryButton } from "./design-system/button";

import { PenIcon } from "lucide-react";
import { ChatTextArea } from "./design-system/textarea";
import { YouDiedScreen } from "./components/you-died-screen";
import { playground } from "./game/scenes/playground";

function App() {
  const metaRef = useRef<GameMeta | null>(null);

  const handleTextAreaFocus = () => {
    if (!metaRef.current) return;
    playground.retrieveFrom(metaRef.current).setIsFocused(false);
  }

  const handleTextAreaBlur = () => {
    if (!metaRef.current) return;
    playground.retrieveFrom(metaRef.current).setIsFocused(true);
  }

  return (
    <GridWrapper>
      <Game ref={metaRef} />
      <PromptInputWrapper>
        <ChatTextArea
          placeholder={`Ask the trickster for help (e.g. "Can you spawn a jetpack so I can fly to the finish?")`}
          onFocus={handleTextAreaFocus}
          onBlur={handleTextAreaBlur}
        />
        <PrimaryButton>
          <PenIcon />
          Send
        </PrimaryButton>
      </PromptInputWrapper>
      <YouDiedScreen />
    </GridWrapper>
  );
}

export default App;
