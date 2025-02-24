export function assertNotNullish<T>(
  arg: T,
  message: string,
): asserts arg is NonNullable<T> {
  if (arg === null || arg === undefined)
    throw new Error(`[ASSERTION ERROR] ${message}`);
}

export function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(`[ASSERTION ERROR] ${message}`);
}

export function assertKeyInObject<T extends object, TKey extends string>(
  obj: T,
  key: TKey,
  message: string,
): asserts obj is T & { [K in TKey]: unknown } {
  if (!(key in (obj as object)))
    throw new Error(`[ASSERTION ERROR] ${message}`);
}
