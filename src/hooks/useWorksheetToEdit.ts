import { useContext, useEffect, useState, useCallback } from "react";
import { FirebaseContext } from "contexts";
import { TeamDocument, Worksheet } from "firestore/types/Team";
import {
  getWorksheetDocument,
  updateWorksheet as update,
} from "firestore/services/teamsCollection";

type Return = [
  TeamDocument | undefined,
  (date: Worksheet) => void,
  boolean,
  Error | null
];

const useWorksheetToAnswer = (id: string): Return => {
  const [teamDocument, setTeamDocument] = useState<TeamDocument>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { db } = useContext(FirebaseContext);

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
      const worksheetData = await getWorksheetDocument(db, id);
      setTeamDocument(worksheetData);
    });
  }, [id, db, load]);

  const updateWorksheet = useCallback(
    (data: Worksheet) => {
      if (!db) throw new Error("firebase is not initialized");
      load(async () => {
        await update(db, id, data);
      });
    },
    [id, db, load]
  );

  return [teamDocument, updateWorksheet, loading, error];
};

export default useWorksheetToAnswer;
