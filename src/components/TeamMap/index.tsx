import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Progress from "components/common/atoms/Progress";
import useTeamMap from "hooks/useTeamMap";
import Presentation from "./organisms/TeamMap";

const axis = {
  x: {
    key: "average",
    label: "平均",
  },
  y: {
    key: "deviation",
    label: "標準偏差",
  },
  z: {
    key: "total",
    label: "総計",
  },
};

const TeamMapContainer = () => {
  const [data, yearMonth, setTargetYearMonth, loading, error] = useTeamMap();

  const [categoryFilter, setCategoryFilter] = useState<
    { id: string; name: string; filtered: boolean }[]
  >([]);

  useEffect(() => {
    setCategoryFilter(
      data.map((d) => ({
        id: d.categoryId,
        name: d.category,
        filtered: false,
      }))
    );
  }, [data]);

  const filteredData = useMemo(
    () =>
      data.filter((d) =>
        categoryFilter.some(
          (filter) => filter.id === d.categoryId && filter.filtered === false
        )
      ),
    [data, categoryFilter]
  );

  const filterCategory = useCallback(
    (categoryId: string) => () => {
      setCategoryFilter(
        categoryFilter.map((filter) =>
          filter.id === categoryId
            ? { ...filter, filtered: !filter.filtered }
            : filter
        )
      );
    },
    [categoryFilter]
  );

  return data && !error && !loading ? (
    <Presentation
      data={filteredData}
      axis={axis}
      yearMonth={yearMonth}
      setYearMonth={setTargetYearMonth}
      categoryFilter={categoryFilter}
      filterCategory={filterCategory}
    />
  ) : (
    <Progress />
  );
};

export default memo(TeamMapContainer);
