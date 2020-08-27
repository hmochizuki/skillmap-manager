import { useContext, useEffect, useState, useCallback } from "react";
import { FirebaseContext } from "contexts";
import { getWorkSheet, updateWorkSheet } from "util/workSheet";
import { WorkSheetCollection, WorkSheet } from "types/workSheet";

const useWorkSheet = (id: string) => {
  const [workSheetCollection, setWorkSheetCollection] = useState<
    WorkSheetCollection
  >();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { db } = useContext(FirebaseContext);

  const load = useCallback(async (loadEvent: () => Promise<any>) => {
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
      const workSheetData = await getWorkSheet(db, id);
      setWorkSheetCollection(workSheetData);
    });
  }, [id, db, load]);

  const updateWorkSheetCollection = useCallback(
    (data: WorkSheet) => {
      if (!db) throw new Error("firebase is not initialized");
      load(async () => {
        await updateWorkSheet(db, id, data);
      });
    },
    [id, db, load]
  );

  return { workSheetCollection, updateWorkSheetCollection, loading, error };
};

export default useWorkSheet;
