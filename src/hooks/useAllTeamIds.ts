import { useContext, useEffect, useState, useCallback } from "react";
import { FirebaseContext } from "contexts";
import { getAllTeamIds } from "firestore/services/teamsCollection";

type Return = [string[], boolean, Error | null];

const useAllTeamIds = (): Return => {
  const [allTeamIds, setAllTeamIds] = useState<string[]>([]);
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
      const data = await getAllTeamIds(db);
      setAllTeamIds(data);
    });
  }, [db, load]);

  return [allTeamIds, loading, error];
};

export default useAllTeamIds;
