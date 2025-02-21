import { useRef } from "react";
import { GameMeta } from "./game/types";
import { Game } from "./game";
import { GridWrapper, PromptInputWrapper } from "./styled";
import { PrimaryButton } from "./design-system/button";

import { PenIcon } from "lucide-react";
import { ChatTextArea } from "./design-system/textarea";

function App() {
  const metaRef = useRef<GameMeta | null>(null);

  return (
    <GridWrapper>
      <Game ref={metaRef} />
      <PromptInputWrapper>
        <ChatTextArea
          placeholder={`Ask the trickster for help (e.g. "Can you spawn a jetpack so I can fly to the finish?")`}
        />
        <PrimaryButton>
          <PenIcon />
          Send
        </PrimaryButton>
      </PromptInputWrapper>
    </GridWrapper>
  );
}

export default App;
