import React, { FC, useContext, memo } from "react";
import { Redirect, Route, Switch } from "react-router";
import "firebase/auth";
import Home from "components/Home";
import PrivateMap from "components/PrivateMap";
import Signin from "components/Signin";
import { TeamContext, UserContext } from "contexts";
import WorksheetManagement from "components/WorksheetManagement";
import WorksheetAnswer from "components/WorksheetAnswer";
import TeamMap from "components/TeamMap";
import TeamSelecting from "components/TeamSelecting";
import routeNames from "./routeNames";

const Router: FC = () => {
  const { user } = useContext(UserContext);
  const { teamId } = useContext(TeamContext);

  // eslint-disable-next-line no-nested-ternary
  return user ? (
    teamId ? (
      <Switch>
        <Route path={routeNames.home} component={Home} exact />
        <Route path={routeNames.workSheet}>
          <Route
            path={routeNames.workSheetManage}
            component={WorksheetManagement}
          />
          <Route
            path={routeNames.workSheetAnswer}
            component={WorksheetAnswer}
          />
          <Redirect to={routeNames.workSheetManage} />
        </Route>
        <Route path={routeNames.skillmap}>
          <Route path={routeNames.privateMap} component={PrivateMap} />
          <Route path={routeNames.teamMap} component={TeamMap} />
        </Route>
        <Redirect to={routeNames.home} />
      </Switch>
    ) : (
      <>
        <Route path={routeNames.teamSelect} component={TeamSelecting} />
        <Redirect to={routeNames.teamSelect} />
      </>
    )
  ) : (
    <>
      <Route path={routeNames.signin} component={Signin} />
      <Redirect to={routeNames.signin} />
    </>
  );
};

export default memo(Router);
