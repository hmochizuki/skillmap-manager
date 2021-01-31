import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import useWorksheetToAnswer from "hooks/useWorksheetToAnswer";
import {
  emptyWorkSheetWithFilter,
  WorksheetWithFilter,
} from "components/WorksheetManagement/type";
import Progress from "components/common/atoms/Progress";
import { ToastContext } from "contexts";
import { useHistory } from "react-router";
import { showSuccessMessage } from "reducers/toast";
import routeNames from "router/routeNames";
import Presentation from "./organisms/Answer";

const AnswerContainer = () => {
  const [teamDocument, answerToWorksheet, loading] = useWorksheetToAnswer();
  const [worksheetWithFilter, setWorksheetWithFilter] = useState(
    emptyWorkSheetWithFilter
  );

  useEffect(() => {
    if (teamDocument) {
      setWorksheetWithFilter(
        teamDocument.worksheet.map((category) => ({
          ...category,
          filtered: false,
          questions: category.questions.map((q) => ({ ...q, checked: false })),
        }))
      );
    }
  }, [teamDocument]);

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

  const { dispatch } = useContext(ToastContext);
  const history = useHistory();

  const updateAnswer = useCallback(
    (worksheet: WorksheetWithFilter) => () => {
      answerToWorksheet(worksheet).then(() => {
        dispatch(
          showSuccessMessage(
            `ワークシートの回答に成功しました。次はあなたやチームのスキルを分析してみましょう。`
          )
        );
        history.push(routeNames.home);
      });
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return teamDocument && !loading ? (
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
