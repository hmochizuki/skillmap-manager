import React, { FC, useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { CssBaseline } from "@material-ui/core";
import Layout from "components/common/layout";
import { UserContext, AuthContext } from "contexts";
import "./App.css";
import Router from "router";

const App: FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [
    credential,
    setCredential,
  ] = useState<firebase.auth.UserCredential | null>(null);
  const auth = firebase.auth();

  const subscribeUser = auth.onAuthStateChanged(async (firebaseUser) => {
    if (firebaseUser) {
      setUser(firebaseUser);
    } else setUser(null);
  });

  useEffect(() => {
    return subscribeUser();
  });

  return (
    <>
      <AuthContext.Provider value={{ auth }}>
        <UserContext.Provider value={{ user, credential, setCredential }}>
          <CssBaseline />
          <Layout>
            <Router />
          </Layout>
        </UserContext.Provider>
      </AuthContext.Provider>
    </>
  );
};

export default App;
