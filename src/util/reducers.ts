import { Action } from "types/reducer";

export const createAction = <T extends string, P, M>(type: T) => (
  payload: P,
  meta?: M,
  error?: boolean
): Action<T, P, M> => ({
  type,
  payload,
  meta,
  error,
});
