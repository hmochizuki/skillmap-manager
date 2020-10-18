import React, { memo } from "react";
import routeNames from "router/routeNames";
import { Container, makeStyles, createStyles } from "@material-ui/core";
import NavCard from "./NavCard";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    row: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      marginBottom: "3vh",
    },
  })
);

const worksheetManagement = {
  header: {
    title: "ワークシートを編集する",
  },
  navigateTo: routeNames.workSheetManage,
};

const worksheetAnswer = {
  header: {
    title: "ワークシートに回答する",
  },
  navigateTo: routeNames.workSheetAnswer,
};

const privateMap = {
  header: {
    title: "自分のスキルを分析する",
  },
  navigateTo: routeNames.privateMap,
};

const teamMap = {
  header: {
    title: "チームのスキルを分析する",
  },
  navigateTo: routeNames.privateMap,
};

const Home = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Container className={classes.row}>
        <NavCard {...worksheetManagement} />
        <NavCard {...worksheetAnswer} />
      </Container>
      <Container className={classes.row}>
        <NavCard {...privateMap} />
        <NavCard {...teamMap} />
      </Container>
    </Container>
  );
};

export default memo(Home);
