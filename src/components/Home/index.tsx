import React, { memo, useState, useCallback } from "react";
import routeNames from "router/routeNames";
import TextField from "components/common/atoms/TextField";
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

const Home = () => {
  const [texts, setTexts] = useState([""]);
  const handleChange = useCallback((e: any) => setTexts([e.target.value]), []);

  return (
    <div className="App">
      <NavCard {...cardProps} />
      <TextField
        id="test"
        name="name"
        value={texts[0]}
        handleChange={handleChange}
      />
    </div>
  );
};

export default memo(Home);
