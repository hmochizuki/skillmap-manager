import React, { memo, useCallback, useContext, useMemo } from "react";
import Progress from "components/common/atoms/Progress";
import useUser from "hooks/useUser";
import { FirebaseContext, TeamContext, UserContext } from "contexts";
import useAllTeamIds from "hooks/useAllTeamIds";
import { useHistory } from "react-router";
import routeNames from "router/routeNames";
import { joinTeam } from "firestore/services/userCollection";
import { createTeamDocument } from "firestore/services/teamsCollection";
import Presentation from "./organisms/TeamSelecting";

const TeamSelectingContainer = () => {
  const [userDoc] = useUser();

  const [allTeamIds] = useAllTeamIds();
  const otherTeams = useMemo(
    () => allTeamIds.filter((teamId) => !userDoc?.teams.includes(teamId)),
    [userDoc, allTeamIds]
  );

  const { db } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const { setTeamId } = useContext(TeamContext);
  const history = useHistory();

  const selectJoinedTeam = useCallback(
    (teamId) => () => {
      setTeamId(teamId);
      history.push(routeNames.home);
    },
    [setTeamId, history]
  );

  const selectOtherTeam = useCallback(
    (teamId) => () => {
      if (!db || !user) return new Error("firebase is not initilized");
      setTeamId(teamId);
      joinTeam(db, user.uid, teamId);

      return history.push(routeNames.home);
    },
    [db, user, setTeamId, history]
  );

  const createNewTeam = useCallback(
    (teamId: string) => () => {
      if (!db || !user) return new Error("firebase is not initilized");

      return createTeamDocument(db, teamId).then(() => {
        setTeamId(teamId);
        history.replace(routeNames.home);
      });
    },
    [db, user, history, setTeamId]
  );

  return user && userDoc && db ? (
    <Presentation
      joinedTeams={userDoc.teams}
      otherTeams={otherTeams}
      selectJoinedTeam={selectJoinedTeam}
      selectOtherTeam={selectOtherTeam}
      createNewTeam={createNewTeam}
    />
  ) : (
    <Progress />
  );
};

export default memo(TeamSelectingContainer);
