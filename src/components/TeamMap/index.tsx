import React, { memo, useCallback, useEffect, useState } from "react";
import Progress from "components/common/atoms/Progress";
import useTeamMap from "hooks/useTeamMap";
import { Score, SkillmapDocument } from "firestore/types/Skillmap";
import { getYearMonth } from "util/getYearMonth";
import calculateDeviation from "util/calculateDeviation";
import Presentation from "./organisms/TeamMap";

type HistoryChartType = "average" | "deviation";

const createHistoryData = (
  skillmapDataMap: Record<string, SkillmapDocument>,
  selectedHistoryChartType: HistoryChartType
) => {
  const dataForHistory = Object.entries(skillmapDataMap).map(
    ([yearMonth, { scores }]) => {
      const pointByCategories = scores.reduce(
        (acc, score) => ({
          ...acc,
          [score.categoryId]: score[selectedHistoryChartType],
        }),
        {}
      );

      return { yearMonth, ...pointByCategories };
    }
  ) as ({ yearMonth: string } & Record<string, number>)[];

  return dataForHistory;
};

const TeamMapContainer = () => {
  const [skillmapDataMap, loading, error] = useTeamMap();
  const [monthlyScoreData, setMonthlyScoreData] = useState<Score[] | null>(
    null
  );
  const [selectedHistoryChartType, setSelectedHistoryChartType] = useState<
    HistoryChartType
  >("average");

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

  const changeHistoryChartType = useCallback(
    (event: React.ChangeEvent<{ value: HistoryChartType }>) => {
      setSelectedHistoryChartType(event.target.value);
    },
    []
  );

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

  // データフェッチ時
  useEffect(() => {
    const dataForHistory = createHistoryData(
      skillmapDataMap,
      selectedHistoryChartType
    );
    setHistoryData(dataForHistory);

    const skillmapData = skillmapDataMap[targetYearMonth];
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
  }, [skillmapDataMap]);

  // 表示月の切替時
  useEffect(() => {
    const skillmapData = skillmapDataMap[targetYearMonth];
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

  // ユーザーフィルター時
  useEffect(() => {
    if (!skillmapDataMap[targetYearMonth]) return;
    const filteredData = skillmapDataMap[targetYearMonth].scores.map(
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

  // History Chart のタイプ変更時
  useEffect(() => {
    const dataForHistory = createHistoryData(
      skillmapDataMap,
      selectedHistoryChartType
    );
    setHistoryData(dataForHistory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHistoryChartType]);

  return !error && !loading ? (
    <Presentation
      monthlyData={monthlyScoreData}
      selectedHistoryChartType={selectedHistoryChartType}
      changeHistoryChartType={changeHistoryChartType}
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
