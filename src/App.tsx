import { useRef } from "react";
import { GameMeta } from "./game/types";
import { Game } from "./game";
import { useGame } from "./hooks/use-game";

function App() {
  const metaRef = useRef<GameMeta | null>(null);

  useGame();

  return <Game ref={metaRef} />;
}

export default App;
