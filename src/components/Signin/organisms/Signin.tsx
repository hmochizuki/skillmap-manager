import React, { memo, useContext } from "react";
import {
  makeStyles,
  createStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import PageTitle from "components/common/atoms/PageTitle";
import { UserContext, FirebaseContext } from "contexts";

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
  const { auth } = useContext(FirebaseContext);
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
      signInSuccessWithAuthResult: (
        authResult: firebase.auth.UserCredential
      ) => {
        setCredential(authResult);

        return false;
      },
    },
  };

  return (
    <>
      <div className={classes.titleArea}>
        <PageTitle>Singin</PageTitle>
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
