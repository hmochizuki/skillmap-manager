import React from "react";
import routes from "routes";
import NavCard from "./NavCard";

const cardProps = {
  header: {
    title: "ワークシートを編集",
    subTitle: "サブタイトル",
  },
  navigateTo: routes.workSheetManage,
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
