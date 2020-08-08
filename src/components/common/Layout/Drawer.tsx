import React, { memo } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import BaseDrawer from "@material-ui/core/Drawer";
import List from "components/common/atoms/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Icon from "components/common/atoms/Icon";
import { drawerWidth } from "./constants";

const contentMenus = [
  {
    title: "Edit",
    icon: <Icon name="edit" />,
    text: "Edit",
  },
  {
    title: "MyCheckBox",
    icon: <Icon name="checkbox" />,
    text: "MyCheckBox",
  },
  {
    title: "MyGraphs",
    icon: <Icon name="mySkillmap" />,
    text: "MyGraphs",
  },
  {
    title: "TeamGraphs",
    icon: <Icon name="teamSkillmap" />,
    text: "TeamGraphs",
  },
  {
    title: "TimelineGraphs",
    icon: <Icon name="timelineGraphs" />,
    text: "TimelineGraphs",
  },
];

const settingMenus = [
  {
    title: "BaseSettings",
    icon: <Icon name="settings" />,
    text: "BaseSettings",
  },
  {
    title: "Help",
    icon: <Icon name="help" />,
    text: "Help",
  },
];

type Props = {
  handleDrawerClose: () => void;
  open: boolean;
};

const Drawer: React.FC<Props> = ({ handleDrawerClose, open }) => {
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
};

export default memo(Drawer);
