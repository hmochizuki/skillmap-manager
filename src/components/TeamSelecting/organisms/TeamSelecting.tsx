import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import {
  makeStyles,
  createStyles,
  Typography,
  Paper,
  Box,
} from "@material-ui/core";
import PageTitle from "components/common/atoms/PageTitle";
import { FirebaseContext, TeamContext, UserContext } from "contexts";
import { useHistory } from "react-router";
import routeNames from "router/routeNames";
import TextField from "components/common/atoms/TextField";
import { PrimaryButton } from "components/common/atoms/Buttons";
import { createTeamDocument } from "firestore/services/teamsCollection";
import Progress from "components/common/atoms/Progress";
import { joinTeam } from "firestore/services/userCollection";
import { Tabs, TabPanel } from "components/common/molecules/Tabs";
import TeamList from "../molecules/TeamList";

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      marginBottom: "1vh",
    },
    paper: {
      margin: "auto",
      padding: "0 10px",
    },
    team: {
      justifyContent: "center",
      "&:not(:last-child)": { borderBottom: "1px #ccc solid" },
    },
    createNewTeam: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    textField: {
      width: "400px",
    },
    text: {
      textAlign: "center",
    },
  })
);

type Props = {
  joinedTeams: string[];
  otherTeams: string[];
};

const TeamSelecting: React.FC<Props> = ({ joinedTeams, otherTeams }) => {
  const classes = useStyles();
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

  const [value, setValue] = useState(0);
  const [newTeamId, setNewTeamId] = useState("");

  const tabs = useMemo(
    () => [
      {
        label: "参加済みのチームから選択する",
        disabled: joinedTeams.length === 0,
      },
      { label: "他のチームに参加する" },
      { label: "新しくチームを作成する" },
    ],
    [joinedTeams]
  );

  const changeTabs = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (!db) return <Progress />;

  return (
    <>
      <PageTitle iconName="mySkillmap" className={classes.title}>
        チームを選択する
      </PageTitle>
      <Paper elevation={5} square>
        <Tabs value={value} tabs={tabs} onChange={changeTabs} />
        <TabPanel value={value} index={0}>
          <TeamList teams={joinedTeams} onClick={selectJoinedTeam} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TeamList teams={otherTeams} onClick={selectOtherTeam} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box className={classes.createNewTeam}>
            <TextField
              id="create-team"
              value={newTeamId}
              label="チームID"
              placeholder="作成するチームIDを入力してください"
              helperText="チームIDはチームに一意であり、作成後に変更することはできません"
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewTeamId(e.target.value)
              }
              className={classes.textField}
            />
            <PrimaryButton
              text="このチームIDで作成する"
              onClick={() => {
                createTeamDocument(db, newTeamId).then(() => {
                  setTeamId(newTeamId);
                  history.replace(routeNames.home);
                });
              }}
            />
          </Box>
        </TabPanel>
      </Paper>
      <Typography align="center" />
      <Typography align="center" />
    </>
  );
};

export default memo(TeamSelecting);
