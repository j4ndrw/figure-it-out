export type Result<T, E> = {
  unwrap: () => T;
  unwrapOr: <Or>(or: Or) => Or;
  map: <Mapped>(cb: (t: T) => Mapped) => Result<Mapped, E>;
  mapErr: <Mapped>(cb: (t: E) => Mapped) => Result<T, Mapped>;
  isOk: boolean;
  isErr: boolean;
  match: <MappedT, MappedE>(branches: {
    ok: (t: T) => MappedT;
    err: (e: E) => MappedE;
  }) => MappedT | MappedE;
};

export const ok = <T>(t: T): Result<T, never> => ({
  unwrap: () => t,
  unwrapOr: <Or>() => t as unknown as Or,
  map: (cb) => ok(cb(t)),
  mapErr: () => ok(t),
  match: (branches) => branches.ok(t),
  isOk: true,
  isErr: false,
});

export const err = <E>(e: E): Result<never, E> => ({
  unwrap: () => {
    throw e;
  },
  unwrapOr: <Or>(or: Or) => or,
  map: () => err(e),
  mapErr: (cb) => err(cb(e)),
  match: (branches) => branches.err(e),
  isOk: false,
  isErr: true,
});
