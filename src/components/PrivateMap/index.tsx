import React, {
  memo,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { getAllAnswersDocument } from "firestore/services/answersCollection";
import { FirebaseContext, UserContext } from "contexts";
import Progress from "components/common/atoms/Progress";
import { AnswerDocument } from "firestore/types/Answer";
import { getYearMonth } from "util/getYearMonth";
import { Worksheet } from "firestore/types/Team";
import Presentation from "./organisms/PrivateMap";

const PrivateMapContainer = () => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const [answers, setAnswers] = useState<AnswerDocument[] | null>(null);
  const [targetYearMonth, setTargetYearMonth] = useState<string>(
    getYearMonth()
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async (loadEvent: () => Promise<void>) => {
    setLoading(true);
    try {
      await loadEvent();
      setError(null);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!db || !user) return;
    load(async () => {
      const answersDoc = await getAllAnswersDocument(db, "AS_FE", user.uid);
      setAnswers(answersDoc);
    });
  }, [db, user, load]);

  const convert = (
    answerDoc: AnswerDocument
  ): Record<string, number | string> => {
    const categoryNames = answerDoc.answer.reduce((acc, category) => {
      return { ...acc, [category.name]: category.point };
    }, []);

    // @ts-ignore
    return { yearMonth: answerDoc.yearMonth, ...categoryNames };
  };

  const dataForMonthly = useMemo(() => {
    if (!answers) return;
    const target = answers.find((ans) => {
      return ans.yearMonth === targetYearMonth;
    }) as AnswerDocument;

    // eslint-disable-next-line consistent-return
    return target.answer;
  }, [answers, targetYearMonth]) as Worksheet;

  // TODO
  if (!answers) return <Progress />;
  // @ts-ignore
  const dataForHistory: (Record<string, number> &
    Record<"yearMonth", string>)[] = answers.reduce(
    // @ts-ignore
    (acc, ansDoc) => [...acc, convert(ansDoc)],
    []
  );

  return answers && !loading && !error ? (
    <Presentation
      answers={answers}
      // targetYearMonth={targetYearMonth}
      dataForMonthly={dataForMonthly}
      dataForHistory={dataForHistory}
    />
  ) : (
    <Progress />
  );
};

export default memo(PrivateMapContainer);
