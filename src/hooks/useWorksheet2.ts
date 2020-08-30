import { useContext, useEffect, useState, useCallback } from "react";
import { FirebaseContext } from "contexts";
import { WorksheetDocument, Worksheet } from "types/workSheet";
import {
  getWorksheetDocument,
  updateWorksheetDocument as update,
} from "util/worksheetsCollection";

type Return = [
  WorksheetDocument | undefined,
  (date: Worksheet) => void,
  boolean,
  Error | null
];

const useWorksheet = (id: string): Return => {
  const [worksheetDocument, setWorksheetDocument] = useState<
    WorksheetDocument
  >();
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
      const workSheetData = await getWorksheetDocument(db, id);
      setWorksheetDocument(workSheetData);
    });
  }, [id, db, load]);

  const updateWorksheetDocument = useCallback(
    (data: Worksheet) => {
      if (!db) throw new Error("firebase is not initialized");
      load(async () => {
        await update(db, id, data);
      });
    },
    [id, db, load]
  );

  return [worksheetDocument, updateWorksheetDocument, loading, error];
};

export default useWorksheet;
