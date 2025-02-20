/* eslint-disable @typescript-eslint/no-explicit-any */
import { theme } from "..";

export const withAttrs =
  <TComponent extends (...args: any[]) => React.ReactNode>(
    Component: TComponent,
    attrsFactory: (options?: {
      theme: typeof theme;
      props: React.ComponentProps<TComponent>;
    }) => React.ComponentProps<TComponent>,
  ) =>
    (props: React.ComponentProps<TComponent>) => (
      <Component {...props} {...attrsFactory({ theme, props })} />
    );
