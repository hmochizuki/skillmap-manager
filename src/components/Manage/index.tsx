import React, { memo } from "react";
import { SkillMap } from "types/skillmap";
import Presentation from "./organisms/Manage";

const skillmap: SkillMap = [
  {
    id: "01",
    label: "React",
    questions: [
      { id: "01-01", question: "react-create-app でアプリを作った経験がある" },
      { id: "01-02", question: "react-create-app でアプリを作った経験がある" },
      { id: "01-03", question: "react-create-app でアプリを作った経験がある" },
    ],
  },
  {
    id: "02",
    label: "Redux",
    questions: [
      { id: "02-01", question: "Fluxのデータフローを説明できる" },
      { id: "02-02", question: "redux の３原則を説明できる" },
    ],
  },
  {
    id: "03",
    label: "Others",
    questions: [
      { id: "03-01", question: "firebase console を操作したことがある" },
      {
        id: "03-02",
        question: "typescript で util関数の型定義をしたとこがある",
      },
    ],
  },
];

const ManagerContainer = () => {
  return <Presentation skillmap={skillmap} />;
};

export default memo(ManagerContainer);
