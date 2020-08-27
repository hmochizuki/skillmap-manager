import React, { memo } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import LeftClose from "@material-ui/icons/ChevronLeft";
import CheckBox from "@material-ui/icons/CheckBox";
import Account from "@material-ui/icons/AccountBox";
import Settings from "@material-ui/icons/Settings";
import Timeline from "@material-ui/icons/TrendingUp";
import Equalizer from "@material-ui/icons/Equalizer";
import Help from "@material-ui/icons/Help";
import Create from "@material-ui/icons/Create";
import Error from "@material-ui/icons/ErrorOutline";
import Navigation from "@material-ui/icons/NavigateNext";
import Expand from "@material-ui/icons/ExpandMore";
import AddCircle from "@material-ui/icons/AddCircle";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Menu from "@material-ui/icons/Menu";
import Delete from "@material-ui/icons/Delete";

export type IconName =
  | "edit"
  | "mySkillmap"
  | "checkbox"
  | "teamSkillmap"
  | "timelineGraphs"
  | "settings"
  | "help"
  | "leftClose"
  | "navigation"
  | "expand"
  | "add"
  | "signout"
  | "menu"
  | "delete"
  | "error";

type Props = {
  name: IconName;
  size?: "small" | "large" | undefined;
};

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      verticalAlign: "center",
    },
  })
);

const Icon: React.FC<Props> = ({ name, size }) => {
  const classes = useStyles();
  switch (name) {
    case "edit":
      return <Create fontSize={size} className={classes.icon} />;
    case "checkbox":
      return <CheckBox fontSize={size} className={classes.icon} />;
    case "mySkillmap":
      return <Account fontSize={size} className={classes.icon} />;
    case "teamSkillmap":
      return <Equalizer fontSize={size} className={classes.icon} />;
    case "timelineGraphs":
      return <Timeline fontSize={size} className={classes.icon} />;
    case "settings":
      return <Settings fontSize={size} className={classes.icon} />;
    case "help":
      return <Help fontSize={size} className={classes.icon} />;
    case "leftClose":
      return <LeftClose fontSize={size} className={classes.icon} />;
    case "navigation":
      return <Navigation fontSize={size} className={classes.icon} />;
    case "expand":
      return <Expand fontSize={size} className={classes.icon} />;
    case "add":
      return <AddCircle fontSize={size} className={classes.icon} />;
    case "signout":
      return <ExitToApp fontSize={size} className={classes.icon} />;
    case "menu":
      return <Menu fontSize={size} className={classes.icon} />;
    case "delete":
      return <Delete fontSize={size} className={classes.icon} />;
    default:
      return <Error fontSize={size} className={classes.icon} />;
  }
};

export default memo(Icon);
