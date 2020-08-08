import React from "react";
import routes from "routes";
import NavCard from "./NavCard";

const cardProps = {
  header: {
    title: "管理・編集する",
    subTitle: "サブタイトル",
  },
  navigateTo: routes.manage,
  media: {
    title: "イメージタイトル",
    path: "",
  },
  contents: "コンテンツ",
};

const App = () => (
  <div className="App">
    <p>
      <NavCard {...cardProps} />
    </p>
  </div>
);

export default App;
