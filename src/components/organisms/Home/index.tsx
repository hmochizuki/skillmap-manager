/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import NavCard from "./NavCard";

const cardProps = {
  header: {
    title: "タイトル",
    subTitle: "サブタイトル",
  },
  navigateTo: "navi",
  media: {
    title: "イメージタイトル",
    path: "",
  },
  contents: "コンテンツ",
  expand: {
    title: "説明！！",
    descriptions: ["説明", "11111111111111111111111111111111111111111111111"],
  },
};

const App = () => (
  <div className="App">
    <p>
      <NavCard {...cardProps} />
    </p>
  </div>
);

export default App;
