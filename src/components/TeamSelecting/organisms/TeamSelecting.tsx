import React, { memo, useCallback, useContext } from "react";
import {
  makeStyles,
  createStyles,
  Typography,
  Paper,
  List,
  ListItem,
  Tabs,
  Tab,
  Box,
} from "@material-ui/core";
import PageTitle from "components/common/atoms/PageTitle";
import { TeamContext } from "contexts";
import { useHistory } from "react-router";
import routeNames from "router/routeNames";

const TabPanel: React.FC<{ value: number; index: number }> = ({
  children,
  value,
  index,
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      marginBottom: "1vh",
    },
    paper: {
      margin: "auto",
      padding: "10px 10px 0",
    },
    team: {
      justifyContent: "center",
      "&:not(:last-child)": { borderBottom: "1px #ccc solid" },
    },
    text: {
      textAlign: "center",
    },
  })
);

type Props = {
  teams: string[];
};

const TeamSelecting: React.FC<Props> = ({ teams }) => {
  const classes = useStyles();
  const { setTeam } = useContext(TeamContext);
  const history = useHistory();

  const selectTeam = useCallback(
    (teamId) => () => {
      setTeam(teamId);
      history.push(routeNames.home);
    },
    [setTeam, history]
  );

  const [value, setValue] = React.useState(0);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <PageTitle iconName="mySkillmap" className={classes.title}>
        チームを選択する
      </PageTitle>
      <Paper elevation={5} square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab
            label="登録済みのチームから選択する"
            disabled={teams.length === 0}
          />
          <Tab label="他のチームに参加する" />
          <Tab label="新しくチームを作成する" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <List>
            {teams.map((team) => (
              <ListItem
                key={team}
                button
                onClick={selectTeam(team)}
                className={classes.team}
              >
                <Typography>{team}</Typography>
              </ListItem>
            ))}
          </List>
        </TabPanel>
      </Paper>
      <Typography align="center" />
      <Typography align="center" />
    </>
  );
};

export default memo(TeamSelecting);
