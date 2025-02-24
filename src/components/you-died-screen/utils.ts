import { theme } from "@/design-system";

export const transition = (...targets: string[]) =>
  targets
    .map(
      (t) =>
        `${t} ${theme.youDiedScreen.transition.duration} ${theme.youDiedScreen.transition.curve}`,
    )
    .join(", ");
