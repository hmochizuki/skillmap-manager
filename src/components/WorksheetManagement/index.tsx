import React, { memo, useEffect, useCallback, useState } from "react";
import useWorksheetToEdit from "hooks/useWorksheetToEdit";
import Progress from "components/common/atoms/Progress";
import { Worksheet } from "firestore/types/Team";
import shortid from "shortid";
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

  const updateWorksheet = useCallback(
    (worksheetWithFilter: WorksheetWithFilter) => () => {
      const ws: Worksheet = worksheetWithFilter.map((category) => {
        return {
          id: category.id,
          name: category.name,
          questions: category.questions.filter((q) => q.value !== ""),
        };
      });
      updateTeamDocment(ws);
    },
    [updateTeamDocment]
  );

  const updateWorksheetState = useCallback((ws: WorksheetWithFilter) => {
    setWorksheet(ws);
  }, []);

  return teamDocument && !loading ? (
    <Presentation
      worksheetWithFilter={worksheet}
      filterCategory={filterCategory}
      editQuestion={editQuestion}
      addNewQuestion={addNewQuestion}
      removeQuestion={removeQuestion}
      updateWorksheet={updateWorksheet}
      updateWorksheetState={updateWorksheetState}
    />
  ) : (
    <Progress />
  );
};

export default memo(ManageContainer);
