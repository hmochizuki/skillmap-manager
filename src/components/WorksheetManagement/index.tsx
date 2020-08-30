import React, { memo, useEffect, useCallback, useState } from "react";
import useWorksheet from "hooks/useWorksheet";
import Progress from "components/common/atoms/Progress";
import { Worksheet } from "types/workSheet";
import Presentation from "./organisms/Manage";
import { WorksheetWithFilter, emptyWorkSheetWithFilter } from "./type";

const ManagerContainer = () => {
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
          questions: [...category.questions, ""],
        }))
      );
    }
  }, [worksheetDocument]);

  const filterCategory = useCallback(
    (targetCategoty: string) => () => {
      const next = worksheet.map((e) =>
        e.category === targetCategoty ? { ...e, filtered: !e.filtered } : e
      );
      setWorksheet(next);
    },
    [worksheet]
  );

  const editQuestion = useCallback(
    (category: string) => (index: number) => (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const next = worksheet.map((e) => {
        if (e.category !== category) return e;
        const questions = e.questions.map((q, i) =>
          i === index ? event.target.value : q
        );

        return { ...e, questions };
      });
      setWorksheet(next);
    },
    [worksheet]
  );

  const addNewQuestion = useCallback(
    (category: string) => () => {
      const next = worksheet.map((e) => {
        if (e.category !== category) return e;

        return { ...e, questions: [...e.questions, ""] };
      });
      setWorksheet(next);
    },
    [worksheet]
  );
  const removeQuestion = useCallback(
    (category: string) => (index: number) => () => {
      const next = worksheet.map((e) => {
        if (e.category !== category) return e;
        const questions = e.questions.filter((_, i) => i !== index);

        return { ...e, questions };
      });
      setWorksheet(next);
    },
    [worksheet]
  );

  const updateWorksheetDoc = useCallback(
    (worksheetWithFilter: WorksheetWithFilter) => () => {
      const ws: Worksheet = worksheetWithFilter.map((e) => {
        return {
          category: e.category,
          questions: e.questions.filter((q) => q !== ""),
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

export default memo(ManagerContainer);
