import { Reducer } from "react";
import { Action, actionCreatorFactory } from "util/actioinCreator";

const createAction = actionCreatorFactory("toast");
export const showSuccessMessage = createAction<string>("show");

type Toast = {
  show: boolean;
  message: string;
  severity: "info" | "success" | "error";
};

export type ToastState = {
  toasts: ReadonlyArray<Toast>;
};

export const toastInitialState: ToastState = {
  toasts: [],
} as const;

const toastReducer: Reducer<ToastState, Action<any>> = (state, action) => {
  switch (action.type) {
    case showSuccessMessage.type:
      return {
        ...state,
        toasts: [
          ...state.toasts,
          {
            show: true,
            message: action.payload,
            severity: "success",
          },
        ],
      };
    default:
      throw new Error("not expeted action is dispatched");
  }
};

export default toastReducer;
