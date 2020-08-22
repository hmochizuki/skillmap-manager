import React, { FC, useContext, memo } from "react";
import { Redirect, Route, Switch } from "react-router";
import "firebase/auth";
import Home from "components/Home";
import Manage from "components/Manage";
import Answer from "components/Answer";
import PrivateMap from "components/PrivateMap";
import Signin from "components/Signin";
import { UserContext } from "contexts";
import routeNames from "./routeNames";

const Router: FC = () => {
  const { user } = useContext(UserContext);

  return (
    <Switch>
      <Route path={routeNames.home} component={Home} exact />
      <Route path={routeNames.workSheet}>
        <Route path={routeNames.workSheetManage} component={Manage} />
        <Route path={routeNames.workSheetAnswer} component={Answer} />
        <Redirect to={routeNames.workSheetManage} />
      </Route>
      <Route path={routeNames.skillmap}>
        <Route path={routeNames.privateMap} component={PrivateMap} />
      </Route>
      {!user && <Route path={routeNames.signin} component={Signin} />}
      <Redirect to={routeNames.home} />
    </Switch>
  );
};

export default memo(Router);
