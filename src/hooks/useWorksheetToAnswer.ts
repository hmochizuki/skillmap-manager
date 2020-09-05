import { useContext, useEffect, useState, useCallback } from "react";
import { FirebaseContext, UserContext } from "contexts";
import { TeamDocument, Worksheet } from "firestore/types/Team";
import { getWorksheetDocument } from "firestore/services/teamsCollection";
import { updateAnswerDocument } from "firestore/services/answersCollection";

type Return = [
  TeamDocument | null,
  (date: Worksheet) => void,
  boolean,
  Error | null
];

const useWorksheetToAnswer = (teamId: string): Return => {
  const [teamDocument, setTeamDocument] = useState<TeamDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { db } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

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
    if (!db) throw new Error("firebase is not initialized");
    load(async () => {
      const worksheetData = await getWorksheetDocument(db, teamId);
      setTeamDocument(worksheetData);
    });
  }, [teamId, db, load]);

  const answerToWorksheet = useCallback(
    (data: Worksheet) => {
      if (!db) throw new Error("firebase is not initialized");
      if (!user) throw new Error("not authorized");
      load(async () => {
        await updateAnswerDocument(db, teamId, user.uid, data);
      });
    },
    [teamId, user, db, load]
  );

  return [teamDocument, answerToWorksheet, loading, error];
};

export default useWorksheetToAnswer;