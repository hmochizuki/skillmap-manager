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
    <p>
      <NavCard {...cardProps} />
    </p>
  </div>
);

export default memo(Home);
