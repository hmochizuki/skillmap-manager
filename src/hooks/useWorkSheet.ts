import { useContext, useEffect, useRef, useState } from "react";
import { FirebaseContext } from "contexts";
import { getWorkSheet } from "util/workSheet";
import { WorkSheetCollection } from "types/workSheet";

const useWorkSheet = (id: string) => {
  const [workSheetCollection, setWorkSheetCollection] = useState<
    WorkSheetCollection
  >();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const firebaseRef = useRef(useContext(FirebaseContext));

  useEffect(() => {
    const { db } = firebaseRef.current;
    if (!db) throw new Error("firebase is not initialized");

    const load = async () => {
      setLoading(true);
      try {
        const workSheetData = await getWorkSheet(db, id);
        setWorkSheetCollection(workSheetData);
        setError(null);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    load();
  }, [id]);

  return { workSheetCollection, loading, error };
};

export default useWorkSheet;
