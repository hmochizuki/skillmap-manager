import React, {
  memo,
  useEffect,
  useCallback,
  useState,
  useContext,
} from "react";
import useWorksheetToEdit from "hooks/useWorksheetToEdit";
import Progress from "components/common/atoms/Progress";
import { Worksheet } from "firestore/types/Team";
import shortid from "shortid";
import { ToastContext } from "contexts";
import { showSuccessMessage } from "reducers/toast";
import { useHistory } from "react-router";
import routeNames from "router/routeNames";
import Presentation from "./organisms/Manage";
import { WorksheetWithFilter, emptyWorkSheetWithFilter } from "./type";

const ManageContainer = () => {
  const [teamDocument, updateTeamDocment, loading] = useWorksheetToEdit();
  const [worksheet, setWorksheet] = useState<WorksheetWithFilter>(
    emptyWorkSheetWithFilter
  );

  useEffect(() => {
    if (teamDocument) {
      setWorksheet(
        teamDocument.worksheet.map((category) => ({
          ...category,
          filtered: false,
          questions: [
            ...category.questions,
            { id: shortid.generate(), value: "" },
          ],
        }))
      );
    }
  }, [teamDocument]);

  const filterCategory = useCallback(
    (categoryId: string) => () => {
      const next = worksheet.map((category) =>
        category.id === categoryId
          ? { ...category, filtered: !category.filtered }
          : category
      );
      setWorksheet(next);
    },
    [worksheet]
  );

  const editQuestion = useCallback(
    (categoryId: string) => (questionId: string) => (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const next = worksheet.map((category) => {
        if (category.id !== categoryId) return category;
        const questions = category.questions.map((q) =>
          q.id === questionId ? { ...q, value: event.target.value } : q
        );

        return { ...category, questions };
      });
      setWorksheet(next);
    },
    [worksheet]
  );

  const addNewQuestion = useCallback(
    (categoryId: string) => () => {
      const next = worksheet.map((category) => {
        if (category.id !== categoryId) return category;

        return {
          ...category,
          questions: [
            ...category.questions,
            { id: shortid.generate(), value: "" },
          ],
        };
      });
      setWorksheet(next);
    },
    [worksheet]
  );

  const removeQuestion = useCallback(
    (categoryId: string) => (questionId: string) => () => {
      const next = worksheet.map((category) => {
        if (category.id !== categoryId) return category;
        const questions = category.questions.filter((q) => q.id !== questionId);

        return { ...category, questions };
      });
      setWorksheet(next);
    },
    [worksheet]
  );

  const { dispatch } = useContext(ToastContext);
  const history = useHistory();

  const updateWorksheet = useCallback(
    (worksheetWithFilter: WorksheetWithFilter) => () => {
      const ws: Worksheet = worksheetWithFilter.map((category) => {
        return {
          id: category.id,
          name: category.name,
          questions: category.questions.filter((q) => q.value !== ""),
        };
      });
      updateTeamDocment(ws).then(() => {
        dispatch(
          showSuccessMessage(
            `ワークシートの更新に成功しました。次はワークシートに回答してみましょう。`
          )
        );
        history.push(routeNames.home);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateTeamDocment]
  );

  const updateWorksheetState = useCallback((ws: WorksheetWithFilter) => {
    setWorksheet(ws);
  }, []);

  return teamDocument && !loading ? (
    <>
      <Presentation
        worksheetWithFilter={worksheet}
        filterCategory={filterCategory}
        editQuestion={editQuestion}
        addNewQuestion={addNewQuestion}
        removeQuestion={removeQuestion}
        updateWorksheet={updateWorksheet}
        updateWorksheetState={updateWorksheetState}
      />
    </>
  ) : (
    <Progress />
  );
};

export default memo(ManageContainer);
