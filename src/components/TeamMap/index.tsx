import React, { memo, useCallback, useEffect, useState } from "react";
import Progress from "components/common/atoms/Progress";
import useTeamMap from "hooks/useTeamMap";
import { Score } from "firestore/types/Skillmap";
import { getYearMonth } from "util/getYearMonth";
import calculateDeviation from "util/calculateDeviation";
import Presentation from "./organisms/TeamMap";

const TeamMapContainer = () => {
  const [SkillmapDataList, loading, error] = useTeamMap();
  const [scoreData, setScoreData] = useState<Score[] | null>(null);

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

  const [userFilter, setUserFilter] = useState<
    {
      id: string;
      name?: string;
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
  const filterUser = useCallback(
    (targetUserId: string) => () => {
      const next = userFilter.map((user) =>
        user.id === targetUserId ? { ...user, show: !user.show } : user
      );
      setUserFilter(next);
    },
    [userFilter]
  );

  useEffect(() => {
    const skillmapData = SkillmapDataList[targetYearMonth];
    if (!skillmapData) setScoreData(null);
    else {
      const { scores } = skillmapData;
      setScoreData(scoreData);

      setCategoriesFilter(
        scores.map((score) => ({
          id: score.categoryId,
          name: score.category,
          show: true,
        }))
      );
      setUserFilter(
        skillmapData.answeredUsers.map((user) => {
          // 過去のデータパターンに対する後方互換性の担保
          if (typeof user === "string") return { id: user, show: true };

          return { id: user.id, name: user.name, show: true };
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SkillmapDataList, targetYearMonth]);

  useEffect(() => {
    if (!SkillmapDataList[targetYearMonth]) return;
    const filteredData = SkillmapDataList[targetYearMonth].scores.filter(
      (score) => {
        return categoriesFilter.some(
          (filter) => filter.id === score.categoryId && filter.show === true
        );
      }
    );
    setScoreData(filteredData);
  }, [SkillmapDataList, targetYearMonth, categoriesFilter]);

  useEffect(() => {
    if (!SkillmapDataList[targetYearMonth]) return;
    const filteredData = SkillmapDataList[targetYearMonth].scores.map(
      (score) => {
        const filteredAnsweres = score.answeres.filter((ans) => {
          return userFilter.some(
            (filter) => filter.id === ans.userId && filter.show === true
          );
        });
        const total = filteredAnsweres.reduce((acc, cur) => acc + cur.point, 0);
        const average = total / filteredAnsweres.length;
        const deviation = calculateDeviation(
          filteredAnsweres.map((ans) => ans.point)
        );

        return {
          ...score,
          total,
          average,
          deviation,
          answeres: filteredAnsweres,
        };
      }
    );
    setScoreData(filteredData);
  }, [SkillmapDataList, targetYearMonth, userFilter]);

  return !error && !loading ? (
    <Presentation
      data={scoreData}
      yearMonth={targetYearMonth}
      setYearMonth={setTargetYearMonth}
      categoriesFilter={categoriesFilter}
      filterCategory={filterCategory}
      filterUser={filterUser}
      userFilter={userFilter}
    />
  ) : (
    <Progress />
  );
};

export default memo(TeamMapContainer);
