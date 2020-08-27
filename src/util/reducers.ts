interface AnyAction {
  type: any;
}

type Meta = null | { [key: string]: any };

export interface Action<Payload> extends AnyAction {
  type: string;
  payload: Payload;
  error?: boolean;
  meta?: Meta;
}

interface ActionCreator<Payload> {
  type: string;
  (payload: Payload, meta?: Meta): Action<Payload>;
}

export const actionCreatorFactory = (
  prefix: string,
  defaultIsError: (payload: any) => boolean = (p) => p instanceof Error
) => {
  const base = `${prefix}/`;

  const actionCreator = <Payload>(
    type: string,
    commonMeta?: Meta,
    isError: ((payload: Payload) => boolean) | boolean = defaultIsError
  ) => {
    const fullType = base + type;

    return Object.assign(
      (payload: Payload, meta?: Meta) => {
        const action: Action<Payload> = {
          type: fullType,
          payload,
        };

        if (commonMeta || meta) {
          action.meta = { ...commonMeta, ...meta };
        }

        if (isError && (typeof isError === "boolean" || isError(payload))) {
          action.error = true;
        }

        return action;
      },
      {
        type: fullType,
      }
    ) as ActionCreator<Payload>;
  };

  return actionCreator;
};
