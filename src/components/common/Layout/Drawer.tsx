import React, { memo } from "react";
import { useHistory } from "react-router";
import routeNames from "router/routeNames";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import BaseDrawer from "@material-ui/core/Drawer";
import List from "components/common/atoms/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Icon from "components/common/atoms/Icon";
import { drawerWidth } from "components/common/layout/constants";
import theme from "components/theme";

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

const useStyles = makeStyles((t: Theme) =>
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
      transition: t.transitions.create("width", {
        easing: t.transitions.easing.sharp,
        duration: t.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: t.transitions.create("width", {
        easing: t.transitions.easing.sharp,
        duration: t.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: t.spacing(7) + 1,
      [t.breakpoints.up("sm")]: {
        width: t.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: t.spacing(0, 1),
      // necessary for content to be below app bar
      ...t.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: t.spacing(3),
    },
  })
);

const Drawer: React.FC<Props> = ({ handleDrawerClose, open }) => {
  const classes = useStyles(theme);
  const history = useHistory();

  const contentMenus = [
    {
      title: "Edit",
      icon: <Icon name="edit" />,
      text: "Edit",
      handleClick: () => {
        history.push(routeNames.workSheetManage);
      },
    },
    {
      title: "MyCheckBox",
      icon: <Icon name="checkbox" />,
      text: "MyCheckBox",
      handleClick: () => {
        history.push(routeNames.workSheetAnswer);
      },
    },
    {
      title: "privateMap",
      icon: <Icon name="mySkillmap" />,
      text: "privateMap",
      handleClick: () => {
        history.push(routeNames.privateMap);
      },
    },
    {
      title: "TeamMap",
      icon: <Icon name="teamSkillmap" />,
      text: "TeamMap",
      handleClick: () => {
        history.push(routeNames.teamMap);
      },
    },
    {
      title: "TimelineGraphs",
      icon: <Icon name="timelineGraphs" />,
      text: "TimelineGraphs",
    },
  ];

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
