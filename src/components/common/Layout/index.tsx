import React, { FC, useContext, useReducer } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TeamContext, ToastContext, UserContext } from "contexts";
import theme from "components/theme";
import AppBar from "components/common/layout/AppBar";
import Drawer from "components/common/layout/Drawer";
import toastReducer, { toastInitialState } from "reducers/toast";
import Toast from "../atoms/Toast";

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
  const { teamId } = useContext(TeamContext);
  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const [toastState, dispatch] = useReducer(toastReducer, toastInitialState);

  return (
    // App.tsx に登録すると、Route を ラップしてしまい Context の更新時にホームに遷移してしまうため Layout に登録する
    <ToastContext.Provider value={{ toastState, dispatch }}>
      <div className={classes.root}>
        <AppBar handleDrawerOpen={handleDrawerOpen} open={open} />
        {/* このロジック集約したい */}
        {user && teamId && (
          <Drawer handleDrawerClose={handleDrawerClose} open={open} />
        )}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
          {toastState.toasts.map((toast) => (
            <Toast
              key={toast.message}
              message={toast.message}
              severity={toast.severity}
            />
          ))}
        </main>
      </div>
    </ToastContext.Provider>
  );
};

export default Layout;
