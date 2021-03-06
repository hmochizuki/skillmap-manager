import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { FirebaseContext, UserContext, TeamContext } from "contexts";
import { getAllAnswersDocument } from "firestore/services/answersCollection";
import { AnswerDocument, AnsweredWorksheet } from "firestore/types/Answer";
import { getYearMonth } from "util/getYearMonth";

const convert = (
  answerDoc: AnswerDocument
): Record<string, number | string> => {
  const categoryNames = answerDoc.answer.reduce<Record<string, number>>(
    (acc, category) => {
      return { ...acc, [category.name]: category.point };
    },
    {}
  );

  return { ...categoryNames, yearMonth: answerDoc.yearMonth };
};

const getDataForHistory = (
  answerDocs: AnswerDocument[] | null
): Array<Record<string, number | string>> => {
  if (!answerDocs) return [];

  return answerDocs.reduce<Array<Record<string, number | string>>>(
    (acc, ansDoc) => [...acc, convert(ansDoc)],
    []
  );
};

const getCategoryNames = (answerDocs: AnswerDocument[] | null): string[] => {
  if (!answerDocs) return [];
  const answerDoc = answerDocs[answerDocs.length - 1];

  return answerDoc.answer.reduce<string[]>((acc, category) => {
    return [...acc, category.name];
  }, []);
};

type Return = [
  AnsweredWorksheet,
  Array<Record<string, number | string>>,
  string[],
  string,
  (targetYearMonth: string) => void,
  boolean,
  Error | null
];

const usePrivateMap = (): Return => {
  const [answerDocuments, setAnswerDocuments] = useState<
    AnswerDocument[] | null
  >(null);
  const [targetYearMonth, setTargetYearMonth] = useState<string>(
    getYearMonth()
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { db } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const { teamId } = useContext(TeamContext);

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
    if (!db || !user || !teamId) return;
    load(async () => {
      const answerDocs = await getAllAnswersDocument(db, teamId, user.uid);
      setAnswerDocuments(answerDocs);
    });
  }, [db, teamId, user, load]);

  const dataForMonthly = useMemo(() => {
    if (!answerDocuments) return [];
    const target = answerDocuments.find((ans) => {
      return ans.yearMonth === targetYearMonth;
    }) as AnswerDocument;

    if (!target) {
      setError(new Error(`answerDocument of ${targetYearMonth} is not find`));

      return [];
    }

    return target.answer;
  }, [answerDocuments, targetYearMonth]);

  const dataForHistory = useMemo(() => getDataForHistory(answerDocuments), [
    answerDocuments,
  ]);

  const categoris: string[] = useMemo(() => getCategoryNames(answerDocuments), [
    answerDocuments,
  ]);

  return [
    dataForMonthly,
    dataForHistory,
    categoris,
    targetYearMonth,
    setTargetYearMonth,
    loading,
    error,
  ];
};

export default usePrivateMap;
