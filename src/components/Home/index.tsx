import React, { memo } from "react";
import routeNames from "router/routeNames";
import { Container, makeStyles, createStyles } from "@material-ui/core";
import NavCard from "./NavCard";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  })
);

const worksheetManagement = {
  header: {
    title: "ワークシートを編集",
    subTitle: "サブタイトル",
  },
  navigateTo: routeNames.workSheetManage,
  media: {
    title: "イメージタイトル",
    path: "/src/img/worksheetToEdit.png",
  },
  contents: "コンテンツ",
};

const worksheetAnswer = {
  header: {
    title: "ワークシートに回答",
    subTitle: "サブタイトル",
  },
  navigateTo: routeNames.workSheetAnswer,
  media: {
    title: "イメージタイトル",
    path: "/src/img/worksheetToEdit.png",
  },
  contents: "コンテンツ",
};

const Home = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <NavCard {...worksheetManagement} />
      <NavCard {...worksheetAnswer} />
    </Container>
  );
};

export default memo(Home);
