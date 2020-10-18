import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase/app";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import thema from "components/theme";
import firebaseConfig from "config/firebase";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <>
    {/* StrictMode を使うと、material-ui に不具合の不具合でいくつかのコンポーネントが使用できない(ex. Dialog)
      ref: https://github.com/mui-org/material-ui/issues/13394
    */}
    {/*  <React.StrictMode> */}
    {/* TODO: 型定義...
    // @ts-ignore  */}
    <ThemeProvider thema={thema}>
      <BrowserRouter>
        <CssBaseline>
          <App />
        </CssBaseline>
      </BrowserRouter>
    </ThemeProvider>
    {/* </React.StrictMode> */}
  </>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
