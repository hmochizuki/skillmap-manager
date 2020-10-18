import React, { memo, useContext, useMemo } from "react";
import Progress from "components/common/atoms/Progress";
import useUser from "hooks/useUser";
import { UserContext } from "contexts";
import useAllTeamIds from "hooks/useAllTeamIds";
import Presentation from "./organisms/TeamSelecting";

const TeamSelectingContainer = () => {
  const { user } = useContext(UserContext);
  const [userDoc] = useUser();

  const [allTeamIds] = useAllTeamIds();
  const otherTeams = useMemo(
    () => allTeamIds.filter((teamId) => !userDoc?.teams.includes(teamId)),
    [userDoc, allTeamIds]
  );

  return user && userDoc ? (
    <Presentation joinedTeams={userDoc.teams} otherTeams={otherTeams} />
  ) : (
    <Progress />
  );
};

export default memo(TeamSelectingContainer);
