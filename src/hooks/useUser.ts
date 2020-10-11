import { useContext, useEffect, useState, useCallback } from "react";
import { FirebaseContext, UserContext } from "contexts";
import { UserDocument } from "firestore/types/User";
import { getUserDocument } from "firestore/services/userCollection";

type Return = [UserDocument | null, boolean, Error | null];

const useUser = (): Return => {
  const [userDoc, setUserDoc] = useState<UserDocument | null>(null);
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
    if (!user) throw new Error("not authorized");
    load(async () => {
      const userData = await getUserDocument(db, user.uid);
      setUserDoc(userData);
    });
  }, [user, db, load]);

  return [userDoc, loading, error];
};

export default useUser;
