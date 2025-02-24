/* eslint-disable @typescript-eslint/no-explicit-any */
interface Throttle {
  <T extends (...args: any[]) => void>(
    fn: T,
    timeoutMs?: number,
    options?: { allowSpamming?: boolean },
  ): T & { unthrottled: T };
}
export const throttle = ((fn, timeoutMs = 300, options) => {
  let wait = false;
  let timer: NodeJS.Timeout | undefined;
  const wrapped = ((...args) => {
    if (!wait) {
      fn(...args);
      wait = true;
    }
    if (!options?.allowSpamming) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        wait = false;
      }, timeoutMs);
    } else {
      if (timer) return;
      timer = setTimeout(() => {
        wait = false;
        clearTimeout(timer);
        timer = undefined;
      }, timeoutMs);
    }
  }) as ReturnType<Throttle>;
  wrapped.unthrottled = (...args) => {
    fn(...args);
    wait = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      wait = false;
    }, timeoutMs);
  };
  return wrapped;
}) as Throttle;
