import { GameMeta } from "@/game/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type GameState = {
  meta: GameMeta;
  syncMeta: (meta: GameMeta) => void;
};

const withDevtools = <TState, T extends Parameters<typeof devtools<TState>>[0]>(
  arg: T,
) => {
  if (import.meta.env.PROD) return arg;
  return devtools(arg);
};

export const useGameStore = create<GameState>()(
  withDevtools((set) => ({
    meta: { game: null, scene: null },
    syncMeta: (meta) => set({ meta }),
  })),
);
