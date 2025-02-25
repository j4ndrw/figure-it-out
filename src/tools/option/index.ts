export type Option<T> = {
  unwrap: () => T;
  unwrapOr: <Or>(or: Or) => Or;
  map: <Mapped>(cb: (t: NonNullable<T>) => Mapped) => Option<Mapped>;
  isSome: boolean;
  isNone: boolean;
  match: <MappedSome, MappedNone>(branches: {
    some: (t: NonNullable<T>) => MappedSome;
    none: () => MappedNone;
  }) => MappedSome | MappedNone;
};

export const some = <T>(t: T): Option<T> => ({
  unwrap: () => t,
  unwrapOr: <Or>() => t as unknown as Or,
  map: (cb) => option(cb(t as NonNullable<T>)),
  match: (branches) => option(t).isNone ? none().match(branches) : branches.some(t as NonNullable<T>),
  isSome: true,
  isNone: false,
});

export const none = (): Option<null> => ({
  unwrap: () => null,
  unwrapOr: <Or>(or: Or) => or,
  // @ts-expect-error It's expected for the generic type to not be an invariant of `null`. We can ignore the error here, as this is a no-op.
  map: () => none(),
  match: (branches) => branches.none(),
  isSome: false,
  isNone: true,
});

export const option = <T>(t: T): Option<T> => {
  // @ts-expect-error It's expected for the generic type to not be an invariant of `null`. We can ignore the error here.
  if (t === null || t === undefined) return none();
  return some(t);
};
