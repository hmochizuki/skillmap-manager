import React, { FC, useContext, memo } from "react";
import { Redirect, Route, Switch } from "react-router";
import "firebase/auth";
import Home from "components/Home";
import PrivateMap from "components/PrivateMap";
import Signin from "components/Signin";
import { UserContext } from "contexts";
import WorksheetManagement from "components/WorksheetManagement";
import WorksheetAnswer from "components/WorksheetAnswer";
import TeamMap from "components/TeamMap";
import routeNames from "./routeNames";

const Router: FC = () => {
  const { user } = useContext(UserContext);

  return (
    <Switch>
      {user ? (
        <>
          <Route path={routeNames.home} component={Home} exact />
          <Route
            path={routeNames.workSheetManage}
            component={WorksheetManagement}
          />
          <Route
            path={routeNames.workSheetAnswer}
            component={WorksheetAnswer}
          />
          <Redirect to={routeNames.workSheetManage} />
          <Route path={routeNames.skillmap}>
            <Route path={routeNames.privateMap} component={PrivateMap} />
            <Route path={routeNames.teamMap} component={TeamMap} />
          </Route>
          <Redirect to={routeNames.home} />
        </>
      ) : (
        <>
          <Route path={routeNames.signin} component={Signin} />
          <Redirect to={routeNames.signin} />
        </>
      )}
    </Switch>
  );
};

export default memo(Router);
