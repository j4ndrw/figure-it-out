/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  timeoutMs = 300,
) => {
  let timer: NodeJS.Timeout;
  return ((...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(args);
    }, timeoutMs);
  }) as T;
};
