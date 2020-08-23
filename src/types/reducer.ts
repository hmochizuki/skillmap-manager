export type Action<T extends string, P = undefined, M = undefined> = {
  type: T;
  payload: P;
  meta?: M;
  error?: boolean;
};
