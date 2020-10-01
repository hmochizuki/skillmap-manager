import React, { memo } from "react";
import Progress from "components/common/atoms/Progress";
import useTeamMap from "hooks/useTeamMap";
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
  const [data, yearMonth, setTargetYearMonth, loading, error] = useTeamMap(
    "AS_FE"
  );

  return data && !error && !loading ? (
    <Presentation
      data={data}
      axis={axis}
      yearMonth={yearMonth}
      setYearMonth={setTargetYearMonth}
    />
  ) : (
    <Progress />
  );
};

export default memo(TeamMapContainer);
