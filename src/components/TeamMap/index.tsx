import React, { memo, useCallback, useEffect, useState } from "react";
import Progress from "components/common/atoms/Progress";
import useTeamMap from "hooks/useTeamMap";
import { Score } from "firestore/types/Skillmap";
import Presentation from "./organisms/TeamMap";

const TeamMapContainer = () => {
  const [scores, yearMonth, setTargetYearMonth, loading, error] = useTeamMap();

  const [data, setData] = useState<(Score & { hide: boolean })[]>([]);

  useEffect(() => {
    setData(
      scores.map((score) => ({
        ...score,
        hide: false,
      }))
    );
  }, [scores]);

  const filterCategory = useCallback(
    (categoryId: string) => () => {
      setData(
        data.map((d) =>
          d.categoryId === categoryId ? { ...d, hide: !d.hide } : d
        )
      );
    },
    [data]
  );

  return data && !error && !loading ? (
    <Presentation
      data={data}
      yearMonth={yearMonth}
      setYearMonth={setTargetYearMonth}
      filterCategory={filterCategory}
    />
  ) : (
    <Progress />
  );
};

export default memo(TeamMapContainer);
