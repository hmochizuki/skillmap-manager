import React, {
  memo,
  useState,
  useContext,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { SkillmapDocument } from "firestore/types/Skillmap";
import { getYearMonth } from "util/getYearMonth";
import { FirebaseContext, UserContext } from "contexts";
import { getAllSkillmapDocument } from "firestore/services/skillmapCollection";
import Progress from "components/common/atoms/Progress";
import Presentation from "./organisms/TeamMap";

const axis = {
  x: {
    key: "average",
    label: "平均",
  },
  y: {
    key: "variance",
    label: "分散",
  },
  z: {
    key: "total",
    label: "総計",
  },
};

const TeamMapContainer = () => {
  const [skillmapDocuments, setSkillmapDocuments] = useState<
    SkillmapDocument[] | null
  >(null);
  const [targetYearMonth, setTargetYearMonth] = useState<string>(
    getYearMonth()
  );
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
    if (!db || !user) return;
    load(async () => {
      const skillmapDocs = await getAllSkillmapDocument(db, "AS_FE");
      setSkillmapDocuments(skillmapDocs);
    });
  }, [db, user, load]);

  const data = useMemo(
    () =>
      skillmapDocuments?.find((s) => s.yearMonth === targetYearMonth)?.scores,
    [skillmapDocuments, targetYearMonth]
  );

  return data && !loading ? (
    <Presentation data={data} axis={axis} />
  ) : (
    <Progress />
  );
};

export default memo(TeamMapContainer);
