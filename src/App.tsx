import React, { FC } from "react";
import { Redirect, Route, Switch } from "react-router";
import { CssBaseline } from "@material-ui/core";
import Home from "components/Home";
import Manage from "components/Manage";
import Answer from "components/Answer";
import PrivateMap from "components/PrivateMap";
import Signin from "components/Signin";
import Layout from "components/common/layout";
import routes from "./routes";
import "./App.css";

const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Switch>
          <Route path={routes.home} component={Home} exact />
          <Route path={routes.workSheet}>
            <Route path={routes.workSheetManage} component={Manage} />
            <Route path={routes.workSheetAnswer} component={Answer} />
            <Redirect to={routes.workSheetManage} />
          </Route>
          <Route path={routes.skillmap}>
            <Route path={routes.privateMap} component={PrivateMap} />
          </Route>
          <Route path={routes.signin} component={Signin} />
          <Redirect to={routes.home} />
        </Switch>
      </Layout>
    </>
  );
};

export default App;
