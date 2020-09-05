import React, {
  memo,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getAllAnswersDocument } from "firestore/services/answersCollection";
import { FirebaseContext, UserContext } from "contexts";
import Progress from "components/common/atoms/Progress";
import { AnswerDocument } from "firestore/types/Answer";
import { getYearMonth } from "util/getYearMonth";
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

  return answers && !loading && !error ? (
    <Presentation answers={answers} targetYearMonth={targetYearMonth} />
  ) : (
    <Progress />
  );
};

export default memo(PrivateMapContainer);
