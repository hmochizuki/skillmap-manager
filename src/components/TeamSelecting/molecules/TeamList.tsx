import {
  createStyles,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { memo, FC } from "react";

type Props = {
  teams: string[];
  onClick: (teamId: string) => () => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    team: {
      justifyContent: "center",
      "&:not(:last-child)": { borderBottom: "1px #ccc solid" },
    },
  })
);

const TeamList: FC<Props> = ({ teams, onClick }) => {
  const classes = useStyles();

  return (
    <List>
      {teams.map((team) => (
        <ListItem
          key={team}
          button
          onClick={onClick(team)}
          className={classes.team}
        >
          <Typography>{team}</Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default memo<FC<Props>>(TeamList);
