import React, { memo } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import BaseDrawer from "@material-ui/core/Drawer";
import List from "components/common/atoms/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import PersonIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import TimelineIcon from "@material-ui/icons/TrendingUp";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import HelpIcon from "@material-ui/icons/Help";
import { drawerWidth } from "./constants";

const contentMenus = [
  {
    title: "MyCheckBox",
    icon: <CheckBoxIcon />,
    text: "MyCheckBox",
  },
  {
    title: "MyGraphs",
    icon: <PersonIcon />,
    text: "MyGraphs",
  },
  {
    title: "TeamGraphs",
    icon: <EqualizerIcon />,
    text: "TeamGraphs",
  },
  {
    title: "TimelineGraphs",
    icon: <TimelineIcon />,
    text: "TimelineGraphs",
  },
];

const settingMenus = [
  {
    title: "BaseSettings",
    icon: <SettingsIcon />,
    text: "BaseSettings",
  },
  {
    title: "Help",
    icon: <HelpIcon />,
    text: "Help",
  },
];

type Props = {
  handleDrawerClose: () => void;
  open: boolean;
};

function Drawer({ handleDrawerClose, open }: Props) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
      },
      drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9) + 1,
        },
      },
      toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
    })
  );
  const classes = useStyles();

  return (
    <BaseDrawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List items={contentMenus} />
      <Divider />
      <List items={settingMenus} />
    </BaseDrawer>
  );
}

export default memo(Drawer);
