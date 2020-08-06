import React, { FC } from "react";
import { Redirect, Route, Switch } from "react-router";
import { CssBaseline } from "@material-ui/core";
import Home from "components/organisms/Home";
import Layout from "components/common/Layout";
import routes from "./routes";
import "./App.css";

const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Switch>
          <Route path={routes.home} component={Home} exact />
          <Redirect to={routes.home} />
        </Switch>
      </Layout>
    </>
  );
};

export default App;
