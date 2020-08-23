import React, { memo } from "react";
import { WorkSheet } from "types/workSheet";
import Presentation from "./organisms/Manage";

const categories = ["React", "Redux", "Others"];

const workSheet: WorkSheet = {
  React: [
    "react-create-app でアプリを作った経験がある",
    "react-create-app でアプリを作った経験があるよ",
    "react-create-app でアプリを作った経験がある",
  ],
  Redux: ["Fluxのデータフローを説明できる", "redux の３原則を説明できる"],
  Others: [
    "firebase console を操作したことがある",
    "typescript で util関数の型定義をしたとこがある",
  ],
};

const ManagerContainer = () => {
  return <Presentation workSheet={workSheet} categories={categories} />;
};

export default memo(ManagerContainer);
