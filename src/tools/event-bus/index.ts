import { EventMap } from "./types";

export class EventBus extends EventTarget {
  constructor() {
    super();
  }

  on(type: string, listener: (e: unknown) => void) {
    this.addEventListener(type, listener);
    return () => {
      this.removeEventListener(type, listener);
    };
  }

  emit(type: string, message: unknown) {
    const event = new CustomEvent(type as string, { detail: message });
    return this.dispatchEvent(event);
  }
}

export const eventBus = (() => {
  const bus = new EventBus();

  const subscribe = <T extends keyof EventMap>(options: {
    event: T;
    listener: (message: EventMap[T]) => void;
  }) =>
    bus.on(options.event, (e: unknown) => {
      options.listener((e as CustomEvent<unknown>).detail as EventMap[T]);
    });

  const publish = <T extends keyof EventMap>(options: {
    event: T;
    message: EventMap[T];
  }) => bus.emit(options.event, options.message);

  return { publish, subscribe };
})();
