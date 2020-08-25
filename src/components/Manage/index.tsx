import React, {
  memo,
  useReducer,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { WorkSheet, WorkSheetCollection } from "types/workSheet";
import { Action } from "types/reducer";
import useWorkSheet from "hooks/useWorkSheet";
import Progress from "components/common/atoms/Progress";
import { updateWorkSheet } from "util/workSheet";
import { FirebaseContext } from "contexts";
import Presentation from "./organisms/Manage";

enum ActionTypes {
  CHANGE_CATEGORY_FILTER = "CHANGE_CATEGORY_FILTER",
  SET_WORKSHEET_COLLECTION = "SET_WORKSHEET_COLLECTION",
  CHANGE_WORKSHEET = "CHANGE_WORKSHEET",
  ADD_NEW_QUESTION = "ADD_NEW_QUESTION",
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
  { category: string; index: number; value: string }
>;

type AddNewQuestionAction = Action<
  ActionTypes.ADD_NEW_QUESTION,
  { category: string; value: string }
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
  | CategoryFilterAction
  | ChangeWorkSheetAction
  | SetWorkSheetCollection
  | AddNewQuestionAction
  // TODO: 型定義
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
      state.workSheet[payload.category].splice(payload.index, 1, payload.value);

      return {
        ...state,
        workSheet: {
          ...state.workSheet,
        },
      };
    case ActionTypes.ADD_NEW_QUESTION:
      state.workSheet[payload.category].push(payload.value);

      return {
        ...state,
        workSheet: {
          ...state.workSheet,
        },
      };
    default:
      throw new Error();
  }
};

const ManagerContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { db } = useContext(FirebaseContext);

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

  const changeWorkSheet = useCallback(
    (category: string, index: number, value: string) => {
      dispatch({
        type: ActionTypes.CHANGE_WORKSHEET,
        payload: { category, index, value },
      });
    },
    []
  );

  const addNewQuestion = useCallback((category: string, value: string) => {
    dispatch({
      type: ActionTypes.ADD_NEW_QUESTION,
      payload: { category, value },
    });
  }, []);

  const clickSubmitButton = (workSheet: WorkSheet) => {
    if (!db) return;
    updateWorkSheet(db, "AS_FE", workSheet);
  };

  return workSheetCollection ? (
    <Presentation
      workSheet={state.workSheet}
      categories={state.categories}
      categoryFilter={state.categoryFilter}
      changeCategoriesfilter={changeCategoriesfilter}
      changeWorkSheet={changeWorkSheet}
      addNewQuestion={addNewQuestion}
      clickSubmitButton={clickSubmitButton}
    />
  ) : (
    <Progress />
  );
};

export default memo(ManagerContainer);
