import React, { memo, FC, useState } from "react";
import {
  Typography,
  makeStyles,
  createStyles,
  Paper,
  MenuItem,
} from "@material-ui/core";
import PageTitle from "components/common/atoms/PageTitle";
import IconButton from "components/common/atoms/IconButton";
import Select from "components/common/atoms/Select";
import { getYearMonth } from "util/getYearMonth";
import { Score } from "firestore/types/Skillmap";
import HistoryChart from "../molecules/HistoryChart";
import ScatterChart from "../molecules/ScatterChart";
import FilterArea, { Filter } from "../molecules/FilterArea";

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      marginBottom: "1vh",
    },
    paper: {
      marginBottom: "3vh",
      padding: "10px",
    },
    graphWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "20px",
    },
  })
);

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

type HistoryChartType = "average" | "deviation";
type HistoryData = (Record<string, string | number> & { yearMonth: string })[];

type Period = {
  start: string; // YYYY-mm
  end: string; // YYYY-mm
};

type Props = {
  monthlyData: Score[] | null;
  historyData: HistoryData;
  selectedHistoryChartType: HistoryChartType;
  yearMonth: string;
  setYearMonth: (ym: string) => void;
  changeHistoryChartType: (
    event: React.ChangeEvent<{ value: HistoryChartType }>
  ) => void;
  categoriesFilter: Filter;
  filterCategory: (categoryId: string) => () => void;
  userFilter: Filter;
  filterUser: (id: string) => () => void;
};

const useHistoryCartPeriod = (
  historyData: HistoryData
): [
  Period,
  (event: React.ChangeEvent<{ value: string }>) => void,
  (event: React.ChangeEvent<{ value: string }>) => void,
  HistoryData
] => {
  const [historyCartPeriod, setHistoryCartPeriod] = useState<Period>({
    start: historyData[0] && historyData[0].yearMonth,
    end:
      historyData[historyData.length - 1] &&
      historyData[historyData.length - 1].yearMonth,
  });
  const onChangeHistoryCartPeriod = (target: "start" | "end") => (
    event: React.ChangeEvent<{ value: string }>
  ) =>
    setHistoryCartPeriod({
      ...historyCartPeriod,
      [target]: event.target.value,
    });

  const filteredHistoryData = historyData.filter(
    (data) =>
      new Date(data.yearMonth) >= new Date(historyCartPeriod.start) &&
      new Date(data.yearMonth) <= new Date(historyCartPeriod.end)
  );

  return [
    historyCartPeriod,
    onChangeHistoryCartPeriod("start"),
    onChangeHistoryCartPeriod("end"),
    filteredHistoryData,
  ];
};

const TeamMap: FC<Props> = ({
  monthlyData,
  historyData,
  selectedHistoryChartType,
  yearMonth,
  setYearMonth,
  changeHistoryChartType,
  categoriesFilter,
  filterCategory,
  userFilter,
  filterUser,
}) => {
  const classes = useStyles();

  const [
    historyCartPeriod,
    onChangeHistoryCartPeriodStart,
    onChangeHistoryCartPeriodEnd,
    filteredHistoryData,
  ] = useHistoryCartPeriod(historyData);

  const changeTargetYeahMonth = (addMonth: number) => () => {
    const d = yearMonth.split("-").map((e) => parseInt(e, 10));
    // @ts-ignore
    const prev = new Date(d[0], (d[1] - 1).toString().padStart(2, "0"));
    prev.setMonth(prev.getMonth() + addMonth);
    setYearMonth(getYearMonth(prev));
  };

  const filteredMonthlyData = monthlyData
    ? monthlyData.map((d) => {
        const filter = categoriesFilter.find(({ id }) => id === d.categoryId);
        const hide = filter ? filter.hide : true;

        return { ...d, hide };
      })
    : null;

  const yLabel = selectedHistoryChartType === "average" ? "平均値" : "標準偏差";

  return (
    <>
      <PageTitle iconName="mySkillmap" className={classes.title}>
        Team Skillmap!!
      </PageTitle>
      <Paper elevation={5} className={classes.paper}>
        <div className={classes.graphWrapper}>
          <Typography variant="h6" noWrap>
            <IconButton
              iconName="leftClose"
              onClick={changeTargetYeahMonth(-1)}
            />
            MonthlyChart[{yearMonth}]
            <IconButton
              iconName="rightClose"
              onClick={changeTargetYeahMonth(1)}
            />
          </Typography>
          <ScatterChart
            dataKey="category"
            data={filteredMonthlyData}
            axis={axis}
          />
        </div>
        <div className={classes.graphWrapper}>
          <p>
            <Typography variant="h6" noWrap>
              HistoryChart
              {/* TODO: 共通化 */}
            </Typography>
            <Select
              id="history-chart-type-select"
              value={selectedHistoryChartType}
              label="縦軸"
              // @ts-ignore
              onChange={changeHistoryChartType}
            >
              <MenuItem value="average">平均値</MenuItem>
              <MenuItem value="deviation">標準偏差</MenuItem>
            </Select>
            <Select
              id="history-chart-yyyymm-start"
              value={historyCartPeriod.start}
              labelId="history-chart-yyyymm-start-label"
              label="開始月"
              // @ts-ignore
              onChange={onChangeHistoryCartPeriodStart}
            >
              {historyData.map((e) => (
                <MenuItem
                  key={e.yearMonth}
                  value={e.yearMonth}
                  disabled={
                    new Date(e.yearMonth) > new Date(historyCartPeriod.end)
                  }
                >
                  {e.yearMonth}
                </MenuItem>
              ))}
            </Select>
            <Select
              id="history-chart-yyyymm-end"
              value={historyCartPeriod.end}
              label="終了月"
              // @ts-ignore
              onChange={onChangeHistoryCartPeriodEnd}
            >
              {historyData.map((e) => (
                <MenuItem
                  key={e.yearMonth}
                  value={e.yearMonth}
                  disabled={
                    new Date(e.yearMonth) < new Date(historyCartPeriod.start)
                  }
                >
                  {e.yearMonth}
                </MenuItem>
              ))}
            </Select>
          </p>
          <HistoryChart
            xDataKey="yearMonth"
            yLabel={yLabel}
            data={filteredHistoryData}
            categoriesFilter={categoriesFilter}
          />
        </div>
        <FilterArea
          title="User Filter"
          items={userFilter}
          handleItemClick={filterUser}
        />
        <FilterArea
          title="Category Filter"
          items={categoriesFilter}
          handleItemClick={filterCategory}
        />
      </Paper>
    </>
  );
};

export default memo(TeamMap);
