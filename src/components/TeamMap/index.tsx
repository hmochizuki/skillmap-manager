import React, { memo, useCallback, useEffect, useState } from "react";
import Progress from "components/common/atoms/Progress";
import useTeamMap from "hooks/useTeamMap";
import { Score } from "firestore/types/Skillmap";
import { getYearMonth } from "util/getYearMonth";
import calculateDeviation from "util/calculateDeviation";
import Presentation from "./organisms/TeamMap";

const TeamMapContainer = () => {
  const [SkillmapDataMap, loading, error] = useTeamMap();
  const [monthlyScoreData, setMonthlyScoreData] = useState<Score[] | null>(
    null
  );
  const [historyData, setHistoryData] = useState<
    ({ yearMonth: string } & Record<string, number>)[]
  >([]);

  const [targetYearMonth, setTargetYearMonth] = useState<string>(
    getYearMonth()
  );

  const [categoriesFilter, setCategoriesFilter] = useState<
    {
      id: string;
      name: string;
      hide: boolean;
    }[]
  >([]);

  const [userFilter, setUserFilter] = useState<
    {
      id: string;
      name?: string;
      hide: boolean;
    }[]
  >([]);

  const filterCategory = useCallback(
    (targetCategoryId: string) => () => {
      const next = categoriesFilter.map((category) =>
        category.id === targetCategoryId
          ? { ...category, hide: !category.hide }
          : category
      );
      setCategoriesFilter(next);
    },
    [categoriesFilter]
  );
  const filterUser = useCallback(
    (targetUserId: string) => () => {
      const next = userFilter.map((user) =>
        user.id === targetUserId ? { ...user, hide: !user.hide } : user
      );
      setUserFilter(next);
    },
    [userFilter]
  );

  useEffect(() => {
    const skillmapData = SkillmapDataMap[targetYearMonth];

    const dataForHistory = Object.entries(SkillmapDataMap).map(
      ([yearMonth, { scores }]) => {
        const averageByCategories = scores.reduce(
          (acc, { category, average }) => ({
            ...acc,
            [category]: average,
          }),
          {}
        );

        return { yearMonth, ...averageByCategories };
      }
    ) as ({ yearMonth: string } & Record<string, number>)[];
    setHistoryData(dataForHistory);

    if (!skillmapData) return setMonthlyScoreData(null);
    const { scores } = skillmapData;
    setMonthlyScoreData(scores);

    setCategoriesFilter(
      scores.map((score) => ({
        id: score.categoryId,
        name: score.category,
        hide: false,
      }))
    );

    setUserFilter(
      skillmapData.answeredUsers.map((user) => {
        // 過去のデータパターンに対する後方互換性の担保
        if (typeof user === "string") return { id: user, hide: false };

        return { id: user.id, name: user.name, hide: false };
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SkillmapDataMap]);

  useEffect(() => {
    const skillmapData = SkillmapDataMap[targetYearMonth];
    if (!skillmapData) return setMonthlyScoreData(null);

    const { scores } = skillmapData;
    setMonthlyScoreData(scores);

    setCategoriesFilter(
      scores.map((score) => {
        const hide = Boolean(
          categoriesFilter.find(({ id }) => id === score.categoryId)?.hide
        );

        return { id: score.categoryId, name: score.category, hide };
      })
    );
    setUserFilter(
      skillmapData.answeredUsers.map((user) => {
        // 過去のデータパターンに対する後方互換性の担保
        if (typeof user === "string") return { id: user, hide: false };

        const hide = Boolean(userFilter.find(({ id }) => id === user.id)?.hide);

        return { id: user.id, name: user.name, hide };
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetYearMonth]);

  useEffect(() => {
    if (!SkillmapDataMap[targetYearMonth]) return;
    const filteredData = SkillmapDataMap[targetYearMonth].scores.map(
      (score) => {
        const filteredAnsweres = score.answeres.filter((ans) => {
          return userFilter.some(
            (filter) => filter.id === ans.userId && filter.hide === false
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
    setMonthlyScoreData(filteredData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFilter]);

  return !error && !loading ? (
    <Presentation
      monthlyData={monthlyScoreData}
      historyData={historyData}
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
