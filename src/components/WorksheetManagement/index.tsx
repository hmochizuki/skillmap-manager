import React, { memo, useEffect, useCallback, useState } from "react";
import useWorksheet from "hooks/useWorksheet";
import Progress from "components/common/atoms/Progress";
import { Worksheet } from "types/workSheet";
import shortid from "shortid";
import Presentation from "./organisms/Manage";
import { WorksheetWithFilter, emptyWorkSheetWithFilter } from "./type";

const ManageContainer = () => {
  const [worksheetDocument, updateWorksheetDocument, loading] = useWorksheet(
    "AS_FE"
  );

  const [worksheet, setWorksheet] = useState<WorksheetWithFilter>(
    emptyWorkSheetWithFilter
  );

  useEffect(() => {
    if (worksheetDocument) {
      setWorksheet(
        worksheetDocument.worksheet.map((category) => ({
          ...category,
          filtered: false,
          questions: [
            ...category.questions,
            { id: shortid.generate(), value: "" },
          ],
        }))
      );
    }
  }, [worksheetDocument]);

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

  const updateWorksheetDoc = useCallback(
    (worksheetWithFilter: WorksheetWithFilter) => () => {
      const ws: Worksheet = worksheetWithFilter.map((category) => {
        return {
          id: category.id,
          name: category.name,
          questions: category.questions.filter((q) => q.value !== ""),
        };
      });
      updateWorksheetDocument(ws);
    },
    [updateWorksheetDocument]
  );

  const updateWorksheetState = useCallback((ws: WorksheetWithFilter) => {
    setWorksheet(ws);
  }, []);

  return worksheetDocument && !loading ? (
    <Presentation
      worksheetWithFilter={worksheet}
      filterCategory={filterCategory}
      editQuestion={editQuestion}
      addNewQuestion={addNewQuestion}
      removeQuestion={removeQuestion}
      updateWorksheetDoc={updateWorksheetDoc}
      updateWorksheetState={updateWorksheetState}
    />
  ) : (
    <Progress />
  );
};

export default memo(ManageContainer);
