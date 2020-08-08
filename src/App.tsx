import React, { FC } from "react";
import { Redirect, Route, Switch } from "react-router";
import { CssBaseline } from "@material-ui/core";
import Home from "components/Home";
import Manage from "components/Manage";
import Answer from "components/Answer";
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
          <Route path={routes.manage} component={Manage} />
          <Route path={routes.answer} component={Answer} />
          <Redirect to={routes.home} />
        </Switch>
      </Layout>
    </>
  );
};

export default App;
