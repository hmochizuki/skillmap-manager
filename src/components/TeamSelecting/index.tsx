import React, { memo, useContext } from "react";
import Progress from "components/common/atoms/Progress";
import useUser from "hooks/useUser";
import { UserContext } from "contexts";
import Presentation from "./organisms/TeamSelecting";

const TeamSelectingContainer = () => {
  const { user } = useContext(UserContext);
  const [userDoc] = useUser();

  return user && userDoc ? <Presentation teams={userDoc.team} /> : <Progress />;
};

export default memo(TeamSelectingContainer);
