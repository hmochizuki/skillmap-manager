import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { FirebaseContext, TeamContext } from "contexts";
import { SkillmapDocument } from "firestore/types/Skillmap";
import { getAllSkillmapDocument } from "firestore/services/skillmapCollection";

type Return = [Record<string, SkillmapDocument>, boolean, Error | null];

const useTeamMap = (): Return => {
  const { teamId } = useContext(TeamContext);
  const [skillmapDocuments, setSkillmapDocuments] = useState<
    SkillmapDocument[] | null
  >(null);

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
    if (!db || !teamId) return;
    load(async () => {
      const skillmapDocs = await getAllSkillmapDocument(db, teamId);
      setSkillmapDocuments(skillmapDocs);
    });
  }, [db, teamId, load]);

  const data = useMemo(
    () =>
      skillmapDocuments?.reduce(
        (acc, skillmapDoc) => ({
          ...acc,
          [skillmapDoc.yearMonth]: skillmapDoc,
        }),
        {}
      ) || {},
    [skillmapDocuments]
  ) as Record<string, SkillmapDocument>;

  return [data, loading, error];
};

export default useTeamMap;
