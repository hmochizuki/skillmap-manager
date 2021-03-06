import React, { memo, useContext, useCallback, useMemo } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import BaseAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { Link, useHistory } from "react-router-dom";
import routeNames from "router/routeNames";
import { UserContext, FirebaseContext, TeamContext } from "contexts";
import theme from "components/theme";
import { Box } from "@material-ui/core";
import IconButton from "../atoms/IconButton";

const drawerWidth = 240;

const useStyles = makeStyles((t: Theme) =>
  createStyles({
    appBar: {
      zIndex: t.zIndex.drawer + 1,
      transition: t.transitions.create(["width", "margin"], {
        easing: t.transitions.easing.sharp,
        duration: t.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: t.transitions.create(["width", "margin"], {
        easing: t.transitions.easing.sharp,
        duration: t.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    userInfo: {
      width: "100%",
      marginRight: "15px",
      textAlign: "right",
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
  const classes = useStyles(theme);
  const { auth } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const { teamId, setTeamId } = useContext(TeamContext);
  const history = useHistory();

  const isSignedIn = useMemo(() => user && teamId, [user, teamId]);
  const signOut = useCallback(() => {
    if (auth && user && teamId) {
      auth.signOut();
      setTeamId(null);
    }
    history.replace(routeNames.home);
  }, [auth, user, teamId, setTeamId, history]);

  return (
    <BaseAppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        {/* TODO: このロジック集約したい */}
        {isSignedIn ? (
          <IconButton
            label="appBarMenu"
            iconName="menu"
            onClick={handleDrawerOpen}
            className={clsx(classes.icon, classes.menuButton, {
              [classes.hide]: open,
            })}
          />
        ) : null}
        <Link to={routeNames.home} className={classes.title}>
          <Typography variant="h6" noWrap>
            Skill Map Manager
          </Typography>
        </Link>
        {isSignedIn ? (
          <>
            <Box className={classes.userInfo}>
              <Typography>{user?.displayName}</Typography>
              <Typography>{teamId}</Typography>
            </Box>
            <IconButton
              label="appBarSignout"
              iconName="signout"
              onClick={signOut}
              className={clsx(classes.icon, classes.signoutButton)}
            />
          </>
        ) : null}
      </Toolbar>
    </BaseAppBar>
  );
};

export default memo(AppBar);
