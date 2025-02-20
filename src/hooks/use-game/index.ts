import { useGameStore } from "@/store";
import { useEffect } from "react";

export const useGame = () => {
  const { meta } = useGameStore();

  useEffect(() => {
  }, [meta]);
};
