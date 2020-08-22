import { createContext } from "react";

type AuthContextValue = {
  auth: firebase.auth.Auth | null;
};

export const AuthContext = createContext<AuthContextValue>({
  auth: null,
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
