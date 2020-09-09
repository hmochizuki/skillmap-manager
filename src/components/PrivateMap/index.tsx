import React, { memo } from "react";
import Progress from "components/common/atoms/Progress";
import usePrivateMap from "hooks/usePrivateMap";
import Presentation from "./organisms/PrivateMap";

const PrivateMapContainer = () => {
  const [
    dataForMonthly,
    dataForHistory,
    categoris,
    targetYearMonth,
    setTargetYearMonth,
    loading,
    error,
  ] = usePrivateMap("AS_FE");

  return !loading && !error ? (
    <Presentation
      dataForMonthly={dataForMonthly}
      dataForHistory={dataForHistory}
      categoris={categoris}
      targetYearMonth={targetYearMonth}
      setTargetYearMonth={setTargetYearMonth}
    />
  ) : (
    <Progress />
  );
};

export default memo(PrivateMapContainer);
