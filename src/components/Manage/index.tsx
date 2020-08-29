import React, { memo, useEffect, useCallback } from "react";
import { WorkSheet, WorkSheetCollection } from "types/workSheet";
import useWorkSheet from "hooks/useWorkSheet";
import Progress from "components/common/atoms/Progress";
import {
  useWorkSheetReducer,
  setWorkSheetCollection,
  changeWorkSheet,
  addNewTextField,
  updateWorkSheet,
  removeWorkSheet,
  filterCategory,
  editCategories,
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

  const memoizedFilterCategory = useCallback(
    (category: string) => () => dispatch(filterCategory({ category })),
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

  const memoizedRemoveWorkSheet = useCallback(
    (category: string, index: number) => () =>
      dispatch(removeWorkSheet({ category, index })),
    [dispatch]
  );

  const memoizedEditCategories = useCallback(
    (index: number, value: string) =>
      dispatch(editCategories({ index, value })),
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
      filterCategory={memoizedFilterCategory}
      changeWorkSheet={memoizedChangeWorkSheet}
      addNewTextField={memoizedAddNewTextField}
      removeWorkSheet={memoizedRemoveWorkSheet}
      clickSubmitButton={memoizedUpdateWorkSheet}
    />
  ) : (
    <Progress />
  );
};

export default memo(ManagerContainer);
