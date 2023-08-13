import React, { memo, useCallback, useEffect, useState } from "react";
import Progress from "components/common/atoms/Progress";
import useTeamMap from "hooks/useTeamMap";
import { Score, SkillmapDocument } from "firestore/types/Skillmap";
import { getYearMonth } from "util/getYearMonth";
import calculateDeviation from "util/calculateDeviation";
import Presentation from "./organisms/TeamMap";
import { Filter } from "./molecules/FilterArea";

type HistoryChartType = "average" | "deviation";
type SkillmapDataMap = Record<string, SkillmapDocument>;

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
  skillmapDataMap: SkillmapDataMap,
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

const useMonthlyChart = (
  skillmapDataMap: SkillmapDataMap,
  userFilter: Filter,
  categoriesFilter: Filter
) => {
  const [monthlyScoreData, setMonthlyScoreData] = useState<Score[] | null>(
    null
  );
  const [selectedYearMonth, setSelectedYearMonth] = useState<string>(
    getYearMonth()
  );

  // データフェッチ時に初期化
  useEffect(() => {
    const skillmapData = skillmapDataMap[selectedYearMonth];
    if (!skillmapData) return setMonthlyScoreData(null);
    const { scores } = skillmapData;
    setMonthlyScoreData(scores);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillmapDataMap]);

  // 表示月の切替時
  useEffect(() => {
    const skillmapData = skillmapDataMap[selectedYearMonth];
    if (!skillmapData) return setMonthlyScoreData(null);

    const { scores } = skillmapData;
    const scoreFilteredUser = filterScoresByUser(scores, userFilter);
    setMonthlyScoreData(scoreFilteredUser);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYearMonth]);

  // ユーザフィルターの変更時
  useEffect(() => {
    const filteredData = monthlyScoreData
      ? monthlyScoreData.map((score) => {
          const filteredAnswers = score.answeres.filter((ans) => {
            return userFilter.some(
              (filter) => filter.id === ans.userId && filter.hide === false
            );
          });
          const total = filteredAnswers.reduce(
            (acc, cur) => acc + cur.point,
            0
          );
          const average = total / filteredAnswers.length;
          const deviation = calculateDeviation(
            filteredAnswers.map((ans) => ans.point)
          );

          return {
            ...score,
            total,
            average,
            deviation,
            answeres: filteredAnswers,
          };
        })
      : null;
    setMonthlyScoreData(filteredData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFilter]);

  // カテゴリーフィルターの変更時
  useEffect(() => {
    const filteredData = monthlyScoreData
      ? monthlyScoreData.map((d) => {
          const filter = categoriesFilter.find(({ id }) => id === d.categoryId);
          const hide = filter ? filter.hide : true;

          return { ...d, hide };
        })
      : null;
    setMonthlyScoreData(filteredData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesFilter]);

  return {
    monthlyScoreData,
    selectedYearMonth,
    setSelectedYearMonth,
  };
};

const useHistoryChart = (
  skillmapDataMap: SkillmapDataMap,
  userFilter: Filter
) => {
  const [selectedHistoryChartType, setSelectedHistoryChartType] = useState<
    HistoryChartType
  >("average");

  const [historyData, setHistoryData] = useState<
    ({
      yearMonth: string;
      answeredUsers: { id: string; name: string }[];
    } & Record<string, number>)[]
  >([]);

  const [historyCartPeriod, setHistoryCartPeriod] = useState<{
    start: string; // YYYY-mm
    end: string; // YYYY-mm
  }>({
    start: "",
    end: "",
  });

  const onChangeHistoryCartPeriod = (target: "start" | "end") => (
    event: React.ChangeEvent<{ value: string }>
  ) =>
    setHistoryCartPeriod({
      ...historyCartPeriod,
      [target]: event.target.value,
    });

  const historyDataWithinDisplayPeriod = historyData.filter(
    (data) =>
      new Date(data.yearMonth) >= new Date(historyCartPeriod.start) &&
      new Date(data.yearMonth) <= new Date(historyCartPeriod.end)
  );

  const changeHistoryChartType = useCallback(
    (event: React.ChangeEvent<{ value: HistoryChartType }>) => {
      setSelectedHistoryChartType(event.target.value);
    },
    []
  );

  // データフェッチ時に初期化
  useEffect(() => {
    const dataForHistory = createHistoryData(
      skillmapDataMap,
      selectedHistoryChartType,
      userFilter
    );
    setHistoryData(dataForHistory);
    setHistoryCartPeriod({
      start:
        dataForHistory[dataForHistory.length - 3] &&
        dataForHistory[dataForHistory.length - 3].yearMonth,
      end:
        dataForHistory[dataForHistory.length - 1] &&
        dataForHistory[dataForHistory.length - 1].yearMonth,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillmapDataMap]);

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

  // ユーザーフィルター時
  useEffect(() => {
    const dataForHistory = createHistoryData(
      skillmapDataMap,
      selectedHistoryChartType,
      userFilter
    );
    setHistoryData(dataForHistory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFilter]);

  return {
    historyData,
    changeHistoryChartType,
    selectedHistoryChartType,
    historyCartPeriod,
    onChangeHistoryCartPeriod,
    historyDataWithinDisplayPeriod,
  };
};

const useFilters = (skillmapDataMap: SkillmapDataMap) => {
  const [categoriesFilter, setCategoriesFilter] = useState<Filter>([]);
  const [userFilter, setUserFilter] = useState<Filter>([]);
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

  const initUserFilter = (targetUserIds: string[]) => {
    const next = userFilter.map((user) => ({
      ...user,
      hide: !targetUserIds.includes(user.id),
    }));
    setUserFilter(next);
  };

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
    setCategoriesFilter(createCategoryFilter(skillmapDataMap));
    setUserFilter(createUserFilter(skillmapDataMap));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillmapDataMap]);

  return {
    categoriesFilter,
    userFilter,
    filterCategory,
    initUserFilter,
    filterUser,
  };
};

const TeamMapContainer = () => {
  const [skillmapDataMap, loading, error] = useTeamMap();

  const {
    categoriesFilter,
    userFilter,
    filterCategory,
    initUserFilter,
    filterUser,
  } = useFilters(skillmapDataMap);

  const {
    monthlyScoreData,
    selectedYearMonth,
    setSelectedYearMonth,
  } = useMonthlyChart(skillmapDataMap, userFilter, categoriesFilter);

  const {
    historyData,
    changeHistoryChartType,
    selectedHistoryChartType,
    historyCartPeriod,
    onChangeHistoryCartPeriod,
    historyDataWithinDisplayPeriod,
  } = useHistoryChart(skillmapDataMap, userFilter);

  return !error && !loading ? (
    <Presentation
      monthlyData={monthlyScoreData}
      selectedHistoryChartType={selectedHistoryChartType}
      changeHistoryChartType={changeHistoryChartType}
      historyData={historyData}
      selectedYearMonth={selectedYearMonth}
      setSelectedYearMonth={setSelectedYearMonth}
      categoriesFilter={categoriesFilter}
      filterCategory={filterCategory}
      filterUser={filterUser}
      userFilter={userFilter}
      initUserFilter={initUserFilter}
      historyCartPeriod={historyCartPeriod}
      onChangeHistoryCartPeriod={onChangeHistoryCartPeriod}
      historyDataWithinDisplayPeriod={historyDataWithinDisplayPeriod}
    />
  ) : (
    <Progress />
  );
};

export default memo(TeamMapContainer);
