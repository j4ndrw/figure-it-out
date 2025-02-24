import { theme } from "@/design-system";
import { World } from "@/game/world";
import styled from "@emotion/styled";
import { transition } from "./utils";

export const YouDiedTextWrapper = styled.div`
  z-index: ${theme.youDiedScreen.backdrop.zIndex + 1};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const YouDiedText = styled.h1<{
  playerState: NonNullable<World["player"]>["state"];
}>`
  margin: 0;
  padding: 0;
  visibility: ${({ playerState }) =>
    playerState === "dead" ? "visible" : "hidden"};
  opacity: ${({ playerState }) => (playerState === "dead" ? "1" : "0")};
  font-size: 180px;
  box-shadow:
    none,
    0 0 0 1000px rgba(50, 50, 50, 0.5);
  text-shadow: 0 0 1.2em orangered;

  transition: ${transition("display", "opacity")};
  color: ${theme.youDiedScreen.text.color};

  animation: breathing 2.5s ease-out infinite forwards;

  user-select: none;
`;

export const YouDiedSubText = styled.h1<{
  playerState: NonNullable<World["player"]>["state"];
}>`
  margin: 0;
  padding: 0;
  visibility: ${({ playerState }) =>
    playerState === "dead" ? "visible" : "hidden"};
  opacity: ${({ playerState }) => (playerState === "dead" ? "0.75" : "0")};
  font-size: 30px;

  transition: ${transition("display", "opacity")};
  color: ${theme.colors.text};
  animation: breathing 5s ease-out infinite forwards;

  user-select: none;
`;
