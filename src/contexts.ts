import { createContext } from "react";

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
  setTeam: (team: string) => void;
};

export const TeamContext = createContext<TeamContextValue>({
  teamId: null,
  setTeam: () => undefined,
});
