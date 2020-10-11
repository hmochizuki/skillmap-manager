import React, { FC, useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { CssBaseline } from "@material-ui/core";
import Layout from "components/common/layout";
import { UserContext, FirebaseContext, TeamContext } from "contexts";
import "./App.css";
import Router from "router";
import { getUserDocument, createUser } from "firestore/services/userCollection";
import { useHistory } from "react-router";
import routeNames from "router/routeNames";

const App: FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [team, setTeam] = useState<string | null>(null);
  const [
    credential,
    setCredential,
  ] = useState<firebase.auth.UserCredential | null>(null);
  const auth = firebase.auth();
  const db = firebase.firestore();

  const history = useHistory();

  // onAuthStateChanged は返り値として、unsubscribe する関数を返す
  // eslint-disable-next-line consistent-return
  const unsubscribeUser = auth.onAuthStateChanged(async (firebaseUser) => {
    if (!firebaseUser) return setUser(null);

    if (credential && credential.user) {
      const { uid } = credential.user;
      const userDoc = await getUserDocument(db, uid);
      setUser(firebaseUser);

      if (!userDoc) {
        const userData = {
          id: uid,
          name: credential.user.displayName || "",
        };
        createUser(db, userData);
      }

      history.replace(routeNames.teamSelect);
    }
  });

  useEffect(() => {
    return unsubscribeUser();
  });

  return (
    <>
      <FirebaseContext.Provider value={{ auth, db }}>
        <UserContext.Provider value={{ user, credential, setCredential }}>
          <TeamContext.Provider value={{ teamId: team, setTeam }}>
            <CssBaseline />
            <Layout>
              <Router />
            </Layout>
          </TeamContext.Provider>
        </UserContext.Provider>
      </FirebaseContext.Provider>
    </>
  );
};

export default App;
