import React, { memo } from "react";
import routeNames from "router/routeNames";
import NavCard from "./NavCard";

const cardProps = {
  header: {
    title: "ワークシートを編集",
    subTitle: "サブタイトル",
  },
  navigateTo: routeNames.workSheetManage,
  media: {
    title: "イメージタイトル",
    path: "",
  },
  contents: "コンテンツ",
};

const Home = () => (
  <div className="App">
    <NavCard {...cardProps} />
  </div>
);

export default memo(Home);
