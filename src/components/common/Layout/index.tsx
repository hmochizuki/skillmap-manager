import React, { FC, useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { UserContext } from "contexts";
import theme from "components/theme";
import AppBar from "./AppBar";
import Drawer from "./Drawer";

const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      display: "flex",
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

const Layout: FC = ({ children }) => {
  const classes = useStyles(theme);
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
