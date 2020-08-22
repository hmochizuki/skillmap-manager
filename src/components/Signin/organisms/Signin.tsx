import React, { memo, useContext } from "react";
import {
  makeStyles,
  createStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { useHistory } from "react-router";
import routeNames from "router/routeNames";
import PageTitle from "components/common/atoms/PageTitle";
import { UserContext, AuthContext } from "contexts";

const useStyles = makeStyles(() =>
  createStyles({
    titleArea: {
      marginBottom: "3vh",
    },
    subTitle: {
      marginBottom: "1vh",
    },
  })
);

const Signin: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const { setCredential } = useContext(UserContext);
  const uiConfig: firebaseui.auth.Config = {
    signInFlow: "redirect",
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        customParameters: { lang: "ja" },
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        setCredential(authResult as firebase.auth.UserCredential);
        const dest = redirectUrl || routeNames.home;
        history.replace(dest);

        return false;
      },
    },
  };

  return (
    <>
      <div className={classes.titleArea}>
        <PageTitle title="Singin" />
        <Typography className={classes.subTitle}>
          Please signin or create your account
        </Typography>
        <Divider />
      </div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </>
  );
};

export default memo(Signin);
