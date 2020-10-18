import React, { memo, useMemo, useState } from "react";
import {
  makeStyles,
  createStyles,
  Typography,
  Paper,
  Box,
} from "@material-ui/core";
import PageTitle from "components/common/atoms/PageTitle";
import TextField from "components/common/atoms/TextField";
import { PrimaryButton } from "components/common/atoms/Buttons";
import { Tabs, TabPanel } from "components/common/molecules/Tabs";
import TeamList from "../molecules/TeamList";

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      marginBottom: "1vh",
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
  selectJoinedTeam: (teamId: string) => () => void;
  selectOtherTeam: (teamId: string) => () => void;
  createNewTeam: (teamId: string) => () => void;
};

const TeamSelecting: React.FC<Props> = ({
  joinedTeams,
  otherTeams,
  selectJoinedTeam,
  selectOtherTeam,
  createNewTeam,
}) => {
  const classes = useStyles();

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
              onClick={createNewTeam(newTeamId)}
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
