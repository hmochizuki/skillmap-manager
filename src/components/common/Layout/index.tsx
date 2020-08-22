import React, { FC, useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { UserContext } from "contexts";
import AppBar from "./AppBar";
import Drawer from "./Drawer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
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

const Layout: FC = ({ children }) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <AppBar handleDrawerOpen={handleDrawerOpen} open={open} />
      {user && <Drawer handleDrawerClose={handleDrawerClose} open={open} />}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
