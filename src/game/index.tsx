import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import { GameMeta } from "./types";
import { createGame } from "./bootstrap";
import { eventBus } from "@/tools/event-bus";
import { useGameStore } from "@/store";
import { GAME_CONTAINER_ID } from "./constants";
import { GameBox } from "./styled";

type Props = {
  onSceneUpdated?: (scene_instance: Phaser.Scene) => void;
};

export const Game = forwardRef<GameMeta, Props>(
  ({ onSceneUpdated: runScene }, ref) => {
    const { updateWorld, syncMeta } = useGameStore();

    const game = useRef<Phaser.Game | null>(null);

    const saveMeta = (meta: GameMeta) => {
      if (typeof ref === "function") ref(meta);
      else if (ref) ref.current = meta;
      syncMeta(meta);
    };

    useLayoutEffect(() => {
      if (!game.current) saveMeta({ game: createGame(), scene: null });
      return () => {
        if (!game.current) return;

        game.current.destroy(true);
        if (game.current !== null) game.current = null;
      };
    }, []);

    useEffect(
      () =>
        eventBus.subscribe({
          event: "current-scene-ready",
          listener: (scene) => {
            runScene?.(scene);
            eventBus.publish({ event: "sync-meta", message: scene });
            saveMeta({ game: game.current, scene });
          },
        }),
      [runScene],
    );

    useEffect(
      () =>
        eventBus.subscribe({
          event: "sync-meta",
          listener: (scene) => {
            saveMeta({ game: game.current, scene });
          },
        }),
      [],
    );

    useEffect(
      () =>
        eventBus.subscribe({
          event: "update-world",
          listener: updateWorld,
        }),
      [],
    );

    return <GameBox id={GAME_CONTAINER_ID} />;
  },
);
