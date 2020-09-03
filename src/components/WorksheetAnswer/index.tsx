import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import useWorksheet from "hooks/useWorksheet";
import {
  emptyWorkSheetWithFilter,
  WorksheetWithFilter,
} from "components/WorksheetManagement/type";
import Progress from "components/common/atoms/Progress";
import { FirebaseContext, UserContext } from "contexts";
import { updateAnswerDocument } from "util/answersCollection";
import Presentation from "./organisms/Answer";

const AnswerContainer = () => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [worksheetDocument, _, loading] = useWorksheet("AS_FE");
  const [worksheetWithFilter, setWorksheetWithFilter] = useState(
    emptyWorkSheetWithFilter
  );

  useEffect(() => {
    if (worksheetDocument) {
      setWorksheetWithFilter(
        worksheetDocument.worksheet.map((category) => ({
          ...category,
          filtered: false,
          questions: category.questions.map((q) => ({ ...q, checked: false })),
        }))
      );
    }
  }, [worksheetDocument]);

  const filterCategory = useCallback(
    (categoryId: string) => () => {
      const next = worksheetWithFilter.map((category) =>
        category.id === categoryId
          ? { ...category, filtered: !category.filtered }
          : category
      );
      setWorksheetWithFilter(next);
    },
    [worksheetWithFilter]
  );

  const checkQuestion = useCallback(
    (categoryId: string) => (questionId: string) => () => {
      const next = worksheetWithFilter.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              questions: category.questions.map((q) =>
                q.id === questionId ? { ...q, checked: !q.checked } : q
              ),
            }
          : category
      );
      setWorksheetWithFilter(next);
    },
    [worksheetWithFilter]
  );

  const updateAnswer = (worksheet: WorksheetWithFilter) => () => {
    if (!db) throw new Error("firebase is not initialized");
    if (!user) throw new Error("not authorized");
    updateAnswerDocument(db, user.uid, "AS_FE", worksheet);
  };

  return worksheetDocument && !loading ? (
    <Presentation
      worksheetWithFilter={worksheetWithFilter}
      filterCategory={filterCategory}
      checkQuestion={checkQuestion}
      updateAnswerDocument={updateAnswer}
    />
  ) : (
    <Progress />
  );
};

export default memo(AnswerContainer);
