import React, { memo, useContext, useCallback } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import BaseAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { Link, useHistory } from "react-router-dom";
import routeNames from "router/routeNames";
import { UserContext, AuthContext } from "contexts";
import IconButton from "../atoms/IconButton";

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
    signoutButton: {
      marginRight: 0,
      marginLeft: "auto",
    },
    hide: {
      display: "none",
    },
    title: {
      color: "#fff",
    },
    icon: {
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
  const { auth } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const history = useHistory();
  const signOut = useCallback(() => {
    if (auth && user) auth.signOut();
    history.replace(routeNames.home);
  }, [auth, user, history]);

  return (
    <BaseAppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        {user && (
          <IconButton
            label="appBarMenu"
            iconName="menu"
            onClick={handleDrawerOpen}
            className={clsx(classes.icon, classes.menuButton, {
              [classes.hide]: open,
            })}
          />
        )}
        <Link to={routeNames.home} className={classes.title}>
          <Typography variant="h6" noWrap>
            Skill Map Manager
          </Typography>
        </Link>
        <IconButton
          label="appBarSignout"
          iconName="signout"
          onClick={signOut}
          className={clsx(classes.icon, classes.signoutButton)}
        />
      </Toolbar>
    </BaseAppBar>
  );
};

export default memo(AppBar);
