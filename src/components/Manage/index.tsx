/* eslint-disable no-case-declarations */
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
  ADD_NEW_TEXTFIELD = "ADD_NEW_TEXTFIELD",
  UPDATE_WORKSHEET = "UPDATE_WORKSHEET",
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

type AddNewTextFieldAction = Action<
  ActionTypes.ADD_NEW_TEXTFIELD,
  { category: string }
>;

type UpdateWorkSheetAction = Action<
  ActionTypes.UPDATE_WORKSHEET,
  { categories: WorkSheetCollection["categories"]; workSheet: WorkSheet }
>;

type State = {
  resource: {
    categories: WorkSheetCollection["categories"];
    workSheet: WorkSheet;
  };
  form: {
    categories: WorkSheetCollection["categories"];
    workSheet: WorkSheet;
  };
  categoryFilter: Record<string, boolean>;
};

const initialState: State = {
  resource: {
    categories: [],
    workSheet: {},
  },
  form: {
    categories: [],
    workSheet: {},
  },
  categoryFilter: {},
};

const reducer: React.Reducer<
  State,
  | CategoryFilterAction
  | ChangeWorkSheetAction
  | SetWorkSheetCollection
  | AddNewTextFieldAction
  | UpdateWorkSheetAction
  // TODO: 型定義
> = (state: State, { type, payload }: Action<ActionTypes, any>) => {
  const createFormWorkSheetFromCollection = (workSheet: WorkSheet) =>
    Object.keys(workSheet).reduce((acc, key) => {
      return { ...acc, [key]: [...workSheet[key], ""] };
    }, {});
  switch (type) {
    case ActionTypes.CHANGE_CATEGORY_FILTER:
      return {
        ...state,
        categoryFilter: { ...state.categoryFilter, ...payload },
      };
    case ActionTypes.SET_WORKSHEET_COLLECTION:
      return {
        ...state,
        resource: {
          categories: payload.categories,
          workSheet: payload.workSheet,
        },
        form: {
          categories: payload.categories,
          workSheet: createFormWorkSheetFromCollection(payload.workSheet),
        },
      };
    case ActionTypes.CHANGE_WORKSHEET:
      state.form.workSheet[payload.category].splice(
        payload.index,
        1,
        payload.value
      );

      return {
        ...state,
        form: {
          ...state.form,
          workSheet: {
            ...state.form.workSheet,
          },
        },
      };
    case ActionTypes.ADD_NEW_TEXTFIELD:
      state.form.workSheet[payload.category].push("");

      return {
        ...state,
        form: {
          ...state.form,
          workSheet: {
            ...state.form.workSheet,
          },
        },
      };
    case ActionTypes.UPDATE_WORKSHEET:
      return {
        ...state,
        resource: {
          categories: payload.categories,
          workSheet: payload.workSheet,
        },
        form: {
          categories: payload.categories,
          workSheet: createFormWorkSheetFromCollection(payload.workSheet),
        },
      };
    default:
      throw new Error();
  }
};

const ManagerContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    workSheetCollection,
    updateWorkSheetCollection,
    loading,
  } = useWorkSheet("AS_FE");

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

  const addNewTextField = useCallback((category: string) => {
    dispatch({
      type: ActionTypes.ADD_NEW_TEXTFIELD,
      payload: { category },
    });
  }, []);

  const updateWorkSheet = useCallback(
    (categories: WorkSheetCollection["categories"], workSheet: WorkSheet) => {
      const fiteredWorkSheet = Object.keys(workSheet).reduce((acc, key) => {
        return { ...acc, [key]: workSheet[key].filter((e) => e !== "") };
      }, {});

      updateWorkSheetCollection(fiteredWorkSheet);
      dispatch({
        type: ActionTypes.UPDATE_WORKSHEET,
        payload: { categories, workSheet: fiteredWorkSheet },
      });
    },
    [updateWorkSheetCollection]
  );

  return !loading && workSheetCollection ? (
    <Presentation
      workSheet={state.form.workSheet}
      categories={state.form.categories}
      categoryFilter={state.categoryFilter}
      changeCategoriesfilter={changeCategoriesfilter}
      changeWorkSheet={changeWorkSheet}
      addNewTextField={addNewTextField}
      clickSubmitButton={updateWorkSheet}
    />
  ) : (
    <Progress />
  );
};

export default memo(ManagerContainer);
