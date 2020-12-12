import React, { memo, useCallback, useEffect, useState } from "react";
import Progress from "components/common/atoms/Progress";
import useTeamMap from "hooks/useTeamMap";
import { Score } from "firestore/types/Skillmap";
import { getYearMonth } from "util/getYearMonth";
import Presentation from "./organisms/TeamMap";

const TeamMapContainer = () => {
  const [allData, loading, error] = useTeamMap();
  const [data, setData] = useState<Score[]>([]);

  const [targetYearMonth, setTargetYearMonth] = useState<string>(
    getYearMonth()
  );

  const [categoriesFilter, setCategoriesFilter] = useState<
    {
      id: string;
      name: string;
      show: boolean;
    }[]
  >([]);

  const filterCategory = useCallback(
    (targetCategoryId: string) => () => {
      const next = categoriesFilter.map((category) =>
        category.id === targetCategoryId
          ? { ...category, show: !category.show }
          : category
      );
      setCategoriesFilter(next);
    },
    [categoriesFilter]
  );

  useEffect(() => {
    const targetData = allData[targetYearMonth];
    setData(targetData);

    if (targetData) {
      setCategoriesFilter(
        allData[targetYearMonth].map((score) => ({
          id: score.categoryId,
          name: score.category,
          show: true,
        }))
      );
    }
  }, [allData, targetYearMonth]);

  useEffect(() => {
    if (!allData[targetYearMonth]) return;
    const filteredData = allData[targetYearMonth].filter((score) => {
      return categoriesFilter.some(
        (filter) => filter.id === score.categoryId && filter.show === true
      );
    });
    setData(filteredData);
  }, [allData, targetYearMonth, categoriesFilter]);

  return !error && !loading ? (
    <Presentation
      data={data}
      yearMonth={targetYearMonth}
      setYearMonth={setTargetYearMonth}
      categoriesFilter={categoriesFilter}
      filterCategory={filterCategory}
      // filterUser={() => () => {}}
      // userFilter={[]}
    />
  ) : (
    <Progress />
  );
};

export default memo(TeamMapContainer);
