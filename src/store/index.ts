import { GameMeta } from "@/game/types";
import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";
import { World } from "@/game/world";

type GameState = {
  meta: GameMeta;
  syncMeta: (meta: GameMeta) => void;
  world: World;
  updateWorld: (w: World) => void;
};

export const gameStore = createStore<GameState>((set, get) => ({
  world: {},
  updateWorld: (w) => {
    const { world } = get();

    for (const key in w) {
      world[key as keyof World] = w[key as keyof World];
    }

    set({ world });
  },
  meta: { game: null, scene: null },
  syncMeta: (meta) => set({ meta }),
}));

export const useGameStore = () => useStore(gameStore);
