import React, { memo, useReducer } from "react";
import { WorkSheet, WorkSheetCollection } from "types/workSheet";
import { Action } from "types/reducer";
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

enum ActionTypes {
  CHANGE_CATEGORY_FILTER = "CHANGE_CATEGORY_FILTER",
}

type ManageState = {
  categories: WorkSheetCollection["categories"];
  workSheet: WorkSheet;
  categoryFilter: Record<string, boolean>;
};

type CategoryFilterAction = Action<
  "CHANGE_CATEGORY_FILTER",
  Record<string, boolean>
>;

const initialState = {
  categories,
  workSheet,
  categoryFilter: {
    React: true,
    Redux: false,
    Others: true,
  },
};

const reducer: React.Reducer<ManageState, CategoryFilterAction> = (
  state: ManageState,
  { type, payload }: CategoryFilterAction
) => {
  switch (type) {
    case ActionTypes.CHANGE_CATEGORY_FILTER:
      return {
        ...state,
        categoryFilter: { ...state.categoryFilter, ...payload },
      };
    default:
      throw new Error();
  }
};

const ManagerContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const changeCategoriesfilter = (category: string, filter: boolean) => {
    dispatch({
      type: ActionTypes.CHANGE_CATEGORY_FILTER,
      payload: { [category]: filter },
    });
  };

  return (
    <Presentation
      workSheet={state.workSheet}
      categories={state.categories}
      categoryFilter={state.categoryFilter}
      changeCategoriesfilter={changeCategoriesfilter}
    />
  );
};

export default memo(ManagerContainer);
