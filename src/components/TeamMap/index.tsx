import React, { memo, useCallback, useEffect, useState } from "react";
import Progress from "components/common/atoms/Progress";
import useTeamMap from "hooks/useTeamMap";
import { Score, SkillmapDocument } from "firestore/types/Skillmap";
import { getYearMonth } from "util/getYearMonth";
import calculateDeviation from "util/calculateDeviation";
import Presentation from "./organisms/TeamMap";
import { Filter } from "./molecules/FilterArea";

type HistoryChartType = "average" | "deviation";

const calculateScoreFromUserFilter = (score: Score, userFilter: Filter) => {
  const filteredPoints = score.answeres.filter(
    (ans) =>
      Boolean(userFilter.find((filter) => filter.id === ans.userId)?.hide) ===
      false
  );
  const total = filteredPoints.reduce((ac, cur) => ac + cur.point, 0);
  const average = total / filteredPoints.length;
  const deviation = calculateDeviation(filteredPoints.map((ans) => ans.point));

  return { total, average, deviation };
};

const filterScoresByUser = (scores: Score[], userFilter: Filter): Score[] => {
  const scoresByCategory = scores.map((score) => {
    const { total, average, deviation } = calculateScoreFromUserFilter(
      score,
      userFilter
    );

    return { ...score, total, average, deviation };
  });

  return scoresByCategory;
};

const createHistoryData = (
  skillmapDataMap: Record<string, SkillmapDocument>,
  selectedHistoryChartType: HistoryChartType,
  userFilter: Filter
) => {
  const dataForHistory = Object.entries(skillmapDataMap).map(
    ([yearMonth, { scores, answeredUsers }]) => {
      const pointByCategories = scores.reduce((acc, score) => {
        const { average, deviation } = calculateScoreFromUserFilter(
          score,
          userFilter
        );

        const s = selectedHistoryChartType === "average" ? average : deviation;

        return { ...acc, [score.categoryId]: s };
      }, {});

      return { yearMonth, answeredUsers, ...pointByCategories };
    }
  ) as ({
    yearMonth: string;
    answeredUsers: { id: string; name: string }[];
  } & Record<string, number>)[];

  return dataForHistory;
};

const createUserFilter = (
  skillmapDataMap: Record<string, SkillmapDocument>
): Filter => {
  const usersMaybeDuplicated = Object.values(skillmapDataMap).flatMap(
    ({ answeredUsers }) => answeredUsers
  );

  const filter = usersMaybeDuplicated.reduce<Filter>((acc, user) => {
    if (acc.find(({ id }) => id === user.id)) return acc;

    return [...acc, { ...user, hide: false }];
  }, []);

  return filter;
};

const createCategoryFilter = (
  skillmapDataMap: Record<string, SkillmapDocument>
): Filter => {
  const categoriesMaybeDuplicated = Object.values(
    skillmapDataMap
  ).flatMap(({ scores }) =>
    scores.map((score) => ({ id: score.categoryId, name: score.category }))
  );

  const filter = categoriesMaybeDuplicated.reduce<Filter>((acc, category) => {
    if (acc.find(({ id }) => id === category.id)) return acc;

    return [...acc, { ...category, hide: false }];
  }, []);

  return filter;
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
    ({
      yearMonth: string;
      answeredUsers: { id: string; name: string }[];
    } & Record<string, number>)[]
  >([]);

  const [targetYearMonth, setTargetYearMonth] = useState<string>(
    getYearMonth()
  );

  const [categoriesFilter, setCategoriesFilter] = useState<Filter>([]);

  const [userFilter, setUserFilter] = useState<Filter>([]);

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
  const initUserFilter = (targetUserIds: string[]) => {
    const next = userFilter.map((user) => ({
      ...user,
      hide: !targetUserIds.includes(user.id),
    }));
    setUserFilter(next);
  };

  // データフェッチ時
  useEffect(() => {
    const dataForHistory = createHistoryData(
      skillmapDataMap,
      selectedHistoryChartType,
      userFilter
    );
    setHistoryData(dataForHistory);
    setCategoriesFilter(createCategoryFilter(skillmapDataMap));
    setUserFilter(createUserFilter(skillmapDataMap));

    const skillmapData = skillmapDataMap[targetYearMonth];
    if (!skillmapData) return setMonthlyScoreData(null);
    const { scores } = skillmapData;
    setMonthlyScoreData(scores);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillmapDataMap]);

  // 表示月の切替時
  useEffect(() => {
    const skillmapData = skillmapDataMap[targetYearMonth];
    if (!skillmapData) return setMonthlyScoreData(null);

    const { scores } = skillmapData;
    const scoreFilteredUser = filterScoresByUser(scores, userFilter);
    setMonthlyScoreData(scoreFilteredUser);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetYearMonth]);

  // ユーザーフィルター時
  useEffect(() => {
    const dataForHistory = createHistoryData(
      skillmapDataMap,
      selectedHistoryChartType,
      userFilter
    );
    setHistoryData(dataForHistory);

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
      selectedHistoryChartType,
      userFilter
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
      initUserFilter={initUserFilter}
    />
  ) : (
    <Progress />
  );
};

export default memo(TeamMapContainer);
