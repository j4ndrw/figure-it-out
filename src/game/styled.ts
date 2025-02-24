import { theme } from "@/design-system";
import styled from "@emotion/styled";

export const GameBox = styled.div`
  border: 2px solid ${theme.game.box.border.color};
  border-radius: 16px;

  width: calc(${theme.game.width({ withUnits: true })} + 12px);
  height: calc(${theme.game.height({ withUnits: true })} + 12px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
