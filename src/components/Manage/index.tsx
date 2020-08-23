import React, { memo, useReducer, useEffect, useCallback } from "react";
import { WorkSheet, WorkSheetCollection } from "types/workSheet";
import { Action } from "types/reducer";
import useWorkSheet from "hooks/useWorkSheet";
import Progress from "components/common/atoms/Progress";
import Presentation from "./organisms/Manage";

enum ActionTypes {
  CHANGE_CATEGORY_FILTER = "CHANGE_CATEGORY_FILTER",
  SET_WORKSHEET_COLLECTION = "SET_WORKSHEET_COLLECTION",
  CHANGE_WORKSHEET = "CHANGE_WORKSHEET",
}

type CategoryFilterAction = Action<
  ActionTypes.CHANGE_CATEGORY_FILTER,
  Record<string, boolean>
>;

type SetWorkSheetCollection = Action<
  ActionTypes.SET_WORKSHEET_COLLECTION,
  WorkSheetCollection
>;

type ChangeWorkSheetAction = Action<
  ActionTypes.CHANGE_WORKSHEET,
  { category: string; question: string }
>;

type State = {
  categories: WorkSheetCollection["categories"];
  workSheet: WorkSheet;
  categoryFilter: Record<string, boolean>;
};

const initialState: State = {
  categories: [],
  workSheet: {},
  categoryFilter: {},
};

const reducer: React.Reducer<
  State,
  CategoryFilterAction | ChangeWorkSheetAction | SetWorkSheetCollection
> = (state: State, { type, payload }: Action<ActionTypes, any>) => {
  switch (type) {
    case ActionTypes.CHANGE_CATEGORY_FILTER:
      return {
        ...state,
        categoryFilter: { ...state.categoryFilter, ...payload },
      };
    case ActionTypes.SET_WORKSHEET_COLLECTION:
      return {
        ...state,
        categories: payload.categories,
        workSheet: payload.workSheet,
      };
    case ActionTypes.CHANGE_WORKSHEET:
      return {
        ...state,
        workSheet: {
          ...state.workSheet,
          [payload.category]: [
            ...state.workSheet[payload.category],
            payload.question,
          ],
        },
      };
    default:
      throw new Error();
  }
};

const ManagerContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { workSheetCollection } = useWorkSheet("AS_FE");

  useEffect(() => {
    if (workSheetCollection) {
      dispatch({
        type: ActionTypes.SET_WORKSHEET_COLLECTION,
        payload: workSheetCollection,
      });
    }
  }, [workSheetCollection]);

  const changeCategoriesfilter = useCallback(
    (category: string, filter: boolean) => {
      dispatch({
        type: ActionTypes.CHANGE_CATEGORY_FILTER,
        payload: { [category]: filter },
      });
    },
    []
  );

  return workSheetCollection ? (
    <Presentation
      workSheet={state.workSheet}
      categories={state.categories}
      categoryFilter={state.categoryFilter}
      changeCategoriesfilter={changeCategoriesfilter}
    />
  ) : (
    <Progress />
  );
};

export default memo(ManagerContainer);
