import { GameMeta } from "@/game/types";
import { create } from "zustand";

type GameState = {
  meta: GameMeta;
  syncMeta: (meta: GameMeta) => void;
};

export const useGameStore = create<GameState>((set) => ({
  meta: { game: null, scene: null },
  syncMeta: (meta) => set({ meta }),
}));
