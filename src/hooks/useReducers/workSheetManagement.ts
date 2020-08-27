import { WorkSheetCollection, WorkSheet } from "types/workSheet";
import { actionCreatorFactory, Action } from "util/reducers";
import { useReducer } from "react";

const createAction = actionCreatorFactory("WORKSHEET_MANGE");

export const changeCategoryFilter = createAction<Record<string, boolean>>(
  "CHANGE_CATEGORY_FILTER"
);

export const setWorkSheetCollection = createAction<WorkSheetCollection>(
  "SET_WORKSHEET_COLLECTION"
);

export const changeWorkSheet = createAction<{
  category: string;
  index: number;
  value: string;
}>("CHANGE_WORKSHEET");

export const addNewTextField = createAction<{ category: string }>(
  "ADD_NEW_TEXTFIELD"
);

export const updateWorkSheet = createAction<{
  categories: WorkSheetCollection["categories"];
  workSheet: WorkSheet;
}>("UPDATE_WORKSHEET");

export const removeWorkSheet = createAction<{
  category: string;
  index: number;
}>("REMOVE_WORKSHEET");

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
  | ReturnType<typeof changeCategoryFilter>
  | ReturnType<typeof changeWorkSheet>
  | ReturnType<typeof setWorkSheetCollection>
  | ReturnType<typeof addNewTextField>
  | ReturnType<typeof removeWorkSheet>
  | ReturnType<typeof updateWorkSheet>
  // TODO: 型定義
> = (state: State, { type, payload }: Action<any>) => {
  const createFormWorkSheetFromCollection = (workSheet: WorkSheet) =>
    Object.keys(workSheet).reduce((acc, key) => {
      return { ...acc, [key]: [...workSheet[key], ""] };
    }, {});
  switch (type) {
    case changeCategoryFilter.type:
      return {
        ...state,
        categoryFilter: { ...state.categoryFilter, ...payload },
      };
    case setWorkSheetCollection.type:
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
    case changeWorkSheet.type:
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
    case addNewTextField.type:
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
    case removeWorkSheet.type:
      state.form.workSheet[payload.category].splice(payload.index, 1);

      return {
        ...state,
        form: {
          ...state.form,
          workSheet: {
            ...state.form.workSheet,
          },
        },
      };
    case updateWorkSheet.type:
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

export const useWorkSheetReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};
