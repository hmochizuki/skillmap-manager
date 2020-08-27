import React, { memo, useEffect, useCallback } from "react";
import { WorkSheet, WorkSheetCollection } from "types/workSheet";
import useWorkSheet from "hooks/useWorkSheet";
import Progress from "components/common/atoms/Progress";
import {
  useWorkSheetReducer,
  setWorkSheetCollection,
  changeCategoryFilter,
  changeWorkSheet,
  addNewTextField,
  updateWorkSheet,
} from "hooks/useReducers/workSheetManagement";
import Presentation from "./organisms/Manage";

const ManagerContainer = () => {
  const { state, dispatch } = useWorkSheetReducer();
  const {
    workSheetCollection,
    updateWorkSheetCollection,
    loading,
  } = useWorkSheet("AS_FE");

  useEffect(() => {
    if (workSheetCollection) {
      dispatch(setWorkSheetCollection(workSheetCollection));
    }
  }, [workSheetCollection, dispatch]);

  const changeCategoriesfilter = useCallback(
    (category: string, filter: boolean) => {
      dispatch(changeCategoryFilter({ [category]: filter }));
    },
    [dispatch]
  );

  const memoizedChangeWorkSheet = useCallback(
    (category: string, index: number, value: string) => {
      dispatch(changeWorkSheet({ category, index, value }));
    },
    [dispatch]
  );

  const memoizedAddNewTextField = useCallback(
    (category: string) => {
      dispatch(addNewTextField({ category }));
    },
    [dispatch]
  );

  const memoizedUpdateWorkSheet = useCallback(
    (categories: WorkSheetCollection["categories"], workSheet: WorkSheet) => {
      const fiteredWorkSheet = Object.keys(workSheet).reduce((acc, key) => {
        return { ...acc, [key]: workSheet[key].filter((e) => e !== "") };
      }, {});

      updateWorkSheetCollection(fiteredWorkSheet);
      dispatch(updateWorkSheet({ categories, workSheet: fiteredWorkSheet }));
    },
    [updateWorkSheetCollection, dispatch]
  );

  return !loading && workSheetCollection ? (
    <Presentation
      workSheet={state.form.workSheet}
      categories={state.form.categories}
      categoryFilter={state.categoryFilter}
      changeCategoriesfilter={changeCategoriesfilter}
      changeWorkSheet={memoizedChangeWorkSheet}
      addNewTextField={memoizedAddNewTextField}
      clickSubmitButton={memoizedUpdateWorkSheet}
    />
  ) : (
    <Progress />
  );
};

export default memo(ManagerContainer);
