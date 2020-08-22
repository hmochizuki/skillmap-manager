import React, { memo } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import BaseAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { Link } from "react-router-dom";
import routeNames from "router/routeNames";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    title: {
      color: "#fff",
    },
  })
);

type Props = {
  handleDrawerOpen: () => void;
  open: boolean;
};

const AppBar: React.FC<Props> = ({ handleDrawerOpen, open }) => {
  const classes = useStyles();

  return (
    <BaseAppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Link to={routeNames.home} className={classes.title}>
          <Typography variant="h6" noWrap>
            Skill Map Manager
          </Typography>
        </Link>
      </Toolbar>
    </BaseAppBar>
  );
};

export default memo(AppBar);
