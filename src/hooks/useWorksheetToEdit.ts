import { useContext, useEffect, useState, useCallback } from "react";
import { FirebaseContext, TeamContext } from "contexts";
import { TeamDocument, Worksheet } from "firestore/types/Team";
import {
  getWorksheetDocument,
  updateWorksheet as update,
} from "firestore/services/teamsCollection";

type Return = [
  TeamDocument | undefined,
  (date: Worksheet) => Promise<void>,
  boolean,
  Error | null
];

const useWorksheetToAnswer = (): Return => {
  const [teamDocument, setTeamDocument] = useState<TeamDocument>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { db } = useContext(FirebaseContext);
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
    if (!db) throw new Error("firebase is not initialized");
    if (!teamId) throw new Error("not authorized");
    load(async () => {
      const worksheetData = await getWorksheetDocument(db, teamId);
      setTeamDocument(worksheetData);
    });
  }, [teamId, db, load]);

  const updateWorksheet = useCallback(
    async (data: Worksheet) => {
      if (!db) throw new Error("firebase is not initialized");
      if (!teamId) throw new Error("not authorized");

      return load(async () => {
        await update(db, teamId, data);
      });
    },
    [teamId, db, load]
  );

  return [teamDocument, updateWorksheet, loading, error];
};

export default useWorksheetToAnswer;
