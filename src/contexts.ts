import { createContext, Dispatch } from "react";
import { toastInitialState, ToastState } from "reducers/toast";
import { Action } from "util/actioinCreator";

type FirebaseContextValue = {
  auth: firebase.auth.Auth | null;
  db: firebase.firestore.Firestore | null;
};

export const FirebaseContext = createContext<FirebaseContextValue>({
  auth: null,
  db: null,
});

type UserContextValue = {
  user: firebase.User | null;
  credential: firebase.auth.UserCredential | null;
  setCredential: (credential: firebase.auth.UserCredential | null) => void;
};

export const UserContext = createContext<UserContextValue>({
  user: null,
  credential: null,
  setCredential: () => undefined,
});

type TeamContextValue = {
  teamId: string | null;
  setTeamId: (team: string | null) => void;
};

export const TeamContext = createContext<TeamContextValue>({
  teamId: null,
  setTeamId: () => undefined,
});

type ToastContextValue = {
  toastState: ToastState;
  dispatch: Dispatch<Action<any>>;
};

export const ToastContext = createContext<ToastContextValue>({
  toastState: toastInitialState,
} as ToastContextValue);
